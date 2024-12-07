"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BestSeller1 from "@/public/BestSellers/Best1.jpg";
import BestSeller2 from "@/public/BestSellers/best2.webp";
import BestSeller3 from "@/public/BestSellers/best3.jpg";
import BestSeller4 from "@/public/BestSellers/best4.jpg";
import BestSeller5 from "@/public/BestSellers/best2.jpg";
import BestSeller6 from "@/public/BestSellers/best6.jpg";
import BestSeller7 from "@/public/BestSellers/best7.jpg";
import Link from "next/link";
import { motion } from "framer-motion";

import { Icon } from "@iconify/react";
import { AxiosInstance } from "@/utils";
import PackageCard from "@/components/comp/PackageCard";
import { whileViewVarients } from "../Animation/WhileViewVarients";
import NewCardDesign from "@/components/comp/NewCardDesign";
type Props = {};

function Similar({ id }: any) {
  const [simExp, setSimExp] = useState<any>([]);
  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const res = await AxiosInstance.get(
          `/expeditions/get-all/plane-data-without-populate`,
          {
            params: {
              category: id,
              isPublished:true
            },
          }
        );
        setSimExp(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    id && id.length > 0 && fetchExpeditions();
  }, [id]);
  console.log("Similar", simExp);
  return (
    <>
      <div className="w-11/12 4xl:w-10/12  py-[3rem] mx-auto">
        {/* title  */}
        <motion.div
          variants={whileViewVarients}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="w-auto flex-col flex gap-2 justify-center items-center"
        >
          <h1 className="title text-3xl uppercase text-secondary-500 text-center  font-bold">
            Similar package
          </h1>
          <hr className="bg-yellow-400 h-[3px] overflow-hidden w-[10%] rounded-full" />
        </motion.div>
        {/* NAVIGATION  activities */}
        <div className="w-full mt-[2rem]">
          {/* cards  */}
          <div className="w-full mx-auto grid   md:grid-cols-4 gap-4">
            {simExp?.slice(0, 4).map((item: any, index: any) => (
              <Link href={`/trip/${item?.slug}`} key={index}>
                {/* <PackageCard
                  banner={item.banner}
                  packageName={item.name}
                  physical={item.physical}
                  duration={item.duration}
                  category={item.activity}
                  maxElevation={item.maxElevation}
                  id={item?._id}
                /> */}

                <NewCardDesign
                  banner={item.banner}
                  packageName={item.name}
                  physical={item.physical}
                  duration={item.duration}
                  category={item.name}
                  maxElevation={item.maxElevation}
                  overview={item.overview}
                  groupSize={item.groupSize}
                  price={item.price}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Similar;

const SimilarData = [
  {
    id: 1,
    name: "Annapurna",
    src: BestSeller1,
  },
  {
    id: 2,
    name: "Everest",
    src: BestSeller2,
  },
  {
    id: 3,
    name: "Langtang",
    src: BestSeller3,
  },
  {
    id: 4,
    name: "Manaslu",
    src: BestSeller4,
  },
];
