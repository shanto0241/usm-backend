"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterFilterableFields = exports.semesterSearchableFields = exports.semesterTitle_CodeMapper = exports.SemesterMonths = exports.SemesterCodes = exports.SemesterTitles = void 0;
exports.SemesterTitles = ['Autumn', 'Summer', 'Fall'];
exports.SemesterCodes = ['01', '02', '03'];
exports.SemesterMonths = [
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
exports.semesterTitle_CodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
    //Winter: '04',
};
exports.semesterSearchableFields = ['title', 'code', 'year'];
exports.semesterFilterableFields = ['searchTerm', 'title', 'code', 'year'];
