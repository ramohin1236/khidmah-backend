import { Response } from 'express';
import { ApiResponse } from '../types';

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  } as ApiResponse<T>);
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  error?: any
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    error: error?.message || error,
  } as ApiResponse);
};
