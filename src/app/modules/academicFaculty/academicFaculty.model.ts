import { TAcademicFaculty } from './academicFaculty.interface';
import { Schema, model } from 'mongoose';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: [true, 'Academic Faculty name is required'],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const academicFacultyModel = model<TAcademicFaculty>(
  'academicFaculty',
  academicFacultySchema,
);
