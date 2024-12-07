"use client"
import AllExpMain from "@/components/website/AllExp/AllExpMain";
import React from "react";

type Props = {};

export default function Page({ params }: any) {
  const { distance } = params;
  return (
    <div className="">
      <AllExpMain distance={distance} />
    </div>
  );
}
