import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/khidmah',
  
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUD_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUD_API_SECRET,
  
  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000,https://khidmah-dashbord.vercel.app',
};

export const validateEnv = (): void => {
  const requiredEnv = ['CLOUD_NAME', 'CLOUD_API_KEY', 'CLOUD_API_SECRET'];
  
  for (const key of requiredEnv) {
    if (!process.env[key]) {
      console.warn(`⚠ Warning: ${key} is not configured`);
    }
  }
};
