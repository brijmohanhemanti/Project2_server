import express, { Router } from 'express'
import asyncErrorHandle from '../../../services/asyncErrorHandle'
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from '../../../controller/institute/course/courseController'
// import upload from '../../../middleWare/multerUpload'
import isLoggedIn from '../../../middleWare/middleWare'

import { storage,cloudinary } from '../../../services/cloudinaryConfig'
import multer from 'multer'
const upload = multer({storage:storage})

const router:Router =express.Router()


router.route("/").post(isLoggedIn,upload.single("courseThumbnail"),asyncErrorHandle(createCourse)).get(isLoggedIn,asyncErrorHandle(getAllCourse))

router.route("/:id").get(asyncErrorHandle(getSingleCourse)).delete(isLoggedIn,asyncErrorHandle(deleteCourse))

export default router