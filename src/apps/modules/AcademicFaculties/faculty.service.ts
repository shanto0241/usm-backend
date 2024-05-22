import { AcademicFaculty } from './faculty.model';
import { IACFaculty, IACFacultyFilters } from './faculty.interface';
import { IPaginationOptions } from '../../../pagination/typePagination';
import { IGenericResponse } from '../../../interfaces/common';
import { facultySearchableFields } from './faculty.constant';
import { paginationSort } from '../../../pagination/paginationSort';
import { SortOrder } from 'mongoose';

// create service
const createACFaculty = async (payload: IACFaculty): Promise<IACFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// get all service
// const getAllFaculties = async (): Promise<IACFaculty[]> => {
//   const result = await AcademicFaculty.find();
//   return result;
// };

// Pagination:searching&filtering+getAllSemester
const getAllFaculties = async (
  filters: IACFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IACFaculty[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      // or
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to fullfill all the conditions
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

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get one service
const getAFaculty = async (id: string): Promise<IACFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// update one service
const updateFaculty = async (
  id: string,
  payload: Partial<IACFaculty>
): Promise<IACFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// delete one service
const deleteFaculty = async (id: string): Promise<IACFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const ACFacultyService = {
  createACFaculty,
  getAllFaculties,
  getAFaculty,
  updateFaculty,
  deleteFaculty,
};
