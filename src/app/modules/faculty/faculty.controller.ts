import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsynch';
import { FacultyServices } from './faculty.service';

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDb(id);
  sendResponse(res, {
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  console.log(req.user);
  const result = await FacultyServices.getAllFacultiesFromDb(req.query);
  sendResponse(res, {
    success: true,
    message: 'Faculties are retrieved succesfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDb(id, faculty);
  sendResponse(res, {
    success: true,
    message: 'Faculty is updated succesfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDb(id);

  sendResponse(res, {
    success: true,
    message: 'Faculty is deleted succesfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
