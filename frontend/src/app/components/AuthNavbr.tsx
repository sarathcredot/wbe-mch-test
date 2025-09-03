
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";



export default function Navbar() {
    const [active, setActive] = useState("");
    const pathname = usePathname();
    const session = useSession();

    console.log("se", session)

    console.log("path", pathname)

    useEffect(() => {

        if (pathname === "/orders") {
            setActive("Orders")
        } else {

            setActive("Cart")
        }

    }, [])



    return (
        <div className="w-full bg-gray-800 text-white lg:px-[150px] sticky top-0 z-50">
            <div className="flex items-center justify-between px-6 lg:px-16 py-4">
                {/* Left Section: Logo + Menu */}
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <Link href={"/"} className="text-3xl font-bold text-yellow-500">
                        AS
                    </Link>

                    <div className="h-6 border-l border-white"></div>


                    {/* Menu (always visible, responsive spacing) */}
                    <div className="flex space-x-6 md:space-x-10 text-[16px]">
                        <Link
                            href={"/orders"}
                            className={
                                active === "Orders"
                                    ? "text-yellow-400 font-bold"
                                    : "hover:text-yellow-400"
                            }
                            onClick={() => setActive("Orders")}
                        >
                            Orders
                        </Link>
                        <Link
                            href={"/cart"}
                            className={
                                active === "Cart"
                                    ? "text-yellow-400 font-bold"
                                    : "hover:text-yellow-400"
                            }
                            onClick={() => setActive("Cart")}
                        >
                            Cart
                        </Link>
                    </div>
                </div>

                {/* Right Section: User */}
                <div className="flex items-center gap-3" >
                    <h1> {session.data?.user?.name} </h1>
                    <button className="bg-white text-black rounded-full p-2">

                        <User size={18} />
                    </button>
                </div>


            </div>
        </div>
    );
}
