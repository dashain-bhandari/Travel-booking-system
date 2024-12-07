import Image from "next/image";
import React, { useRef } from "react";
import AssociatedLogo1 from "@/public/logo/associated1.png";
import AssociatedLogo2 from "@/public/logo/associated2.png";
import AssociatedLogo3 from "@/public/logo/associated3.png";
import CertifiedLogo1 from "@/public/logo/certified1.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { tree } from "next/dist/build/templates/app-page";
type Props = {};

export default function NewPartnersHome({}: Props) {
  // animation
  const partnerContainer = useRef(null);
  useGSAP(() => {
    gsap.from(partnerContainer.current, {
      opacity: "0.3",
      y: "50px",
      duration: "2",
      ease: "sine.out",
      scrollTrigger: {
        // markers: true,
        trigger: partnerContainer.current,
        start: "top 90%",
        end: "50% 50%",
        scrub: 0.5,
      },
    });
  });
  return (
    <div className="relative w-11/12  md:w-full mx-auto  py-[3rem] font-primary  text-text-dark">
      <div
        ref={partnerContainer}
        className="flex md:flex-row flex-col justify-center gap-10  z-20"
      >
        <div className="flex flex-col md:flex-row  gap-3 justify-center  items-center">
          <span className="flex gap-2  title font-semibold items-center text-nav-heading-md lg:text-nav-heading-lg">
            <span className="text-nowrap text-nav-heading-md lg:text-nav-heading-lg font-primary">
              Associated with
            </span>{" "}
            <span className="text-lg text-yellow-400">|</span>{" "}
          </span>
          <div className="flex flex-wrap gap-1 justify-center items-center">
            <Image
              src={AssociatedLogo1}
              alt="logo"
              className="overflow-hidden h-[5.5rem] w-[5.5rem] object-cover object-center"
            ></Image>
            <Image
              src={AssociatedLogo2}
              alt="logo"
              className="overflow-hidden h-[5.5rem] w-[5.5rem] object-cover object-center"
            ></Image>
            <Image
              src={AssociatedLogo3}
              alt="logo"
              className="overflow-hidden h-[5.5rem] w-[5.5rem] object-cover object-center"
            ></Image>
          </div>
        </div>

        <div className="flex flex-col md:flex-row  gap-3 justify-start md:justify-center items-center">
          <span className="flex gap-2  title font-semibold items-center text-nav-heading-md lg:text-nav-heading-lg">
            Certified by <span className="text-lg text-yellow-400">|</span>
          </span>
          <div className="flex gap-1 justify-center items-center">
            <Image
              src={CertifiedLogo1}
              alt="logo"
              className="overflow-hidden h-[5.5rem] w-[5.5rem] object-cover object-center"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
