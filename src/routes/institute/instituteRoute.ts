import express from 'express'
import instituteController from '../../controller/institute/instituteController'
import middelware from '../../middleWare/middleWare'

const router =express.Router()

router.route("/").post(middelware.isLoggedIn,instituteController.createInstitute)




export default router