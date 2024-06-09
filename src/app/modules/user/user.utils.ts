/* eslint-disable @typescript-eslint/no-unused-vars */
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { Faculty } from '../faculty/faculty.model';
import { userModel } from './user.model';

const LaststudentId = async () => {
  const lastStudent = await userModel
    .findOne(
      {
        role: 'student',
      },

      { id: 1, _id: 0 },
    )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};
// 2030 01 0001
export const GenerateId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString(); //0
  const lastStudentId = await LaststudentId();
  // console.log(lastStudentId, 'last student');
  // 2024 01 0001
  const lastSemesterCode = lastStudentId?.substring(4, 6); //01
  const lastSemesterYear = lastStudentId?.substring(0, 4); //2024

  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;
  if (
    lastStudentId &&
    lastSemesterCode == currentSemesterCode &&
    lastSemesterYear == currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6); //00001
  }
  let increment = (Number(currentId) + 1).toString().padStart(4, '0');
  increment = `${payload.year}${payload.code}${increment}`;
  // console.log(increment, 'what is this ? ');
  return increment;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString(); // '0'
  const lastFaculty = await userModel
    .findOne(
      {
        role: 'faculty',
      },
      {
        id: 1,
        _id: 0,
      },
    )
    .sort({
      createdAt: -1,
    })
    .lean();

  // f - 0001
  if (lastFaculty) {
    currentId = lastFaculty.id.substring(2); //0001 = 1\
  }

  const incrementedFacultyId = (Number(currentId) + 1)
    .toString()
    .padStart(4, '0');
  // console.log(`F-${incrementedFacultyId}`, 'this is faculty id');
  return `F-${incrementedFacultyId}`;
};
