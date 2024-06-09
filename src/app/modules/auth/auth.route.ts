import { Router } from 'express';
import { validation } from '../../middlewares/validation';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';

const route = Router();

route.post(
  '/login',
  validation(authValidation.loginValidationSchema),
  authController.loginUser,
);
