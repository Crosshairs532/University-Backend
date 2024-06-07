import httpStatus from 'http-status';
import AppError from '../../errrors/appError';
// import { academicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { semesterRegistrationModel } from './semesterRegistration.model';
import QueryBuilder from '../../QueryBuilder/QueryBuilder';
import { academicSemesterModel } from '../academicSemester/academicSemester.schema';

const createSemesterRegistrationDb = async (payload: TSemesterRegistration) => {
  const academicSemester = payload.academicSemester;

  // check if there is any upcoming a ongoing semester going on. then we wont let create another semester.
  const isThereAnySemesterOngoingOrUpcoming =
    await semesterRegistrationModel.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });
  if (isThereAnySemesterOngoingOrUpcoming) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnySemesterOngoingOrUpcoming.status} registered semester!`,
    );
  }
  // check if the semester is Exist
  const isacademicSemesterExist =
    await academicSemesterModel.findById(academicSemester);
  if (!isacademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester Not found');
  }
  //  check if the semester is already  registered
  const isSemesterRegistration = await semesterRegistrationModel.findOne({
    academicSemester,
  });

  if (isSemesterRegistration) {
    throw new AppError(httpStatus.CONFLICT, 'This Semester Already registered');
  }

  const result = await semesterRegistrationModel.create(payload);
  return result;
};
const getAllSemesterRegistrationDb = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    semesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationDb = async (id: string) => {
  const result = await semesterRegistrationModel.findById(id);
  return result;
};

const updateSemesterRegistrationDb = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check if any semester has ended or not. if Yes then we will not update.
  const checkEndedSemester = await semesterRegistrationModel.findById(id);
  if (checkEndedSemester?.status === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester has already ${checkEndedSemester.status}`,
    );
  }
};
export const semesterRegistrationService = {
  createSemesterRegistrationDb,
  getAllSemesterRegistrationDb,
  getSingleSemesterRegistrationDb,
  updateSemesterRegistrationDb,
};
