"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFaculty = void 0;
const mongoose_1 = require("mongoose");
// s2. Create a Schema (status)
const ACFacultySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// s4. static
exports.AcademicFaculty = (0, mongoose_1.model)('AcademicFaculty', ACFacultySchema);
