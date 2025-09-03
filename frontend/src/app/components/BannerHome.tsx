
"use client";
import React from 'react'
import Button from './UI/Button';
import { ShoppingBag } from "lucide-react";


function BannerHome() {
    return (
        <div>

            <div
                className="w-full h-[650px] sm:h-[500px] lg:px-[100px] md:h-[600px] lg:h-[650px] flex items-center"
                style={{
                    backgroundImage: "url('/homeBanner.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Content Wrapper */}
                <div className="w-full md:w-1/2 h-full flex items-center px-6 sm:px-10 md:px-16 lg:px-24">
                    <div className="text-white max-w-xl">
                        {/* Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold">
                            <span className="block">The World of</span>
                            <span className="block">Arabian Smell</span>
                            <span className="block">Perfumes</span>
                        </h1>

                        {/* Description */}
                        <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta deserunt magni rem fuga
                            accusantium est eum ipsam consectetur quae neque repellat nisi aliquid ad deleniti laborum
                            esse, eius, fugiat modi? eum ipsam consectetur quae neque repellat nisi aliquid ad deleniti
                            laborum esse, eius, fugiat modi?
                        </p>

                        {/* Button */}
                        <Button classname="w-[200px] sm:w-[200px] md:w-[230px] h-[45px] md:h-[50px] rounded-2xl bg-black text-white mt-6 hover:bg-yellow-400 hover:text-black transition-colors duration-500 ease-in-out">
                            Check More Products
                            <ShoppingBag className="inline-block ml-2" size={18} />
                        </Button>
                    </div>
                </div>
            </div>





        </div>
    )
}

export default BannerHome