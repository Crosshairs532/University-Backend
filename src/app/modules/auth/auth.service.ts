import httpStatus from 'http-status';
import AppError from '../../errrors/appError';
import { userModel } from '../user/user.model';
import { TSignUser } from './auth.interface';
import bcrypt from 'bcrypt';
const loginUser = async (payload: TSignUser) => {
  const isUserExists = await userModel.findOne({ id: payload.id });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exists!');
  }
  // check if the user is deleted
  if (isUserExists?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }
  // check the user given password;
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExists?.password,
  );
  // check if the user is blocked
  if (isUserExists?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
};

export const authService = {
  loginUser,
};
