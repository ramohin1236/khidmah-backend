import { Schema, model } from 'mongoose';
import { IBrand } from '../types';

const BrandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'brands'
  }
);

BrandSchema.index({ name: 'text' });

export const Brand = model<IBrand>('Brand', BrandSchema);
