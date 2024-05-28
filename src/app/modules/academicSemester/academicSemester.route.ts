import { Router } from 'express';
import { academicSemesterController } from './academicSemester.controller';
import { validation } from '../../middlewares/validation';
import { academicSemesterValidation } from './academicSemester.Validation';

const route = Router();
route.post(
  '/create-academic-semester',
  validation(academicSemesterValidation),
  academicSemesterController.createAcademicSemester,
);

export const academicSemester = route;
