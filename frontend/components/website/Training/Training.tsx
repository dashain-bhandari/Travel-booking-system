"use client";
import React, { useEffect, useState } from "react";
import OtherActivitiesData from "@/data/OtherActivitiesData";
import TrainingData from "@/data/TrainingData";
import Link from "next/link";
import CourseImage from "@/public/OtherActivities/Rafting/rafting1.avif";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { whileViewVarients } from "../Animation/WhileViewVarients";
import { AxiosInstance } from "@/utils";
type Props = {};

export default function Training({ }: Props) {

  const [trainings, setTrainings] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const { data } = await AxiosInstance.get("/training");
        console.log(data?.data);
        setTrainings(data?.data)
      } catch (error: any) {
        console.log(error.message)
      }
    }
    fetchTrainings()
  }, [])
  return (
    <div className="w-11/12 mx-auto py-[3rem]">
      {/* traingin cards  */}
      <div className="grid md:grid-cols-2  mx-auto md:w-8/12 gap-4">
        {trainings && trainings?.map((item: any, index: any) => (
          <Link
            href={`/training/${item?.slug}`}
            key={index}
          >
            <motion.div
              variants={whileViewVarients}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="cursor-pointer group    hover:scale-95 duration-300 overflow-hidden  relative rounded-md"
            >
              <div className="rounded-b-xl w-full relative h-[20rem] md:h-[28rem] overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[10rem] group-hover:h-[100%] duration-200 z-10 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>
                <Image
                  width={1000}
                  height={1000}
                  src={item?.thumbnail}
                  alt="training-img"
                  className="w-full h-full group-hover:scale-110 duration-300  brightness-[0.8] object-cover object-center "
                ></Image>
              </div>
              <div className="absolute z-10 w-full text-zinc-50 flex flex-col px-5 md:pb-10 pb-5 items-start  bottom-0  mx-auto left-[50%] translate-x-[-50%]">
                <div className="w-full">
                  <span className="font-semibold text-lg text-zinc-50">
                    {item?.title}
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
                  <span className="text-zinc-300 text-[12px]">100 Reviews</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const expeditions = [
  { id: 1, name: "Arctic Adventure", date: "Start from April 05/2025" },
  { id: 2, name: "Desert Trek", date: "Start from 2024" },
  { id: 3, name: "Mountain Climb", date: "Start from 2024" },
  { id: 3, name: "Mountain Climb", date: "Start from now" },
];
