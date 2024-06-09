import { Schema, model } from 'mongoose';
import { Tuser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<Tuser>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, Number(config.saltround));
  this.password = hash;
  next();
});
export const userModel = model<Tuser>('user', userSchema);
