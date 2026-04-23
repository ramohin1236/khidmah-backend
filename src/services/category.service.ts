import { Category } from '../models/Category';
import { ICategory, IQueryOptions } from '../types';

export class CategoryService {
  /**
   * Create a new category
   */
  static async createCategory(data: ICategory) {
    const category = await Category.create(data);
    return category;
  }

  /**
   * Get all categories
   */
  static async getAllCategories(options: IQueryOptions) {
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

    const categories = await Category.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Category.countDocuments(query);
    const totalPage = Math.ceil(total / Number(limit));

    return {
      categories,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPage,
      },
    };
  }

  /**
   * Get category by ID
   */
  static async getCategoryById(id: string) {
    const category = await Category.findById(id).lean();
    return category;
  }

  /**
   * Update a category by ID
   */
  static async updateCategory(id: string, data: Partial<ICategory>) {
    const category = await Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return category;
  }

  /**
   * Delete a category by ID
   */
  static async deleteCategory(id: string) {
    const category = await Category.findByIdAndDelete(id);
    return category;
  }
}
