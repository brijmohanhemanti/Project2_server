import express from 'express'
import authRouter from "./routes/globals/auth/authRoutes";
import instituteRoute from './routes/institute/instituteRoute'

const app= express()

app.use(express.json())

app.use("/api",authRouter)
app.use("/api/institute",instituteRoute)


export default app