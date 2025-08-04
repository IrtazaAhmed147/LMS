import express from 'express';
import multer from 'multer';
import { createLesson, deleteLesson, getCourseLessons, updateLesson } from '../controllers/lessonController.js';

const lessonRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

// lessonRouter.get('/', getAllLessons)
lessonRouter.get('/course/:id', getCourseLessons)
lessonRouter.post('/add', upload.single('contentUrl'),createLesson)
lessonRouter.delete('/delete/:id', deleteLesson)
lessonRouter.put('/update/:id', updateLesson)




export { lessonRouter }