import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import TrekkingData from "@/data/TrekkingData";
type Props = {};

function AllTrek({ region }: any) {
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
    <div className="w-full  flex gap-4 pt-[2rem] py-[3rem] relative">
      {/* tab  */}
      <div className="w-[15%]">
        <div className="w-full h-auto sticky top-[5rem] left-0   rounded-lg  flex flex-col   justify-start  items-start gap-4">
          {/* tab  */}
          <Link
            href={`/all_trek`}
            className="flex items-center  group hover:text-yellow-500  duration-200  w-full  justify-between  "
          >
            <h1
              className={`relative font-semibold  text-sm text-wrap  w-full  py-2 group-hover:scale-105   duration-200  flex justify-start px-2 items-center    ${"text-zinc-800"}`}
            >
              All Trekking
            </h1>
            {/* <Icon icon="ri:arrow-drop-right-line" className="" /> */}
          </Link>
          {TrekkingData.map((item: any, index: number) => (
            <Link
              href={`/trek/${item.route}`}
              key={index}
              className="flex items-center border-b border-zinc-300 group hover:text-yellow-500  duration-200  w-full  justify-between  "
            >
              <h1
                className={`relative font-semibold  text-sm text-wrap  w-full  py-2 group-hover:scale-105   duration-200  flex justify-start px-2 items-center    ${
                  item.route === region ? "text-yellow-500" : "text-zinc-800"
                }`}
              >
                {item.name}
              </h1>
              <Icon icon="ri:arrow-drop-right-line" className="" />
            </Link>
          ))}
        </div>
      </div>
      <div className="w-[80%] flex flex-col gap-5">
        {/* available treks */}
        <div className="grid w-full grid-cols-3 gap-4">
          {packages.map((item: any, index: any) => (
            <Link href={`/trip/${item.index}`} key={index}>
              <div className="w-full cursor-pointer group   hover:scale-95 duration-300 overflow-hidden  relative rounded-md">
                <div className="rounded-b-xl w-full relative h-[28rem] overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-[10rem] z-10 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>
                  <Image
                    width={1000}
                    height={1000}
                    src={item.packageImg}
                    alt="expedition-img"
                    className="w-full h-full group-hover:scale-110 duration-300 group-hover:brightness-[0.4] brightness-[0.8] object-cover object-center "
                  ></Image>
                </div>
                <div className="absolute bg-yellow-500  p-2 px-3 rounded-bl-md top-0 right-0">
                  <span className="text-[13px] font-bold text-zinc-800">
                    USD 200k
                  </span>
                </div>
                <div className="absolute z-10 w-full text-zinc-50 flex flex-col px-5 pb-10 items-start  bottom-0  mx-auto left-[50%] translate-x-[-50%]">
                  <div className="w-full">
                    <span className="font-semibold text-lg text-zinc-50">
                      Everest Base Camp
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

export default AllTrek;
