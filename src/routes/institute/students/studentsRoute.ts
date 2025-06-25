import express, { Router } from 'express'
import asyncErrorHandle from '../../../services/asyncErrorHandle'
import getAllStudents from '../../../controller/institute/students/studentsController'


const router:Router =express.Router()

router.route("/").get(asyncErrorHandle(getAllStudents))

export default router