import express from 'express'
import {  login, logout, register,  } from '../controllers/authController.js'


const authRouter = express.Router()



authRouter.post('/signup', register)
authRouter.post('/login', login)
authRouter.get('/logout', logout)

export {authRouter}