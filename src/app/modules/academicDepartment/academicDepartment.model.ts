import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../middlewares/appError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true },
    AcademicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const name = this.name;
  const isExist: null | TAcademicDepartment =
    await academicDepartmentModel.findOne({ name });
  // if (isExist && name == isExist.name) {
  //   throw new Error('Department Already Exists');
  // }
  if (isExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department is already exist!',
    );
  }
  next();
});

export const academicDepartmentModel = model<TAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
);
