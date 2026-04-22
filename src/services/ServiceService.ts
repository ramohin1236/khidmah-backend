import { IService } from '../types';
import { Service } from '../models/Service';
import { logger } from '../utils/logger';

export class ServiceService {
  async getAllServices(): Promise<IService[]> {
    try {
      logger.debug('Fetching all services');
      return await Service.find();
    } catch (error) {
      logger.error('Error fetching services', error);
      throw error;
    }
  }

  async getServiceById(id: string): Promise<IService | null> {
    try {
      return await Service.findById(id);
    } catch (error) {
      logger.error('Error fetching service', error);
      throw error;
    }
  }

  async createService(data: IService): Promise<IService> {
    try {
      const service = new Service(data);
      return await service.save();
    } catch (error) {
      logger.error('Error creating service', error);
      throw error;
    }
  }

  async updateService(id: string, data: Partial<IService>): Promise<IService | null> {
    try {
      return await Service.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      logger.error('Error updating service', error);
      throw error;
    }
  }

  async deleteService(id: string): Promise<boolean> {
    try {
      const result = await Service.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      logger.error('Error deleting service', error);
      throw error;
    }
  }
}

export const serviceService = new ServiceService();
