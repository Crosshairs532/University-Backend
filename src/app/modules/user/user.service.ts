import mongoose from 'mongoose';
import config from '../../config';
import { academicSemesterModel } from '../academicSemester/academicSemester.schema';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { Tuser } from './user.interface';
import { userModel } from './user.model';
import { GenerateId, generateFacultyId } from './user.utils';
import AppError from '../../errrors/appError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { academicDepartmentModel } from '../academicDepartment/academicDepartment.model';

const createStudentIntoDB = async (studentData: Student, password: string) => {
  const user: Partial<Tuser> = {};
  /*
    Generate Student ID
   */
  const admissionSemester = await academicSemesterModel.findById(
    studentData.admissionSemester,
  );

  // console.log(admissionSemester, 'Admission Semester');

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    user.id = await GenerateId(admissionSemester);
    // console.log(user.id, 'checking');
    user.password = password ? password : config.defaultPassword;
    user.role = 'student';

    const newUser = await userModel.create([user], { session });
    // console.log(newUser, 'new USer');
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // console.log({ newUser });
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    // console.log({ studentData });
    const newStudent = await StudentModel.create([studentData], { session });
    // console.log(newStudent, 'new Student');
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyDb = async (facultyData: TFaculty, password: string) => {
  let user: Tuser = {};
  // check if the given academic department id exists in the academic Department DB

  const academicDepartment = await academicDepartmentModel.findById(
    facultyData.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department Does not Exists!!',
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    user.role = 'faculty';
    user.id = await generateFacultyId();
    user.password = password ? password : (config.defaultPassword as string);
    const userFacutly = await userModel.create([user], { session });
    if (!userFacutly) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    console.log(userFacutly);
    facultyData.user = userFacutly[0]._id;
    facultyData.id = userFacutly[0].id;

    console.log(facultyData);

    const faculty = await Faculty.create([facultyData], { session });
    if (!faculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty!');
    }
    await session.commitTransaction();
    await session.endSession();
    return faculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyDb,
};
