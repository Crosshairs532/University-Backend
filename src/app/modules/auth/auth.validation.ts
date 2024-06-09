import { z } from 'zod';

const loginValidationSchema = z.object({
  id: z.string({ required_error: 'id is required' }),
  password: z.string({ required_error: 'password is required' }),
});

export const authValidation = {
  loginValidationSchema,
};
