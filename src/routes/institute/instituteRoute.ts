import express from 'express'
import middelware from '../../middleWare/middleWare'
import { createInstitute, createStudentTable, createTeacherTable, createCorseTable } from '../../controller/institute/instituteController'

const router =express.Router()

router.route("/").post(middelware.isLoggedIn,createInstitute,createTeacherTable,createStudentTable,createCorseTable)




export default router