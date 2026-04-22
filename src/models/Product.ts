import { Schema, model } from 'mongoose';
import { IProduct } from '../types';

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    image: {
      type: String,
      required: false,
    },
    customizable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'products'
  }
);

// Compound index for better search performance if needed, 
// but individual indexes on name, category, and brand are usually enough for simple filters.
ProductSchema.index({ name: 'text' });

export const Product = model<IProduct>('Product', ProductSchema);
