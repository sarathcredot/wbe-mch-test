import { z } from "zod";

export const UserRegisterSchema = z.object({
    userName: z.string().nonempty("Name is required name").min(1, "Name is required"),
    email: z.email("Invalid email format").nonempty("Email is required"),
    
})


export const loginSchema = z.object({
    email: z.string().nonempty("Email or phone number is required"),
});



export const otpSchema = z.object({
    email: z.string().nonempty("Email is required"),
    otp: z.string().nonempty("OTP is required").length(6, "OTP must be exactly 6 characters long"),
});


