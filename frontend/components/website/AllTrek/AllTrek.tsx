import Image from "next/image";
import React from "react";
import Link from "next/link";
import TrekkingData from "@/data/TrekkingData";
import { usePathname } from "next/navigation";
type Props = {};

export default function AllExp({ region }: any) {
  return (
    <div className="sticky md:block hidden top-[5rem] w-full md:w-[30%] mr-5 left-0">
      <div className="mx-auto  grid gap-5 grid-cols-1 place-content-start ">
        {TrekkingData.map((item, index) => (
          <Link key={index} href={`/trek/${item.route}`}>
            <div className="w-full relative bg-white rounded-md group h-[5rem] overflow-hidden">
              <div className="absolute bottom-0 left-0 w-full h-[50%] group-hover:h-[100%] duration-100 bg-gradient-to-t from-black to-transparent z-10"></div>
              <div className="absolute z-10 text-white top-[50%] left-[50%] text-center w-full translate-x-[-50%] translate-y-[-50%]  flex flex-col justify-center items-center">
                {/* <span className="text-[13px] text-yellow-400 font-medium">
                  10 pkg
                </span> */}
                <span className=" font-semibold">{item.name}</span>
              </div>
              <Image
                width={5000}
                height={5000}
                alt="region-trek"
                src={item.img}
                className={`w-full h-full ${
                  region === item.route ? "" : "grayscale"
                }    duration-200 object-cover brightness-75 group-hover:grayscale-0 object-center`}
              ></Image>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
