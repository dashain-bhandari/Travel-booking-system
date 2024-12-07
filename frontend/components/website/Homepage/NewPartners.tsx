import Image from "next/image";
import React, { useRef } from "react";
import AssociatedLogo1 from "@/public/logo/associated1.png";
import AssociatedLogo2 from "@/public/logo/associated2.png";
import AssociatedLogo3 from "@/public/logo/associated3.png";
import CertifiedLogo1 from "@/public/logo/certified1.png";

type Props = {};

export default function NewPartners({}: Props) {
  return (
    <div className="flex md:flex-col justify-start items-start gap-5 ">
      <div className="flex  gap-3 justify-center items-start flex-col ">
        <span className="flex gap-2 text-zinc-200 text-nav-heading-md lg:text-nav-heading-lg font-primary   title font-semibold items-center">
          <span className="text-nowrap">Associated with</span>{" "}
        </span>
        <div className="flex gap-1 justify-center items-center">
          <Image
            src={AssociatedLogo1}
            alt="logo"
            className="overflow-hidden h-[2.5rem] w-[2.5rem] object-cover object-center"
          ></Image>
          <Image
            src={AssociatedLogo2}
            alt="logo"
            className="overflow-hidden h-[2.5rem] w-[2.5rem] object-cover object-center"
          ></Image>
          <Image
            src={AssociatedLogo3}
            alt="logo"
            className="overflow-hidden h-[2.5rem] w-[2.5rem] object-cover object-center"
          ></Image>
        </div>
      </div>

      {/* <div className="flex  gap-3 justify-start md:justify-center items-start  flex-col ">
        <span className="flex gap-2 text-zinc-200 text-nav-heading-md lg:text-nav-heading-lg font-primary   title font-semibold items-center">
          Certified by:
        </span>
        <div className="flex gap-1 justify-center items-center">
          <Image
            src={CertifiedLogo1}
            alt="logo"
            className="overflow-hidden h-[2.5rem] w-[2.5rem] object-cover object-center"
          ></Image>
        </div>
      </div> */}
    </div>
  );
}
