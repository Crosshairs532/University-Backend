import { z } from 'zod';
const changeStatusValidation = z.object({
  status: z.enum(['in-progress', 'blocked'] as [string, ...string[]]),
});
export const userValidation = {
  changeStatusValidation,
};
