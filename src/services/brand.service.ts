import { Brand } from '../models/Brand';
import { IBrand, IQueryOptions } from '../types';

export class BrandService {
  /**
   * Create a new brand
   */
  static async createBrand(data: IBrand) {
    const brand = await Brand.create(data);
    return brand;
  }

  /**
   * Get all brands
   */
  static async getAllBrands(options: IQueryOptions) {
    const {
      searchTerm,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = options;

    const query: any = {};

    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: 'i' };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const brands = await Brand.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Brand.countDocuments(query);
    const totalPage = Math.ceil(total / Number(limit));

    return {
      brands,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPage,
      },
    };
  }

  /**
   * Get brand by ID
   */
  static async getBrandById(id: string) {
    const brand = await Brand.findById(id).lean();
    return brand;
  }

  /**
   * Update a brand by ID
   */
  static async updateBrand(id: string, data: Partial<IBrand>) {
    const brand = await Brand.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return brand;
  }

  /**
   * Delete a brand by ID
   */
  static async deleteBrand(id: string) {
    const brand = await Brand.findByIdAndDelete(id);
    return brand;
  }
}
