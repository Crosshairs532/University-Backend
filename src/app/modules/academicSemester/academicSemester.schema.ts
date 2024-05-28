/* eslint-disable no-unused-vars */

import { Schema, model } from 'mongoose';
import { Codes, Months, Names } from './academicSemester.constants';
import { TAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: Names,
    unique: true,
  },

  code: {
    type: String,
    enum: Codes,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: Months,
  endMonth: Months,
});
/*
Handle logical error in academic semester.  Make semester unique and check is the semester exists in pre middleware. 
*/
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await academicSemesterModel.findOne({
    name: this.name,
    year: this.name,
  });
  if (isSemesterExists) {
    throw new Error('Semester already exists');
  }
  // handle code mismatching;

  next();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const academicSemesterModel = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
);
