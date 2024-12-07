"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomButton from "@/components/comp/CustomButton";
import NewCardDesign from "@/components/comp/NewCardDesign";
import { Icon } from "@iconify/react";
import { GrGroup } from "react-icons/gr";

export default function NewHomeAbout({ expeditions }: any) {
  // animation
  useGSAP(() => {
    gsap.from(".home-about-title", {
      opacity: "0.3",
      y: "50px",
      duration: "2",
      ease: "sine.out",
      scrollTrigger: {
        // markers: true,
        trigger: ".home-about-title",
        start: "top 90%",
        end: "50% 50%",
        scrub: 0.5,
      },
    });
    gsap.from(".home-about-desc", {
      opacity: "0.3",
      y: "50px",
      duration: "2",
      ease: "sine.out",
      scrollTrigger: {
        // markers: true,
        trigger: ".home-about-desc",
        start: "top 90%",
        end: "50% 50%",
        scrub: 0.5,
      },
    });
    gsap.from(".home-about-button", {
      opacity: "0.3",
      y: "50px",
      duration: "2",
      ease: "sine.out",
      scrollTrigger: {
        // markers: true,
        trigger: ".home-about-button",
        start: "top 90%",
        end: "50% 50%",
        scrub: 0.5,
      },
    });
  });

  return (
    <div className="w-full mx-auto pb-[5rem] relative font-primary">
      <div className="flex gap-10 w-11/12 4xl:w-10/12 mx-auto md:pt-[5rem] lg:pt-[5rem] sm:pt-[1rem] ">
        {/* CARDS  */}
        <div className="grid w-full mx-auto grid-cols-1 md:grid-cols-4 gap-2">
          <div className="flex items-start home-about-title justify-center flex-col gap-2">
            {/* title  */}
            <div className="w-auto flex-col flex gap-2 justify-start items-start">
              <h1 className="text-main-title-md lg:text-main-title-lg  title uppercase font-primary text-center  font-bold">
                Best sellers
              </h1>
              <hr className="bg-yellow-400  h-[4px] overflow-hidden w-[55%] " />
            </div>
            <p className="text-normal-paragraph-md lg:text-normal-paragraph-lg home-about-desc  leading-relaxed">
              At{" "}
              <span className="font-medium italic">
                Contour Expeditions Pvt. Ltd.
              </span>
              , we specialize in crafting unforgettable Mountaineering and
              Trekking experiences in the capital of mountains. Join us for an
              adventure of a lifetime and create memories that will last a
              lifetime.
            </p>

            {/* BUTTON  */}
            {/* <Link href="/expedition/66ab769336bed2c7f2510120">
              <button
                type="button"
                className="text-white  home-about-button  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center ">
                View more
              </button>
            </Link> */}
            {/* <Link
              className="home-about-button"
              href="/expedition/66ab769336bed2c7f2510120"
            >
              <CustomButton text="View more" arrow="false" />
            </Link> */}
          </div>

          {expeditions &&
            expeditions.slice(0, 3).map((expedition: any, index: number) => (
              <Link href={`/trip/${expedition?.slug}`} key={index}>
                <div
                  className={`w-full ${
                    index === 3 ? "md:mt-[-10%]" : "mt-0"
                  }  h-auto md:h-auto rounded-xl overflow-hidden relative group`}
                >
                  {/* <div className="absolute bottom-0 left-0  w-full h-auto group-hover:h-[100%] duration-200 z-10 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div> */}
                  {/* <div className="w-10/12   duration-200 ease-linear mt-10  group-hover:mt-0 absolute text-white justify-center pointer-events-none text-start items-start flex flex-col gap-2 bottom-[5%] left-[5%]  z-10">
                    <span className="font-semibold text-card-title-md lg:text-card-title-lg font-primary">
                      {expedition.name}
                    </span>
                    <span className="text-base text-yellow-500 font-semibold text-card-title-md font-primary">
                      {expedition.maxElevation}
                    </span>
                    
                  </div>
                  <Image
                    src={expedition.banner}
                    alt=""
                    className="w-full h-full object-cover object-center hover:brightness-50  duration-200  cursor-pointer"
                    width={1000}
                    height={1000}
                  /> */}

                  <NewCardDesign
                    banner={expedition.banner}
                    packageName={expedition.name}
                    physical={expedition.physical}
                    duration={expedition.duration}
                    category={expedition.name}
                    maxElevation={expedition.maxElevation}
                    overview={expedition.overview}
                    groupSize={expedition.groupSize}
                    price={expedition.price}
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
