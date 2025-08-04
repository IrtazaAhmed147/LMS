import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from './utils/connectDB.js'
import { userRouter } from './routes/userRoute.js'
import { authRouter } from './routes/authRoute.js'
import { courseRouter } from './routes/courseRoute.js'
import { lessonRouter } from './routes/lessonRoute.js'
// import mongoSanitize from "express-mongo-sanitize"

const app = express()

dotenv.config()


// mongodb connection
connectDB()


// middleware
app.use(express.json())
// app.use(mongoSanitize())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))



// routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/course', courseRouter)
app.use('/api/lesson', lessonRouter)




if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 6500;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// Export for Vercel
export default app;