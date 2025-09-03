




"use client";

import React, { useState } from "react";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import Slider from "react-slick"; // add react-slick
import "slick-carousel/slick/slick.css"; // import slick styles
import "slick-carousel/slick/slick-theme.css";
import Button from "./UI/Button";
import { useGetProducts } from "@/services/product.service"
import Link from "next/link";
import { useAddToCart } from "@/services/cart.service"
import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setCartAmmount } from "@/store/slice/cartSlice"


function ProdListing() {
    const [data, setData] = useState([1, 2, 3, 4]);

    const dispatch = useDispatch<AppDispatch>();

    // slider settings (for mobile only)
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    // mutation

    const { mutateAsync: addtoCart } = useAddToCart()

    const { data: products, isError: error, isLoading: loading } = useGetProducts()


    const handleAddToCart = async (proId: any) => {

        try {


            const result = await addtoCart(proId)
            console.log(result?.data?.data?.totalAmount)
            dispatch(setCartAmmount(result?.data?.data?.totalAmount))
            toast.success("Cart Updated successfully!")


        } catch (error: any) {

            toast.error(error?.response?.data.message)

        }
    }



    return (
        <div>
            <div className="w-full h-screen">
                {/* Top Section */}
                <div className="w-full h-[200px] lg:h-[35%] bg-white pt-[20px]">
                    <h1 className="text-[20px] lg:text-[35px] lg:ml-[190px]">
                        Transforming Surfaces with Spray Mastery
                    </h1>

                    {/* Desktop Product Listing */}
                    <div className="hidden md:flex w-full h-[500px] absolute justify-center gap-5 pt-[50px]">
                        {products?.slice(0, 4).map((item: any, index: any) => (



                            <div
                                key={index}
                                className="relative w-[350px] bg-white h-[450px] border border-black rounded-2xl p-[10px]"

                            >
                                {/* Offer Tag */}
                                <div className="absolute top-[30px] -rotate-45 bg-yellow-500 text-black w-[80px] text-sm text-center font-bold shadow-md">
                                    20% OFF
                                </div>

                                <div className="absolute right-0 w-[50px] h-[100px] pt-2">
                                    <Heart className="text-white mb-2" />
                                    <Eye className="text-white" />
                                </div>

                                {/* Image Section */}
                                <Link key={index} href={`/product/${item?._id}`}>
                                    <div className="w-full h-[60%] rounded-2xl">
                                        <img

                                            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${item?.image}`}

                                            className="w-full h-full rounded-t-2xl object-cover"
                                        />
                                    </div>
                                </Link>

                                <div className="w-full h-[40%] pt-[10px]">
                                    <h1> Arabian Smell </h1>
                                    <h1 className="text-[20px]"> {item?.name}</h1>

                                    <div className="w-full flex pt-3 items-center gap-2">
                                        <h1> Size: </h1>
                                        <select
                                            className="w-full h-[40px] rounded-2xl border border-black"
                                            name="50ml"
                                            id=""
                                        >
                                            <option value="">100ml</option>
                                            <option value="">200ml</option>
                                            <option value="">300ml</option>
                                        </select>
                                    </div>

                                    <div className="w-full flex pt-[10px] justify-between">
                                        <div>
                                            <h1 className="font-bold"> {`${item?.salesPrice}.00AED`}  </h1>
                                            <h1 className="line-through">{`${item?.price}.00AED`} </h1>
                                        </div>

                                        <Button onClick={() => { handleAddToCart(item?._id) }} classname="w-[150px] h-[40px] rounded-2xl bg-black text-white ml-[20px] hover:bg-yellow-400 hover:text-black transition-colors duration-500 ease-in-out">
                                            Add to cart
                                            <ShoppingCart
                                                className="inline-block ml-2"
                                                size={18}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>

                    {/* Mobile Product Slider */}
                    <div className="md:hidden w-full pt-[20px]">
                        <Slider {...sliderSettings}>
                            {products?.map((item: any, index: any) => (



                                <div key={index} className="px-4">
                                    <div className="relative w-full bg-white h-[450px] border border-black rounded-2xl p-[10px]">
                                        {/* Offer Tag */}
                                        <div className="absolute top-[30px] -rotate-45 bg-yellow-500 text-black w-[80px] text-sm text-center font-bold shadow-md">
                                            20% OFF
                                        </div>

                                        <div className="absolute right-0 w-[50px] h-[100px] pt-2">
                                            <Heart className="text-white mb-2" />
                                            <Eye className="text-white" />
                                        </div>

                                        {/* Image Section */}
                                        <Link href={`/product/${item?._id}`} key={index} >
                                            <div className="w-full h-[60%] rounded-2xl">
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${item?.image}`}
                                                    className="w-full h-full rounded-t-2xl object-cover"
                                                />
                                            </div>
                                        </Link>

                                        <div className="w-full h-[40%] pt-[10px]">
                                            <h1> Arabian Smell </h1>
                                            <h1 className="text-[20px]"> {item?.name}</h1>

                                            <div className="w-full flex pt-3 items-center gap-2">
                                                <h1> Size: </h1>
                                                <select
                                                    className="w-full h-[40px] rounded-2xl border border-black"
                                                    name="50ml"
                                                    id=""
                                                >
                                                    <option value="">100ml</option>
                                                    <option value="">200ml</option>
                                                    <option value="">300ml</option>
                                                </select>
                                            </div>

                                            <div className="w-full flex pt-[10px] justify-between">
                                                <div>
                                                    <h1 className="font-bold">{`${item?.salesPrice}.00AED`}  </h1>
                                                    <h1 className="line-through"> {`${item?.price}.00AED`} </h1>
                                                </div>

                                                <Button onClick={() => { handleAddToCart(item?._id) }} classname="w-[150px] h-[40px] rounded-2xl bg-black text-white ml-[20px] hover:bg-yellow-400 hover:text-black transition-colors duration-500 ease-in-out">
                                                    Add to cart
                                                    <ShoppingCart
                                                        className="inline-block ml-2"
                                                        size={18}
                                                    />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </Slider>
                    </div>
                </div>

                {/* Bottom Section */}
                <div
                    className="w-full h-[65%] bg-blue-700 flex justify-center items-center"
                    style={{
                        backgroundImage: "url('/image1.jpeg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="w-[600px] h-[400px] text-white">
                        <div className="w-full h-[300px] flex justify-center pt-[150px]">
                            <div className="w-[400px] text-center">
                                <h1 className="text-center"> Sprays </h1>
                                <h1 className="text-[45px]">The Science and Art of Sprays</h1>
                            </div>
                        </div>

                        <div className="w-full">
                            <h1>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quaerat, aperiam laborum. Aliquid molestias nostrum libero
                                reprehenderit laboriosam, deleniti ex incidunt! Illo assumenda
                                beatae facere suscipit officiis veritatis magni, quibusdam
                                excepturi?
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProdListing;







