"use client";
import { Heading } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion, useAnimate } from "framer-motion";
import Noise from "@/public/noise.svg";
import { AxiosInstance } from "@/utils";
type Props = {};

export default function PageHero({
  heroImg,
  heading,
  desc,
  imgHeight,
  alt,
  showRating = false,
  showBreadCrumb = false,
  nameNav,
 id
}: any) {
  const [scope, animate] = useAnimate();

  const [reviewStats, setReviewStats] = useState<any>(undefined)
  useEffect(() => {
    const fetReviewsStats = async () => {
      if (id) {
        try {
          const res = await AxiosInstance.get(
            `/expeditions/rating/${id}`
          );
          console.log(res)
          setReviewStats(res?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetReviewsStats();
  }, [id]);

  useEffect(() => {
    const animationSequence: any = [
      [
        ".heading",
        { y: [50, 0], opacity: [0, 1], filter: ["blur(3px)", "blur(0)"] },
        { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
      ],
      [
        ".description",
        { y: [30, 0], opacity: [0, 1] },
        { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
        ,
      ],
      // Add more elements to the sequence as needed
    ];

    animate(animationSequence);
  }, [animate]);

  return (
    <div
      style={{ height: imgHeight }}
      className={`min-w-full relative  flex justify-center items-end`}
    >
      <div className="absolute top-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[50%] z-10 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>
      <Image
        width={2000}
        height={2000}
        alt=""
        src={Noise}
        className="absolute top-0 pointer-events-none left-0 w-full h-full object-cover object-center z-20"
      ></Image>
      <Image
        width={5000}
        height={5000}
        src={heroImg}
        alt={alt}
        className="absolute top-0 left-0 w-full h-full object-cover object-center brightness-[0.7]"
      />
      {showBreadCrumb && (
        <div className="absolute hidden lg:block bottom-0 mb-10 right-[5%] 4xl:right-[9.4%] z-[50]">
          <div className="flex  text-[13px] text-zinc-200  font-semibold uppercase mt-2 gap-2 items-center">
            <div
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault(); // Prevent default div behavior
                window.history.back(); // Navigate to the previous page
              }}
            >
              Back
            </div>{" "}
            -{" "}
            <span className="cursor-pointer text-yellow-500">
              {/* {expedition?.name} */}
              {nameNav}
            </span>
          </div>
        </div>
      )}
      <div className="w-11/12  mx-auto mb-10 flex flex-col gap-3 z-10 relative text-white">
        <div ref={scope} className="flex w-full  md:w-7/12 flex-col gap-2">
          <h1 className="text-4xl md:text-6xl heading relative uppercase font-black">
            {heading}
          </h1>
          <p className="text-zinc-100 description">{desc}</p>

          {/* Conditionally render the rating */}
          {showRating && reviewStats?.total && (
            <div className="flex gap-1 items-center">
              <span className="font-semibold text-zinc-200">Rating:</span>
              {/* stars  */}
              {Array.from({ length: Math.round(reviewStats?.average) }, (v, i) => i)?.map((item, index) => {

                return (<>
                  <Icon
                    icon="material-symbols:star"
                    className="text-yellow-400 w-6 h-6"
                  />
                </>)
              })}
              {/* average */}
              <span className="text-sm font-semibold text-zinc-200">{reviewStats?.average?
             
             ( reviewStats?.average % 1 ? reviewStats?.average.toFixed(1) : reviewStats?.average.toString())
              :0}/5 </span>
            </div>
          )}

          {showBreadCrumb && (
            <div className="lg:hidden z-[50]">
              <div className="flex  text-[13px] text-zinc-200  font-semibold uppercase mt-2 gap-2 items-center">
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default div behavior
                    window.history.back(); // Navigate to the previous page
                  }}
                >
                  Back
                </div>{" "}
                -{" "}
                <span className="cursor-pointer text-yellow-500">
                  {/* {expedition?.name} */}
                  name
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
