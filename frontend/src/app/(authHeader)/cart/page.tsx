

"use client"

import React from "react";
import { FaTrash } from "react-icons/fa";
import { useGetCart } from "@/services/cart.service"
import { useIncrementCart, useDecrement, useRemoveItemCart } from "@/services/cart.service"
import { useOrderProductInCart } from "@/services/order.service"
import toast from "react-hot-toast";

function Page() {


    const { data: carts, isError: cartErr, isLoading: cartoading } = useGetCart()

    // mutation

    const { mutateAsync: incrementCart } = useIncrementCart()
    const { mutateAsync: decrementCart } = useDecrement()
    const { mutateAsync: rmoveItem } = useRemoveItemCart()
    const { mutateAsync: orderProductInCart } = useOrderProductInCart()


    const handilInc = async (proId: any) => {

        try {

            const result = await incrementCart(proId)

        } catch (error: any) {

            toast.error(error?.response?.data.message)

        }
    }


    const handilDec = async (proId: any) => {

        try {

            const result = await decrementCart(proId)

        } catch (error: any) {

            toast.error(error?.response?.data.message)

        }
    }

    const handilRemove = async (proId: any) => {

        try {

            const result = await rmoveItem(proId)

        } catch (error: any) {

            toast.error(error?.response?.data.message)

        }
    }

    const handilOrder = async () => {

        try {

            const result = await orderProductInCart()
            toast.success("Products ordered successfully!")

        } catch (error: any) {

            toast.error(error?.response?.data.message)

        }
    }


    return (
        <div className="w-full mb-10 md:mb-0 px-4 md:px-[50px] lg:px-[190px] pt-10 min-h-[700px] bg-white">
            {/* Heading */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10">
                Your cart
            </h1>

            {/* Cart container */}

            {
                cartoading ?

                    <div className="w-[100%] h-[500px] flex justify-center items-center" >

                        <h1> Loading... </h1>

                    </div>

                    :

                    carts?.cartData === null || carts?.cartData?.products?.length <= 0 ?

                        <div className="w-[100%] h-[500px] flex justify-center items-center" >

                            <h1> your cart is emmpty </h1>

                        </div>

                        :

                        <div className="flex flex-col lg:flex-row gap-10 items-start">
                            {/* Left Side - Cart Items */}
                            <div className="w-full lg:w-2/3 pt-5">
                                {/* Table Header (hidden on mobile) */}
                                <div className="hidden md:grid grid-cols-6 gap-x-4 font-semibold text-sm mb-4 items-center">
                                    <span>PRODUCT IMAGE</span>
                                    <span className="col-span-2">PRODUCT NAME</span>
                                    <span className="text-center">PRICE</span>
                                    <span className="text-center">QUANTITY</span>
                                    <span className="text-right">TOTAL</span>
                                </div>

                                {/* Cart Item Row */}


                                {
                                    carts?.cartData?.products?.map((item: any, index: any) => (

                                        <div key={index} className="grid grid-cols-1 md:grid-cols-6 items-center border-t py-5 gap-y-4 md:gap-x-4">
                                            {/* Product Image */}
                                            <div className="flex justify-center md:block">
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${item?.productId?.image}`}
                                                    alt="product"
                                                    className="w-[100px] h-[100px] object-cover rounded"
                                                />
                                            </div>

                                            {/* Product Name */}
                                            <div className="col-span-2 text-center md:text-left">
                                                <p className="font-medium">{item?.productId?.name}</p>
                                                <p className="text-sm text-gray-500">Size: 50 ML</p>
                                            </div>

                                            {/* Price */}
                                            <div className="text-center hidden md:block"> {`${item?.productId?.salesPrice}.00 AED`} </div>

                                            {/* Quantity */}
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => { handilDec(item?.productId?._id) }} className="w-8 h-8 flex items-center  cursor-pointer justify-center border rounded-full">
                                                    -
                                                </button>
                                                <span>{item?.quantity}</span>
                                                <button onClick={() => { handilInc(item?.productId?._id) }} className="w-8 h-8 flex items-center cursor-pointer  justify-center border rounded-full">
                                                    +
                                                </button>
                                            </div>

                                            {/* Total */}
                                            <div className="text-center md:text-right font-semibold">
                                                <span className="block md:hidden text-gray-600 text-sm">

                                                    {`Price:${item?.totalPrice}.00 AED`}

                                                </span>

                                                {`${item?.totalPrice}.00 AED`} {" "}
                                                <FaTrash onClick={() => { handilRemove(item?.productId?._id) }} className="inline text-red-600  ml-3 md:ml-5 cursor-pointer" />
                                            </div>
                                        </div>
                                    ))

                                }





                            </div>

                            {/* Right Side - Order Summary */}
                            <div className="w-full lg:w-1/3 flex flex-col gap-5 items-stretch">
                                {/* Special Instructions */}
                                <div className="border rounded-lg p-4">
                                    <label className="font-semibold text-sm">
                                        Order special instructions
                                    </label>
                                    <textarea
                                        className="w-full border rounded-lg mt-2 p-2"
                                        placeholder="Order special instructions"
                                    />
                                </div>

                                {/* Subtotal Box */}
                                <div className="border rounded-lg p-6 text-center">
                                    <h2 className="text-xl md:text-2xl font-bold mb-2">Subtotal</h2>
                                    <p className="text-lg md:text-xl font-semibold">{`${carts?.cartData?.totalAmount}.00 AED`} </p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Taxes and shipping calculated at checkout
                                    </p>

                                    <button onClick={handilOrder} className="w-full md:w-[250px] h-[40px] rounded-2xl bg-black text-white mx-auto hover:bg-yellow-400 hover:text-black transition-colors duration-500 ease-in-out">
                                        Proceed to checkout
                                    </button>
                                </div>
                            </div>
                        </div>

            }


        </div>
    );
}

export default Page;
