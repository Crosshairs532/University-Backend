import express from 'express';
import { offeredCourseController } from './offeredCourse.controller';
import { offeredCourseValidation } from './offeredCourse.validation';
import { validation } from '../../middlewares/validation';

const router = express.Router();

router.get('/', offeredCourseController.getAllOfferedCourses);

router.get('/:id', offeredCourseController.getSingleOfferedCourses);

router.post(
  '/create-offered-course',
  validation(offeredCourseValidation.createOfferedCourseValidationSchema),
  offeredCourseController.createOfferedCourse,
);

router.patch(
  '/:id',
  validation(offeredCourseValidation.updateOfferedCourseValidationSchema),
  offeredCourseController.updateOfferedCourse,
);

router.delete('/:id', offeredCourseController.deleteOfferedCourse);

export const offeredCourseRoutes = router;
