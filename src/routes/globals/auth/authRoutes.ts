import express from 'express'
import AuthController from '../../../controller/globals/auth/authControllers'

const router =express.Router()

router.route("/register").post(AuthController.registerUser)
router.route("/login").post(AuthController.loginUser)



export default router