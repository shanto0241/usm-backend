import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  semesterSearchableFields,
  semesterTitle_CodeMapper,
} from './semester.constant';
import { ISemester, ISemesterFilters } from './semester.interface';
import { AcademicSemester } from './semester.model';
import { IPaginationOptions } from '../../../pagination/typePagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationSort } from '../../../pagination/paginationSort';
import { SortOrder } from 'mongoose';

// s6. database logic.
const createSemester = async (payload: ISemester): Promise<ISemester> => {
  // fix duplicate-semester-title_Code
  if (semesterTitle_CodeMapper[payload.title] !== payload.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'invalid semester code! plz given valid code‼️'
    );
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

// Pagination
const getAllSemester = async (
  filters: ISemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISemester[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      // or
      $or: semesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  //filtering
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

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (id: string): Promise<ISemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<ISemester>
): Promise<ISemester | null> => {
  // Include validation on update[code]
  if (
    payload.title &&
    payload.code &&
    semesterTitle_CodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSemester = async (id: string): Promise<ISemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const SemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
