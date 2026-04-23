import { Product } from '../models/Product';
import { IProduct, IQueryOptions } from '../types';

export class ProductService {
  /**
   * Create a new product
   */
  static async createProduct(data: IProduct) {
    const product = await Product.create(data);
    return product;
  }

  /**
   * Get all products with advanced filtering, searching, and pagination
   */
  static async getAllProducts(options: IQueryOptions) {
    const {
      searchTerm,
      category,
      brand,
      customizable,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = options;

    const query: any = {};

    // Search logic (case-insensitive partial match on name)
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    // Filter logic
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (customizable !== undefined) query.customizable = customizable;

    // Pagination calculations
    const skip = (Number(page) - 1) * Number(limit);

    // Execute query with optimization
    const products = await Product.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit))
      .lean(); // Return plain JS objects for better performance

    // Total count for metadata
    const total = await Product.countDocuments(query);
    const totalPage = Math.ceil(total / Number(limit));

    return {
      products,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPage,
      },
    };
  }

  /**
   * Update a product by ID
   */
  static async updateProduct(id: string, data: Partial<IProduct>) {
    const product = await Product.findByIdAndUpdate(id, data, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });
    return product;
  }

  /**
   * Delete a product by ID
   */
  static async deleteProduct(id: string) {
    const product = await Product.findByIdAndDelete(id);
    return product;
  }
}
