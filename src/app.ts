import express from 'express'
import authRouter from "./routes/globals/auth/authRoutes";
import instituteRoute from './routes/institute/instituteRoute'
import courseRoute from './routes/institute/course/courseRoute'
import studentsRoute from './routes/institute/students/studentsRoute'


const app= express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api",authRouter)
app.use("/api/institute",instituteRoute)
app.use("/api/institute/course",courseRoute)
app.use("/api/institute/students",studentsRoute)


export default app