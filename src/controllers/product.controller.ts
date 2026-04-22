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
}
