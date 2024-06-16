import Jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsynch';
import AppError from '../errrors/appError';
import httpStatus from 'http-status';
import config from '../config';
import { TuserRole } from '../modules/user/user.interface';
import { userModel } from '../modules/user/user.model';

export const auth = (...required_roles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // await schema.parseAsync(req.body);
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!');
    }

    // verify token
    const decoded = Jwt.verify(token, config.jwt_secret as string);
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
      !(await userModel.isUserPasswordMatched(
        payload.oldPassword,
        userData?.id,
      ))
    ) {
      throw new AppError(httpStatus.FORBIDDEN, 'Password did not matched!');
    }
    if (await userModel.isUserBlocked(userId)) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }
    const role = (decoded as JwtPayload).role;

    if (
      isUser?.passwordChangedAt &&
      userModel.isJWTissuedbeforePasswordChanged(
        isUser.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!');
    }
    if (required_roles && !required_roles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
