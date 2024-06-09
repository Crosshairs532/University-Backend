import { catchAsync } from '../../utils/catchAsynch';
import { sendResponse } from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDb(
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Offered Course is created successfully !',
    data: result,
  });
});
const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  //   const result =
  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: 'OfferedCourses retrieved successfully !',
  //     data: result,
  //   });
});

const getSingleOfferedCourses = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    //   const result =
    //   sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: 'OfferedCourse fetched successfully',
    //     data: result,
    //   });
  },
);
const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.updateOfferedCourseIntoDb(
    id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'OfferedCourse updated successfully',
    data: result,
  });
});
const deleteOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.delete(id);
  sendResponse(res, {
    success: true,
    message: 'OfferedCourse deleted successfully',
    data: result,
  });
});

export const offeredCourseController = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourses,
  updateOfferedCourse,
  deleteOfferedCourse,
};
