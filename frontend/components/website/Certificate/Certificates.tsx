"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CertificatesHero from "./CertificatesHero";

import Certificate1 from "@/public/certificates/Company-registration-certificate-Contour-expeditions-pvt.-ltd_page-0001.jpg";
import Certificate2 from "@/public/certificates/PAN-Contour-Expeditions_page-0001.jpg";
import Certificate3 from "@/public/certificates/Tourism-Liscence-Contour-Expeditions-Pvt.-Ltd._page-0001.jpg";
import Certificate4 from "@/public/certificates/Udhyog-Banijya-Mantralaya-certficate_page-0001.jpg";
import Frame from "@/public/frame.png";
import { motion } from "framer-motion";
import { whileViewVarients } from "../Animation/WhileViewVarients";
type Props = {};
gsap.registerPlugin(ScrollTrigger);
export default function CertificatesMain({}: Props) {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const CertificateLeftImageVariants = {
    hidden: { opacity: 0, x: 100, rotate: "5deg" },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.1, 0.45, 0.3, 0.98],
      },
    },
  };

  const CertificateRightImageVariants = {
    hidden: { opacity: 0, x: -100, rotate: "-5deg" },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.1, 0.45, 0.3, 0.98],
      },
    },
  };

  return (
    <>
      <div className="w-full">
        <CertificatesHero />
      </div>
      <div
        className="w-11/12 4xl:w-10/12 mx-auto
     py-[3rem] flex flex-col gap-10 justify-center items-center relative overflow-hidden"
      >
        {CertificatesData.map((item, index) => {
          const isOddIndex = index % 2 !== 0;
          return (
            <div
              key={index}
              className={`w-full  gap-5 flex md:flex-row flex-col justify-center items-center ${
                isOddIndex ? "md:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                variants={whileViewVarients}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className={`${
                  isOddIndex ? "text-left" : "text-right"
                } md:w-[50%] desc-${index}  flex gap-2 flex-col`}
              >
                <span className="font-bold text-zinc-700 text-lg">
                  {item.num}
                </span>
                {/* title  */}
                <div
                  className={`flex flex-col justify-start  gap-2  ${
                    isOddIndex ? "items-start" : "items-end"
                  } `}
                >
                  <span className="text-2xl md:text-4xl font-semibold title">
                    {item.name}
                  </span>
                  <hr className="bg-yellow-400 w-[7rem]  h-[2px]" />
                </div>
                <p className="text-zinc-700 mt-[1rem] text-secondary-400 font-medium">
                  {item.desc}
                </p>
              </motion.div>
              <div className={`md:w-[50%] flex justify-center items-center`}>
                <motion.div
                  variants={
                    isOddIndex
                      ? CertificateLeftImageVariants
                      : CertificateRightImageVariants
                  }
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  className={`md:w-[50%] image-${index}  md:h-[60vh] relative   ${
                    isOddIndex ? "" : ""
                  } scale-[1.05] cursor-pointer hover:scale-100 duration-200 `}
                >
                  <Image
                    width={5000}
                    height={5000}
                    src={Frame}
                    alt="certificate-contour-frame"
                    className="w-full h-full object-fit z-10 object-center absolute top-0 left-0"
                  ></Image>

                  <Image
                    width={5000}
                    height={5000}
                    src={item.img}
                    alt="certificate-contour"
                    className="w-full h-full object-fit p-5 object-center absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
                  ></Image>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

const CertificatesData = [
  {
    num: "01",
    name: "Company Registration Certificate",
    img: Certificate1,
    desc: "Official registration certificate of Contour Expeditions Pvt. Ltd., certifying the company's legal establishment and operations.",
  },
  {
    num: "02",
    name: "PAN Certificate",
    img: Certificate2,
    desc: "Permanent Account Number (PAN) certificate for Contour Expeditions Pvt. Ltd., essential for financial and tax-related activities.",
  },
  {
    num: "03",
    name: "Tourism License",
    img: Certificate3,
    desc: "Tourism license granted to Contour Expeditions Pvt. Ltd., authorizing the company to operate in the travel and tourism sector.",
  },
  {
    num: "04",
    name: "Udhyog Banijya Mantralaya Certificate",
    img: Certificate4,
    desc: "Certificate from the Ministry of Industry and Commerce, acknowledging the company's adherence to industry regulations and standards.",
  },
];
