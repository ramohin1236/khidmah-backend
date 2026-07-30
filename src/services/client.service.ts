import { Client } from '../models/Client';
import { IClient, IQueryOptions } from '../types';

export class ClientService {
  /**
   * Create a new client
   */
  static async createClient(data: IClient) {
    const client = await Client.create(data);
    return client;
  }

  /**
   * Get all clients
   */
  static async getAllClients(options: IQueryOptions) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = options;

    const query: any = {};
    const skip = (Number(page) - 1) * Number(limit);

    const clients = await Client.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Client.countDocuments(query);
    const totalPage = Math.ceil(total / Number(limit));

    return {
      clients,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPage,
      },
    };
  }

  /**
   * Get client by ID
   */
  static async getClientById(id: string) {
    const client = await Client.findById(id).lean();
    return client;
  }

  /**
   * Delete a client by ID
   */
  static async deleteClient(id: string) {
    const client = await Client.findByIdAndDelete(id);
    return client;
  }
}
