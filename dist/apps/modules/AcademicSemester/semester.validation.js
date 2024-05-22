"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterValidation = void 0;
const zod_1 = require("zod");
const semester_constant_1 = require("./semester.constant");
const semesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...semester_constant_1.SemesterTitles], {
            required_error: 'title is mandatory',
        }),
        year: zod_1.z.string({
            required_error: 'year is required',
        }),
        code: zod_1.z.enum([...semester_constant_1.SemesterCodes], {
            required_error: 'code is required',
        }),
        startMonth: zod_1.z.enum([...semester_constant_1.SemesterMonths], {
            required_error: 'start month is required',
        }),
        endMonth: zod_1.z.enum([...semester_constant_1.SemesterMonths], {
            required_error: 'end month is required',
        }),
    }),
});
///  Ensure 1: Route Level : Update -->  Give me title and code both , neither
const updateAcSemesterZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...semester_constant_1.SemesterTitles], {
            required_error: 'Title is required',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'Year is required ',
        })
            .optional(),
        code: zod_1.z.enum([...semester_constant_1.SemesterCodes]).optional(),
        startMonth: zod_1.z
            .enum([...semester_constant_1.SemesterMonths], {
            required_error: 'Start month is needed',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...semester_constant_1.SemesterMonths], {
            required_error: 'End month is needed',
        })
            .optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either both title and code should be provided or neither',
});
exports.SemesterValidation = {
    semesterZodSchema,
    updateAcSemesterZodSchema,
};
//request-validation
//body>obj
//data>obj{}
