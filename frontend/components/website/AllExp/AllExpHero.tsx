import TrekkingData from "@/data/TrekkingData";
import Image from "next/image";
import React from "react";

type Props = {};

export default function AllExpHero({ distance }: any) {
  // if (!distance) {
  //   // Handle case where activity data is not found
  //   return <div>Package not found</div>;
  // }

  // const data: any = TrekkingData.find((obj) => obj.route === distance);

  // if (!data) {
  //   return <div>Data not found</div>;
  // }

  // console.log(TrekkingData);
  // const { name, intro, package: packages } = data;
  return (
    <div className="w-full h-[60vh] overflow-hidden relative flex justify-center items-center">
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent z-10"></div>
      <Image
        width={1000}
        height={1000}
        src="https://images.unsplash.com/photo-1456389573961-0ae56d45961e?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="contour-team-image"
        className="w-full absolute top-0 left-0  h-full brightness-75 object-cover object-top"
      ></Image>

      <div className="mx-auto  z-10 flex items-center  justify-center flex-col gap-2">
        <h1 className="text-6xl uppercase  tracking-wide text-zinc-50  title font-black">
          All EXPEDITION
        </h1>
        <p className="w-[80%] text-sm text-secondary-50 text-zinc-100 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro rerum
          magni eius deleniti debitis earum!
        </p>
      </div>
    </div>
  );
}
