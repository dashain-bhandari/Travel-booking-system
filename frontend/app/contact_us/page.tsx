import ContactUs from "@/components/website/ContactUs/ContactUs";
import { Metadata } from "next";
import React from "react";

type Props = {};
export const metadata: Metadata = {
  title: "Contact Contour Expeditions | Plan Your Adventure in Nepal",
  openGraph: {
    title: "Contact Contour Expeditions | Plan Your Adventure in Nepal",
    description: "Feel free to contact Contour Expeditions for any type of inquiries or planning your next adventure in Nepal. We are always here to help with all your queries for trekking and traveling in Nepal.",
    images: ['https://res.cloudinary.com/dafkafxrd/image/upload/v1722854594/Contact_US_Contour_Expedition_m7kilg.png']
  },
  description: "Feel free to contact Contour Expeditions for any type of inquiries or planning your next adventure in Nepal. We are always here to help with all your queries for trekking and traveling in Nepal."
};

function Page({}: Props) {

  return (
    <main className=" z-[20]  bg-[#EAEAEA]">
      <ContactUs />
    </main>
  );
}

export default Page;
