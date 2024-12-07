import ExpeditionData from "@/data/ExpeditionData";
import Image from "next/image";
import React from "react";

import { Icon } from "@iconify/react";
import Link from "next/link";
import TrekkingData from "@/data/TrekkingData";
import AllTrek from "../AllTrek/AllTrek";

type Props = {};

export default function AllTrekPackage({ region }: any) {
  if (!region) {
    // Handle case where activity data is not found
    return <div>Package not found</div>;
  }

  const data: any = TrekkingData.find((obj) => obj.route === region);

  if (!data) {
    return <div>Data not found</div>;
  }
  const { name, intro, package: packages } = data;
  return (
    <div>
      <div className="w-full h-[60vh] overflow-hidden relative flex justify-center items-center">
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent z-10"></div>
        <Image
          width={1000}
          height={1000}
          src="https://images.unsplash.com/photo-1456389573961-0ae56d45961e?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="contour-team-image"
          className="w-full absolute top-0 left-0 h-full brightness-75 object-cover object-top"
        ></Image>
        <div className="mx-auto  z-10 flex items-center  text-center justify-center flex-col gap-2">
          <h1 className="text-5xl md:text-6xl uppercase  tracking-wide text-zinc-50  title font-black ">
            {name}
          </h1>
          <p className="w-[80%] text-sm text-secondary-50 text-zinc-100 text-center">
            Experience breathtaking landscapes and thrilling adventures on an
            unforgettable trekking journey.
          </p>
          <div className="flex absolute bottom-[10%] z-10 right-[10%]  text-[13px] text-zinc-200  font-semibold uppercase mt-2 gap-2 items-center">
            <Link href="/" className="cursor-pointer">
              Home
            </Link>{" "}
            - <span className="cursor-pointer text-yellow-500">{name}</span>
          </div>
        </div>
      </div>
      {/* available treks */}
      <h1 className="text-2xl font-bold text-center mt-[2rem] uppercase">
        {name} packages
      </h1>
      <div className="w-11/12 mx-auto py-[2rem] flex flex-col md:flex-row  justify-center items-start gap-3">
        <AllTrek region={region} />
        <div className="grid  mx-auto md:grid-cols-3  gap-4">
          {packages.map((item: any, index: any) => (
            <Link href={`/trip/${item.id}`} key={index}>
              <div className="w-full cursor-pointer group   hover:scale-95 duration-300 overflow-hidden  relative rounded-md">
                <div className="rounded-b-xl w-full relative h-[20rem] md:h-[28rem] overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-[10rem] z-10 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>
                  <Image
                    width={1000}
                    height={1000}
                    src={item.packageImg}
                    alt="expedition-img"
                    className="w-full h-full  group-hover:scale-110 duration-300 group-hover:brightness-[0.4] brightness-[0.8] object-cover object-center "
                  ></Image>
                </div>
                <div className="absolute bg-yellow-500  p-2 px-3 rounded-bl-md top-0 right-0">
                  <span className="text-[13px] font-bold text-zinc-800">
                    USD 200k
                  </span>
                </div>
                <div className="absolute z-10 w-full text-zinc-50 flex flex-col px-5 md:pb-10 pb-5 items-start  bottom-0  mx-auto left-[50%] translate-x-[-50%]">
                  <div className="w-full">
                    <span className="font-semibold text-lg text-zinc-50">
                      {item.packageName}
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
                    <span className="text-zinc-300 text-[12px]">
                      100 Reviews
                    </span>
                  </div>
                  <div className="w-full justify-between pt-1 items-center' text-sm flex">
                    <div className="flex gap-1 items-center">
                      <Icon icon="carbon:skill-level-advanced"></Icon>{" "}
                      <span className="text-zinc-200">Difficulty</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Icon icon="lucide:calendar-days"></Icon>{" "}
                      <span className="text-zinc-200">8 days</span>
                    </div>
                  </div>
                  <div className="w-full justify-between pt-1 items-center' text-sm flex">
                    <div className="flex gap-1 items-center">
                      <Icon icon="mingcute:mountain-2-fill"></Icon>
                      <span className="text-zinc-200">Expedition</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Icon icon="material-symbols:altitude-outline"></Icon>
                      <span className="text-zinc-200">7000m</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
