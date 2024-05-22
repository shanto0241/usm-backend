"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const semester_route_1 = require("../modules/AcademicSemester/semester.route");
const faculty_route_1 = require("../modules/AcademicFaculties/faculty.route");
const dept_route_1 = require("../modules/AcademicDepartment/dept.route");
const student_route_1 = require("../modules/user/Student/student.route");
const auth_route_1 = require("../middlewares/Auth/auth.route");
const faculty_route_2 = require("../modules/user/Faculty/faculty.route");
const admin_route_1 = require("../modules/user/Admin/admin.route");
const mgmt_route_1 = require("../modules/managementDepartment/mgmt.route");
const router = express_1.default.Router();
const ApplicationRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/students',
        route: student_route_1.StudentRoutes,
    },
    {
        path: '/semesters',
        route: semester_route_1.AcademicSemesterRoutes,
    },
    {
        path: '/aca-faculties',
        route: faculty_route_1.ACFacultyRoutes,
    },
    {
        path: '/departments',
        route: dept_route_1.ACDepartmentRoutes,
    },
    {
        path: '/faculties',
        route: faculty_route_2.FacultyRoutes,
    },
    {
        path: '/management-dept',
        route: mgmt_route_1.ManagementDepartmentRoutes,
    },
];
// Mapping
ApplicationRoutes.forEach(road => router.use(road.path, road.route));
// router.use('/users', UserRoutes);
// router.use('/semester',AcademicSemesterRoutes);
exports.default = router;
