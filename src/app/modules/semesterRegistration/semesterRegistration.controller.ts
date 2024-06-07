import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsynch';
import { semesterRegistrationService } from './semesterRegistration.service';
import { sendResponse } from '../../utils/sendResponse';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    // console.log('create route');
    const result =
      await semesterRegistrationService.createSemesterRegistrationDb(req.body);
    sendResponse(res, {
      success: true,
      message: 'semester Registration is Created Successfully',
      data: result,
    });
  },
);

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationService.getAllSemesterRegistrationDb(req.query);
    sendResponse(res, {
      success: true,
      message: 'semester registrations are retrieved',
      data: result,
    });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await semesterRegistrationService.getSingleSemesterRegistrationDb(id);
    sendResponse(res, {
      success: true,
      message: 'semester registration is retrieved successfully',
      data: result,
    });
  },
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await semesterRegistrationService.updateSemesterRegistrationDb();
  },
);

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
