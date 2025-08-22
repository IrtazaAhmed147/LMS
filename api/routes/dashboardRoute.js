import express from 'express'
import { getDashboardStat } from '../controllers/dashboardController.js'


const dashboardRouter = express.Router()



dashboardRouter.get('/stat', getDashboardStat)

export {dashboardRouter}