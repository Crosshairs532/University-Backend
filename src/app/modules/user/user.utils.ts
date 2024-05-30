import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { userModel } from './user.model';

const LaststudentId = async () => {
  const lastStudent = await userModel
    .findOne({
      role: 'Student',
    })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};
// 2030 01 0001
export const GenerateId = async (payload: TAcademicSemester) => {
  const currentId = (0).toString(); //0
  const lastStudentId = await LaststudentId();
  const lastSemesterCode = lastStudentId?.substring(4, 6); //01
  const lastSemesterYear = lastStudentId?.substring(0, 4); //2030

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

  return increment;
};
