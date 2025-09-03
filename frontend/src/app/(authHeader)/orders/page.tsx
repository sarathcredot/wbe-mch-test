

"use client"

import React from 'react'
import Button from '@/app/components/UI/Button'
import { useSession } from "next-auth/react";
import { useGetOrder } from "@/services/order.service"


function Page() {

    const session = useSession();

    console.log("new section ", session)

    const { data: orders, isError: ordererr, isLoading: orderloading } = useGetOrder()

    return (
        <div>
            <div className="w-full px-4 md:px-[50px] lg:px-[190px] pt-10 min-h-[700px] bg-white">
                {/* Heading */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-center md:text-left">
                    Your Orders
                </h1>

                {/* Orders Container */}
                <div className="w-full h-full flex flex-col items-center gap-5">

                    {
                        orderloading ?
                            <div className='w-[100%] h-[500px] flex justify-center items-center' >

                                <h1> Loading... </h1>

                            </div>

                            :
                            orders?.orders === null ?

                                <div className='w-[100%] h-[500px] flex justify-center items-center' >

                                    <h1> You don't have any orders </h1>

                                </div>

                                :


                                orders?.map((item: any, index: any) => (

                                    <div key={index} className="w-full mb-24 lg:mb-5 md:w-[800px] h-auto md:h-[220px] border border-black rounded-2xl flex flex-col md:flex-row">

                                        {/* Image */}
                                        <div className="w-full md:w-[20%] h-[200px] md:h-full p-5 flex justify-center items-center">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${item?.products[0]?.productId?.image}`}

                                                alt="product"
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>

                                        {/* Order Details */}
                                        <div className="w-full md:w-[80%] h-auto md:h-full pt-5 md:pt-10 px-5 md:pl-[100px] flex flex-col gap-2">
                                            <h1>Order ID : {item?.orderId} </h1>
                                            <h1>Order Status : {item?.orderStatus} </h1>
                                            <h1>Delivery Date : 12/10/25</h1>
                                            <h1>Order Total : {item?.totalAmount} </h1>

                                            <div className="">
                                                <Button classname="w-full md:w-[150px] h-[40px] rounded-2xl bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors duration-500 ease-in-out">
                                                    View More
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))

                    }





                </div>
            </div>
        </div>
    )
}

export default Page
