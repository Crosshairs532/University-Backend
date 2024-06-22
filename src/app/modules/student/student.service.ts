/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errrors/appError';
import httpStatus from 'http-status';
import { userModel } from '../user/user.model';
import { Student } from './student.interface';
import QueryBuilder from '../../QueryBuilder/QueryBuilder';
import { searchFields } from './student.constant';
// import { object } from 'zod';
// import { Student } from './student.interface';

// const createStudentIntoDB = async (student: Student) => {
//   const result = await StudentModel.create(student);
//   return result;
// };
/*
 * searchQuery
 * filterQuery
 * sortedQuery
 * paginationQuery
 * limitedQuery
 * fieldQuery
 */

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // let searchTerm = '';
  // const queryObj = { ...query };
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // //filtering
  // const excluding = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excluding.forEach((val) => delete queryObj[val]);

  /* partial finding . email diye specific find korbe then partial find using excluding vals*/
  // const searchQuery = await StudentModel.find({
  //   $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // next query ta hobe first e searchTerm diye houar por.
  /*   email diye specific finding. ekhane joto query term ashb e shjob delete hobe shudhu email thakbe   */
  // const filterQuery = searchQuery.find(queryObj);

  /*  SORT */

  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortedQuery = filterQuery.sort(sort);

  /* limit */

  // let limit = 1;
  // let skip = 0;
  // let page = 1;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginationQuery = sortedQuery.skip(skip);
  // const limitedQuery = await paginationQuery.limit(limit);

  /*============  limiting fields  ===========*/

  //   let fields = '-__v'; // excluding the __v part. '-' part indicated that i am not taking this  when i am about to show fields.
  //   if (query.fields) {
  //     fields = (query.fields as string).split(',').join(' ');
  //   }
  //   const fieldQuery = limitedQuery.select(fields);

  //   return fieldQuery;
  // };

  /* ======================= from class ========================*/
  const studentQuery = new QueryBuilder(
    StudentModel.find().populate('admissionSemester'),
    query,
  )
    .search(searchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  const meta = studentQuery.countTotal();
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
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete student');
    }
    const deletedUser = await userModel.findByIdAndUpdate(
      deletedStudent?.user,
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

const updateStudentDb = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remainingData } = payload;
  const modifieData: Record<string, unknown> = { remainingData };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifieData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifieData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifieData[`name.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate({ id }, modifieData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentDb,
  updateStudentDb,
};
