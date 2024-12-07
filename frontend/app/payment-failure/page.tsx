import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-11/12 md:w-4/12 lg:w-3/12  bg-gradient-to-br  from-zinc-50 to-zinc-200 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-md p-10 py-20 flex justify-center items-center flex-col gap-3">
        <div className="w-[5rem] h-[5rem]">
          <Icon
            icon="icomoon-free:cross"
            className="w-full text-red-500 h-full object-cover object-center"
          />
        </div>

        <p className="text-center text-zinc-700">
          Payment failed. Please try again.
        </p>

        <Link href="/my-profile">
          <button className="text-white w-full mt-5  home-about-button  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center me-2 mb-2">
          Visit profile
          </button>
        </Link>
      </div>
    </div>
  );
}
