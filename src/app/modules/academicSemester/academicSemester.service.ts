import { TAcademicSemester } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.schema';

const createAcademicSemesterDb = async (payload: TAcademicSemester) => {
  const result = await academicSemesterModel.create(payload);
  return result;
};

const getAllAcademicSemesterDb = async () => {
  return await academicSemesterModel.find();
};
const getSingleAcademicSemesterDb = async (id: string) => {
  return await academicSemesterModel.findById(id);
};

export const academicSemesterService = {
  createAcademicSemesterDb,
  getAllAcademicSemesterDb,
  getSingleAcademicSemesterDb,
};
