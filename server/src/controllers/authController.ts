

import { authService } from "../services/authServices"
import { Request, Response } from "express"
import { handleResponse } from "../utils/responseHandler"



export const authController = {


    register: async (req: Request, res: Response) => {

        try {

            console.log("auth")
            const result = await authService.register(req.body)

            handleResponse.handleSuccess(res, result, "otp sent successfully", 200)


        } catch (error: any) {

            console.log("error", error)
            handleResponse.handleError(res, "", error, 500)

        }
    },


    login: async (req: Request, res: Response) => {

        try {

            const result: any = await authService.login(req.body)
            handleResponse.handleSuccess(res, result, result.message, 200)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)
        }

    },



    verifyOtp: async (req: Request, res: Response) => {

        try {

            const result = await authService.verifyOtp(req.body)
            handleResponse.handleSuccess(res, result, "OTP verified successfully", 200)


        } catch (error: any) {

            console.log("errs", error)

            handleResponse.handleError(res, "", error, 500)

        }
    }


}