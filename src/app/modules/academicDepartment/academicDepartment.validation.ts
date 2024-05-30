import { z } from 'zod';

export const academicDepartmentValidatioon = z.object({
  name: z.string({
    invalid_type_error: 'Invalid Academic Department',
    required_error: 'Academic Department Name is required',
  }),
  AcademicFaculty: z.string(),
});
