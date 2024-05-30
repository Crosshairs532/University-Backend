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
const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const all = await academicSemesterService.getAllAcademicSemesterDb();
    sendResponse(res, {
      success: true,
      message: 'All Academic Semesters are retrieved',
      data: all,
    });
  },
);
const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const single =
      await academicSemesterService.getSingleAcademicSemesterDb(id);
    sendResponse(res, {
      success: true,
      message: 'Single Academic Semesters is retrieved',
      data: single,
    });
  },
);

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
};
