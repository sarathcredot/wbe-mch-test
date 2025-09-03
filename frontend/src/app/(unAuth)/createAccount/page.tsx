

"use client"

import Button from '@/app/components/UI/Button'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { useRegister } from "@/services/auth.service"
import toast from 'react-hot-toast';



function Page() {

    const [formData, setFormData] = useState({
        userName: "",
        email: ""
    });

    const navigation = useRouter();

    // mutation 

    const { mutateAsync: registerUser } = useRegister();



    const [errors, setErrors] = useState({
        userName: "",
        email: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user types
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        let valid = true;
        let newErrors = { userName: "", email: "" };

        if (!formData.userName.trim()) {
            newErrors.userName = "Username is required";
            valid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (validate()) {

            try {

                const result = await registerUser(formData)
                console.log("res", result)

                localStorage.setItem("email", formData.email);
              navigation.push("/otp")

            } catch (error: any) {

                console.log(error?.response?.data.message)
                toast.error(error?.response?.data.message)
            }


        }
    };

    return (
        <div className="w-full h-screen bg-black flex justify-center items-center">
            <div className="w-[500px] h-[500px] bg-gray-900 rounded-lg">
                <h1 className="text-3xl font-bold text-yellow-500 text-center pt-10">AS</h1>

                <div className="w-full p-[50px]">
                    <h1 className="text-white text-[25px]">Create Account</h1>
                    <h1 className="text-white">Enter your email and we'll send you a verification code</h1>

                    {/* Username Input */}
                    <input
                        onChange={handleChange}
                        name="userName"
                        type="text"
                        placeholder="UserName"
                        className={`mb-5 mt-5 w-full  p-2 h-[50px] border rounded-lg text-white bg-transparent ${errors.userName ? "border-red-500" : "border-white"
                            }`}
                    />
                    {errors.userName && <p className="text-red-500 text-sm mb-3">{errors.userName}</p>}

                    {/* Email Input */}
                    <input
                        onChange={handleChange}
                        name="email"
                        type="text"
                        placeholder="Email"
                        className={`mb-5 w-full p-2 h-[50px] border rounded-lg text-white bg-transparent ${errors.email ? "border-red-500" : "border-white"
                            }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mb-3">{errors.email}</p>}

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        classname="w-full lg:w-full mb-5 sm:w-[150px] h-[35px] sm:h-[40px] rounded-2xl text-black bg-yellow-400"
                    >
                        Continue
                    </Button>

                    {/* Link to Login */}
                    <Link href={"/login"} className="text-yellow-400 hover:underline">
                        Already have an account? Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Page;
