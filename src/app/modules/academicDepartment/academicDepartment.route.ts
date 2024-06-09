import { Router } from 'express';
import { academicDepartmentController } from './academicDepartment.controller';
import { validation } from '../../middlewares/validation';
import { academicDepartmentValidation } from './academicDepartment.validation';
const route = Router();

route.post(
  '/create-academic-department',
  validation(academicDepartmentValidation),
  academicDepartmentController.createAcademicDepartment,
);

route.get('/', academicDepartmentController.getAllAcademicDepartment);
route.get('/:id', academicDepartmentController.getSingleAcademicDepartment);

export const academicDepartmentRoute = route;
