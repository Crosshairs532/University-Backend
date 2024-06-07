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

export const offeredCourseController = {
  createOfferedCourse,
};
