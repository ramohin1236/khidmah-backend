import './config/environment';
import express, { Application, NextFunction, Request, Response } from 'express';
import { corsOptions } from './middlewares/cors';
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './utils/logger';
import { configureCloudinary } from './config/cloudinary';

// Import routes
import serviceRoutes from './routes/serviceRoutes';
import { ProductRoutes } from './routes/product.routes';
import { CategoryRoutes } from './routes/category.routes';
import { BrandRoutes } from './routes/brand.routes';
import { connectDB } from './config/database';

export const createApp = (): Application => {
  const app = express();

  // Configure third-party services
  configureCloudinary();

  // Connect to Database - Crucial for serverless environments like Vercel
  connectDB().catch((err) => {
    logger.error('✗ MongoDB connection failed during app initialization:', err);
  });

  // Middlewares - Order matters for performance!
  app.use(corsOptions);
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  // Health check endpoint (fast response for load balancers)
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Root endpoint - Welcome message
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Welcome to Khidmah Backend API',
      service: 'Printing & Services Management Platform',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        services: '/api/services',
      },
      timestamp: new Date().toISOString(),
    });
  });

  // API Routes
  app.use('/api/services', serviceRoutes);
  app.use('/api/products', ProductRoutes);
  app.use('/api/categories', CategoryRoutes);
  app.use('/api/brands', BrandRoutes);

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  });

  // Global error handler (must be last)
  app.use(errorHandler);

  logger.info('✓ Express app configured successfully');
  return app;
};

// Create app instance and export as default for Vercel
const app = createApp();
export default app;
