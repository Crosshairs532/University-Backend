/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsynch';
import { sendResponse } from '../../utils/sendResponse';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await academicSemesterService.createAcademicSemesterDb(
      req.body,
    );
    sendResponse(res, {
      success: true,
      message: 'Academic Semester created Successfully',
      data: result,
    });
  },
);

export const academicSemesterController = {
  createAcademicSemester,
};
