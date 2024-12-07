import Image from "next/image";
import React from "react";
import trainingHero from "@/public/training/training-hero.png";
import PageHero from "@/components/comp/PageHero";

type Props = {};

export default function TrainingHero({}: Props) {
  return (
    // <div className="w-full h-[60vh] flex justify-center items-center overflow-hidden relative">
    //   <div className="absolute top-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
    //   <Image
    //     width={5000}
    //     height={5000}
    //     src={trainingHero}
    //     alt="contour-training-hero-image"
    //     className="w-full h-full brightness-50 object-cover object-center"
    //   ></Image>
    //   <h1 className="text-3xl  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  title md:text-6xl text-zinc-50 uppercase  tracking-wide mt-10 font-bold text-secondary-50">
    //     TRAINING
    //   </h1>
    // </div>

    <PageHero
      heading="Training"
      desc={`Master the essentials of mountaineering with our expert-led training programs, designed to equip you with the skills and confidence needed to conquer any peak.`}
      heroImg={trainingHero}
      imgHeight="70vh"
    />
  );
}
