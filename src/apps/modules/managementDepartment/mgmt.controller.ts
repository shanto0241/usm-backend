import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IManagementDepartment } from './mgmt.interface';
import catchAsync from '../../../shared/catchAsync';
import { ManagementDeptService } from './mgmt.service';
import pgPicker from '../../../shared/pgPicker';
import { paginationField } from '../../../constant/pagination';
import { managementDeptFilterableFields } from './management.constant';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;
  const result = await ManagementDeptService.createDepartment(departmentData);
  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department created successfully',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pgPicker(req.query, managementDeptFilterableFields);
  const paginationOptions = pgPicker(req.query, paginationField);

  const result = await ManagementDeptService.getAllDepartment(
    filters,
    paginationOptions
  );
  sendResponse<IManagementDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getADepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementDeptService.getADepartment(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department retrieved successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await ManagementDeptService.updateDepartment(
      id,
      updatedData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department updated successfully',
      data: result,
    });
  })
);

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementDeptService.deleteDepartment(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department deleted successfully',
    data: result,
  });
});

export const ManagementDeptController = {
  createDepartment,
  getAllDepartment,
  getADepartment,
  updateDepartment,
  deleteDepartment,
};
