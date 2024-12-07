"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/public/Fav.png";
import { motion } from "framer-motion";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="w-full fixed top-0 left-0 h-screen flex justify-center items-center z-[300] bg-[#1E1E1E]">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          filter: ["blur(0px)", "blur(3px)", "blur(0px)"],
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <Image src={Logo} alt="contour-logo" className="w-[5rem]" />
      </motion.div>
    </div>
  );
}
