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
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const GenerateId = async (payload: TAcademicSemester) => {
  const currentId = (await LaststudentId()) || (0).toString().padStart(4, '0');
  let increment = (Number(currentId) + 1).toString().padStart(4, '0');
  increment = `${payload.year}${payload.code}${increment}`;

  return increment;
};
