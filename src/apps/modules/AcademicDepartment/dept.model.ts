import { Schema, model } from 'mongoose';
import { ACDepartmentModel, IACDepartment } from './dept.interface';

// s2. Create a Schema (status)
const ACDepartmentSchema = new Schema<IACDepartment, ACDepartmentModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// s4. static
export const AcademicDepartment = model<IACDepartment, ACDepartmentModel>(
  'AcademicDepartment',
  ACDepartmentSchema
);
