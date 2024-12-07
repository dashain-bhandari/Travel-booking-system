// import OurTeamMain from "@/components/website/OurTeam/OurTeamMain";
import OurTeamMain from "@/components/website/OurTeam/OurTeamMain";
import { Metadata } from "next";
import React from "react";


type Props = {};
export const metadata: Metadata = {
  title: "Meet Our Team | Expert Guides at Contour Expeditions",
  openGraph: {
    title: "Meet Our Team | Expert Guides at Contour Expeditions",
    description:
      "Discover the dedicated team behind Contour Expeditions. Our experienced guides are passionate about providing safe, memorable, and enriching adventures in Nepal.",
    images: [""],
  },
  description:
    "Discover the dedicated team behind Contour Expeditions. Our experienced guides are passionate about providing safe, memorable, and enriching adventures in Nepal.",
};

function Page({}: Props) {
  return (
    <main className=" z-[20]  bg-[#EAEAEA]">
      <OurTeamMain />
    </main>
  );
}

export default Page;
