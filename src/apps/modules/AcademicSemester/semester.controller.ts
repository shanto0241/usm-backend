import { Request, Response } from 'express';
import { SemesterService } from './semester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ISemester } from './semester.interface';
import pgPicker from '../../../shared/pgPicker';
import { paginationField } from '../../../constant/pagination';
import { semesterFilterableFields } from './semester.constant';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await SemesterService.createSemester(academicSemesterData);
  sendResponse<ISemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '✅Academic Semester data created successfully!',
    data: result,
  });
});

// filtering & pagination & sort
const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pgPicker(req.query, semesterFilterableFields); //filtering
  const paginationOptions = pgPicker(req.query, paginationField);
  const result = await SemesterService.getAllSemester(
    filters,
    paginationOptions
  );

  sendResponse<ISemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '✅Semester retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

// Get Individual Semester using ID
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SemesterService.getSingleSemester(id);
  sendResponse<ISemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Individual Semester successfully!',
    data: result,
  });
});
// update Semester by ID
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;
  const id = req.params.id;
  const result = await SemesterService.updateSemester(id, updatedData);
  sendResponse<ISemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Individual Semester Updated successfully!',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SemesterService.deleteSemester(id);
  sendResponse<ISemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Individual Semester from database!',
    data: result,
  });
});
export const SemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
