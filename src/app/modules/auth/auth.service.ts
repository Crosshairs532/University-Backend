import httpStatus from 'http-status';
import AppError from '../../errrors/appError';
import { userModel } from '../user/user.model';
import { TSignUser } from './auth.interface';
import Jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TSignUser) => {
  const isUser = await userModel.findOne({ id: payload.id });

  // if (!isUserExists) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'This user does not exists!');
  // }
  /* alternative isUserExists check */
  if (!(await userModel.isUserExistsByCustomId(payload.id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exists!');
  }

  // check if the user is deleted
  if (await userModel.isUserDeletedByCustomId(payload.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }
  // check the user given password;
  // const isPasswordMatched = await bcrypt.compare(
  //   payload.password,
  //   isUserExists?.password,
  // );

  //  ======== check if the user is blocked
  // if (isUserExists?.status === 'blocked') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  // }
  if (!(await userModel.isUserPasswordMatched(payload.password, payload?.id))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password did not matched!');
  }
  if (await userModel.isUserBlocked(payload.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
  // creating jwt token and send it to client

  const jwtPayload = {
    userId: isUser,
    role: isUser?.role,
  };

  const token = Jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: '10d',
  });

  return {
    token,
    needsPasswordChange: isUser?.needsPasswordChange,
  };
};

export const authService = {
  loginUser,
};
