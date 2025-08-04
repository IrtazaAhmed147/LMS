import express from 'express';

import multer from 'multer';
import { verifyTeacher } from '../middleware/verifyToken.js';
import { createCourse, deletecourse, getAllCourses, getSpecificCourse, getTeacherCourses, updatecourse } from '../controllers/courseController.js';

const courseRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

courseRouter.get('/', getAllCourses)
courseRouter.get('/teacher/:id', verifyTeacher,getTeacherCourses)
courseRouter.get('/:id', verifyTeacher,getSpecificCourse)
courseRouter.post('/add', verifyTeacher,upload.single('thumbnail'),createCourse)
courseRouter.delete('/delete/:id', verifyTeacher,deletecourse)
courseRouter.put('/update/:id', verifyTeacher,updatecourse)




export { courseRouter }