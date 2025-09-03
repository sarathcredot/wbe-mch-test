

import { UserReqType, LoginDataType } from "../types"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../model/user"
import { Otp } from "../model/otp"
import { genarateOtp } from "../utils/otp"
import { sendEmail } from "../utils/email"




export const authService = {


    register: (data: UserReqType) => {

        return new Promise(async (resolve, reject) => {

            try {

                const existUser: any = await User.findOne({

                    email: data.email


                });



                if (existUser) {
                    throw new Error("User already exists with this email");
                }



                const saveData = {
                    ...data,
                };

                const finalUser = new User(saveData)
                const result = await finalUser.save()

                const otp = genarateOtp({ length: 6 })
                const expiresAt = new Date();
                expiresAt.setMinutes(expiresAt.getMinutes() + 10);

                const final = new Otp({ otp: otp, userId: result._id, expiresAt: expiresAt })
                await final.save()

                await sendEmail(result?.email, otp)
                resolve(result)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    login: (data: LoginDataType) => {

        return new Promise(async (resolve, reject) => {

            try {

                const userExit = await User.findOne({
                    email: data.email
                })


                if (!userExit) {

                    throw new Error("User not found with this email")

                }

                // set otp

                //  clear this user exist otp detail before generating new otp
                await Otp.deleteOne({ userId: userExit._id })

                const otp = genarateOtp({ length: 6 })
                const expiresAt = new Date();
                expiresAt.setMinutes(expiresAt.getMinutes() + 10);

                const final = new Otp({ otp: otp, userId: userExit._id, expiresAt: expiresAt })
                await final.save()

                await sendEmail(userExit?.email, otp)


                // sent otp in user mobile number

                resolve(

                    {
                        data: userExit,
                        message: "OTP sent to your email id"
                    }
                )
                return;





            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    verifyOtp: (data: { email: string, otp: string }) => {

        return new Promise(async (resolve, reject) => {


            try {

                const userExit = await User.findOne({
                    email: data.email
                })


                if (!userExit) {

                    throw new Error("User not found")

                }

                const checkOtpRequested = await Otp.findOne({ userId: userExit._id })
                if (!checkOtpRequested) {

                    throw new Error("No OTP request found")
                }

                if (new Date() > checkOtpRequested.expiresAt) {
                    throw new Error('OTP has expired');
                }

                if (checkOtpRequested.otp !== data.otp) {
                    throw new Error('Invalid OTP');
                }

                if (!process.env.JWT_SECRET) {
                    throw new Error("JWT_SECRET is not defined in environment variables");
                }

                await Otp.findByIdAndDelete({ _id: checkOtpRequested._id })

                const token = jwt.sign(
                    {
                        userId: userExit._id,
                        userName: userExit.userName,
                        email: userExit.email,

                    },
                    process.env.JWT_SECRET as string,
                    { expiresIn: '7d' }
                )

                resolve({

                    userData: userExit,
                    token: token
                })
            } catch (error: any) {

                reject(error.message)
            }


        })


    }

}

