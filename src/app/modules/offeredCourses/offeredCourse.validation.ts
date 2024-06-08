import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const createOfferedCourseValidationSchema = z
  .object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    section: z.number(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z.string(), // HH: MM   00-23: 00-59
    endTime: z.string(),
  })
  .refine(
    (data) => {
      const start = new Date(`1970-01-01T${data.startTime}:00`);
      const end = new Date(`1970-01-01T${data.endTime}:00`);

      return start > end;
    },
    {
      message: 'Start time should be greater than end time ',
    },
  );

// amra update korte dibo shudhu  faculty , days , start and end time.
const updateOfferedCourseValidationSchema = z.object({
  faculty: z.string(),
  maxCapacity: z.number(),
  days: z.array(z.enum([...Days] as [string, ...string[]])),
  startTime: z.string(), // HH: MM   00-23: 00-59
  endTime: z.string(),
});

export const offeredCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
