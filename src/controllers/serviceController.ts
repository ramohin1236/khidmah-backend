import { Request, Response } from 'express';
import { serviceService } from '../services/ServiceService';
import { sendSuccess, sendError } from '../utils/response';
import { asyncHandler, AppError } from '../middlewares/errorHandler';

export const getAllServices = asyncHandler(async (req: Request, res: Response) => {
  const services = await serviceService.getAllServices();
  sendSuccess(res, 200, 'Services fetched successfully', services);
});

export const getServiceById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const service = await serviceService.getServiceById(id);
  
  if (!service) {
    throw new AppError(404, 'Service not found');
  }
  
  sendSuccess(res, 200, 'Service fetched successfully', service);
});

export const createService = asyncHandler(async (req: Request, res: Response) => {
  const service = await serviceService.createService(req.body);
  sendSuccess(res, 201, 'Service created successfully', service);
});

export const updateService = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const service = await serviceService.updateService(id, req.body);
  
  if (!service) {
    throw new AppError(404, 'Service not found');
  }
  
  sendSuccess(res, 200, 'Service updated successfully', service);
});

export const deleteService = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const success = await serviceService.deleteService(id);
  
  if (!success) {
    throw new AppError(404, 'Service not found');
  }
  
  sendSuccess(res, 200, 'Service deleted successfully');
});
