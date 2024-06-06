import { validation } from './../../middlewares/validation';
import { Router } from 'express';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';

const route = Router();

route.post(
  '/create-course',
  validation(courseValidation.createCourseValidation),
  courseController.createCourse,
);

route.get('/:id', courseController.getSingleCourse);
route.get('/', courseController.getAllCourse);
route.delete('/:id', courseController.deleteCourse);

route.patch('/:id', validation(courseValidation.updateCourseValidation));

export const courseRoute = route;
