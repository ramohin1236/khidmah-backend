import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ApiResponse } from '../types';

export class ProductController {
  /**
   * Add a new product
   */
  static async addProduct(req: Request, res: Response) {
    try {
      const product = await ProductService.createProduct(req.body);

      const response: ApiResponse = {
        success: true,
        message: 'Product added successfully',
        data: product,
      };

      console.log("porduct response--->>", response);

      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to add product',
        error: error.message,
      });
    }
  }

  /**
   * Get all products with metadata
   */
  static async getProducts(req: Request, res: Response) {
    try {
      const { products, meta } = await ProductService.getAllProducts(req.query);

      const response: ApiResponse = {
        success: true,
        message: 'Products fetched successfully',
        data: products,
        meta: meta,
      };

      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
        error: error.message,
      });
    }
  }

  /**
   * Update a product
   */
  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await ProductService.updateProduct(id as string, req.body);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to update product',
        error: error.message,
      });
    }
  }

  /**
   * Delete a product
   */
  static async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await ProductService.deleteProduct(id as string);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data: product,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to delete product',
        error: error.message,
      });
    }
  }
}
