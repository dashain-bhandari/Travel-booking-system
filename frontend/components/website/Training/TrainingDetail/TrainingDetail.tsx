"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TrainingData from "@/data/TrainingData";
import PageHero from "@/components/comp/PageHero";
import { AxiosInstance } from "@/utils";
import parse from "html-react-parser";
import { GlobalContext } from "@/context/GlobalContext";

type Props = {};

export default function TrainingDetail({ training }: any) {
  const { currentUser } = useContext(GlobalContext) as any
  const pathnameCurrent = usePathname();
  // Find the training data that matches the current pathname
  // const training = TrainingData.find((item) => item.route === slug);
  // const [training, setTraining] = useState<any>({});
  // useEffect(() => {
  //   const fetchTraining = async () => {
  //     try {
  //       const { data } = await AxiosInstance.get(`/training/${slug}`);
  //       console.log(data)
  //       setTraining(data?.data);
  //     } catch (error: any) {
  //       console.log(error?.message)
  //     }
  //   }
  //   fetchTraining()
  // }, [slug])
  // if (!training) {
  //   return <div>Training not found.</div>;
  // }

  return (
    <>
      {/* <div className="w-full h-[60vh] flex justify-center items-center overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
        <Image
          width={1000}
          height={1000}
          src={training.packageImg}
          alt="contour-team-image"
          className="w-full h-full brightness-50 object-cover object-center"
        ></Image>
        <h1 className="text-3xl text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  title md:text-6xl text-zinc-50 uppercase  tracking-wide mt-10 font-bold text-secondary-50">
          {training.name}
        </h1>
      </div> */}




      <div className="w-11/12 4xl:w-10/12 relative  mx-auto py-[5rem]">
        <div className="w-full flex flex-col gap-5 justify-start items-start">
          {/* CONTENT  */}
          <div className="flex flex-col gap-4">
            {/* topic 1  */}
            <div className="flex w-full md:w-[70%] mx-auto flex-col gap-2">

              <p className="text-zinc-700 leading-relaxed">
                {training?.description && parse(training.description)}
              </p>
            </div>


          </div>

          <div className="w-[70%] mx-auto justify-start flex items-center">
            <Link href={currentUser?`/training/${training?.slug}/booking`:"/login"}>
              <button
                type="button"
                className="text-white  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center "
              >
                Book now
              </button>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
}
