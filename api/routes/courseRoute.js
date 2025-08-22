import express from 'express';

import multer from 'multer';
import { verifyStudent, verifyTeacher, verifyToken } from '../middleware/verifyToken.js';
import { createCourse, deletecourse, getAllCourses, getEnrolledCourses, getSpecificCourse, getTeacherCourses, updatecourse } from '../controllers/courseController.js';

const courseRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

courseRouter.get('/', getAllCourses)
courseRouter.get('/teacher/:id', verifyTeacher,getTeacherCourses)
courseRouter.get('/:id', verifyToken,getSpecificCourse)
courseRouter.post('/add', verifyTeacher,upload.single('thumbnail'),createCourse)
courseRouter.delete('/delete/:id', verifyTeacher,deletecourse)
courseRouter.put('/update/:id', verifyTeacher,updatecourse)
courseRouter.get('/enrolled/:id',verifyStudent,getEnrolledCourses)




export { courseRouter }