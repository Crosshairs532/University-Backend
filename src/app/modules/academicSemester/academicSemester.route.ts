import { Router } from 'express';
import { academicSemesterController } from './academicSemester.controller';
import { validation } from '../../middlewares/validation';
import {
  academicSemesterValidation,
  updateAcademicSemesterValidation,
} from './academicSemester.Validation';

const route = Router();
route.post(
  '/create-academic-semester',
  validation(academicSemesterValidation),
  academicSemesterController.createAcademicSemester,
);

route.get('/', academicSemesterController.getAllAcademicSemester);
route.get('/:id', academicSemesterController.getSingleAcademicSemester);
route.patch(
  '/:id',
  validation(updateAcademicSemesterValidation),
  academicSemesterController.updateAcademicSemester,
);

export const academicSemester = route;
