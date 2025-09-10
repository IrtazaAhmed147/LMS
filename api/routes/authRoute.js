import express from 'express'
import {  isUser, login, logout, register, verifyEmail,  } from '../controllers/authController.js'
import { verifyToken } from '../middleware/verifyToken.js'


const authRouter = express.Router()



authRouter.post('/signup', register)
authRouter.post('/login', login)
authRouter.get('/logout', logout)
authRouter.post('/verifyEmail', verifyEmail)
authRouter.post('/verifyUser',verifyToken, isUser)


export {authRouter}