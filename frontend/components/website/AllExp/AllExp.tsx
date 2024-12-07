import Image from "next/image";
import React from "react";
import Link from "next/link";
import ExpeditionData from "@/data/ExpeditionData";
type Props = {};

export default function AllExp({ collection, distance, path }: any) {
  return (
    <div className="sticky h-[90vh] overflow-y-scroll pb-10 pr-1 top-[5rem] hidden md:block w-full md:w-[18%]  left-0">
      <div className="mx-auto flex w-full  justify-start items-start overflow-x-auto md:overflow-x-visible pb-2 md:pb-0  md:grid gap-5 md:grid-cols-1 md:place-content-start ">
        {collection?.map((item: any, index: number) => (
          <Link
            key={index}
            // href={`/expedition/${path}?cat=${item._id}`}
            href={`/expedition/${path}?cat=${item.slug}`}
            className="w-full"
          >
            <div className="md:w-full w-[50vw] relative bg-white rounded-md group h-[3.5rem] md:h-[4rem] overflow-hidden">
              {/* <div className="absolute bottom-0 left-0 w-full h-[50%] group-hover:h-[100%] duration-100 bg-gradient-to-t from-black to-transparent z-10"></div> */}
              <div className="absolute z-10 text-white top-[50%] left-[50%] text-center w-full translate-x-[-50%] translate-y-[-50%]  flex flex-col justify-center items-center">
                <span className="text-sm md:text-base font-semibold">
                  {item.name}
                </span>
              </div>
              <Image
                width={5000}
                height={5000}
                alt="region-trek"
                src={item.image[0]}
                className={`w-full h-full ${
                  distance === item._id ? "" : "grayscale"
                }    duration-200 object-cover brightness-75 group-hover:grayscale-0 object-center`}
              ></Image>
            </div>
          </Link>
        ))}
      </div>
    </div>
    // <div></div>
  );
}
