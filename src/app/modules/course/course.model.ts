import { Schema, model } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  /// <reference path="" />
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  preRequisiteCourses: {
    type: [preRequisiteCourseSchema],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const courseModel = model<TCourse>('course', courseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: Schema.Types.ObjectId,
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const courseFacultyModel = model<TCourseFaculty>(
  'courseFaculty',
  courseFacultySchema,
);
