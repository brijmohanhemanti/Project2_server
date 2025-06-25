import express, { Router } from 'express'
import middelware from '../../../middleWare/middleWare'
import asyncErrorHandle from '../../../services/asyncErrorHandle'
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from '../../../controller/institute/course/courseController'

const router:Router =express.Router()

router.route("/").post(middelware.isLoggedIn,asyncErrorHandle(createCourse)).get(middelware.isLoggedIn,asyncErrorHandle(getAllCourse))
router.route("/:id").get(asyncErrorHandle(getSingleCourse)).delete(middelware.isLoggedIn,asyncErrorHandle(deleteCourse))

export default router