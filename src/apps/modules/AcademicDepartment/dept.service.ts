import { AcademicDepartment } from './dept.model';
import { IACDepartment, IACDepartmentFilters } from './dept.interface';
import { IPaginationOptions } from '../../../pagination/typePagination';
import { IGenericResponse } from '../../../interfaces/common';
import { departmentSearchableFields } from './dept.constant';
import { paginationSort } from '../../../pagination/paginationSort';
import { SortOrder } from 'mongoose';

// create service
const createACDepartment = async (
  payload: IACDepartment
): Promise<IACDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

// get all service
// const getAllDepartment = async (): Promise<IACDepartment[]> => {
//   const result = await AcademicDepartment.find();
//   return result;
// };

// Pagination:searching&filtering+getAllSemester
const getAllDepartment = async (
  filters: IACDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IACDepartment[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      // or
      $or: departmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to fullfil all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      //and q
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationSort.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// // get one service
const getADepartment = async (id: string): Promise<IACDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

// // update one service
const updateDepartment = async (
  id: string,
  payload: Partial<IACDepartment>
): Promise<IACDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};

// // delete one service
const deleteDepartment = async (id: string): Promise<IACDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const ACDepartmentService = {
  createACDepartment,
  getAllDepartment,
  getADepartment,
  updateDepartment,
  deleteDepartment,
};
