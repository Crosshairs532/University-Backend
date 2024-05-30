import { TAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyDb = async (payload: TAcademicFaculty) => {
  return await academicFacultyModel.create(payload);
};

const getallAcademicFacultyDb = async () => {
  return await academicFacultyModel.find();
};
const getSingleAcademicFacultyDb = async (id: string) => {
  return await academicFacultyModel.findById(id);
};
const updateAcademicFacultyDb = async (
  id: string,
  payload: TAcademicFaculty,
) => {
  return await academicFacultyModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
};

export const academicFacultyService = {
  createAcademicFacultyDb,
  getallAcademicFacultyDb,
  getSingleAcademicFacultyDb,
  updateAcademicFacultyDb,
};
