import { Schema, model } from 'mongoose';
import { IService } from '../types';

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Service = model<IService>('Service', ServiceSchema);
