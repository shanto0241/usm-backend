import { Schema, model } from 'mongoose';
import { ISemester, SemesterModel } from './semester.interface';
import { SemesterMonths } from './semester.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// s2. Create a Schema (status)
const semesterSchema = new Schema<ISemester>(
  {
    title: { type: String, required: true, enum: ['Autumn', 'Summer', 'Fall'] },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: ['01', '02', '03'] },
    startMonth: { type: String, required: true, enum: SemesterMonths },
    endMonth: { type: String, required: true, enum: SemesterMonths },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Duplicate year issue
semesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      '🚫 Academic semester is already exist ‼️'
    );
  }
  next();
});

// s4. static
export const AcademicSemester = model<ISemester, SemesterModel>(
  'AcademicSemester',
  semesterSchema
);
