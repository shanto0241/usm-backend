import { Model, Types } from 'mongoose';
import { IACFaculty } from '../AcademicFaculties/faculty.interface';

// s1 Create an Interface [type declared]
export type IACDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IACFaculty;
};

// s3. Create a user Model
export type ACDepartmentModel = Model<IACDepartment, Record<string, unknown>>;

export type IACDepartmentFilters = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
