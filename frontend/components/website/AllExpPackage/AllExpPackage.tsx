"use client";
import ExpeditionData from "@/data/ExpeditionData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import Link from "next/link";
import AllExp from "../AllExp/AllExp";
import { AxiosInstance } from "@/utils";
import PackageCard from "@/components/comp/PackageCard";
import PageHero from "@/components/comp/PageHero";
import parse from "html-react-parser";
import NewCardDesign from "@/components/comp/NewCardDesign";
type Props = {};

export default function AllExpPackage({ distance, query }: any) {
  const [collections, setCollections] = useState<any>([]);
  const [expedition, setExpeditions] = useState<any>([]);

  console.log("expedition in packages", expedition);
  console.log("query in packages", query);

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const res = await AxiosInstance.get(
          `/expeditions/get-all/plane-data-without-populate`,
          {
            params: {
              category: query,
              
              isPublished:true
            },
          }
        );
        setExpeditions(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCategory = async () => {
      try {
        const res = await AxiosInstance.get(
          `/categories/collection/` + distance
        );
        setCollections(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
    fetchExpeditions();
  }, [query, distance]);

  const currentCat = collections?.filter(
    (object: any) => object._id == expedition[0]?.category
  );

  console.log(currentCat);
  return (
    <div className="min-w-full min-h-screen noise">
      <PageHero
        heading={currentCat[0]?.name}
        desc={
          currentCat[0]?.description
            ? parse(currentCat[0]?.description)
            : `Explore the pinnacle of adventure with our expeditions to the
        world's highest peaks.`
        }
        heroImg={currentCat[0]?.image[0]}
        imgHeight="100vh"
        alt={currentCat[0]?.name}
      />
      {/* available treks */}
      <h1 className="text-2xl font-bold text-center mt-[2rem] uppercase">
        {currentCat[0]?.name} packages
      </h1>
      <div className="w-11/12 relative 4xl:w-10/12 mx-auto py-[2rem] flex flex-col md:flex-row  justify-center items-start gap-3">
        <AllExp collection={collections} distance={query} path={distance} />
        <div className="grid w-full mx-auto md:w-9/12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expedition?.map((item: any, index: any) => (
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
  );
}
