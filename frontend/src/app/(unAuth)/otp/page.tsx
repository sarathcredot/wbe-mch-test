


"use client"

import Button from '@/app/components/UI/Button'
import React, { useState } from 'react'
import { signIn } from "next-auth/react"
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";


function Page() {
    const [code, setCode] = useState("")
    const [error, setError] = useState("")

    const router = useRouter();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // Only allow numbers
        if (/^\d*$/.test(value)) {
            setCode(value)
            setError("")
        }
    }

    const handleSubmit = async () => {
        if (!code.trim()) {
            setError("Verification code is required")
            return
        }
        if (code.length < 6) {
            setError("Code must be at least 6 digits")
            return
        }

        try {

            const email = localStorage.getItem("email");

            const obj = {

                email,
                otp: code
            }

            const res: any = await signIn("credentials", { ...obj, redirect: false, });
            console.log(res, "LOGIN RESPONSE");
            if (res?.ok) {
                router.push("/"); // 👈 move to home
            } else {
                console.log("Login failed", res?.error);
                 toast.error(res?.error)
            }

        } catch (error: any) {

            console.log("error", error)
            toast.error(error?.response?.data.message)

        }

    }

    return (
        <div className="w-full h-screen bg-black flex justify-center items-center">
            <div className="w-[500px] h-[400px] bg-gray-900 rounded-lg">
                <h1 className="text-3xl font-bold text-yellow-500 text-center pt-10">AS</h1>

                <div className="w-full p-[50px]">
                    <h1 className="text-white text-[25px]">Verification</h1>
                    <h1 className="text-white">Enter your verification code</h1>

                    <input
                        type="text"
                        value={code}
                        onChange={handleChange}
                        placeholder="Verification code"
                        className={`mb-2 mt-5 w-full p-2 h-[50px] border rounded-lg text-white bg-transparent ${error ? "border-red-500" : "border-white"
                            }`}
                    />
                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                    <Button
                        onClick={handleSubmit}
                        classname="w-full lg:w-full sm:w-[150px] h-[35px] sm:h-[40px] rounded-2xl text-black bg-yellow-400"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page
