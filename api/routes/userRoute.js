import express from 'express';
import { deleteUser, getAllUsers,  getSingleUser, updateUser } from '../controllers/userController.js';
import multer from 'multer';

const userRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

userRouter.get('/', getAllUsers)
userRouter.get('/:id', getSingleUser)
userRouter.delete('/:id', deleteUser)
userRouter.put('/:id', upload.single('profilePic'),updateUser)




export { userRouter }