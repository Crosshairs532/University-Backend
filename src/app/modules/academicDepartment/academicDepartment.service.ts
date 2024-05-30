import { TAcademicDepartment } from './academicDepartment.interface';
import { academicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentDb = async (payload: TAcademicDepartment) => {
  return await academicDepartmentModel.create(payload);
};

const getSingleAcademicDepartmentDb = async (id: string) => {
  return await academicDepartmentModel
    .findById({ _id: id })
    .populate('AcademicFaculty');
};
export const academicDepartmentService = {
  createAcademicDepartmentDb,
  getSingleAcademicDepartmentDb,
};
