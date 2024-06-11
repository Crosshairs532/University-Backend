import Jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsynch';
import AppError from '../errrors/appError';
import httpStatus from 'http-status';
import config from '../config';
import { TuserRole } from '../modules/user/user.interface';

export const auth = (...required_roles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // await schema.parseAsync(req.body);
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!');
    }

    // verify token
    Jwt.verify(token, config.jwt_secret as string, (err, decoded) => {
      if (err) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized !!',
        );
      }
      const role = (decoded as JwtPayload).role;
      if (required_roles && !required_roles.includes(decoded?.role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized !!',
        );
      }
      req.user = decoded as JwtPayload;
      next();
    });
  });
};
