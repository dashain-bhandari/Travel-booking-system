"use client";
import React from "react";
import AllExp from "./AllExp";
import AllExpHero from "./AllExpHero";

type Props = {};

function AllExpMain({ distance }: any) {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <AllExpHero distance={distance} />
      </div>
      <div className="w-11/12 relative z-50 mx-auto">
        {/* <AllExp distance={distance} /> */}
        <AllExp  distance={distance}/>
      </div>
    </div>
  );
}

export default AllExpMain;
