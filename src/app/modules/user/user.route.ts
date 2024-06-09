import { Router } from 'express';
import { userController } from './user.controller';
import { validation } from '../../middlewares/validation';
import { createStudentValidationSchema } from '../student/student.validate';
import { facultyValidation } from '../faculty/faculty.validation';

const router = Router();

router.post(
  '/create-student',
  validation(createStudentValidationSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',
  validation(facultyValidation.createFacultyValidationSchema),
  userController.createFaculty,
);

export const userRoute = router;
