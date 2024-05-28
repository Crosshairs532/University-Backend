import config from '../../config';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { Tuser } from './user.interface';
import { userModel } from './user.model';

const createStudentIntoDB = async (studentData: Student, password: string) => {
  const user: Partial<Tuser> = {};
  user.id = '21301231';
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
