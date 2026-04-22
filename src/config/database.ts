import mongoose, { Connection } from 'mongoose';

let connection: Connection | null = null;

export const connectDB = async (): Promise<Connection> => {
  if (connection) {
    console.log('Using existing database connection');
    return connection;
  }

  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/khidmah';
    
    await mongoose.connect(mongoURI);
    connection = mongoose.connection;
    
    console.log('✓ MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    throw error;
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
