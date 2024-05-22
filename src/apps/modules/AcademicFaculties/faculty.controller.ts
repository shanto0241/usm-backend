import { ACFacultyService } from './faculty.service';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { IACFaculty } from './faculty.interface';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pgPicker from '../../../shared/pgPicker';
import { paginationField } from '../../../constant/pagination';
import { facultyFilterableFields } from './faculty.constant';

// createController
const createACFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...ACFacultyData } = req.body;
  const result = await ACFacultyService.createACFaculty(ACFacultyData);
  sendResponse<IACFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '✅AC Faculty data created successfully!',
    data: result,
  });
});

// getAllController
/* const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await ACFacultyService.getAllFaculties();
  sendResponse<IACFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '✅All Faculty retrieved successfully!',
    data: result,
  });
}); */

// filtering & pagination & sort
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pgPicker(req.query, facultyFilterableFields); //filtering
  const paginationOptions = pgPicker(req.query, paginationField);
  const result = await ACFacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse<IACFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '✅All Faculty retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

// get oneController using ID
const getOneFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ACFacultyService.getAFaculty(id);
  sendResponse<IACFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Individual Faculty  successfully!',
    data: result,
  });
});

// updateController using ID
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;
  const id = req.params.id;
  const result = await ACFacultyService.updateFaculty(id, updatedData);
  sendResponse<IACFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Individual Faculty Updated successfully!',
    data: result,
  });
});

// deleteController
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ACFacultyService.deleteFaculty(id);
  sendResponse<IACFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Individual Semester from database!',
    data: result,
  });
});

export const ACFacultyController = {
  createACFaculty,
  getAllFaculty,
  getOneFaculty,
  updateFaculty,
  deleteFaculty,
};
