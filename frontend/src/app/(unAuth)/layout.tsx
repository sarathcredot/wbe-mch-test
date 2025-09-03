



import React from 'react'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authOptions } from "../api/auth/[...nextauth]/options";



async function layout({ children }: { children: React.ReactNode }) {


    // const session = await getServerSession(authOptions);
    // const pathname = (await headers()).get("next-url"); // current route

    // console.log("path name", pathname)

    // if (!session && pathname !== "/login") {
    //     redirect("/login");
    // }

    // if (session && pathname === "/login") {
    //     redirect("/");
    // }


    return (
        <div>

            <div className='' >

                {children}

            </div>

        </div>
    )
}

export default layout