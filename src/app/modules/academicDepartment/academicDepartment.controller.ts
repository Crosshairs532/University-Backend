/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsynch';
import { academicDepartmentService } from './academicDepartment.service';
import { sendResponse } from '../../utils/sendResponse';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const acadmeicDepartment =
      await academicDepartmentService.createAcademicDepartmentDb(data);
    sendResponse(res, {
      success: true,
      message: 'Academic Department Created Successfully',
      data: acadmeicDepartment,
    });
  },
);

const getSingleAcadmeicDepartment = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await academicDepartmentService.getSingleAcademicDepartmentDb(id);

    sendResponse(res, {
      success: true,
      message: 'single Academic Department is Successfully',
      data: result,
    });
  },
);
export const academicDepartmentController = {
  createAcademicDepartment,
  getSingleAcadmeicDepartment,
};
