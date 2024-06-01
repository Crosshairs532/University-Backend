import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../middlewares/appError';
import httpStatus from 'http-status';
import { userModel } from '../user/user.model';
// import { Student } from './student.interface';

// const createStudentIntoDB = async (student: Student) => {
//   const result = await StudentModel.create(student);
//   return result;
// };

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'AcademicFaculty',
      },
    });
  return result;
};

const deleteSingleStudentDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete student');
    }
    const deletedUser = await userModel.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete User');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete Student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentDb,
};
