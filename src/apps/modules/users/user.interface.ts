/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../user/Student/student.interface';
import { IFaculty } from '../user/Faculty/faculty.interface';
import { IAdmin } from '../user/Admin/admin.interface';

// s1 Create an Interface [type declared]
export type IUser = {
  id: string;
  role: string;
  password: string;
  defaultPasswordChange: boolean;
  passwordChangedAt?: Date;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'defaultPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
