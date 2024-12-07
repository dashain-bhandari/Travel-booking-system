import Image from "next/image";
import React from "react";
import TeamImg from "@/public/Team/team.webp";
import PageHero from "@/components/comp/PageHero";

type Props = {};

export default function OurTeam({}: Props) {
  return (
    // <div className="w-full h-[80vh]  overflow-hidden flex justify-start items-end relative">
    //   <div className="absolute top-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
    //   <Image
    //     src={TeamImg}
    //     alt="contour-team-image"
    //     className="absolute top-0 left-0 w-full h-full brightness-50 object-cover object-top"
    //   ></Image>
    //   <div className="relative z-20 bottom-[5%] left-[5%] 4xl:left-[9.4%] w-[90%] md:w-[50%] text-white">
    //     <span className="font-black text-5xl md:text-6xl">Meet our team</span>{" "}
    //     <br />{" "}
    //     <p className="italic md:w-[60%]">
    //       “Dedicated to crafting memorable and safe journeys, ensuring every
    //       moment of your trip is unforgettable.”
    //     </p>
    //   </div>
    // </div>
    <PageHero
      heading="Meet our team"
      desc={`Meet the passionate experts behind our unforgettable trekking and mountaineering adventures.`}
      heroImg={TeamImg}
      imgHeight="70vh"
      alt="our-team-img"
    />
  );
}
