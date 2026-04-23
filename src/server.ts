import { env, validateEnv } from './config/environment';
import app from './app';
import { logger } from './utils/logger';

const startServer = async (): Promise<void> => {
  try {
    // Validate environment variables
    validateEnv();

    const PORT = env.PORT || 5000;

    // Start server
    app.listen(PORT, () => {
      logger.info(`🚀 Server is running on port ${PORT}`);
      logger.info(`🔗 URL: http://localhost:${PORT}`);
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
