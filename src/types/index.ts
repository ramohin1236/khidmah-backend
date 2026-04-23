export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IService {
  _id?: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRequest {
  _id?: string;
  userId: string;
  serviceId: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  error?: string;
}

export interface IProduct {
  _id?: string;
  name: string;
  category: string;
  brand: string;
  image?: string;
  customizable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  _id?: string;
  name: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBrand {
  _id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQueryOptions {
  searchTerm?: string;
  category?: string;
  brand?: string;
  customizable?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
