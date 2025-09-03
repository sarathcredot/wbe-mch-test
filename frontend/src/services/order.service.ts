


import { axiosAuth } from "./axios.service"
const url = process.env.NEXT_PUBLIC_SERVER_URL
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";




export const getOrderId = () => {
    return axiosAuth.get(`${url}/api/order`)
}

export const useGetOrder = (enabled = true) => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => getOrderId().then((res) => res?.data?.data),
        enabled: enabled,
    });
};


export const orderProduct = (proId: any) => {

    return axiosAuth.post(`${url}/api/order/`, { proId })

}


export const orderProductsInCart = () => {

    return axiosAuth.post(`${url}/api/order/create-from-cart`)

}



export const useOrderProduct = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: orderProduct,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] })
        },
    });
};



export const useOrderProductInCart = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: orderProductsInCart,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] })
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        },
    });
};










