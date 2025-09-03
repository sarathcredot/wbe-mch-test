

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_SERVER_URL



export const getProducts = () => {
    return axios.get(`${url}/api/product`);
};



export const useGetProducts = (enabled = true) => {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => getProducts().then((res) => res?.data?.data),
        enabled: enabled,
    });
};



export const getProductsById = (id: string) => {
    return axios.get(`${url}/api/product/${id}`);
};



export const useGetProductsById = (id: string, enabled = true) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductsById(id).then((res) => res?.data?.data),
        enabled: enabled,
    });
};
