import mongoose from 'mongoose';
import config from '../../config';
import { academicSemesterModel } from '../academicSemester/academicSemester.schema';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { Tuser } from './user.interface';
import { userModel } from './user.model';
import { GenerateId } from './user.utils';
import AppError from '../../middlewares/appError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (studentData: Student, password: string) => {
  const user: Partial<Tuser> = {};
  /*
    Generate Student ID
   */
  const admissionSemester = await academicSemesterModel.findById(
    studentData.admissionSemester,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    user.id = await GenerateId(admissionSemester);
    // console.log(user.id, 'checking');
    user.password = password ? password : config.defaultPassword;
    user.role = 'student';

    const newUser = await userModel.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    studentData.id = user.id;
    studentData.user = newUser._id;
    const newStudent = await StudentModel.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};

export const userServices = {
  createStudentIntoDB,
};
