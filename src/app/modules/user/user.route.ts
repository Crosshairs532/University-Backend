import { Router } from 'express';
import { userController } from './user.controller';
import { validation } from '../../middlewares/validation';
import { createStudentValidationSchema } from '../student/student.validate';
const router = Router();

router.post(
  '/create-student',
  validation(createStudentValidationSchema),
  userController.createStudent,
);

export const userRoute = router;
