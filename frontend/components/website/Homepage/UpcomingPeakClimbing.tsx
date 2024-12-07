"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Countour from "@/public/contour-bg.png";
import { Icon } from "@iconify/react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import axios from "axios";
import SplitType from "split-type";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
type Props = {};

export default function UpcomingTrekking({}: Props) {
  const [expeditions, setExpeditions] = useState<any>([]);

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const res = await axios.get(
          "https://contour-backend.webxnep.com/api/expeditions",
          {
            params: {
             
          isPublished:true
             
            },
          }
        );
        setExpeditions(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpeditions();
  }, []);
  // console.log(expeditions);

  const textSplitTrekRef = useRef<any>();
  useGSAP(() => {
    // ANIMATION CODE
    const textSplitTrek = new SplitType(textSplitTrekRef.current);
    // const tl = gsap.timeline({
    // });
    // Perform the animations
    gsap.from(textSplitTrek.chars, {
      opacity: 0,
      duration: 1.5,
      stagger: 0.05,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".home-trekking-title",
        // markers: true,
        start: "top 90%",
        end: "50% 50%",
        scrub: 2,
      },
    });

    gsap.from(".home-trekking-desc", {
      opacity: 0,
      duration: 1.5,
      y: "100px",
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".home-trekking-desc",
        // markers: true,
        start: "top 90%",
        end: "50% 50%",
        scrub: 2,
      },
    });

    gsap.from(".home-trekking-container", {
      opacity: 0,
      duration: 1.5,
      y: "50px",
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".home-trekking-container",
        // markers: true,
        start: "top 90%",
        end: "50% 50%",
        scrub: 2,
      },
    });
  });
  return (
    <div className="w-full bg-[#1E1E1E] py-[5rem]   relative">
      <div>
        <Image
          className="absolute top-0 w-full h-full opacity-5 object-cover object-center left-0"
          src={Countour}
          alt=""
        ></Image>
      </div>
      <div className="w-full flex justify-center items-center flex-col gap-10">
        {/* title top  */}
        <div className="flex flex-col w-full justify-center items-center gap-2">
          {/* title  */}
          <div className="w-auto flex-col flex gap-2 justify-center items-center">
            <h1
              ref={textSplitTrekRef}
              className="text-3xl home-trekking-title inline-block title uppercase text-zinc-50 text-secondary-500 text-center  font-bold"
            >
              Upcoming Trekking
            </h1>
            <hr className="bg-yellow-400  h-[4px] overflow-hidden w-[50%]" />
          </div>
          <p className="text-zinc-300 home-trekking-desc text-center leading-relaxed  w-[50%]">
            Don’t miss out on the opportunity to experience the world like never
            before. Contact us today to book your next unforgettable journey
            with Contour Expedition.
          </p>
        </div>
        {/* cards  */}
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper !w-11/12 min-h-[90vh] mx-auto home-trekking-container"
        >
          {expeditions.map((item: any, index: any) => (
            <SwiperSlide key={index} className="">
              <Link href={`/trip/${item?.slug}`}>
                <div className="w-full cursor-pointer group   hover:scale-95 duration-300 overflow-hidden  relative rounded-md">
                  <div className="rounded-b-xl w-full relative h-[28rem] overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-[10rem] z-10 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>
                    <Image
                      width={1000}
                      height={1000}
                      src={item.banner}
                      alt="expedition-img"
                      className="w-full h-full group-hover:scale-110 duration-300 group-hover:brightness-[0.4] brightness-[0.8] object-cover object-center "
                    ></Image>
                  </div>
                  <div className="absolute bg-yellow-500  p-2 px-3 rounded-bl-md top-0 right-0">
                    <span className="text-[13px] font-bold text-zinc-800">
                      USD 200k
                    </span>
                  </div>
                  <div className="absolute z-10 w-full text-zinc-50 flex flex-col px-5 pb-10 items-start  bottom-0  mx-auto left-[50%] translate-x-[-50%]">
                    {/* <span className=" group-hover:opacity-[1] w-full text-center opacity-0 duration-200  text-zinc-100">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Eveniet, sequi?
                  </span> */}
                    <div className="w-full">
                      <span className="font-semibold text-lg text-zinc-50">
                        Everest Base Camp
                      </span>
                    </div>
                    <div className="w-full pb-2 flex gap-1 items-center text-[13px]">
                      <div className="flex">
                        <Icon
                          icon="material-symbols:star"
                          className="text-yellow-400"
                        />
                        <Icon
                          icon="material-symbols:star"
                          className="text-yellow-400"
                        />

                        <Icon
                          icon="material-symbols:star"
                          className="text-yellow-400"
                        />

                        <Icon
                          icon="material-symbols:star"
                          className="text-yellow-400"
                        />

                        <Icon
                          icon="material-symbols:star"
                          className="text-yellow-400"
                        />
                      </div>{" "}
                      <span className="text-zinc-300 text-[12px]">
                        100 Reviews
                      </span>
                    </div>
                    <div className="w-full justify-between pt-1 items-center' text-sm flex">
                      <div className="flex gap-1 items-center">
                        <Icon icon="carbon:skill-level-advanced"></Icon>{" "}
                        <span className="text-zinc-200">Difficulty</span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Icon icon="lucide:calendar-days"></Icon>{" "}
                        <span className="text-zinc-200">8 days</span>
                      </div>
                    </div>
                    <div className="w-full justify-between pt-1 items-center' text-sm flex">
                      <div className="flex gap-1 items-center">
                        <Icon icon="mingcute:mountain-2-fill"></Icon>
                        <span className="text-zinc-200">Expedition</span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Icon icon="material-symbols:altitude-outline"></Icon>
                        <span className="text-zinc-200">7000m</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div className="w-11/12 mx-auto grid  grid-cols-4 gap-4"></div> */}
      </div>
    </div>
  );
}
