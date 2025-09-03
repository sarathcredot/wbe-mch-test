
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_SERVER_URL




export const register = (obj: any) => {
    return axios.post(`${url}/api/auth/register`, obj);
};

export const login = (obj: any) => {
    return axios.post(`${url}/api/auth/login`, obj);
};


export const verifyOtp = (obj: any) => {
    return axios.post(`${url}/api/auth/verifyOtp`, obj);
};





export const useRegister = () => {

    return useMutation({
        mutationFn: register,
        onSuccess: (res) => {

        },
    });
};


export const useLogin = () => {

    return useMutation({
        mutationFn: login,
        onSuccess: (res) => {

        },
    });
};


export const useVerifyOtp = () => {

    return useMutation({
        mutationFn: verifyOtp,
        onSuccess: (res) => {

        },
    });
};
