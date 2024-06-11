import { Router } from 'express';
import { userController } from './user.controller';
import { validation } from '../../middlewares/validation';
import { createStudentValidationSchema } from '../student/student.validate';
import { facultyValidation } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validation(createStudentValidationSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',
  validation(facultyValidation.createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  validation(createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoute = router;
