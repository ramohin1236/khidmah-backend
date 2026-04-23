import { Schema, model } from 'mongoose';
import { ICategory } from '../types';

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: 'categories'
  }
);

CategorySchema.index({ name: 'text' });

export const Category = model<ICategory>('Category', CategorySchema);
