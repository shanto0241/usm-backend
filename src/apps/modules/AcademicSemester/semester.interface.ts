import { Model } from 'mongoose';

export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type ISemesterTitles = 'Autumn' | 'Summer' | 'Fall';
export type ISemesterCodes = '01' | '02' | '03';
export type ISemesterMonths = Month;

// s1 Create an Interface [type declared]
export type ISemester = {
  title: 'Autumn' | 'Summer' | 'Fall'; //s
  year: string;
  code: '01' | '02' | '03'; //string;
  startMonth: Month;
  endMonth: Month;
};
// s3. Create a user Model
export type SemesterModel = Model<ISemester>;

export type ISemesterFilters = {
  searchTerm?: string;
};
