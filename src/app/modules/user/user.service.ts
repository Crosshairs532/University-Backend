import config from '../../config';
import { academicSemesterModel } from '../academicSemester/academicSemester.schema';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { Tuser } from './user.interface';
import { userModel } from './user.model';
import { GenerateId } from './user.utils';

const createStudentIntoDB = async (studentData: Student, password: string) => {
  const user: Partial<Tuser> = {};
  /*
    Generate Student ID
   */
  const admissionSemester = await academicSemesterModel.findById(
    studentData.admissionSemester,
  );

  user.id = GenerateId(admissionSemester);
  user.password = password ? password : config.defaultPassword;
  user.role = 'student';
  const newUser = await userModel.create(user);
  studentData.id = user.id;
  studentData.user = newUser._id;
  const newStudent = await StudentModel.create(studentData);
  return newStudent;
};

export const userServices = {
  createStudentIntoDB,
};
