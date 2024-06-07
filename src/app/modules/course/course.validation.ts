import { z } from 'zod';

const preRequisiteValidation = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
const createCourseValidation = z.object({
  title: z.string(),
  prefix: z.string(),
  code: z.number(),
  credits: z.number(),
  preRequisiteCourses: z.array(preRequisiteValidation).optional(),
  isDeleted: z.string().optional(),
});

const UpdatepreRequisiteValidation = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
const updateCourseValidation = z.object({
  title: z.string().optional(),
  prefix: z.string().optional(),
  code: z.number().optional(),
  credits: z.number().optional(),
  preRequisiteCourses: z.array(UpdatepreRequisiteValidation).optional(),
  isDeleted: z.string().optional().optional(),
});

const assignFacultyValidation = z.object({
  faculties: z.array(z.string()),
});

export const courseValidation = {
  createCourseValidation,
  updateCourseValidation,
  assignFacultyValidation,
};
