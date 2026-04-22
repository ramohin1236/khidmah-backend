import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', UserSchema);
