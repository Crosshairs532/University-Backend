import { z } from 'zod';
import { Codes, Months, Names } from './academicSemester.constants';

export const academicSemesterValidation = z.object({
  name: z.enum([...Names] as [string, ...string[]]),
  code: z.enum([...Codes] as [string, ...string[]]),
  year: z.string(),
  startMonth: z.enum([...Months] as [string, ...string[]]),
  endMonth: z.enum([...Months] as [string, ...string[]]),
});
export const updateAcademicSemesterValidation = z.object({
  name: z.enum([...Names] as [string, ...string[]]).optional(),
  code: z.enum([...Codes] as [string, ...string[]]).optional(),
  year: z.string().optional(),
  startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
});
