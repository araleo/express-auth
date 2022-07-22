import { model, Schema } from 'mongoose';

export interface IUser {
  _id?: string;
  id: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
  status: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      default: 'Active',
    },
  },
  {
    collection: 'auth',
    timestamps: true,
  }
);

export const User = model<IUser>('User', userSchema);
