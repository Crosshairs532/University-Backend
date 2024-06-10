import { Schema, model } from 'mongoose';
import { Tuser, TuserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<Tuser, TuserModel>(
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
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await userModel.findOne({ id });
};

userSchema.statics.isUserDeletedByCustomId = async function (id: string) {
  return await userModel.findOne({ id: id, isDeleted: true });
};

userSchema.statics.isUserPasswordMatched = async function (id: string) {
  const isUserExists = await userModel.findOne({ id });
  return await bcrypt.compare(this?.password, isUserExists?.password);
};

userSchema.statics.isUserBlocked = async function (id: string) {
  return await userModel.findOne({ id: id, status: 'blocked' });
};
export const userModel = model<Tuser, TuserModel>('user', userSchema);
