"use client";
import PageHero from "@/components/comp/PageHero";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function CustomizeTripHero({}: Props) {
  return (
    // <div className="w-full h-[40vh] md:h-[60vh] relative overflow-hidden  flex justify-center items-center">
    //   <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent z-10"></div>
    //   <Image
    //     width={1000}
    //     height={1000}
    //     src="https://images.unsplash.com/photo-1456389573961-0ae56d45961e?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     alt="contour-team-image"
    //     className="w-full absolute top-0 left-0  h-full brightness-75 object-cover object-top"
    //   ></Image>

    //   <div className="absolute bottom-[10%] right-[5%] z-10">
    //     <div className="flex  text-[13px] text-zinc-200  font-semibold uppercase mt-2 gap-2 items-center">
    //       <Link className="cursor-pointer" href="/">
    //         Home
    //       </Link>{" "}
    //       -{" "}
    //       <span className="cursor-pointer text-yellow-500">
    //         Customize book trip
    //       </span>
    //     </div>
    //   </div>

    //   <div className="mx-auto  z-10 flex text-center items-center  justify-center flex-col gap-2">
    //     <h1 className="text-4xl md:text-6xl uppercase  tracking-wide text-zinc-50  title font-black">
    //       Plan you trip
    //     </h1>
    //     <p className="w-[80%] text-sm text-secondary-50 text-zinc-100 text-center">
    //       Customize the trips the way you want.
    //     </p>
    //   </div>
    // </div>
    <PageHero
      heading="Plan you trip"
      desc={`Customize the trips the way you want.`}
      heroImg="https://images.unsplash.com/photo-1456389573961-0ae56d45961e?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      imgHeight="70vh"
      showBreadCrumb="true"
      nameNav="Customize trip"
    />
  );
}
