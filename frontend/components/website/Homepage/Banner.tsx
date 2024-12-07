import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import SplitType from "split-type";
import BannerImg from "@/public/bannerImg.jpg";
import { Icon } from "@iconify/react";
import { whileViewVarients } from "../Animation/WhileViewVarients";
import { motion } from "framer-motion";
type Props = {};

function Banner({}: Props) {
  return (
    <div
      className="w-full mb-[3rem] relative h-[70vh] md:h-[95vh] flex overflow-hidden justify-center items-center bg-fixed  bg-cover bg-center"
      style={{ backgroundImage: `url(${BannerImg.src})` }}
    >
      <div className="absolute inset-0 scale-110 bg-black  opacity-[0.5] w-full h-full object-cover object-center"></div>
      <div className="flex items-center relative justify-center flex-col gap-2">
        <motion.p
          variants={whileViewVarients}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="text-sm text-center banner-desc md:text-lg leading-relaxed text-zinc-200"
        >
          Contact contour expedition for the best adventure of your life.
        </motion.p>
        <motion.h1
          variants={whileViewVarients}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col w-full justify-center items-center text-zinc-100 title text-center text-3xl md:text-6xl font-black uppercase text-secondary-50"
        >
          <span className="banner-title inline-block md:h-[65px] h-[36px] overflow-hidden">
            Find Your Trail,
          </span>{" "}
          <span className="banner-title inline-block md:h-[65px] h-[36px] overflow-hidden">
            Start Your Journey!
          </span>
        </motion.h1>
        {/* BUTTON  */}
        <Link href="/customize_trip">
          <motion.button
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className=" mt-5"
          >
            <div className="relative z-30 inline-flex items-center justify-center w-auto px-3 py-2 overflow-hidden font-semibold text-white transition-all duration-300 bg-yellow-600 rounded-md cursor-pointer group  ring-[1px] hover:ring-[0.6px] ring-zinc-100  ease focus:outline-none">
              <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="relative z-20 flex items-center text-sm">
                <svg
                  className="relative w-5 h-5 mr-2 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                Customize trip
              </span>
            </div>
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
