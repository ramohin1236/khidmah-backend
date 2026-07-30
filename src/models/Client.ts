import { Schema, model } from 'mongoose';
import { IClient } from '../types';

const ClientSchema = new Schema<IClient>(
  {
    logo: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'clients',
  }
);

export const Client = model<IClient>('Client', ClientSchema);
