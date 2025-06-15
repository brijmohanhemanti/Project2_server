import express from 'express'
import instituteController from '../../controller/institute/instituteController'

const router =express.Router()

router.route("/register").post(instituteController.createInstitute)




export default router