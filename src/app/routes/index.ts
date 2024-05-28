import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { userRoute } from '../modules/user/user.route';
import { academicSemester } from '../modules/academicSemester/academicSemester.route';

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
