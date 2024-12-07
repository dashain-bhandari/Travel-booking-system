import BlogMain from "@/components/website/Blogpage/BlogMain";
import { AxiosInstance } from "@/utils";
import { Metadata } from "next";
import React from "react";

type Props = {};
export function generateMetadata(): Metadata {
  return {
    title: "Contour Expeditions Blog | Trekking and Travel Insights in Nepal",
    description: "Explore the Contour Expeditions blog for expert tips, travel guides, and stories from the heart of Nepal. Stay updated and inspired for your next adventure.",
    openGraph: {
      title: "Contour Expeditions Blog | Trekking and Travel Insights in Nepal",
      description: "Explore the Contour Expeditions blog for expert tips, travel guides, and stories from the heart of Nepal. Stay updated and inspired for your next adventure.",
      images: ['https://res.cloudinary.com/dafkafxrd/image/upload/v1722854596/Contour_Expedition_Blogs_zuokvt.png']
    },
  };
}


export default async function Page({}: Props) {
  // Handle fetch best seller expeditions
  const res = await AxiosInstance.get(`/blogs/get-all-blogs/for-card`);
  const blogs = res?.data?.data;

  return (
    <main className=" z-[20]  bg-[#EAEAEA]">
      <BlogMain blogs={blogs} />
    </main>
  );
}
