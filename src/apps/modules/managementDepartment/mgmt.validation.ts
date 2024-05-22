import { z } from 'zod';

const createManagementDeptZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateManagementDeptZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});
export const ManagementDeptValidation = {
  createManagementDeptZodSchema,
  updateManagementDeptZodSchema,
};
