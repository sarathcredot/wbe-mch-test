



"use client"

import Button from '@/app/components/UI/Button'
import Link from 'next/link'
import React, { useState } from 'react'
import { useLogin } from "@/services/auth.service"
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from "next/navigation";


function Page() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const navigation = useRouter();


    const { mutateAsync: loginUser } = useLogin();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        setError("") // clear error when user types
    }

    const handleSubmit = async () => {
        if (!email.trim()) {
            setError("Email is required")
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError("Enter a valid email address")
            return
        }

        try {

            const result = await loginUser({ email })
            localStorage.setItem("email", email);

            navigation.push("/otp")

        } catch (error: any) {

            toast.error(error?.response?.data.message)

        }



    }

    return (
        <div className="w-full h-screen bg-black flex justify-center items-center">
            <div className="w-[500px] h-[400px] bg-gray-900 rounded-lg">
                <h1 className="text-3xl font-bold text-yellow-500 text-center pt-10">AS</h1>

                <div className="w-full p-[50px]">
                    <h1 className="text-white text-[25px]">Login</h1>
                    <h1 className="text-white">
                        Enter your email and we'll send you a verification code
                    </h1>

                    {/* Email input */}
                    <input
                        onChange={handleChange}
                        value={email}
                        type="text"
                        placeholder="Email"
                        className={`mb-2 mt-5 w-full p-2 h-[50px] border rounded-lg text-white bg-transparent ${error ? "border-red-500" : "border-white"
                            }`}
                    />
                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                    {/* Continue button */}
                    <Button
                        onClick={handleSubmit}
                        classname="w-full lg:w-full sm:w-[150px] mb-5 h-[35px] sm:h-[40px] rounded-2xl text-black bg-yellow-400"
                    >
                        Continue
                    </Button>

                    {/* Link to Signup */}
                    <Link
                        href={"/createAccount"}
                        className="text-yellow-400 hover:underline"
                    >
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Page
