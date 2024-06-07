import { Router } from 'express';
import { validation } from '../../middlewares/validation';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';

const route = Router();
route.post(
  '/create-semester-registration',
  validation(
    semesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);
route.get('/', semesterRegistrationController.getAllSemesterRegistration);

route.patch(
  '/:id',
  validation(
    semesterRegistrationValidation.upadateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.updateSemesterRegistration,
);

export const semesterRegisterRoute = route;
