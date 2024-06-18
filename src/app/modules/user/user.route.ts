import { NextFunction, Request, Response, Router } from 'express';
import { userController } from './user.controller';
import { validation } from '../../middlewares/validation';
import { createStudentValidationSchema } from '../student/student.validate';
import { facultyValidation } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './uservalidation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
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

router.get('/me', auth('student', 'admin', 'faculty'), userController.getMe);
router.post(
  '/change-status/:id',
  auth('admin'),
  validation(userValidation.changeStatusValidation),
  userController.changeStatus,
);
export const userRoute = router;
