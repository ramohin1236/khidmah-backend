import { Request, Response } from 'express';
import { BrandService } from '../services/brand.service';
import { ApiResponse } from '../types';

export class BrandController {
  /**
   * Add a new brand
   */
  static async addBrand(req: Request, res: Response) {
    try {
      const brand = await BrandService.createBrand(req.body);

      const response: ApiResponse = {
        success: true,
        message: 'Brand added successfully',
        data: brand,
      };

      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to add brand',
        error: error.message,
      });
    }
  }

  /**
   * Get all brands
   */
  static async getBrands(req: Request, res: Response) {
    try {
      const { brands, meta } = await BrandService.getAllBrands(req.query);

      const response: ApiResponse = {
        success: true,
        message: 'Brands fetched successfully',
        data: brands,
        meta: meta,
      };

      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch brands',
        error: error.message,
      });
    }
  }

  /**
   * Get brand by ID
   */
  static async getBrandById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const brand = await BrandService.getBrandById(id as string);

      if (!brand) {
        return res.status(404).json({
          success: false,
          message: 'Brand not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Brand fetched successfully',
        data: brand,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch brand',
        error: error.message,
      });
    }
  }

  /**
   * Update a brand
   */
  static async updateBrand(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const brand = await BrandService.updateBrand(id as string, req.body);

      if (!brand) {
        return res.status(404).json({
          success: false,
          message: 'Brand not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Brand updated successfully',
        data: brand,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to update brand',
        error: error.message,
      });
    }
  }

  /**
   * Delete a brand
   */
  static async deleteBrand(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const brand = await BrandService.deleteBrand(id as string);

      if (!brand) {
        return res.status(404).json({
          success: false,
          message: 'Brand not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Brand deleted successfully',
        data: brand,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to delete brand',
        error: error.message,
      });
    }
  }
}
