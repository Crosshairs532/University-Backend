/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TCourse, TCourseFaculty } from './course.interface';
import { courseFacultyModel, courseModel } from './course.model';
import QueryBuilder from '../../QueryBuilder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import mongoose from 'mongoose';
import AppError from '../../errrors/appError';
import httpStatus from 'http-status';

const createCourseDb = async (payload: TCourse) => {
  const createdCourse = await courseModel.create(payload);
  // console.log(createdCourse);
  return createdCourse;
};
const getSingleCourseDb = async (id: string) => {
  const result = await courseModel
    .findById(id)
    .populate('preRequisiteCourses.course');
  return result;
};
const getAllCourseDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    courseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const deleteCourseDb = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return result;
};

const updateCourseDb = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remaining } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // step: 1 :  basic update.
    const updateBasicCourseInfo = await courseModel.findByIdAndUpdate(
      id,
      remaining,
      { new: true, runValidators: true, session },
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To BAsic Update');
    }

    // check if there is anything to update  in preReq
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePre = preRequisiteCourses
        .filter((elem) => elem.course && elem.isDeleted === true)
        .map((el) => el.course);

      const deletePreCourses = await courseModel.findByIdAndUpdate(
        id,
        {
          $pull: { preRequisiteCourses: { course: { $in: deletePre } } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      ); // delete all the  courses that was found in deletePre

      if (!deletePreCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Delete');
      }

      const newPre = preRequisiteCourses?.filter(
        (elem) => elem.course && !elem.course,
      );

      // dynamically adding multiple  preRequisiteCourses.
      const newPreCourse = await courseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPre } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPreCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed TO update New Courses',
        );
      }
      const result = await courseModel
        .findById(id)
        .populate('preRequisiteCourses.course');

      return result;
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed To  update');
  }
};

const assignFacultiesDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await courseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const removeFacultiesDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await courseFacultyModel.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};
export const courseService = {
  createCourseDb,
  getSingleCourseDb,
  getAllCourseDb,
  deleteCourseDb,
  updateCourseDb,
  assignFacultiesDb,
  removeFacultiesDb,
};
