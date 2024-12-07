import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { AxiosInstance } from "@/utils";

type Props = {};

export default function NewPackageCard({
  banner,
  packageName,
  physical,
  duration,
  category,
  maxElevation,
  price,
  id
}: any) {
  console.log("banner");
  console.log("category", category)

  const [reviewStats, setReviewStats] = useState<any>(undefined)
  useEffect(() => {
    const fetReviewsStats = async () => {
      if (id) {
        try {
          const res = await AxiosInstance.get(
            `/expeditions/rating/${id}`
          );
          console.log(res)
          setReviewStats(res?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetReviewsStats();
  }, [id]);

  return (
    <>
      <div className="w-full cursor-pointer group   hover:scale-95 duration-300 overflow-hidden  relative rounded-md ">
        <div className="absolute bottom-0 left-0  w-full h-[10rem] group-hover:h-[100%] duration-300 z-20 bg-gradient-to-t from-[#1E1E1E]   to-transparent"></div>
        <div className="rounded-b-xl w-full relative h-[25rem] lg:h-[28rem] overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src={banner}
            alt="expedition-img"
            className="w-full h-full group-hover:scale-110 duration-300 group-hover:brightness-[0.4] brightness-[0.8] object-cover object-center "
          ></Image>
        </div>
        {price?.adult?.pricePerAdult !== price?.adult?.discountsA[0]?.price &&
        price?.adult?.discountsA[0]?.price !== undefined ? (
          <div className="absolute bg-yellow-500  p-2 px-3 rounded-bl-md top-0 right-0">
            <span className="text-card-title-md lg:text-card-title-lg font-bold font-primary">
              {/* USD 200k */}
              {(
                ((price?.adult?.pricePerAdult -
                  price?.adult?.discountsA[0]?.price) /
                  price?.adult?.pricePerAdult) *
                100
              ).toFixed(0)}
              <span>% Off</span>
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="absolute  z-20 w-full text-zinc-50 flex flex-col px-5 pb-5 items-start  bottom-0  mx-auto left-[50%] translate-x-[-50%]">
          <div className="w-full">
            <span className="font-semibold text-card-title-md lg:text-card-title-lg font-bold font-primary">
              {packageName}
            </span>
          </div>
          {
            reviewStats?.total && (<div className="w-full pb-2 flex gap-1 items-center text-[13px]">
              {Array.from({ length: Math.round(reviewStats?.average) }, (v, i) => i)?.map((item, index) => {

                return (<>
                  <Icon
                    icon="material-symbols:star"
                    className="text-yellow-400 w-6 h-6"
                  />
                </>)
              })}
              {" "}
              <span className="text-normal-paragraph-md font-primary">
                {reviewStats?.total} Reviews
              </span>
            </div>)
          }
          <div className="w-full justify-between pt-1 items-center'  flex">
            <div className="flex gap-1 items-center">
              <Icon icon="carbon:skill-level-advanced"></Icon>{" "}
              <span className="text-zinc-200 text-normal-paragraph-md font-primary">
                {physical}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <Icon icon="lucide:calendar-days"></Icon>{" "}
              <span className="text-zinc-200 text-normal-paragraph-md   font-primary">
                {duration}
              </span>
            </div>
          </div>
          <div className="w-full justify-between pt-1 items-center' text-sm flex">
            <div className="flex gap-1 items-center">
              <Icon icon="mingcute:mountain-2-fill"></Icon>
              <span className="text-zinc-200 uppercase text-normal-paragraph-md   font-primary">
                {category}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <Icon icon="material-symbols:altitude-outline"></Icon>
              <span className="text-zinc-200 text-normal-paragraph-md  font-primary">
                {maxElevation}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
