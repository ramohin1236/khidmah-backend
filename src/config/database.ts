import mongoose, { Connection } from 'mongoose';

let connection: Connection | null = null;

export const connectDB = async (): Promise<Connection> => {
  if (connection && mongoose.connection.readyState === 1) {
    console.log('✓ Using existing database connection');
    return connection;
  }

  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/khidmah';
    console.log('📡 Connecting to:', mongoURI.split('?')[0]); // Hide sensitive query params

    const result = await mongoose.connect(mongoURI, { 
      dbName: 'khidmah_ecommerce',
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
    });

    connection = result.connection;

    // Add event listeners
    mongoose.connection.on('connected', () => {
      console.log('✓ MongoDB connected successfully');
    });

    mongoose.connection.on('error', (error) => {
      console.error('✗ MongoDB connection error:', error.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠ MongoDB disconnected');
    });

    return connection;
  } catch (error: any) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (connection) {
    await mongoose.disconnect();
    connection = null;
    console.log('✓ MongoDB disconnected');
  }
};

export default mongoose;
