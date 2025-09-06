import express from 'express';
import multer from 'multer';
import { createLesson, deleteLesson, getAllLessons, getCourseLessons, getSpecificLesson, lessonComplete, updateLesson } from '../controllers/lessonController.js';
import { verifyAdmin, verifyStudent, verifyTeacher, verifyToken } from '../middleware/verifyToken.js';

const lessonRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

lessonRouter.get('/', verifyAdmin,getAllLessons)
lessonRouter.get('/course/:id', verifyToken,getCourseLessons)
lessonRouter.get('/single/:id', verifyToken,getSpecificLesson)
lessonRouter.post('/add', upload.array('files', 10),verifyTeacher,createLesson)
lessonRouter.post('/:courseId/:lessonId/complete', verifyStudent,lessonComplete)
lessonRouter.delete('/delete/:id', verifyTeacher,deleteLesson)
lessonRouter.put('/update/:id', verifyTeacher,updateLesson)




export { lessonRouter }