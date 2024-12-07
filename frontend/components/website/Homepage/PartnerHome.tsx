import Image from "next/image";
import React, { useRef } from "react";
import AssociatedLogo1 from "@/public/logo/associated1.png";
import AssociatedLogo2 from "@/public/logo/associated2.png";
import AssociatedLogo3 from "@/public/logo/associated3.png";
import CertifiedLogo1 from "@/public/logo/certified1.png";

import { tree } from "next/dist/build/templates/app-page";
import { motion } from "framer-motion";
import { whileViewVarients } from "../Animation/WhileViewVarients";
type Props = {};

export default function PartnersHome({}: Props) {
  return (
    <div className="relative w-11/12  md:w-full mx-auto  py-[3rem] ">
      <div className="flex md:flex-row flex-col justify-center gap-10  z-20">
        <motion.div
          variants={whileViewVarients}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col md:flex-row  gap-3 justify-center items-center"
        >
          <span className="flex gap-2 text-secondary-50 text-lg md:text-xl title font-semibold items-center">
            <span className="text-nowrap">Associated with</span>{" "}
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
        </motion.div>

        <motion.div
          variants={whileViewVarients}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col md:flex-row  gap-3 justify-start md:justify-center items-center"
        >
          <span className="flex gap-2 text-secondary-50 text-lg md:text-xl title font-semibold items-center">
            Certified by <span className="text-lg text-yellow-400">|</span>
          </span>
          <div className="flex gap-1 justify-center items-center">
            <Image
              src={CertifiedLogo1}
              alt="logo"
              className="overflow-hidden h-[5.5rem] w-[5.5rem] object-cover object-center"
            ></Image>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
