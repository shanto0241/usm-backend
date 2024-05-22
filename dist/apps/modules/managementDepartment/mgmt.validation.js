"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDeptValidation = void 0;
const zod_1 = require("zod");
const createManagementDeptZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
const updateManagementDeptZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
exports.ManagementDeptValidation = {
    createManagementDeptZodSchema,
    updateManagementDeptZodSchema,
};
