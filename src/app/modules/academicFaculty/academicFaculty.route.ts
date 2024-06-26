import { Router } from 'express';
import { AcademicFacultycontroller } from './academicFacuty.controller';
import { validation } from '../../middlewares/validation';
import {
  academicFacultyValidation,
  updateAcademicFacultyValidation,
} from './academicFaculty.Validation';

const route = Router();

route.post(
  '/create-academic-faculty',
  validation(academicFacultyValidation),
  AcademicFacultycontroller.createAcademicFaculty,
);

route.get('/', AcademicFacultycontroller.getallAcademicFaculty);
route.get('/:id', AcademicFacultycontroller.getSingleAcademicFaculty);
route.patch(
  '/:id',
  validation(updateAcademicFacultyValidation),
  AcademicFacultycontroller.updateAcademicFaculty,
);
export const academicFacultyRoute = route;
