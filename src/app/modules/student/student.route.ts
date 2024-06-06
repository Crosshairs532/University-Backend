import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.delete('/:id', StudentControllers.deleteSingleStudent);
router.patch('/:id', StudentControllers.updateStudent);
export const StudentRoutes = router;
