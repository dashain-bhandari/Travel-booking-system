import CustomizeTrip from "@/components/website/CusomizeTrip/CustomizeTrip";
import { Metadata } from "next";
import React from "react";

type Props = {};
export const metadata: Metadata = {
  title: "Customize Your Trip | Tailored Adventures with Contour Expeditions",
  openGraph: {
    title: "Customize Your Trip | Tailored Adventures with Contour Expeditions",
    description:
      "Create your perfect adventure in Nepal with our customized trip planning. Contour Expeditions helps you customize it as per your preference for unique travel experiences.",
    images: [
      "https://res.cloudinary.com/dafkafxrd/image/upload/v1722855136/Contour_Expedition_Customize_Trip_tlzwms.png",
    ],
  },
  description:
    "Create your perfect adventure in Nepal with our customized trip planning. Contour Expeditions helps you customize it as per your preference for unique travel experiences.",
};

export default function page({}: Props) {
  return (
    <div>
      <CustomizeTrip />
    </div>
  );
}
