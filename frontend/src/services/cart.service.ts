

import { axiosAuth } from "./axios.service"
const url = process.env.NEXT_PUBLIC_SERVER_URL
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";




export const getCartById = () => {
    return axiosAuth.get(`${url}/api/cart`)
}

export const addToCart = (proId: any) => {
    return axiosAuth.post(`${url}/api/cart`, { proId })
}

export const useGetCart = (enabled = true) => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: () => getCartById().then((res) => res?.data?.data),
        enabled: enabled,
    });
};


export const getCartTotalAmmount = () => {
    return axiosAuth.get(`${url}/api/cart/total-ammount`)
}

export const cartQtIncrement = (proId: any) => {
    return axiosAuth.patch(`${url}/api/cart/increment/${proId}`)
}

export const cartQtDecrement = (proId: any) => {
    return axiosAuth.patch(`${url}/api/cart/decrement/${proId}`)
}

export const cartRemoveItem = (proId: any) => {
    return axiosAuth.delete(`${url}/api/cart/${proId}`)
}



export const usegetCartTotalAmmount = (enabled = true) => {
    return useQuery({
        queryKey: ["cart-ammount"],
        queryFn: () => getCartTotalAmmount().then((res) => res?.data?.data),
        enabled: enabled,
    });
};




export const useAddToCart = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addToCart,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        },
    });
};



export const useIncrementCart = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cartQtIncrement,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        },
    });
};



export const useDecrement = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cartQtDecrement,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        },
    });
};


export const useRemoveItemCart = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cartRemoveItem,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        },
    });
};














