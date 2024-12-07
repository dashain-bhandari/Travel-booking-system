import CertificatesMain from "@/components/website/Certificate/Certificates";
import { Metadata } from "next";

type Props = {};
export const metadata: Metadata = {
  title: "Our Certifications | Excellence in Trekking and Mountaineering",
  openGraph: {
    title: "Our Certifications | Excellence in Trekking and Mountaineering",
    description: "Contour Expeditions is proud to showcase our numerous certifications and awards for excellence in trekking and mountaineering. Know more about our achievements and commitment to quality.",
    images: ['https://res.cloudinary.com/dafkafxrd/image/upload/v1722854312/Contour_Expedition_Certificates_bnxham.png']
  },
  description: "Contour Expeditions is proud to showcase our numerous certifications and awards for excellence in trekking and mountaineering. Know more about our achievements and commitment to quality."
};

function Page({}: Props) {
  return (
    <main className=" z-[20]  bg-[#EAEAEA]">
      <CertificatesMain />
    </main>
  );
}

export default Page;
