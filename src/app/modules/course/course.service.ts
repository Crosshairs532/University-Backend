import { TCourse } from './course.interface';
import { courseModel } from './course.model';

const createCourseDb = async (payload: TCourse) => {
  const createdCourse = await courseModel.create(payload);
  return createdCourse;
};
const getSingleCourseDb = async (id: string) => {
  const result = await courseModel.findById(id);
  return result;
};
const getAllCourseDb = async () => {
  const result = await courseModel.find();
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

export const courseService = {
  createCourseDb,
  getSingleCourseDb,
  getAllCourseDb,
  deleteCourseDb,
};
