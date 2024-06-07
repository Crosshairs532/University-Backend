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
route.put(
  '/:courseId/assign-faculties',
  validation(courseValidation.assignFacultyValidation),
  courseController.assignFaculties,
);
route.patch('/:id', validation(courseValidation.updateCourseValidation));
route.delete(
  '/:courseId/remove-faculties',
  validation(courseValidation.updateCourseValidation),
  courseController.removeFaculties,
);

export const courseRoute = route;
