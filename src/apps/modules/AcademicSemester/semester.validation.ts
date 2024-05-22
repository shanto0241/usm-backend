import { z } from 'zod';
import {
  SemesterCodes,
  SemesterMonths,
  SemesterTitles,
} from './semester.constant';

const semesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...SemesterTitles] as [string, ...string[]], {
      required_error: 'title is mandatory',
    }),
    year: z.string({
      required_error: 'year is required',
    }),

    code: z.enum([...SemesterCodes] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...SemesterMonths] as [string, ...string[]], {
      required_error: 'start month is required',
    }),
    endMonth: z.enum([...SemesterMonths] as [string, ...string[]], {
      required_error: 'end month is required',
    }),
  }),
});

///  Ensure 1: Route Level : Update -->  Give me title and code both , neither

const updateAcSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...SemesterTitles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required ',
        })
        .optional(),
      code: z.enum([...SemesterCodes] as [string, ...string[]]).optional(),
      startMonth: z
        .enum([...SemesterMonths] as [string, ...string[]], {
          required_error: 'Start month is needed',
        })
        .optional(),
      endMonth: z
        .enum([...SemesterMonths] as [string, ...string[]], {
          required_error: 'End month is needed',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );

export const SemesterValidation = {
  semesterZodSchema,
  updateAcSemesterZodSchema,
};
//request-validation
//body>obj
//data>obj{}
