"use client";
import React from "react";
import AllTrekHero from "./AllTrekHero";
import AllTrek from "./AllTrek";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {};

function AllTrekMain() {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <AllTrekHero />
      </div>
      <div className="w-11/12 relative z-50 md:w-11/12 mx-auto">
        <AllTrek />
      </div>
    </div>
  );
}

export default AllTrekMain;
