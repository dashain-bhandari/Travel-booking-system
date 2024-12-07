import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { GrGroup } from "react-icons/gr";
import CustomButton from "./CustomButton";

type Props = {};

export default function NewCardDesign({
  price,
  banner,
  packageName,
  physical,
  duration,
  category,
  maxElevation,
  overview,
  groupSize,
}: any) {
  const [plainText, setPlainText] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This check ensures the code is running on the client-side
      const parser = new DOMParser();
      const doc = parser.parseFromString(overview, "text/html");
      setPlainText(doc.body.textContent || "");
    }
  }, [overview]);
  return (
    <>
      <div className="w-full border cursor-pointer group hover:scale-95 duration-300 overflow-hidden relative rounded-md shadow-lg bg-white p-4 h-auto mt-[1rem]">
        <div className="relative rounded-md overflow-hidden h-[19rem]">
          <Image
            width={1000}
            height={1000}
            src={banner}
            alt="expedition-img"
            className="w-full h-full group-hover:scale-110 duration-300 object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-[10rem] group-hover:h-full duration-300 z-20 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        {price?.adult?.pricePerAdult !== price?.adult?.discountsA[0]?.price &&
        price?.adult?.discountsA[0]?.price !== undefined ? (
          <div className="absolute top-7 left-[-4px] bg-yellow-500 py-2 px-4 rounded-md">
            <span className="text-card-sub-title  font-bold font-primary">
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
        <div className="mt-4 text-gray-800 text-normal-paragraph-md font-primary h-[20rem] ">
          <h3 className="font-semibold text-card-title-md font-bold font-primary mb-2 h-[4rem]">
            {packageName.length > 45
              ? packageName.slice(0, 45) + "..."
              : packageName.slice(0, 45)}
          </h3>
          <p className="text-normal-paragraph-md font-primary h-[4.2rem]">
            {plainText.length >= 105
              ? plainText.slice(0, 105) + "..."
              : plainText.slice(0, 105)}
          </p>
          <div className="border-t border-gray-300 my-4" />
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Icon icon="lucide:calendar-days" />
              <span className="ml-1 text-card-sub-title font-primary">
                Duration
              </span>
            </div>
            <div className="flex items-center">
              {/* <Icon icon="carbon:skill-level-advanced" /> */}
              <GrGroup />

              <span className="ml-1 text-card-sub-title">Group Size</span>
            </div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <div className="flex items-center">
              {/* <Icon icon="mingcute:mountain-2-fill" /> */}
              <span className="ml-5 font-primary">{duration} Days</span>
            </div>
            <div className="flex items-center">
              {/* <Icon icon="material-symbols:altitude-outline" /> */}
              <span className="font-primary">
                {groupSize ? groupSize : 0} people
              </span>
            </div>
          </div>
          <div className="border-t border-gray-300 my-4" />
          {price?.adult?.pricePerAdult !== price?.adult?.discountsA[0]?.price &&
          price?.adult?.discountsA[0]?.price !== undefined ? (
            <span className="ml-1 text-sub-title font-primary">
              <del>${price?.adult?.pricePerAdult}</del>
            </span>
          ) : (
            ""
          )}
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <span className="ml-1 text-main-title-lg font-primary">
                $
                {price?.adult?.pricePerAdult !==
                  price?.adult?.discountsA[0]?.price &&
                price?.adult?.discountsA[0]?.price !== undefined
                  ? price?.adult?.discountsA[0]?.price
                  : price?.adult?.pricePerAdult
                  ? price?.adult?.pricePerAdult
                  : "N/A"}
                {/* {price?.adult?.pricePerAdult
                  ? price?.adult?.pricePerAdult
                  : "N/A"} */}
              </span>
            </div>
            <div className="flex items-center">
              {/* <Icon icon="carbon:skill-level-advanced" /> */}
              {/* <GrGroup /> */}

              <CustomButton text="View Detail" arrow="false" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
