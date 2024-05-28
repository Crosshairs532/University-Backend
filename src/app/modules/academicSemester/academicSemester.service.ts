import { TAcademicSemester } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.schema';

const createAcademicSemesterDb = async (payload: TAcademicSemester) => {
  const result = await academicSemesterModel.create(payload);
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterDb,
};
