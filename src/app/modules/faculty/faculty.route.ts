import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { validation } from '../../middlewares/validation';
import { facultyValidation } from './faculty.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validation(facultyValidation.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', auth(), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
