import { Schema, model } from 'mongoose';
import { ACFacultyModel, IACFaculty } from './faculty.interface';

// s2. Create a Schema (status)
const ACFacultySchema = new Schema<IACFaculty, ACFacultyModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
export const AcademicFaculty = model<IACFaculty, ACFacultyModel>(
  'AcademicFaculty',
  ACFacultySchema
);
