/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsynch';
import { sendResponse } from '../../utils/sendResponse';
import { courseService } from './course.service';
import { FacultyServices } from '../faculty/faculty.service';

const createCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const course = await courseService.createCourseDb(data);
    sendResponse(res, {
      success: true,
      message: 'course is created successfully',
      data: course,
    });
  },
);

const getAllCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const all = await courseService.getAllCourseDb(req.query);
    sendResponse(res, {
      success: true,
      message: 'All course Semesters are retrieved',
      data: all,
    });
  },
);
const getSingleCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const single = await courseService.getSingleCourseDb(id);
    sendResponse(res, {
      success: true,
      message: 'Single Course is retrieved',
      data: single,
    });
  },
);

const deleteCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await courseService.deleteCourseDb(id);
    sendResponse(res, {
      success: true,
      message: 'course is deleted successfully',
      data: result,
    });
  },
);

const assignFaculties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await courseService.assignFacultiesDb(courseId, faculties);

    sendResponse(res, {
      success: true,
      message: 'assign faculties successfully ',
      data: result,
    });
  },
);
const removeFaculties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { faculties } = req.body;
    const result = await courseService.removeFacultiesDb(id, faculties);

    sendResponse(res, {
      success: true,
      message: 'Faculty is deleted succesfully',
      data: result,
    });
  },
);

const updateCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await courseService.updateCourseDb(id, req.body);

    sendResponse(res, {
      success: true,
      message: 'course is updated successfully',
      data: result,
    });
  },
);

export const courseController = {
  createCourse,
  deleteCourse,
  getSingleCourse,
  getAllCourse,
  updateCourse,
  assignFaculties,
  removeFaculties,
};
