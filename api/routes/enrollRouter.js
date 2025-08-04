import express from 'express';
import { verifyStudent } from '../middleware/verifyToken.js';
import { enrollStudent } from '../controllers/enrollController.js';
const enrollRouter = express.Router();

enrollRouter.post('/:courseId', verifyStudent,enrollStudent)




export { enrollRouter }