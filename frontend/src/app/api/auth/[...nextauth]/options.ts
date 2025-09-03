import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyOtp } from "@/services/auth.service"
import { pages } from "next/dist/build/templates/app-page";
import { jwtDecode } from "jwt-decode"



export const authOptions: NextAuthOptions = {


    providers: [
        CredentialsProvider({

            name: "Custom",
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@gmail.com" },
                otp: { label: "OTP", type: "text" }
            },
            async authorize(credentials, req): Promise<any> {

                try {

                    if (!credentials?.email || !credentials.otp) {
                        throw new Error("Email and  are required");
                    }
                    const res: any = await verifyOtp({ email: credentials.email, otp: credentials.otp });

                    console.log("next res", res?.data)

                    if (res) {

                        const data: { access_token: string, decoded_token: any } = {
                            access_token: res?.data?.data?.token,
                            decoded_token: jwtDecode(res?.data?.data?.token),
                        }
                        return data;
                    }

                    return null


                } catch (error: any) {
                    console.log("error auth", error?.response?.data?.message)
                    throw new Error(error?.response?.data?.message)
                }
            }
        }),

    ],
    // callbacks: {
    //     jwt({ token, user }: any) {

    //         if (user) {

    //             token.access_token = user?.access_token
    //             token.decoded_token = user?.decoded_token
    //         }

    //         return token;
    //     },
    //     // redirect(params) {
    //     //     return params.url
    //     // },

    //     session({ session, token }: any) {
    //         return { ...session, token };
    //     },
    // },

    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.access_token = user.access_token;
                token.decoded_token = user.decoded_token;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user = {
                id: token.decoded_token?.userId,
                email: token.decoded_token?.email,
                name: token.decoded_token?.userName,
            };
            session.access_token = token.access_token;
            return session;
        }
    },


    session: {
        strategy: "jwt"
    }




}




