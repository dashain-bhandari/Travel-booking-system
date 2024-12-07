import React from "react";
import Service1 from "@/public/services/Vehicles.png";
import Service2 from "@/public/services/pure-natural.png";
import Service3 from "@/public/services/people-safe.png";
import Service4 from "@/public/services/effects.png";
import Service5 from "@/public/services/right-user.png";
import Service6 from "@/public/services/personlize.png";

import ServiceImg1 from "@/public/services/hassel-free-travel.jpeg";
import ServiceImg2 from "@/public/services/eco-friendly.webp";
import ServiceImg3 from "@/public/services/expert.jpeg";
import ServiceImg4 from "@/public/services/personalized.jpeg";
import ServiceImg5 from "@/public/services/reviews-sevice.webp";
import ServiceImg6 from "@/public/services/safety-trust.png";
import BestSeller4 from "@/public/BestSellers/best4.jpg";

import Image from "next/image";

import { motion } from "framer-motion";
import { whileViewVarients } from "../Animation/WhileViewVarients";
type Props = {};

const ServiceLeftImageVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.1, 0.45, 0.3, 0.98],
    },
  },
};

const ServiceRightImageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.1, 0.45, 0.3, 0.98],
    },
  },
};
export default function ServicesHome({}: Props) {
  return (
    <div className="mx-auto py-[2rem] mb-[3rem] w-11/12 lg:w-8/12 rounded-md bg-zinc-50 relative">
      {/* title  */}
      <motion.div
        variants={whileViewVarients}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="w-auto flex-col flex gap-2 justify-center items-center"
      >
        <h1 className="text-2xl md:text-3xl title home-service-title uppercase text-secondary-500 text-center  font-bold">
          Why choose us ?
        </h1>
        <hr className="bg-yellow-400 h-[4px] overflow-hidden w-[10%]" />
      </motion.div>
      <div className="w-11/12 md:w-9/12  mx-auto rounded-lg grid grid-cols-1 mt-[2rem]  relative">
        {ServicesData.map((item, index) => (
          <div
            key={index}
            className="w-full cursor-pointer md:h-[50vh]  relative"
          >
            <div className="w-full justify-center gap-4  md:gap-10 relative h-full flex  flex-col md:flex-row items-center">
              {index % 2 !== 0 && (
                <motion.div
                  variants={ServiceLeftImageVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  className={`w-full hidden  md:w-[50%] service-image-${index}  py-6 h-[50vh] md:h-full md:flex justify-center items-center`}
                >
                  <Image
                    src={item.img}
                    alt=""
                    className="w-full h-full  object-cover object-center rounded-md"
                  ></Image>
                </motion.div>
              )}

              <div
                className={`w-full md:hidden md:w-[50%] service-image-${index}  py-6 h-[50vh] md:h-full flex justify-center items-center`}
              >
                <Image
                  src={item.img}
                  alt=""
                  className="w-full h-full  object-cover object-center rounded-md"
                ></Image>
              </div>
              <motion.div
                variants={whileViewVarients}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className={`flex w-full md:w-[50%] service-desc-${index} flex-col ${
                  index % 2 !== 0 ? "text-right items-end" : ""
                }  gap-1`}
              >
                <div
                  className={`w-[3rem]  p-2 h-[3rem] bg-yellow-400 rounded-full`}
                >
                  <Image
                    src={item.icon}
                    alt={`${item.name}-logo`}
                    className="w-full h-full object-cover object-center"
                  ></Image>
                </div>
                <h2 className="font-semibold text-xl text-zinc-800">
                  {item.name}
                </h2>
                <p className="text-zinc-600 font-medium   leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
              {index % 2 === 0 && (
                <motion.div
                  variants={ServiceRightImageVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  className={`w-full hidden  md:w-[50%] service-image-${index} py-6 h-[50vh] md:h-full md:flex justify-center items-center`}
                >
                  <Image
                    src={item.img}
                    alt=""
                    className="w-full h-full  object-cover object-center rounded-md"
                  ></Image>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ServicesData = [
  {
    id: 1,
    icon: Service1,
    img: ServiceImg1,
    name: "Hassle-Free Travel",
    desc: "Experience seamless travel with our meticulously planned and executed trips, ensuring you focus only on enjoying your journey.",
  },
  {
    id: 2,
    icon: Service2,
    img: ServiceImg2,
    name: "Eco-Friendly Service",
    desc: "Embrace nature responsibly with our eco-friendly services designed to minimize environmental impact and promote sustainability.",
  },
  {
    id: 3,
    icon: Service5,
    img: ServiceImg3,
    name: "Local Himalayan Experts",
    desc: "Explore the majestic Himalayas with our local experts who bring insider knowledge and unique insights to every adventure.",
  },
  {
    id: 4,
    icon: Service6,
    img: ServiceImg4,
    name: "100% Personalized Trips",
    desc: "Customize every aspect of your trip to fit your preferences, ensuring a unique and unforgettable experience tailored just for you.",
  },
  {
    id: 5,
    icon: Service4,
    img: ServiceImg5,
    name: "5 Stars Service",
    desc: "Enjoy top-notch service and amenities throughout your journey, ensuring a luxurious and comfortable experience.",
  },
  {
    id: 6,
    icon: Service3,
    img: ServiceImg6,
    name: "Safety and Trust",
    desc: "Travel with peace of mind knowing that your safety is our top priority, backed by our trusted and experienced team.",
  },
];
