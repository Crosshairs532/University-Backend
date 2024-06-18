/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsynch';
import AppError from '../../errrors/appError';
import httpStatus from 'http-status';

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, student: studentData } = req.body;
    const result = await userServices.createStudentIntoDB(
      studentData,
      password,
    );
    sendResponse(res, {
      success: true,
      message: 'User created Successfully',
      data: result,
    });
  },
);

const createFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, faculty } = req.body;
    const result = await userServices.createFacultyDb(faculty, password);
    console.log(result);
    sendResponse(res, {
      success: true,
      message: 'Faculty Created Successfully',
      data: result,
    });
  },
);
const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, admin } = req.body;
    console.log({ password, admin });
    const result = await userServices.createAdminDb(password, admin);
    console.log(result);
    sendResponse(res, {
      success: true,
      message: 'admin Created Successfully',
      data: result,
    });
  },
);

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.NOT_FOUND, 'Token not found!');
    }
    const result = await userServices.getMeDb(token);
    // console.log(result);
    sendResponse(res, {
      success: true,
      message: 'data retrieved successfully',
      data: result,
    });
  },
);

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
};
