import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import SplitType from "split-type";
import BannerImg from "@/public/bannerImg.jpg";
import { Icon } from "@iconify/react";

import CustomButton from "@/components/comp/CustomButton";
type Props = {};

function NewBanner({}: Props) {
  const bannerContainerRef = useRef(null);
  const aboutTitleRef = useRef<any>(null);
  useGSAP(() => {
    const splitAboutTitle = new SplitType(aboutTitleRef.current);
    // const splitAboutDesc = new SplitType(aboutDescRef.current);
    const tl = gsap.timeline({
      scrollTrigger: {
        start: "top 80%",
        end: "50% 50%",
        trigger: bannerContainerRef.current,
        scrub: 2,
      },
    });
    // tl.from(
    //   ".banner-img",
    //   {
    //     translateY: "100px",
    //     duration: 1,
    //     // ease: "power4.inOut",
    //   },
    //   "banner"
    // );
    const t2 = gsap.timeline({
      scrollTrigger: {
        start: "top 80%",
        end: "50% 50%",
        trigger: aboutTitleRef.current,
        scrub: 2,
      },
    });
    t2.from(
      ".banner-title",
      {
        height: "0",
        duration: 3,
        transformOrigin: "bottom",
        // ease: "expo.out",
      },
      "banner"
    );
    t2.from(
      ".banner-desc",
      {
        opacity: 0,
        duration: 3,
      },
      "banner"
    );
  });
  return (
    <div
      ref={bannerContainerRef}
      className="w-full mb-[3rem] relative h-[70vh] md:h-[95vh] flex overflow-hidden justify-center items-center bg-fixed  bg-cover bg-center"
      style={{ backgroundImage: `url(${BannerImg.src})` }}
    >
      <div className="absolute inset-0 scale-110 bg-black  opacity-[0.5] w-full h-full object-cover object-center"></div>
      <div className="flex items-center relative justify-center flex-col gap-2">
        <span className="text-normal-paragraph-md lg:text-normal-paragraph-lg text-center banner-desc  leading-relaxed text-zinc-200 font-primary">
          Contact contour expedition for the best adventure of your life.
        </span>
        <h1
          ref={aboutTitleRef}
          className="flex flex-col w-full justify-center items-center text-zinc-100 title text-center text-mainHeading-md lg:text-mainHeading-lg font-black uppercase text-secondary-50"
        >
          <span className="banner-title inline-block md:h-[65px] h-[36px] overflow-hidden">
            Find Your Trail,
          </span>{" "}
          <span className="banner-title inline-block md:h-[65px] h-[36px] overflow-hidden">
            Start Your Journey!
          </span>
        </h1>
        {/* BUTTON  */}
        <Link href="/customize_trip">
          <CustomButton text="Customize your trip" arrow="true" />
        </Link>
      </div>
    </div>
  );
}

export default NewBanner;
