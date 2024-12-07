"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { whileViewVarients } from "../Animation/WhileViewVarients";

const BestSellerImageVarient = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.1, 0.45, 0.3, 0.98],
    },
  },
};

export default function HomeAbout({ expeditions }: any) {
  return (
    <div className="w-full mx-auto pb-[5rem] relative">
      <div className="flex gap-10 w-11/12 4xl:w-10/12 mx-auto pt-[5rem]">
        {/* CARDS  */}
        <div className="grid w-full mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <div className="flex items-start home-about-title justify-center flex-col gap-2">
            {/* title  */}
            <motion.div
              variants={whileViewVarients}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="w-auto flex-col flex gap-2 justify-start items-start"
            >
              <h1 className="text-xl md:text-3xl  title uppercase text-secondary-500 text-center  font-bold">
                Best sellers
              </h1>
              <hr className="bg-yellow-400  h-[4px] overflow-hidden w-[55%] " />
            </motion.div>
            <motion.p
              variants={whileViewVarients}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-zinc-700 home-about-desc  leading-relaxed"
            >
              At{" "}
              <span className="font-medium italic">
                Contour Expeditions Pvt. Ltd.
              </span>
              , we specialize in crafting unforgettable Mountaineering and
              Trekking experiences in the capital of mountains. Join us for an
              adventure of a lifetime and create memories that will last a
              lifetime.
            </motion.p>

            {/* BUTTON  */}
            {/* <Link href="/expedition/66ab769336bed2c7f2510120">
              <button
                type="button"
                className="text-white  home-about-button  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center ">
                View more
              </button>
            </Link> */}
            <motion.div
              variants={whileViewVarients}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <Link
                className="primary-button"
                href="/expedition/66ab769336bed2c7f2510120"
              >
                View more
              </Link>
            </motion.div>
          </div>

          {expeditions &&
            expeditions.slice(0, 7).map((expedition: any, index: number) => (
              <Link href={`/trip/${expedition.slug}`} key={index}>
                <motion.div
                  variants={BestSellerImageVarient}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  className={`w-full ${
                    index === 3 ? "lg:mt-[-10%]" : "mt-0"
                  }  h-[50vh] lg:h-[55vh] rounded-xl overflow-hidden relative group`}
                >
                  <div className="absolute bottom-0 left-0  w-full h-[50%] group-hover:h-[100%] duration-200 z-10 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>
                  <div className="w-10/12   duration-200 ease-linear mt-10  group-hover:mt-0 absolute text-white justify-center pointer-events-none text-start items-start flex flex-col gap-2 bottom-[5%] left-[5%]  z-10">
                    <span className="font-semibold text-lg">
                      {expedition.name}
                    </span>
                    <span className="text-base text-yellow-500 font-semibold">
                      {expedition.maxElevation}
                    </span>
                    {/* <span className="text-sm italic font-medium text-yellow-400">Alpine Trekking</span> */}
                  </div>
                  <Image
                    src={expedition.banner}
                    alt=""
                    className="w-full h-full object-cover object-center hover:brightness-50  duration-200  cursor-pointer"
                    width={1000}
                    height={1000}
                  />
                </motion.div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
