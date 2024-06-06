import { courseRoute } from './../modules/course/course.route';
import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { userRoute } from '../modules/user/user.route';
import { academicSemester } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    router: userRoute,
  },
  {
    path: '/student',
    router: StudentRoutes,
  },
  {
    path: '/academic-semester',
    router: academicSemester,
  },
  {
    path: '/academic-faculty',
    router: academicFacultyRoute,
  },
  {
    path: '/academic-department',
    router: academicDepartmentRoute,
  },
  {
    path: '/courses',
    router: courseRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
