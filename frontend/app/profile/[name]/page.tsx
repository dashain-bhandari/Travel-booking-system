import TeamProfile from "@/components/website/TeamProfile/TeamProfile";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {};
const profileDetail = [
  {
    route: "dinesh_bogati",
    href: "/profile/dinesh_bogati",
    src: "/Team/md.jpg",
    role: "Managing Director (MD)",
    image:
      "https://res.cloudinary.com/dafkafxrd/image/upload/v1722856291/Dinesh_Bogati_rkzgcs.jpg",
    name: "Dinesh Bogati",
    desc: "Experience the world-class tour package at the best rate and safety offers you.",
  },
  {
    route: "prem_gurung",
    href: "/profile/prem_gurung",
    src: "/Team/Guide.jpg",
    role: "IFMGA / UIAGM Guide",
    name: "Prem Gurung",
    image:
      "https://res.cloudinary.com/dafkafxrd/image/upload/v1722856290/Prem_Gurung_balh1c.jpg",
    desc: "28 years experience in high mountain guiding including 8000m Peaks in Nepal Himalaya.",
  },
];
export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params?.id;
  const blog: any = profileDetail.filter(
    (object: any) => object.route == params.name
  );
  const blogTitle = blog[0].name || "Contour-404";
  const blogDescription = blog[0].desc || "No such blog";
  const blogImage = blog[0].image || "";

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${blogTitle} | Expert | Contour Expedition`,
    description: blogDescription,
    openGraph: {
      title: `Contour-Expedition | Expert | ${blogTitle}`,
      description: blogDescription,
      images: [blogImage, ...previousImages],
    },
  };
}

export default function Page({}: Props) {
  return (
    <div>
      <TeamProfile />
    </div>
  );
}
