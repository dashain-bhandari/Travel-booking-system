import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { AxiosInstance } from "@/utils";

type Props = {};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.1, 0.45, 0.3, 0.98], // Super smooth ease
    },
  },
};
export default function PackageCard({
  banner,
  src,
  season,
  category,
  packageName,
  physical,
  duration,
  id,
  maxElevation,
}: any) {
  console.log("id", id);

  const [reviewStats, setReviewStats] = useState<any>(undefined);
  useEffect(() => {
    const fetReviewsStats = async () => {
      if (id) {
        try {
          const res = await AxiosInstance.get(`/expeditions/rating/${id}`);
          console.log("rev", res);
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
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <div className="w-full cursor-pointer group   hover:scale-95 duration-300 overflow-hidden  relative rounded-md">
          <div className="absolute bottom-0 left-0  w-full h-[50%] group-hover:h-[100%] duration-300 z-20 bg-gradient-to-t via-black/5 from-[#1E1E1E]   to-transparent"></div>
          <div className="rounded-b-xl w-full relative h-[25rem] lg:h-[28rem] overflow-hidden">
            <Image
              width={1000}
              height={1000}
              src={banner}
              alt="expedition-img"
              className="w-full h-full group-hover:scale-110 duration-300 group-hover:brightness-[0.4] brightness-[0.8] object-cover object-center "
            ></Image>
          </div>
          <div className="absolute bg-yellow-500  p-2 px-3 rounded-bl-md top-0 right-0">
            <span className="text-[13px] font-bold text-zinc-800">
              USD 200k
            </span>
          </div>
          <div className="absolute  z-20 w-full text-zinc-50 flex flex-col px-5 pb-5 items-start  bottom-0  mx-auto left-[50%] translate-x-[-50%]">
            <div className="w-full">
              <span className="font-semibold  text-zinc-50">{packageName}</span>
            </div>
            {/* <div className="w-full pb-2 flex gap-1 items-center text-[13px]">
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
            </div> */}
            {reviewStats?.total && (
              <div className="w-full pb-2 flex gap-1 items-center text-[13px]">
                {Array.from(
                  { length: Math.round(reviewStats?.average) },
                  (v, i) => i
                )?.map((item, index) => {
                  return (
                    <>
                      <Icon
                        icon="material-symbols:star"
                        className="text-yellow-400 w-6 h-6"
                      />
                    </>
                  );
                })}{" "}
                <span className="text-normal-paragraph-md font-primary">
                  {reviewStats?.total} Reviews
                </span>
              </div>
            )}
            <div className="w-full justify-between pt-1 items-center' text-sm flex">
              <div className="flex gap-1 items-center">
                <Icon icon="carbon:skill-level-advanced"></Icon>{" "}
                <span className="text-zinc-200 font-medium text-sm">
                  {physical}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <Icon icon="lucide:calendar-days"></Icon>{" "}
                <span className="text-zinc-200 font-medium text-sm">
                  {duration} days
                </span>
              </div>
            </div>
            <div className="w-full justify-between pt-1 items-center' text-sm flex">
              <div className="flex gap-1 items-center">
                <Icon icon="mingcute:mountain-2-fill"></Icon>
                <span className="text-zinc-200 font-medium text-sm">
                  {season}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <Icon icon="material-symbols:altitude-outline"></Icon>
                <span className="text-zinc-200 font-medium text-sm">
                  {maxElevation}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
