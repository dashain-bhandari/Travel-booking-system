import Image from "next/image";
import React from "react";
import OtherActivitiesData from "@/data/OtherActivitiesData";
import PageHero from "@/components/comp/PageHero";

type Props = {};

export default function OtherActivitiesHero({ activity }: any) {
  // console.log(OtherActivitiesData[0].HeroImg);
  // if (!activity) {
  //   // Handle case where activity data is not found
  //   return <div>Activity not found</div>;
  // }
  // const data: any = OtherActivitiesData.find((obj) => obj.route == activity);
  // console.log(data);
  // const { HeroImg, name } = data;
  return (
    <>
      {activity && (
        // <div className="w-full h-[70vh] md:h-[85vh]  relative  flex justify-center items-center">
        //   <div className="absolute top-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
        //   <Image
        //     width={1000}
        //     height={1000}
        //     src={activity?.banner}
        //     alt={`${activity?.name} image`}
        //     className="absolute top-0 left-0 w-full h-full object-cover object-center  "
        //   />
        //   <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.5]"></div>
        //   <h1 className="text-4xl md:text-6xl title  text-zinc-50 uppercase relative tracking-wide mt-10 font-black text-secondary-50">
        //     {activity?.name}
        //   </h1>
        // </div>
        <PageHero
          heading={activity?.name}
          desc=""
          alt={`${activity?.name} image`}
          heroImg={activity?.banner}
          imgHeight="70vh"
        />
      )}
    </>
  );
}
