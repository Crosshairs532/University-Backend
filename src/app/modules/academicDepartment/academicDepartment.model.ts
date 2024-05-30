import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

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
  if (isExist && name == isExist.name) {
    throw new Error('Department Already Exists');
  }
  next();
});

export const academicDepartmentModel = model<TAcademicDepartment>(
  'academicDepartmnet',
  academicDepartmentSchema,
);
