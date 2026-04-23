import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { ApiResponse } from '../types';

export class CategoryController {
  /**
   * Add a new category
   */
  static async addCategory(req: Request, res: Response) {
    try {
      const data = { ...req.body };

      // If an image was uploaded, use its URL
      if ((req as any).file) {
        data.image = (req as any).file.path;
      }

      const category = await CategoryService.createCategory(data);

      const response: ApiResponse = {
        success: true,
        message: 'Category added successfully',
        data: category,
      };

      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to add category',
        error: error.message,
      });
    }
  }

  /**
   * Get all categories
   */
  static async getCategories(req: Request, res: Response) {
    try {
      const { categories, meta } = await CategoryService.getAllCategories(req.query);

      const response: ApiResponse = {
        success: true,
        message: 'Categories fetched successfully',
        data: categories,
        meta: meta,
      };

      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch categories',
        error: error.message,
      });
    }
  }

  /**
   * Get category by ID
   */
  static async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id as string);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Category fetched successfully',
        data: category,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch category',
        error: error.message,
      });
    }
  }

  /**
   * Update a category
   */
  static async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = { ...req.body };

      // If a new image was uploaded, update the URL
      if ((req as any).file) {
        data.image = (req as any).file.path;
      }

      const category = await CategoryService.updateCategory(id as string, data);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        data: category,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to update category',
        error: error.message,
      });
    }
  }

  /**
   * Delete a category
   */
  static async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await CategoryService.deleteCategory(id as string);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Category deleted successfully',
        data: category,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to delete category',
        error: error.message,
      });
    }
  }
}
