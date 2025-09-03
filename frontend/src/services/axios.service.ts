


import axios from "axios";
import { getSession, signOut } from "next-auth/react";
export const axiosAuth = axios.create();

axiosAuth.interceptors.request.use(
    async function (config) {
        const session: any = await getSession();
        console.log("axios session", session)
        if (session?.access_token) {
            config.headers["Authorization"] = `Bearer ${session?.access_token}`;
        }
        return config;
    },
    function (error) {
        if (error.response.status === 401) {

            signOut();

        }
        return Promise.reject(error);
    },
);

axiosAuth.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            signOut();
        }
        return Promise.reject(error);
    },
);

export default axiosAuth;
