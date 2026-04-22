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
  error?: string;
}
