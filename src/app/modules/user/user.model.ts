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
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
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
  return await userModel.findOne({ id }).select('+password');
};

userSchema.statics.isUserDeletedByCustomId = async function (id: string) {
  const isDeleted = await userModel.findOne({ id: id, isDeleted: true });
  // console.log({ isDeleted });
  return isDeleted;
};

userSchema.statics.isUserPasswordMatched = async function (
  password: string,
  id: string,
) {
  const isUserExists = await userModel.findOne({ id });
  console.log({ isUserExists });
  const passwordCheck = await bcrypt.compare(password, isUserExists?.password);
  // console.log(passwordCheck);
  return passwordCheck;
};

userSchema.statics.isUserBlocked = async function (id: string) {
  const isBlocked = await userModel.findOne({ id: id, status: 'blocked' });
  // console.log({ isBlocked });
  return isBlocked;
};

userSchema.statics.isJWTissuedbeforePasswordChanged = function (
  passwordChangeTimeStamp: Date,
  jwtTimeStamp: number,
) {
  const passChangedTime = new Date(passwordChangeTimeStamp).getTime() / 1000;
  return passChangedTime > jwtTimeStamp;
};

export const userModel = model<Tuser, TuserModel>('user', userSchema);
