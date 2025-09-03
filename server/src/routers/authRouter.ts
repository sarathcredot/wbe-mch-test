


import express from "express";
const router = express.Router();
import { authController } from "../controllers/authController"
import { validation } from "../utils/validation"
import { loginSchema, otpSchema, UserRegisterSchema } from "../schema.ts/auth"



router.post("/register",
    validation(UserRegisterSchema),
    authController.register
)


router.post("/login",
    validation(loginSchema),
    authController.login
)



router.post("/verifyOtp",
    validation(otpSchema),
    authController.verifyOtp
)


export default router;