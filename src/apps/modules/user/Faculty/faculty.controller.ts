import { Request, Response } from 'express';
import catchAsync from '../../../../shared/catchAsync';
import { IFaculty } from './faculty.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../../shared/sendResponse';
import { FacultyService } from './faculty.service';
import { facultyFilterableFields } from '../../AcademicFaculties/faculty.constant';
import { paginationField } from '../../../../constant/pagination';
import pgPicker from '../../../../shared/pgPicker';

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully !',
    data: result,
  });
});

//get all - controller
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pgPicker(req.query, facultyFilterableFields);
  const paginationOptions = pgPicker(req.query, paginationField);
  const result = await FacultyService.getAllFaculty(filters, paginationOptions);
  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '✅All Faculty retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultyService.updateFaculty(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully !',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FacultyService.deleteFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully !',
    data: result,
  });
});

export const FacultyController = {
  getSingleFaculty,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
};
