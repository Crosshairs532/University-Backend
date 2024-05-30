/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsynch';
import { academicFacultyService } from './academicFaculty.service';
import { sendResponse } from '../../utils/sendResponse';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const academicFaculty =
      await academicFacultyService.createAcademicFacultyDb(data);
    sendResponse(res, {
      success: true,
      message: 'Academic Faculty created successfully',
      data: academicFaculty,
    });
  },
);

const getallAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const academicFaculty =
      await academicFacultyService.getallAcademicFacultyDb();

    sendResponse(res, {
      success: true,
      message: ' All Academic Faculty are retrieved successfully',
      data: academicFaculty,
    });
  },
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const academicFaculty =
      await academicFacultyService.getSingleAcademicFacultyDb(id);

    sendResponse(res, {
      success: true,
      message: ' single Academic Faculty is  retrieved successfully',
      data: academicFaculty,
    });
  },
);

export const AcademicFacultycontroller = {
  createAcademicFaculty,
  getallAcademicFaculty,
  getSingleAcademicFaculty,
};
