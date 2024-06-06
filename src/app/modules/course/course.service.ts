/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TCourse } from './course.interface';
import { courseModel } from './course.model';
import QueryBuilder from '../../QueryBuilder/QueryBuilder';
import { courseSearchableFields } from './course.constant';

const createCourseDb = async (payload: TCourse) => {
  const createdCourse = await courseModel.create(payload);
  console.log(createdCourse);
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

  // check if there is anything to update  in preReq
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletePre = preRequisiteCourses
      .filter((elem) => elem.course && elem.isDeleted === true)
      .map((el) => el.course);

    const deletePreCourses = await courseModel.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletePre } } },
    }); // delete all the  courses that was found in deletePre

    const newPre = preRequisiteCourses?.filter(
      (elem) => elem.course && !elem.course,
    );
    const newPreCourse = await courseModel.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPre } },
    });
  }

  const result = await courseModel
    .findById(id)
    .populate('preRequisiteCourses.course');
  return result;
};

export const courseService = {
  createCourseDb,
  getSingleCourseDb,
  getAllCourseDb,
  deleteCourseDb,
  updateCourseDb,
};
