



import React from 'react'
import Footer from '../components/Footer'
import AuthNavbr from '../components/AuthNavbr'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authOptions } from "../api/auth/[...nextauth]/options";




async function layout({ children }: { children: React.ReactNode }) {


    const session = await getServerSession(authOptions);
    console.log("se", session)
    if (!session) {
        const headersList: any = headers();
        const domain = headersList.get("x-forwarded-host") || "";
        const protocol = headersList.get("x-forwarded-proto") || "";
        // const pathname = headersList.get("x-invoke-path") || "";

        const pathname = headersList.get("next-url");
        let url = "/login";
        if (pathname) {
            url = url + "?" + encodeURIComponent(pathname);
        }
        redirect(url);

        return null;
    }




    return (
        <div>
            <AuthNavbr />
            <div className='' >

                {children}

            </div>
            <Footer />

        </div>
    )
}

export default layout