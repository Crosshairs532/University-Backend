/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsynch';

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

export const userController = { createStudent, createFaculty };
