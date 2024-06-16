import httpStatus from 'http-status';
import AppError from '../../errrors/appError';
import { userModel } from '../user/user.model';
import { TSignUser } from './auth.interface';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { authUtils } from './auth.utils';
import { sendMail } from '../../utils/email';

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
    userId: isUser?.id,
    role: isUser?.role,
  };

  const token = authUtils.createToken(jwtPayload);
  const refreshToken = authUtils.refreshToken(jwtPayload);
  return {
    token,
    refreshToken,
    needsPasswordChange: isUser?.needsPasswordChange,
  };
};

const changePassword = async (userData: JwtPayload, payload) => {
  const isUser = await userModel.findOne({ id: userData.id });

  if (!(await userModel.isUserExistsByCustomId(userData.id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exists!');
  }

  // check if the user is deleted
  if (await userModel.isUserDeletedByCustomId(userData.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }
  if (
    !(await userModel.isUserPasswordMatched(payload.oldPassword, userData?.id))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password did not matched!');
  }
  if (await userModel.isUserBlocked(payload.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  // hash new password
  const newHashedPaassword = await bcrypt.hash(
    payload.NewPassword,
    Number(config.saltround),
  );

  const result = await userModel.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPaassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

const RefreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!');
  }

  // verify token
  const decoded = Jwt.verify(token, config.jwt_refresh_token as string);
  const { userId, iat } = decoded as JwtPayload;

  const isUser = await userModel.findOne(userId);

  if (!(await userModel.isUserExistsByCustomId(userId))) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exists!');
  }

  // check if the user is deleted
  if (await userModel.isUserDeletedByCustomId(userId)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }
  if (
    !(await userModel.isUserPasswordMatched(payload.oldPassword, userData?.id))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password did not matched!');
  }
  const jwtPayload = {
    userId: isUser?.id,
    role: isUser?.role,
  };

  const token = authUtils.createToken(jwtPayload);
  return token;
};

const forgetPassword = async (id: string) => {
  const isUser = await userModel.findOne({ _id: id });
  if (!isUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Not Found!');
  }
  if (await userModel.isUserDeletedByCustomId(id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }

  if (await userModel.isUserBlocked(id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
  const jwtPayload = {
    userId: isUser?.id,
    role: isUser?.role,
  };

  const token = authUtils.createToken(jwtPayload);

  const resetLink = `https://localhost:2000?id?=${id}&token=${token}`;
  sendMail(isUser.email, resetLink);
};
export const authService = {
  loginUser,
  changePassword,
  RefreshToken,
  forgetPassword,
};
