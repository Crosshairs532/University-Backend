import { Error } from 'mongoose';
import { codeChecker } from './academicSemester.constants';
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

const updateAcademicSemesterDb = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  // check semester code;
  if (
    payload.name &&
    payload.code &&
    codeChecker[payload.name] == payload.code
  ) {
    return await academicSemesterModel.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
  } else {
    throw new Error('Invalid Semester Code');
  }
};

export const academicSemesterService = {
  createAcademicSemesterDb,
  getAllAcademicSemesterDb,
  getSingleAcademicSemesterDb,
  updateAcademicSemesterDb,
};
