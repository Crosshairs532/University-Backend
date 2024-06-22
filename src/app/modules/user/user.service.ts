/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { academicSemesterModel } from '../academicSemester/academicSemester.schema';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { Tuser } from './user.interface';
import { userModel } from './user.model';
import { GenerateId, generateAdminId, generateFacultyId } from './user.utils';
import AppError from '../../errrors/appError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { academicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { AdminModel } from '../admin/admin.model';
import { TAdmin } from '../admin/admin.interface';
// import { authUtils } from '../auth/auth.utils';
// import { JwtPayload } from 'jsonwebtoken';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createStudentIntoDB = async (
  file: any,
  studentData: Student,
  password: string,
) => {
  const user: Partial<Tuser> = {};
  /*
    Generate Student ID
   */
  const admissionSemester = await academicSemesterModel.findById(
    studentData.admissionSemester,
  );
  console.log(admissionSemester, 'Admission Semester');
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    user.id = await GenerateId(admissionSemester);
    // console.log(user.id, 'checking');
    user.password = password ? password : config.defaultPassword;
    user.role = 'student';
    user.email = studentData.email;
    // send image to Cloudinary
    const imageName = `${studentData?.name?.firstName}`;
    const path = file?.path;
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    console.log({ path, secure_url });

    const newUser = await userModel.create([user], { session });
    // console.log(newUser, 'new USer');
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // console.log({ newUser });
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;
    studentData.profileImg = secure_url;

    // console.log({ studentData });
    const newStudent = await StudentModel.create([studentData], { session });
    console.log(newStudent, 'new Student');
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
    user.email = facultyData.email;
    const userFacutly = await userModel.create([user], { session });
    if (!userFacutly) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    // console.log(userFacutly);
    facultyData.user = userFacutly[0]._id;
    facultyData.id = userFacutly[0].id;

    // console.log(facultyData);

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

const createAdminDb = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<Tuser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string);

  //set student role
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();
    // console.log({ userData });

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session });
    // console.log({ newUser });
    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    // console.log({ payload });
    // create a admin (transaction-2)
    const newAdmin = await AdminModel.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMeDb = async (userId: string, role: string) => {
  // const decoded = authUtils.verifyToken(token, config.jwt_secret as string);

  // const { userId, role } = decoded as JwtPayload;

  let result = null;
  if (role === 'student') {
    result = await StudentModel.findOne({ id: userId });
  }
  if (role === 'admin') {
    result = await AdminModel.findOne({ id: userId });
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId });
  }

  return result;
};
const changeStatusDb = async (id: string, payload: { status: string }) => {
  const result = await userModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
export const userServices = {
  createStudentIntoDB,
  createFacultyDb,
  createAdminDb,
  getMeDb,
  changeStatusDb,
};
