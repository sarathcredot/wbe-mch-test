




"use client";

import React from "react";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import Button from "@/app/components/UI/Button";
import TopProducts from "@/app/components/TopProducts";
import { useGetProductsById } from "@/services/product.service"
import { useOrderProduct } from "@/services/order.service"
import toast from "react-hot-toast";

function ProductDetailPage({ params }: { params: any }) {

    const { productId }: any = React.use(params);

    const { mutateAsync: orderProduct } = useOrderProduct();



    const { data: productData, isLoading, isError } = useGetProductsById(productId, !!productId);


    const handleOrder = async () => {
        try {

            const result = await orderProduct(productId);

            toast.success("Product ordered successfully!")


        } catch (error: any) {

            toast.error(error?.response?.data.message)

        }

    }



    return (
        <div>
            <div className="w-full min-h-[600px] flex flex-col lg:flex-row">
                {/* Left Image Section */}
                <div className="w-full lg:w-[50%] h-[400px] lg:h-[600px] px-5 md:px-10 lg:px-[190px] pt-5 lg:pt-10 bg-black rounded-br-4xl flex justify-center items-center">
                    <div className="w-[300px] md:w-[400px] lg:w-[500px] h-[300px] md:h-[400px] lg:h-[500px]">
                        <img
                            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${productData?.image}`}
                            className="w-full h-full rounded-2xl object-cover"
                            alt="Product"
                        />
                    </div>
                </div>

                {/* Right Details Section */}
                <div className="w-full lg:w-[50%] pr-5 md:pr-10 lg:pr-[190px] pl-5 md:pl-[20px] pt-5 lg:pt-10">
                    <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-bold">
                        {
                            productData?.name
                        }
                    </h1>

                    <p className="text-sm md:text-base mt-3">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
                        adipisci, in optio earum eum libero facere sequi laudantium maxime
                        perspiciatis, a iure voluptatibus possimus, minima neque magnam
                        veniam laboriosam. Dolorem?
                    </p>

                    <h1 className="font-bold text-[18px] md:text-[20px] mt-6">
                        {`${productData?.salesPrice}.00AED`}
                    </h1>
                    <h1 className="line-through text-[16px] md:text-[20px]">{`${productData?.price}.00AED`} </h1>

                    {/* Size Dropdown */}
                    <div className="w-full md:w-[300px] flex pt-3 items-center gap-2">
                        <h1 className="whitespace-nowrap">Size:</h1>
                        <select className="w-full h-[40px] rounded-2xl border border-black">
                            <option value="">100ml</option>
                            <option value="">200ml</option>
                            <option value="">300ml</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                        <Button classname="w-full sm:w-[150px] h-[40px] rounded-2xl bg-black text-white mt-5 hover:bg-yellow-400 hover:text-black transition-colors duration-500 ease-in-out">
                            Add to Cart
                            <ShoppingCart className="inline-block ml-2" size={18} />
                        </Button>

                        <Button onClick={handleOrder} classname="w-full sm:w-[150px] h-[40px] rounded-2xl bg-black text-white mt-5 hover:bg-yellow-400 hover:text-black transition-colors duration-500 ease-in-out">
                            Buy it now
                            <ShoppingBag className="inline-block ml-2" size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            <TopProducts title="Recommended Products" />

        </div>
    );
}

export default ProductDetailPage;
