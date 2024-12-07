import React from "react";
import CustomButton from "./CustomButton";

type Props = {};

export default function NewCustomCard({
  price,
  banner,
  packageName,
  physical,
  duration,
  category,
  maxElevation,
}: any) {
  return (
    <>
      <div
        // className="relative w-full cursor-pointer group hover:scale-95 duration-300 overflow-hidden rounded-md shadow-lg bg-cover bg-center h-[43rem] text-center"
        className="relative w-full cursor-pointer group   overflow-hidden rounded-md shadow-lg bg-cover bg-center h-[33rem] text-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 duration-300"></div>

        {/* Category Badge */}

        {/* Content Section */}

        <div className="relative z-10 text-white flex flex-col justify-end  h-full p-4 ">
          <span className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 duration-300 ">
            <CustomButton text="Explore" arrow="false" />
          </span>
          <h3 className="font-semibold text-xl font-primary mb-2">
            {packageName}
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Embark on an unforgettable adventure where the thrill of
            mountaineering meets serenity.
          </p>
          <div className="py-1 mx-auto  rounded-full w-[8rem] bg-primary-btn text-card-sub-title text-text-dark font-primary">
            <p>10 Trips</p>
          </div>
        </div>
      </div>
    </>
  );
}
