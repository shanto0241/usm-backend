import httpStatus from 'http-status';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';
import { Request, Response } from 'express';
import pgPicker from '../../../../shared/pgPicker';
import { studentFilterableFields } from './student.constant';
import { paginationField } from '../../../../constant/pagination';

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  // pagination & filtering
  const filters = pgPicker(req.query, studentFilterableFields); //filtering
  const paginationOptions = pgPicker(req.query, paginationField);
  const result = await StudentService.getAllStudent(filters, paginationOptions);
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '✅All Student retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

// // get oneController using ID
const getAStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getAStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get A Student successfully!',
    data: result,
  });
});

// updateController using ID
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;
  const id = req.params.id;
  const result = await StudentService.updateStudent(id, updatedData);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Student Updated successfully!',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully!',
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getAStudent,
  updateStudent,
  deleteStudent,
};
