/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { catchAsync } from '../../utils/catchAsynch';
import { sendResponse } from '../../utils/sendResponse';
import mongoose from 'mongoose';
import { StudentModel } from './student.model';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, result);
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    success: true,
    message: 'single student fetched successfully',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteSingleStudentDb(studentId);
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;

  const updatedStudent = await StudentServices.updateStudentDb(
    studentId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'student updated successfully',
    data: updatedStudent,
  });
});
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateStudent,
};
