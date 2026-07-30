import { Request, Response } from 'express';
import { ClientService } from '../services/client.service';
import { ApiResponse } from '../types';

export class ClientController {
  /**
   * Add a new client logo
   */
  static async addClient(req: Request, res: Response) {
    try {
      let logoUrl: string | undefined;

      // 1. Check if files were uploaded (for upload.any() or upload.fields())
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        logoUrl = req.files[0].path;
      } 
      // 2. Check if a single file was uploaded (for upload.single())
      else if ((req as any).file) {
        logoUrl = (req as any).file.path;
      }

      // 3. Fallback to check request body (e.g. JSON raw body with logo or image)
      if (!logoUrl && req.body) {
        logoUrl = req.body.logo || req.body.image;
      }

      if (!logoUrl) {
        return res.status(400).json({
          success: false,
          message: 'Failed to add client. Logo image file or image URL is required.',
        });
      }

      const client = await ClientService.createClient({ logo: logoUrl });

      const response: ApiResponse = {
        success: true,
        message: 'Client logo uploaded successfully',
        data: client,
      };

      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to add client logo',
        error: error.message,
      });
    }
  }

  /**
   * Get all client logos
   */
  static async getClients(req: Request, res: Response) {
    try {
      const { clients, meta } = await ClientService.getAllClients(req.query);

      const response: ApiResponse = {
        success: true,
        message: 'Client logos fetched successfully',
        data: clients,
        meta: meta,
      };

      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch client logos',
        error: error.message,
      });
    }
  }

  /**
   * Update an existing client logo
   */
  static async updateClient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let logoUrl: string | undefined;

      // 1. Check if files were uploaded (for upload.any() or upload.fields())
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        logoUrl = req.files[0].path;
      } 
      // 2. Check if a single file was uploaded (for upload.single())
      else if ((req as any).file) {
        logoUrl = (req as any).file.path;
      }

      // 3. Fallback to check request body (e.g. JSON raw body with logo or image)
      if (!logoUrl && req.body) {
        logoUrl = req.body.logo || req.body.image;
      }

      const updateData: any = {};
      if (logoUrl) {
        updateData.logo = logoUrl;
      }

      const client = await ClientService.updateClient(id as string, updateData);

      if (!client) {
        return res.status(404).json({
          success: false,
          message: 'Client logo not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Client logo updated successfully',
        data: client,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to update client logo',
        error: error.message,
      });
    }
  }

  /**
   * Delete a client logo
   */
  static async deleteClient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await ClientService.deleteClient(id as string);

      if (!client) {
        return res.status(404).json({
          success: false,
          message: 'Client logo not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Client logo deleted successfully',
        data: client,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to delete client logo',
        error: error.message,
      });
    }
  }
}
