import express, { Router } from 'express'
import middelware from '../../middleWare/middleWare'
import { createInstitute, createStudentTable, createTeacherTable, createCorseTable } from '../../controller/institute/instituteController'
import asyncErrorHandle from '../../services/asyncErrorHandle'
import isLoggedIn from '../../middleWare/middleWare'

const router:Router =express.Router()

router.route("/").post(isLoggedIn,createInstitute,createTeacherTable,createStudentTable,asyncErrorHandle(createCorseTable))


export default router