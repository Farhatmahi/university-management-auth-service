import express from 'express';
import { UsersRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
export const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
