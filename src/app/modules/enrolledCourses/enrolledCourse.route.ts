import express from 'express';
import { auth } from '../../middlewares/auth';
import { validation } from '../../middlewares/validation';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import { EnrolledCourseControllers } from './enrolledCourse.controller';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validation(EnrolledCourseValidations.createEnrolledCourseValidationZodSchema),
  EnrolledCourseControllers.createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validation(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
