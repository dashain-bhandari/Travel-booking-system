"use client";
import Image from "next/image";
import React from "react";
import Ceo from "@/public/Team/ceo.jpg";
import { Icon } from "@iconify/react";
import Facebook from "@/public/Social/facebook.png";
import Insta from "@/public/Social/instagram.png";
import Whatsapp from "@/public/Social/whatsapp.png";

import { motion } from "framer-motion";
import { whileViewVarients } from "../Animation/WhileViewVarients";

type Props = {};

export default function MesssageFromCeo({}: Props) {
  return (
    <div className="w-full mx-auto py-[6rem] h-full relative flex gap-3">
      <div className="w-11/12 4xl:w-10/12 flex flex-col md:flex-row mx-auto gap-5 ">
        <div className="flex flex-col w-full md:w-[30%] justify-start items-start gap-5">
          <motion.div
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0 }}
            className="flex w-full border p-2 border-zinc-300 rounded-lg flex-col sticky top-[5rem] left-0"
          >
            <Image
              src={Ceo}
              alt="ceo-image"
              className="w-full h-[70vh] rounded-md object-cover object-center"
            ></Image>
            <div className="flex justify-between mt-2">
              <div className="flex flex-col">
                <span className="font-bold">Dinesh Bogati</span>
                <span className="text-sm font-medium italic">
                  Managing director
                </span>
              </div>
              <div className="flex gap-2 justify-start mt-2 items-center">
                <Image
                  src={Facebook}
                  className="w-7 h-7  hover:scale-105 duration-200 cursor-pointer"
                  alt="socio-img"
                ></Image>
                <Image
                  src={Insta}
                  className="w-7 h-7  hover:scale-105 duration-200 cursor-pointer"
                  alt="socio-img"
                ></Image>

                <Image
                  src={Whatsapp}
                  className="w-7 h-7  hover:scale-105 duration-200 cursor-pointer"
                  alt="socio-img"
                ></Image>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full md:w-[70%]  flex gap-2 flex-col">
          <motion.h1
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="text-2xl md:text-3xl
      font-semibold uppercase title"
          >
            Message from Ceo
          </motion.h1>
          <motion.p
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="text-zinc-700 leading-relaxed"
          >
            {` Born in the dense city of Kathmandu, even I didn’t know well about the
        Himalayas. Before starting up the Expedition company I had a special
        meet with IFMGA guide Mr. Prem Gurung from Lamjung. Well, this key
        “Meetup” is the turning point to set my career as a co-founder in
        “Contour Expeditions”. The idea for the name of the company came after
        obtaining theoretical knowledge about geographical map reading and
        compass navigation from Mr. Prem Bahadur Gurung. I came to know about
        contour lines in topography maps and their importance while travelling,
        trekking, and expeditions. The importance of contour lines is essential
        for every traveller and backpacker. This is the very reason I have given
        the name of the company as “Contour Expedition”. My entire team was
        excited about the company’s name and approved it. Our responsibility
        regarding the adventure is to educate about the Himalayas and maximise
        the success rate. Following the mountain rules, we provide qualified
        trekking, climbing, and expedition guides which are very essential to
        deal with the adventure.`}
          </motion.p>
          {/* banner  */}
          <motion.div
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="w-full py-4  h-[12vh] flex items-center gap-2"
          >
            <div className="h-full w-1 bg-yellow-400"></div>
            <p className="text-xl font-medium text-zinc-800">
              {`  “Guided Adventure with the Professional”`}
            </p>
          </motion.div>

          <motion.p
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="text-zinc-700 leading-relaxed"
          >
            {`
        The tagline of our company itself has a meaningful statement. We care
        about our clients first and safety is always our high priority. So,
        until and unless the climbers are physically and mentally prepared we do
        not go further for any kind of adventure. At Contour Expedition, we
        believe that adventure is not just about the destinations but about the
        journeys we take and memories we create. Our team of experienced guides
        and experts is dedicated to ensuring that every expedition is safe,
        enjoyable and enlightening. Whether you’re scaling remote peaks,
        navigating the vast terrain on the foothills of Himalayas, or exploring
        hidden cultures, our goal is to help you achieve your adventure dream in
        the most responsive way. We are proud to offer a diverse range of
        expeditions to some of the most incredible and untouched corners of the
        earth. From customised private tours to group expeditions, there’s
        something for every type of adventurer in our portfolio. We are also
        continuously innovating and expanding our offerings to bring you new and
        unique experiences. I invite you to join us on an adventure that will
        challenge, inspire and change you. Explore our website to learn more
        about our expeditions, our commitment to sustainability, and how you can
        become part of our story. Thank you for choosing Contour Expedition as
        your partner in exploration. We look forward to embarking on an
        unforgettable journey with you.`}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
