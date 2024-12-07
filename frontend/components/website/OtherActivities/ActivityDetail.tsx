"use client";
import Image from "next/image";
import React, { act, useContext } from "react";
import OtherActivitiesData from "@/data/OtherActivitiesData";
import Link from "next/link";
import parse from "html-react-parser";
import { whileViewVarients } from "../Animation/WhileViewVarients";
import { motion } from "framer-motion";
import { GlobalContext } from "@/context/GlobalContext";
type Props = {};
import { Icon } from "@iconify/react";
function AcitvityDetail({ activity }: any) {
  const { currentUser } = useContext(GlobalContext) as any
  return (
    <div className="w-11/12 4xl:w-10/12  mx-auto  text-zinc-50 overflow-hidden py-[5rem]">
      {/* tab  */}
      <div className=" flex  w-full pt-[5rem] flex-col md:flex-row justify-between relative items-start gap-4 ">
      
       {/* contain */}
     {/* title  */}
    
     <div>

     <div className=" flex flex-col gap-2">
        {/* TITLE  */}
        <motion.h1
          variants={whileViewVarients}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="text-2xl relative tracking-wide title font-semibold italic text-zinc-800"
        >
          {activity?.name}
        </motion.h1>

   {/* BOOOK  card for mobile */}
   <div className="mx-auto md:hidden w-11/12  !md:w-[25%] bg-[#1E1E1E] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]   md:w-[20%] flex-col gap-8 pb-2 overflow-hidden  md:sticky  top-[4rem] overflow-x-scroll md:overflow-x-visible  rounded-md md:top-[6rem] left-0  flex    items-center">
                <div className="flex w-full  flex-col gap-4 py-5 0 px-3  rounded-b-3xl   border-b">
                  {/* <div className="w-full rounded-md p-2  border"> */}
                  <span className="font-semibold text-zinc-50 text-lg">
                    USD
                  </span>
                  {/* </div> */}
                  {/* </div> */}
                  <span className="flex gap-1 items-start justify-start font-medium">
                    <div className="flex flex-col">
                      <span className="text-zinc-50 text-sm">
                        From{" "}
                        <span className="font-semibold text-normal text-yellow-500">
                          ${ 0}
                        </span>
                      </span>
                      <del className="text-zinc-300">US  ${ 0}</del>
                    </div>{" "}
                    <span className="text-zinc-300 text-sm">/ person</span>
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      Guarenteed Departures
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      All Inclusive Pricing
                    </span>
                  </div>
                 
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      24/7 customer support
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      Easy cancellation
                    </span>
                  </div>
                </div>

                {/* BUTTON  */}
                <a href={currentUser ? `/other_activities/${activity?.slug}/booking` : "/login"} className="w-11/12 mx-auto">
                  <button type="button" className="primary-button !w-full">
                    Book now
                  </button>
                </a>
              </div>


        {/* DESC  */}
        <motion.div
          variants={whileViewVarients}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className=" text-zinc-700 leading-relaxed"
        >
          {activity?.description && parse(activity.description)}
        </motion.div>
      </div>

       {/* gallery  */}
       <div className="  py-10">
        <motion.div
          variants={whileViewVarients}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0 }}
          className="w-full grid sm:grid-cols-2 md:grid-cols-4 auto-rows-[20rem] gap-5"
        >
          {activity &&
            activity.images?.length > 0 &&
            activity.images.map((image: any, i: number) => (
              <div
                key={i}
                className={`works rounded-md  w-full  overflow-hidden group flex flex-col gap-[1rem] justify-start items-center relative cursor-pointer ${i === 0 || i === 4 || i === 5 || i === 6
                    ? "md:col-span-2"
                    : ""
                  } ${i === 2 ? "md:row-span-2" : ""}`}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.3] group-hover:opacity-[0] duration-300"></div>
                {/* img  */}
                <div className="w-full h-full  overflow-hidden flex justify-center items-center">
                  <Image
                    width={1000}
                    height={1000}
                    className="object-cover object-center hover:scale-[10rem] w-full h-full"
                    src={image}
                    alt="project"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
        </motion.div>
      </div>
     </div>
 
   {/* BOOK for web*/}
   <div className=" hidden w-11/12   !md:w-[25%] bg-[#1E1E1E] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]   md:w-[20%] flex-col gap-8 pb-2   rounded-md    md:sticky  top-[4rem]    md:top-[6rem] left-0    md:flex   items-center">
                <div className="flex w-full  flex-col gap-4 py-5 0 px-3  rounded-b-3xl   border-b">
                  {/* <div className="w-full rounded-md p-2  border"> */}
                  <span className="font-semibold text-zinc-50 text-lg">
                    USD
                  </span>
                  {/* </div> */}
                  <span className="flex gap-1 items-start justify-start font-medium">
                    <div className="flex flex-col">
                      <span className="text-zinc-50 text-sm">
                        From{" "}
                        <span className="font-semibold text-normal text-yellow-500">
                          ${ activity?.price||0}
                        </span>
                      </span>
                      <del className="text-zinc-300">US  ${ activity?.previousPrice||0}</del>
                    </div>{" "}
                    <span className="text-zinc-300 text-sm">/ person</span>
                  </span>
                </div>

                <div className="flex flex-col gap-2 px-2">
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      Guarenteed Departures
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      All Inclusive Pricing
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      Customizable Iteneraries
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      24/7 customer support
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      Easy cancellation
                    </span>
                  </div>
                </div>

                {/* BUTTON  */}
                <a href={currentUser ? `/other_activities/${activity?.slug}/booking` : "/login"} className="w-10/12 mx-auto">
                  <button type="button" className="primary-button !w-full">
                    Book now
                  </button>
                </a>
              </div>


            
      
      </div>
     
   
     

      {/* <div className="w-full flex  justify-start items-center">
        <Link href={currentUser ? `/other_activities/${activity?.slug}/booking` : "/login"}>
        
          <button
            type="button"
            className="text-white  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center "
          >
            Book now
          </button>
        </Link>
      </div> */}
    </div>
  );
}

export default AcitvityDetail;
