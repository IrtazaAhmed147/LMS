import express from 'express';
import multer from 'multer';
import { createLesson, deleteLesson, getAllLessons, getCourseLessons, getSpecificLesson, updateLesson } from '../controllers/lessonController.js';
import { verifyAdmin, verifyStudent, verifyTeacher } from '../middleware/verifyToken.js';

const lessonRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

lessonRouter.get('/', verifyAdmin,getAllLessons)
lessonRouter.get('/course/:id', verifyStudent,getCourseLessons)
lessonRouter.get('/single/:id', verifyStudent,getSpecificLesson)
lessonRouter.post('/add', upload.single('contentUrl'),verifyTeacher,createLesson)
lessonRouter.delete('/delete/:id', verifyTeacher,deleteLesson)
lessonRouter.put('/update/:id', verifyTeacher,updateLesson)




export { lessonRouter }