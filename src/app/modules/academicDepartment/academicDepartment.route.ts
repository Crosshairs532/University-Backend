import { Router } from 'express';
import { academicDepartmentController } from './academicDepartment.controller';
import { validation } from '../../middlewares/validation';
import { academicDepartmentValidatioon } from './academicDepartment.validation';

const route = Router();

route.post(
  '/create-academic-department',
  validation(academicDepartmentValidatioon),
  academicDepartmentController.createAcademicDepartment,
);

route.get('/:id', academicDepartmentController.getSingleAcadmeicDepartment);

export const academicDepartmentRoute = route;
