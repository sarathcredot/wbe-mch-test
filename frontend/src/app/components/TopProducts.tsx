



"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import Button from "./UI/Button";
import { useGetProducts } from "@/services/product.service"
import { useAddToCart } from "@/services/cart.service"
import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setCartAmmount } from "@/store/slice/cartSlice"

import {
  Eye,
  Heart,
  ShoppingBag,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const categories = ["Fragrance", "Makeup", "Skincare"];


// 👉 Custom Next Arrow
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-[-40px] md:right-[-50px] top-1/2 -translate-y-1/2 cursor-pointer z-10
                 bg-black text-white p-2 md:p-3 rounded-full shadow-md hover:bg-yellow-400 hover:text-black transition"
      onClick={onClick}
    >
      <ChevronRight size={20} />
    </div>
  );
}

// 👉 Custom Prev Arrow
function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute left-[-40px] md:left-[-50px] top-1/2 -translate-y-1/2 cursor-pointer z-10
                 bg-black text-white p-2 md:p-3 rounded-full shadow-md hover:bg-yellow-400 hover:text-black transition"
      onClick={onClick}
    >
      <ChevronLeft size={20} />
    </div>
  );
}

function TopProducts({ title }: { title: string }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const dispatch = useDispatch<AppDispatch>();


  const { data: products, isError: error, isLoading: loading } = useGetProducts()

  const { mutateAsync: addtoCart } = useAddToCart()






  //   dots: false,
  //   infinite: true,
  //   speed: 600,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   arrows: true,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   responsive: [
  //     {
  //       breakpoint: 1280,
  //       settings: { slidesToShow: 3 },
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: { slidesToShow: 2 },
  //     },
  //     {
  //       breakpoint: 768, // tablets & smaller
  //       settings: { slidesToShow: 1, arrows: false, dots: true },
  //     },
  //   ],
  // };


  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 600,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   arrows: true,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   responsive: [
  //     {
  //       breakpoint: 1280,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         arrows: true,
  //         centerMode: true,
  //         centerPadding: '20px',
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         arrows: false,
  //         dots: true,
  //         centerMode: false,
  //       },
  //     },
  //   ],
  // };


  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4, // default desktop
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280, // <1280px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // <1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // <768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: false,
        },
      },
    ],
  };


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
      <div className="w-full min-h-[800px] px-4 sm:px-8 md:px-12 lg:px-[190px] relative">
        {/* Header */}
        <div className="w-full min-h-[150px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
          <h1 className="text-black text-[22px] sm:text-[26px] md:text-[30px] font-bold">
            {title}
          </h1>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-5">
            {categories.map((cat, idx) => (
              <Button
                key={cat}
                classname={`px-4 sm:w-[150px] h-[45px] rounded-2xl transition-colors duration-500 ease-in-out
                  ${activeIdx === idx
                    ? "bg-white text-black border-2 border-yellow-400"
                    : "bg-black text-white hover:bg-yellow-400 hover:text-black"
                  }`}
                onClick={() => setActiveIdx(idx)}
              >
                {cat}
                <ShoppingBag className="inline-block ml-2" size={16} />
              </Button>
            ))}
          </div>
        </div>

        {/* Product Slider */}
        <Slider {...settings} className="mt-6">
          {
            products?.map((item: any, index: any) => (



              <div key={index} className="px-2">
                {/* <div className="relative w-full max-w-[350px] bg-white h-[450px] border border-black rounded-2xl p-[10px] mx-auto"> */}
                <div className="relative w-full sm:max-w-[350px] bg-white h-[450px] border border-black rounded-2xl p-[10px] mx-auto">

                  {/* Offer Tag */}
                  <div className="absolute top-[20px] -rotate-45 bg-yellow-500 text-black w-[70px] sm:w-[80px] text-xs sm:text-sm text-center font-bold shadow-md">
                    20% OFF
                  </div>

                  {/* Icons */}
                  <div className="absolute right-2 top-4 flex flex-col gap-2">
                    <Heart className="text-black cursor-pointer hover:text-red-500" />
                    <Eye className="text-black cursor-pointer hover:text-yellow-500" />
                  </div>

                  {/* Image Section */}
                  <Link key={index} href={`/product/${item?._id}`}  >
                    <div className="w-full h-[55%] sm:h-[60%] rounded-2xl">
                      <img
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${item?.image}`}
                        className="w-full h-full rounded-t-2xl object-cover"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="w-full h-[45%] sm:h-[40%] pt-[10px]">
                    <h1 className="text-sm sm:text-base">Arabian Smell</h1>
                    <h1 className="text-[16px] sm:text-[20px] font-medium">
                      {item?.name}
                    </h1>

                    {/* Size Selector */}
                    <div className="w-full flex pt-3 items-center gap-2">
                      <h1 className="whitespace-nowrap text-sm">Size:</h1>
                      <select
                        className="w-full h-[35px] sm:h-[40px] rounded-2xl border border-black text-sm"
                        name="50ml"
                        id=""
                      >
                        <option value="">100ml</option>
                        <option value="">200ml</option>
                        <option value="">300ml</option>
                      </select>
                    </div>

                    {/* Price + Button */}
                    <div className="w-full flex pt-[10px] justify-between items-center gap-2">
                      <div>
                        <h1 className="font-bold text-sm sm:text-base">
                          {`${item?.salesPrice}.00AED`}
                        </h1>
                        <h1 className="line-through text-xs sm:text-sm">
                          {`${item?.price}.00AED`}
                        </h1>
                      </div>

                      <Button onClick={() => { handleAddToCart(item?._id) }} classname="w-full sm:w-[150px] h-[35px] sm:h-[40px] rounded-2xl bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors duration-500 ease-in-out">
                        Add to cart
                        <ShoppingCart className="inline-block ml-2" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>



            ))
          }



        </Slider>
      </div>
    </div>
  );
}

export default TopProducts;












