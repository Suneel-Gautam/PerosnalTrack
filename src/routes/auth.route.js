import {
    registerUser,
    changeProfilePic,
    editProfile,
    forgetPassword,
    loginUser,
    logout,
    refreshAccessToken
} from "../controllers/auth.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/fileMulter.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logout)


router.route('/profilePic').patch(
    jwtVerify,
    upload.single('profilePic'),
    changeProfilePic
)

router.route('/editProfile').patch(
    jwtVerify,
    editProfile
)

router.route('/forgetPassword').patch(
    jwtVerify,
    forgetPassword
)
router.route('/refreshAccessToken').post(refreshAccessToken)



export default router