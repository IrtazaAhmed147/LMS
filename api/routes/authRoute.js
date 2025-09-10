import express from 'express'
import {  login, logout, register, verifyEmail,  } from '../controllers/authController.js'


const authRouter = express.Router()



authRouter.post('/signup', register)
authRouter.post('/login', login)
authRouter.get('/logout', logout)
authRouter.post('/verifyEmail', verifyEmail)


export {authRouter}