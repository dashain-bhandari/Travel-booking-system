import MesssageFromCeo from "@/components/website/Homepage/MesssageFromCeo";
import { Metadata } from "next";
import React from "react";

type Props = {};
export const metadata: Metadata = {
  title: "A Message from Our CEO | Contour Expeditions Pvt. Ltd.",
  openGraph: {
    title: "A Message from Our CEO | Contour Expeditions Pvt. Ltd.",
    description: "A special message from the CEO of Contour Expeditions, sharing insights on our mission, values, and commitment to providing exceptional trekking and travel experiences in Nepal.",
    images: ['']
  },
  description: "A special message from the CEO of Contour Expeditions, sharing insights on our mission, values, and commitment to providing exceptional trekking and travel experiences in Nepal."
};

export default function Page({}: Props) {
  return (
    <main className=" z-[20]  bg-[#EAEAEA]">
      <MesssageFromCeo />
    </main>
  );
}
