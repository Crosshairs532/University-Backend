import Jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { catchAsync } from '../utils/catchAsynch';
import AppError from '../errrors/appError';
import httpStatus from 'http-status';
import config from '../config';

export const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // await schema.parseAsync(req.body);
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!');
    }

    // verify token
    Jwt.verify(token, config.jwt_secret as string, (err, decoded) => {});
    next();
  });
};
