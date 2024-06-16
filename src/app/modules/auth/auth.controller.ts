import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsynch';
import { sendResponse } from '../../utils/sendResponse';
import { authService } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  const { refreshToken, token, needsPasswordChange } = result;
  res.cookie('refreshTOken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

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

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = authService.RefreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.id;
  console.log(userId);
  const result = await authService.forgetPassword(userId);
  sendResponse(res, {
    success: true,
    message: 'Reset link is generated successfully',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};
