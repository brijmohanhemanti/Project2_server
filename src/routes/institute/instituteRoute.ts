import express, { Router } from 'express'
import middelware from '../../middleWare/middleWare'
import { createInstitute, createStudentTable, createTeacherTable, createCorseTable } from '../../controller/institute/instituteController'
import asyncErrorHandle from '../../services/asyncErrorHandle'

const router:Router =express.Router()

router.route("/").post(middelware.isLoggedIn,createInstitute,createTeacherTable,createStudentTable,asyncErrorHandle(createCorseTable))


export default router