import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsynch';
import { sendResponse } from '../../utils/sendResponse';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  sendResponse(res, {
    success: true,
    message: 'user Logged in successfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await authService.changePassword(user, passwordData);

  sendResponse(res, {
    success: true,
    message: 'password is updated successfully',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
};
