
import ReactQueryProvider from "./reactQuery";
import { Toaster } from "react-hot-toast"; // Add this import
import NextAuthSessionWrapper from "./NextAuthSessionWrapper";
import ReduxProvider from "./reduxProvider"



export default function RootProvider({ children, session }) {
    return (

        <NextAuthSessionWrapper session={session}>

            <ReduxProvider>


                <ReactQueryProvider>

                    {children}
                    <Toaster />
                </ReactQueryProvider>

            </ReduxProvider>


        </NextAuthSessionWrapper>

    );
}


