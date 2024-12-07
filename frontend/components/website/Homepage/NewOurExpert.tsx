"use client";
import Image from "next/image";
import React from "react";
import Guider from "@/public/Team/Guide.jpg";
import MD from "@/public/Team/MD.jpg";
import Link from "next/link";

type Props = {};

export default function NewOurExpert({}: Props) {
  return (
    <div className=" bg-[#EAEAEA] pb-[3rem]">
      <div className="w-11/12 4xl:w-10/12 mx-auto">
        <div className="flex flex-col gap-2">
          {/* title  */}
          <div className="w-auto flex-col flex gap-2 justify-center items-center">
            <h1 className="text-main-title-md lg:text-main-title-lg title uppercase  text-center font-primary">
              Our Experts
            </h1>
            <hr className="bg-yellow-400 h-[4px] overflow-hidden md:w-[10%] w-[30%]" />
          </div>
          <p className="normal-paragraph-md lg:text-normal-paragraph-lg font-primary text-center w-full md:w-[50%] mx-auto text-zinc-700 leading-relaxed">
            Meet the folks behind the scenes, experts in making your adventure
            dreams come true with their skills and passion.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center mt-[3rem] px-1 gap-5 md:gap-10">
          {profiles.map((item: any, index) => (
            <Link
              href={{
                pathname: `/profile/${item.name
                  .toLowerCase()
                  .replace(/\s+/g, "_")}`,
              }}
              key={index}
            >
              <div className="md:w-[30rem] overflow-hidden  h-[20vh] md:h-[25vh] bg-white rounded-md relative shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex">
                <div className="absolute rounded-md top-0 left-0 w-full h-full bg-black opacity-[0.025]"></div>
                <Image
                  src={item.src}
                  alt=""
                  className="w-[50%] h-full object-cover object-center"
                />
                <div className="w-[50%] flex flex-col gap-1 p-5">
                  <span className="italic normal-paragraph-md  font-primary ">
                    {item.role}
                  </span>
                  <span className="font-semibold normal-paragraph-md  font-primary">
                    {item.name}
                  </span>
                  <p className="text-sm font-primary hidden md:block text-zinc-700 ">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const profiles = [
  {
    href: "/profile",
    src: MD,
    role: "Managing Director (MD)",
    name: "Dinesh Bogati",
    desc: "Experience the world class tour package at the best rate and safety offers you.",
  },
  {
    href: "/profile",
    src: Guider,
    role: "IFMGA / UIAGM Guide",
    name: "Prem Gurung",
    desc: "28 years experience in high mountain guiding including 8000m Peaks in Nepal Himalaya.",
  },
];
