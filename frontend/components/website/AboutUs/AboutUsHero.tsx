import Image from "next/image";
import React from "react";
import TeamImg from "@/public/Team/team.webp";
import PageHero from "@/components/comp/PageHero";


type Props = {};

export default function AboutusHero({}: Props) {
  return (
    // <div className="w-full h-[70vh]  md:h-[83vh] overflow-hidden relative">
    //   <div className="absolute top-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
    //   <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent z-10"></div>
    //   <Image
    //     src={TeamImg}
    //     alt="contour-team-image"
    //     className="w-full h-full brightness-75 object-cover object-top"
    //   ></Image>

    //   <div className=" absolute bottom-[5%] left-[5%] 4xl:left-[9.4%] z-10 flex items-start  justify-start flex-col gap-2">
    //     <h1 className="text-5xl md:text-6xl uppercase relative tracking-wide text-zinc-50  title font-black ">
    //       About us
    //     </h1>
    //     <p className="w-[80%] text-sm text-secondary-50 text-zinc-100  text-start">
    // Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro rerum
    // magni eius deleniti debitis earum!
    //     </p>
    //   </div>
    // </div>
    <PageHero
      heading="About us"
      desc={`Experience adventure with our expertise in mountaineering and trekking, guiding you to the world's most breathtaking peaks.`}
      heroImg={TeamImg}
      imgHeight="70vh"
      alt="team-img"
    />
  );
}
