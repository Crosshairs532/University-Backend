import { Router } from 'express';
import { validation } from '../../middlewares/validation';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const route = Router();

route.post(
  '/login',
  validation(authValidation.loginValidationSchema),
  authController.loginUser,
);

route.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validation(authValidation.ChangePasswordValidationSchema),
  authController.loginUser,
);

route.post(
  '/refresh-token',
  validation(authValidation.refreshTokenValidationSchema),
  authController.refreshToken,
);

route.post(
  '/forget-password',
  validation(authValidation.forgetPasswordValidation),
  authController.forgetPassword,
);
route.post(
  '/reset-password',
  validation(authValidation.resetPasswordValidation),
  authController.forgetPassword,
);
export const authRoutes = route;
