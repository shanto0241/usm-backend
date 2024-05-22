import {
  ISemesterCodes,
  ISemesterMonths,
  ISemesterTitles,
} from './semester.interface';

export const SemesterTitles: ISemesterTitles[] = ['Autumn', 'Summer', 'Fall'];

export const SemesterCodes: ISemesterCodes[] = ['01', '02', '03'];

export const SemesterMonths: ISemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Semester title_Code declare
export const semesterTitle_CodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
  //Winter: '04',
};

export const semesterSearchableFields = ['title', 'code', 'year'];

export const semesterFilterableFields = ['searchTerm', 'title', 'code', 'year'];
