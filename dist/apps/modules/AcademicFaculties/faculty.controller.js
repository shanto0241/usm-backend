"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACFacultyController = void 0;
const faculty_service_1 = require("./faculty.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pgPicker_1 = __importDefault(require("../../../shared/pgPicker"));
const pagination_1 = require("../../../constant/pagination");
const faculty_constant_1 = require("./faculty.constant");
// createController
const createACFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ACFacultyData = __rest(req.body, []);
    const result = yield faculty_service_1.ACFacultyService.createACFaculty(ACFacultyData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: '✅AC Faculty data created successfully!',
        data: result,
    });
}));
// getAllController
/* const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await ACFacultyService.getAllFaculties();
  sendResponse<IACFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '✅All Faculty retrieved successfully!',
    data: result,
  });
}); */
// filtering & pagination & sort
const getAllFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pgPicker_1.default)(req.query, faculty_constant_1.facultyFilterableFields); //filtering
    const paginationOptions = (0, pgPicker_1.default)(req.query, pagination_1.paginationField);
    const result = yield faculty_service_1.ACFacultyService.getAllFaculties(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: '✅All Faculty retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
// get oneController using ID
const getOneFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faculty_service_1.ACFacultyService.getAFaculty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Get Individual Faculty  successfully!',
        data: result,
    });
}));
// updateController using ID
const updateFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = req.body;
    const id = req.params.id;
    const result = yield faculty_service_1.ACFacultyService.updateFaculty(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Individual Faculty Updated successfully!',
        data: result,
    });
}));
// deleteController
const deleteFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faculty_service_1.ACFacultyService.deleteFaculty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Deleted Individual Semester from database!',
        data: result,
    });
}));
exports.ACFacultyController = {
    createACFaculty,
    getAllFaculty,
    getOneFaculty,
    updateFaculty,
    deleteFaculty,
};
