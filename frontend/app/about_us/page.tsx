import AboutUsMain from "@/components/website/AboutUs/AboutUsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Contour Expeditions | Renowned Trekking and Mountaineering Agency in Nepal",
  openGraph: {
    title: "About Contour Expeditions | Renowned Trekking and Mountaineering Agency in Nepal",
    description: "Learn about Contour Expeditions, Nepal's leading trekking and mountaineering company. Meet our experienced team and discover our commitment to providing safe and memorable adventures.",
    images: [""],
  },
  description: "Learn about Contour Expeditions, Nepal's leading trekking and mountaineering company. Meet our experienced team and discover our commitment to providing safe and memorable adventures.",
};

export default function Page() {
  return (
    <>
      <main className=" z-[20]  bg-[#EAEAEA]">
        <AboutUsMain />
      </main>
    </>
  );
}
