"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Countour from "@/public/contour-bg.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import parse from "html-react-parser";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import { AxiosInstance } from "@/utils";
import NewCardDesign from "@/components/comp/NewCardDesign";

type Props = {};

export default function NewSliderComponent({}: Props) {
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
  // console.log("collections", collections);
  const TrekkingActivity =
    collections && collections?.find((i: any) => i.name === "Trekking");
  const TrekkingId = TrekkingActivity ? TrekkingActivity._id : null;

  console.log("collections in best ", collections);

  return (
    <div>
      {/* {collections &&
        collections.map((collection: any) => (
          <Section
            key={collection.id}
            collection={collection}
            TrekkingId={TrekkingId}
          />
        ))} */}

      {
        TrekkingId && (
          // TrekkingId.map((collection: any) => (
          <Section
            key={TrekkingId}
            collection={collections}
            TrekkingId={TrekkingId}
          />
        )
        // ))
      }
    </div>
  );
}

function Section({ TrekkingId, collection }: any) {
  // Handle fetch all expedition that matches the collectionid and is upcoming
  const [expeditions, setExpeditions] = useState<any>([]);
  // console.log("collections", collection);
  // console.log("TrekkingId 2", TrekkingId);

  // console.log("expeditions in new slider", expeditions);

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const res = await AxiosInstance.get(
          `/expeditions/get-all/plane-data-without-populate`,
          {
            params: {
              collections: TrekkingId
              ,
          isPublished:true,

              // isUpcoming: true,
              isFromOldSite: true,
              // showInHomePage: true,
            },
          }
        );
        console.log("res", res);
        setExpeditions(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpeditions();
  }, [collection.id]);
  // console.log("expeditions.length", expeditions.length);

  return (
    <>
      {expeditions.length > 0 && (
        <div
          className="w-full bg-text-light py-[2rem]   relative "
          id="upcoming_trip"
        >
          <div>
            {/* <Image
              className="absolute top-0 w-full h-full opacity-5 object-cover object-center left-0"
              src={Countour}
              alt=""
            ></Image> */}
          </div>
          <div className="w-11/12 mx-auto 4xl:w-10/12 flex justify-center items-center flex-col gap-10 font-primary">
            {/* title top  */}
            <div className="flex flex-col w-full justify-center items-center gap-2">
              {/* title  */}
              <div className="w-auto flex-col flex gap-2 justify-center items-center">
                <h1
                  // ref={homeExpeditionTitleRef}
                  className="text-main-title-md lg:text-main-title-lg home-expedition-title inline-block title uppercase  text-secondary-500 text-center  text-text-dark font-bold"
                >
                  {/* {collection.name} */}
                  Upcoming Trip
                </h1>
                <hr className="bg-yellow-400  h-[4px] overflow-hidden w-[50%]" />
              </div>
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

            <NewCustomSwiper collection={collection} TrekkingId={TrekkingId} />

            {/* <div className="w-11/12 mx-auto grid  grid-cols-4 gap-4"></div> */}
          </div>
        </div>
      )}
    </>
  );
}

function NewCustomSwiper({ collection, TrekkingId }: any) {
  const [expeditions, setExpeditions] = useState<any>([]);

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const res = await AxiosInstance.get(
          `/expeditions/get-all/plane-data-without-populate`,
          {
            params: {
              collections: TrekkingId,
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
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
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
        // pagination={{
        //   clickable: true,
        // }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[FreeMode, Navigation]}
        className="mySwiper w-full  mx-auto "
      >
        {/* <div className="common-slider"> */}
        {expeditions &&
          expeditions.map((trek: any, index: any) => (
            <SwiperSlide key={index}>
              <Link href={`/trip/${trek?.slug}`}>
                <NewCardDesign
                  banner={trek.banner}
                  packageName={trek.name}
                  physical={trek.physical}
                  duration={trek.duration}
                  category={collection.name}
                  maxElevation={trek.maxElevation}
                  overview={trek.overview}
                  groupSize={trek.groupSize}
                  price={trek.price}
                />
              </Link>
            </SwiperSlide>
          ))}
        {/* </div> */}
      </Swiper>
      <button className="swiper-button-prev text-white bg-black px-3 py-1 rounded-full absolute   top-3 right-20 mt-[5rem]  z-20 mr-5">
        {"<"}
      </button>
      <button className="swiper-button-next text-white bg-black px-3 py-1 rounded-full absolute   top-3 right-11 mt-[5rem] z-12 mr-4">
        {">"}
      </button>
    </>
  );
}
