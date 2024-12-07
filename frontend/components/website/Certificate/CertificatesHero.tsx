import PageHero from "@/components/comp/PageHero";
import Image from "next/image";
import React from "react";

type Props = {};

export default function CertificatesHero({}: Props) {
  return (
    // <div className="w-full h-[70vh] md:h-[85vh]  relative  flex justify-center items-end">
    //   <div className="absolute top-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
    //   <Image
    //     width={1000}
    //     height={1000}
    //     src="https://images.unsplash.com/photo-1499540633125-484965b60031?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     alt="expedition-image"
    //     className="absolute top-0 brightness-50 left-0 w-full h-full object-cover object-center"
    //   />
    //   <div className="flex flex-col gap-3 ml-[5%] 4xl:ml-[9.4%] mb-[5%] relative text-white">
    //     <h1 className="text-3xl md:text-6xl title relative uppercase mt-10  font-black">
    //       Our Proud Milestones
    //     </h1>
    //     <p className="md:w-[70%] w-11/12 text-zinc-100">
    // {`We are honored to have earned numerous certifications and awards for our excellence in mountaineering and trekking. Our achievements reflect our commitment to safety, exceptional service, and environmental stewardship.`}
    //     </p>
    //   </div>
    // </div>
    <PageHero
      heading="Contact us"
      desc={`Honored with certifications and awards, we pride ourselves on safety, exceptional service, and environmental stewardship in mountaineering and trekking.`}
      heroImg={`https://images.unsplash.com/photo-1499540633125-484965b60031?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
      imgHeight="70vh"
    />
  );
}
