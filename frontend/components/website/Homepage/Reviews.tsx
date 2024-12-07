"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { Icon } from "@iconify/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./swiper.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {};

function Reviews({}: Props) {
  const swiperRef = useRef<any>();
  return (
    <div className="w-full py-[3rem] flex flex-col gap-20 justify-center items-center relative">
      <div className="w-11/12  mx-auto justify-between items-center flex">
        <div
          onClick={() => {
            if (swiperRef.current) {
              swiperRef.current.slidePrev();
            }
          }}
          className="w-[2rem]  md:w-[2.5rem] h-[2rem] md:h-[2.5rem] hover:scale-105 duration-300 cursor-pointer overflow-hidden  text-secondary-700 hover:text-secondary-400"
        >
          <Icon
            icon="mynaui:fat-arrow-left"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <h1 className="text-3xl title md:text-6xl relative tracking-wide title font-bold text-secondary-500">
          TOP-RATED REVIEWS
        </h1>
        <div
          onClick={() => {
            if (swiperRef.current) {
              swiperRef.current.slideNext();
            }
          }}
          className="w-[2rem]  md:w-[2.5rem] h-[2rem] md:h-[2.5rem] hover:scale-105 duration-300 cursor-pointer overflow-hidden  text-secondary-700 hover:text-secondary-400"
        >
          <Icon
            icon="mynaui:fat-arrow-right"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      {/* CARDS  */}
      <div className="w-11/12 md:w-11/12 mx-auto h-[50vh] flex  justify-center relative items-center">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={true}
          breakpoints={{
            924: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1256: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1576: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          speed={500}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {ReviewsData.map((itemn, index) => (
            <SwiperSlide key={index}>
              <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex flex-col gap-3 h-[40vh] p-3">
                <div className="flex justify-between">
                  <span className="flex text-primary-600">
                    <Icon
                      icon="mdi:comma"
                      className="w-[2rem] h-[2rem] object-cover object-center rotate-[180deg]"
                    />
                    <Icon
                      icon="mdi:comma"
                      className="w-[2rem] h-[2rem] object-cover object-center rotate-[180deg]"
                    />
                  </span>

                  {/* PROFILE  */}
                  <div className="w-[3.5rem]  h-[3.5rem] bg-zinc-700 overflow-hidden">
                    <Image
                      width={500}
                      height={500}
                      alt="client-img"
                      className="w-full h-full object-cover object-top"
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    ></Image>
                  </div>
                </div>
                {/* review  */}
                <p className="text-secondary-400">{itemn.review}</p>

                <div className="w-full flex flex-col">
                  {/* name  */}
                  <span className="title italic  tracking-wide">
                    {itemn.name}
                  </span>
                  <div className="w-full flex  items-center justify-between">
                    <span className="text-[14px] font-medium text-secondary-400">
                      Web Designer
                    </span>
                    <span className="flex justify-center items-center  text-primary-600">
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Reviews;

const ReviewsData = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Avid Hiker",
    img: "/path/to/alice.jpg",
    review:
      "Trivision has been my go-to platform for planning hiking trips. The detailed trail descriptions and user reviews helped me find the perfect trails for both solo hikes and group adventures.",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Beginner Hiker",
    img: "/path/to/bob.jpg",
    review:
      "As someone new to hiking, Trivision has been invaluable. The easy-to-use interface and comprehensive trail database allowed me to discover scenic routes near my area.",
  },
  {
    id: 3,
    name: "Charlie Davis",
    role: "Trek Leader",
    img: "/path/to/charlie.jpg",
    review:
      "I recently used Trivision to plan a trekking expedition with friends to a remote location. The platform's extensive trail information and downloadable maps were essential for our journey.",
  },
  {
    id: 4,
    name: "Dana Lee",
    role: "Outdoor Enthusiast",
    img: "/path/to/dana.jpg",
    review:
      "Trivision made it easy to find family-friendly hiking trails for our weekend trips. The user reviews and ratings helped us choose the best trails for our kids.",
  },
];
