import { courseRoute } from './../modules/course/course.route';
import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { userRoute } from '../modules/user/user.route';
import { academicSemester } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { semesterRegisterRoute } from '../modules/semesterRegistration/semesterRegistration.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { authRoutes } from '../modules/auth/auth.route';
import { EnrolledCourseRoutes } from '../modules/enrolledCourses/enrolledCourse.route';

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
  {
    path: '/semester-register',
    router: semesterRegisterRoute,
  },
  {
    path: '/auth',
    router: authRoutes,
  },
  {
    path: '/enrolled-courses',
    router: EnrolledCourseRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
