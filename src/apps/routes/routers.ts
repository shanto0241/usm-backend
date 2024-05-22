import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { AcademicSemesterRoutes } from '../modules/AcademicSemester/semester.route';
import { ACFacultyRoutes } from '../modules/AcademicFaculties/faculty.route';
import { ACDepartmentRoutes } from '../modules/AcademicDepartment/dept.route';
import { StudentRoutes } from '../modules/user/Student/student.route';
import { AuthRoutes } from '../middlewares/Auth/auth.route';
import { FacultyRoutes } from '../modules/user/Faculty/faculty.route';
import { AdminRoutes } from '../modules/user/Admin/admin.route';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/mgmt.route';

const router = express.Router();

const ApplicationRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/aca-faculties',
    route: ACFacultyRoutes,
  },
  {
    path: '/departments',
    route: ACDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/management-dept',
    route: ManagementDepartmentRoutes,
  },
];

// Mapping
ApplicationRoutes.forEach(road => router.use(road.path, road.route));

// router.use('/users', UserRoutes);
// router.use('/semester',AcademicSemesterRoutes);

export default router;
