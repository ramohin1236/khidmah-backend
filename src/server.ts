import { createApp } from './app';
import { connectDB } from './config/database';
import { env, validateEnv } from './config/environment';
import { logger } from './utils/logger';

const startServer = async (): Promise<void> => {
  try {
    // Validate environment variables
    validateEnv();

    // Connect to MongoDB
    await connectDB();

    // Create Express app
    const app = createApp();

    // Start server
    app.listen(env.PORT, () => {
      logger.info(`✓ Server running on port ${env.PORT}`);
      logger.info(`✓ Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Start the server
startServer();
