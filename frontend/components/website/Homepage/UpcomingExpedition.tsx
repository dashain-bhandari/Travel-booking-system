"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Countour from "@/public/contour-bg.png";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import parse from "html-react-parser";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { AxiosInstance } from "@/utils";
import PackageCard from "@/components/comp/PackageCard";
import Banner from "./Banner";
import { motion } from "framer-motion";
type Props = {};

const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.1, 0.45, 0.3, 0.98],
    },
  },
};
export default function UpcomingExpedition({}: Props) {
  // Handle fetch all collections
  const [collections, setCollections] = useState<any>([]);
  useEffect(() => {
    const fetchAllCollections = async () => {
      try {
        const res = await AxiosInstance.get(`/collections`, {});
        setCollections(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCollections();
  }, []);

  return (
    <div>
      {collections &&
        collections.map((collection: any) => (
          <Section key={collection.id} collection={collection} />
        ))}
    </div>
  );
}

function Section({ collection }: any) {
  // Handle fetch all expedition that matches the collectionid and is upcoming
  const [expeditions, setExpeditions] = useState<any>([]);
  console.log(collection);
  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const res = await AxiosInstance.get(
          `/expeditions/get-all/plane-data-without-populate`,
          {
            params: {
              collections: collection._id,
              isUpcoming: true
              ,
          isPublished:true
              // showInHomePage: true,
            },
          }
        );
        console.log(expeditions);
        setExpeditions(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpeditions();
  }, [collection._id]);
  // console.log(expeditions);

  // console.log(collection);

  return (
    <>
      {expeditions.length > 0 && (
        <div className="w-full bg-[#1E1E1E] py-[10rem]   relative">
          <div>
            <Image
              className="absolute top-0 w-full h-full opacity-5 object-cover object-center left-0"
              src={Countour}
              alt=""
            ></Image>
          </div>
          <div className="w-11/12 mx-auto 4xl:w-10/12 flex justify-center items-center flex-col gap-10">
            {/* title top  */}
            <div className="flex flex-col w-full justify-center items-center gap-2">
              {/* title  */}
              <motion.div
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="w-auto flex-col flex gap-2 justify-center items-center"
              >
                <h1
                  // ref={homeExpeditionTitleRef}
                  className="text-3xl home-expedition-title inline-block title uppercase text-zinc-50 text-secondary-500 text-center  font-bold"
                >
                  Upcoming {collection?.name}
                </h1>
                <hr className="bg-yellow-400  h-[4px] overflow-hidden w-[50%]" />
              </motion.div>
              {/* <p className="text-zinc-300 text-center leading-relaxed  w-[50%]">  {parse(collection?.description)}</p> */}
              <p className="text-zinc-300 text-center leading-relaxed  w-[50%]">
                {" "}
                {collection.description && parse(collection?.description)}
              </p>
              {/* <p className="text-zinc-300 text-center leading-relaxed  w-[50%]">
                {parse(collection?.description)}
              </p> */}
            </div>
            {/* cards  */}

            <CustomSwiper collection={collection} />

            {/* <div className="w-11/12 mx-auto grid  grid-cols-4 gap-4"></div> */}
          </div>
        </div>
      )}
    </>
  );
}

function CustomSwiper({ collection }: any) {
  const [expeditions, setExpeditions] = useState<any>([]);
  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const res = await AxiosInstance.get(
          `/expeditions/get-all/plane-data-without-populate`,
          {
            params: {
              collections: collection._id,
              isUpcoming: true
              ,
          isPublished:true
              // showInHomePage: true,
            },
          }
        );
        setExpeditions(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpeditions();
  }, [collection._id]);

  const [shouldCenter, setShouldCenter] = useState(false);

  useEffect(() => {
    // Update the state based on the number of slides
    setShouldCenter(expeditions.length > 0 && expeditions.length < 4);
  }, [expeditions]);
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      freeMode={true}
      centeredSlides={shouldCenter}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1256: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      }}
      autoplay={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="w-full"
    >
      {expeditions &&
        expeditions.map((expedition: any, index: any) => {
          return (
            <SwiperSlide key={index}>
              <Link href={`/trip/${expedition?.slug}`}>
                <PackageCard
                  banner={expedition.banner}
                  packageName={expedition.name}
                  physical={expedition.physical}
                  duration={expedition.duration}
                  category={collection.name}
                  maxElevation={expedition.maxElevation}
                  id={expedition?._id}
                />
              </Link>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
