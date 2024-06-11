import { z } from 'zod';

const loginValidationSchema = z.object({
  id: z.string({ required_error: 'id is required' }),
  password: z.string({ required_error: 'password is required' }),
});
const ChangePasswordValidationSchema = z.object({
  OldPassword: z.string({ required_error: 'old password is required' }),
  NewPassword: z.string({ required_error: 'password is required' }),
});

export const authValidation = {
  loginValidationSchema,
  ChangePasswordValidationSchema,
};
