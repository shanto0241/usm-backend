import { ACDepartmentService } from './dept.service';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { IACDepartment } from './dept.interface';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pgPicker from '../../../shared/pgPicker';
import { paginationField } from '../../../constant/pagination';
import { departmentFilterableFields } from './dept.constant';

// createController
const createACDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...ACDepartmentData } = req.body;
  const result = await ACDepartmentService.createACDepartment(ACDepartmentData);
  sendResponse<IACDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '✅AC Department data created successfully!',
    data: result,
  });
});

// getAllController
// const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
//   const result = await ACDepartmentService.getAllDepartment
//   sendResponse<IACDepartment[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: '✅All Department retrieved successfully!',
//     data: result,
//   });
// });

// filtering & pagination & sort
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pgPicker(req.query, departmentFilterableFields); //filtering
  const paginationOptions = pgPicker(req.query, paginationField);
  const result = await ACDepartmentService.getAllDepartment(
    filters,
    paginationOptions
  );

  sendResponse<IACDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '✅All Department retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

// // get oneController using ID
const getOneDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ACDepartmentService.getADepartment(id);
  sendResponse<IACDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Individual Department successfully!',
    data: result,
  });
});

// // updateController using ID
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;
  const id = req.params.id;
  const result = await ACDepartmentService.updateDepartment(id, updatedData);
  sendResponse<IACDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Individual Department Updated successfully!',
    data: result,
  });
});

// // deleteController
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ACDepartmentService.deleteDepartment(id);
  sendResponse<IACDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Individual Dept from database!',
    data: result,
  });
});

export const ACDepartmentController = {
  createACDepartment,
  getAllDepartment,
  getOneDepartment,
  updateDepartment,
  deleteDepartment,
};
