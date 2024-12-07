// "use client"
import TrainingMain from "@/components/website/Training/TrainingMain";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Mountaineering Training | Prepare for Your Next Climb with Contour Expeditions",
  openGraph: {
    title: "Mountaineering Training | Prepare for Your Next Climb with Contour Expeditions",
    description: "Get ready for your next big climb with our comprehensive mountaineering training programs. Learn the skills needed for 8000m peak climbing and more with Contour Expeditions.",
    images: ['https://res.cloudinary.com/dafkafxrd/image/upload/v1722854770/Contour_Expedition_Training_crh5iv.png']
  },
  description: "Get ready for your next big climb with our comprehensive mountaineering training programs. Learn the skills needed for 8000m peak climbing and more with Contour Expeditions."
};

export default function Page({}: Props) {
  return (
    <div>
      <TrainingMain />
    </div>
  );
}
