import { Model } from 'mongoose';

// export type ISemesterTitles = 'Autumn' | 'Summer' | 'Fall';

// s1 Create an Interface [type declared]
export type IACFaculty = {
  title: string; //s
};

// s3. Create a user Model
export type ACFacultyModel = Model<IACFaculty, Record<string, unknown>>;

export type IACFacultyFilters = {
  searchTerm?: string;
};
