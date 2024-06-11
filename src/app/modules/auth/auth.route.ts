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

export const authRoutes = route;
