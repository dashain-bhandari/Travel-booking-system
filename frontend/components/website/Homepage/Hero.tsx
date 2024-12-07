import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Everest from "@/public/Hero/Hero1.jpg";
import Makalu from "@/public/Hero/Makalu.jpg";
import Annapurna from "@/public/Hero/Annapurna.jpg";
import Lhotse from "@/public/Hero/Lhotse.jpg";
import Link from "next/link";
import { AxiosInstance } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Noise from "@/public/noise.svg";
// Updated images array with objects
const images = [
  {
    id: 1,
    name: "Everest",
    url: Everest,
    desc: "The highest mountain in the world, known for its breathtaking beauty and challenging climbs.",
  },
  {
    id: 3,
    name: "Makalu",
    url: Makalu,
    desc: "A majestic peak in the Himalayas, known for its isolated location and steep ascent.",
  },
  {
    id: 4,
    name: "Annapurna",
    url: Annapurna,
    desc: "Famous for its treacherous weather and high fatality rate, yet mesmerizing beauty.",
  },
  {
    id: 5,
    name: "Lhotse",
    url: Lhotse,
    desc: "The fourth-highest mountain, renowned for its striking South Face and proximity to Everest.",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [hero, setHero] = useState<any[]>([]);

  async function fetchTripData() {
    try {
      const res = await AxiosInstance.get(
        `/expeditions/get-all/plane-data-without-populate`,
        {
          params: {
            showInHero: true
            ,
          isPublished:true
          },
        }
      );
      setHero(res?.data?.data || []);
    } catch (error: any) {
      console.error("Failed to fetch categories:", error.message);
      return [];
    }
  }
  useEffect(() => {
    fetchTripData();
  }, []);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [currentIndex]);

  // Motion Variants for staggered animations
  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Stagger the animations with a delay of 0.2s
      },
    },
  };

  const textVariant = {
    hidden: { y: 100, opacity: 0, filter: "blur(4px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 1.5, ease: "backOut" },
    },
  };

  return (
    <>
      <div className="hero-section relative w-full h-screen overflow-hidden">
        <Image
          width={2000}
          height={2000}
          alt=""
          src={Noise}
          className="absolute pointer-events-none top-0 left-0 w-full h-full object-cover object-center z-20"
        ></Image>
        <div className="absolute top-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[60%] z-10 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>
        <AnimatePresence>
          <motion.div
            key={hero[currentIndex]?._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <Image
              width={5000}
              height={5000}
              src={hero[currentIndex]?.banner}
              alt={hero[currentIndex]?.name}
              objectFit="cover"
              objectPosition="center"
              priority
              className="brightness-[0.68] w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div className="hero-content w-full 4xl:w-11/12 mx-auto  flex justify-start items-end h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-10">
          <motion.div
            className="flex justify-end w-11/12 mx-auto mb-[20vh]  items-start flex-col"
            key={currentIndex}
            initial="hidden"
            animate="visible"
            variants={containerVariant}
            exit={{}}
          >
            <motion.p
              key={`${hero[currentIndex]?._id}-expedition`}
              className="text-[12px] tracking-[0.8rem] uppercase xs:text-[14px] md:text-sm lg:text-base"
              variants={textVariant}
            >
              Expedition
            </motion.p>
            <motion.h1
              key={`${hero[currentIndex]?._id}-name`}
              className="title font-bold text-left  w-11/12 md:W-[80%] lg:w-[60%] text-[35px] xs:text-[45px] md:text-[55px] lg:text-[70px] 4xl:text-[85px] leading-none"
              variants={textVariant}
            >
              {hero[currentIndex]?.name}
            </motion.h1>
            <motion.div
              key={`${hero[currentIndex]?._id}-explore`}
              variants={textVariant}
              className=""
            >
              <Link href={`/trip/${hero[currentIndex]?.slug}`} className="">
                <button type="button" className="primary-button mt-5 lg:mt-8">
                  Explore now
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="navigation absolute z-20 bottom-8 left-[5%] 4xl:left-[9%] flex gap-2 mt-5">
          <button
            onClick={handlePrev}
            className="flex justify-center items-center hover:bg-zinc-900 hover:scale-95 text-white duration-200 px-3 py-3  cursor-pointer bg-zinc-800 rounded-full"
          >
            <Icon
              icon="ic:sharp-double-arrow"
              className="w-6 h-6 object-cover rotate-180 object-center"
            />
          </button>
          <button
            onClick={handleNext}
            className="flex justify-center items-center hover:bg-zinc-900 hover:scale-95 text-white duration-200 px-3 py-3  cursor-pointer bg-zinc-800 rounded-full"
          >
            <Icon
              icon="ic:sharp-double-arrow"
              className="w-6 h-6 object-cover object-center"
            />
          </button>
        </div>
        <div className="card-section  hidden absolute bottom-8 left-1/2 h-[15vh] -translate-x-1/2  lg:flex justify-end w-11/12 4xl:w-10/12  mx-auto items-end gap-4 z-10">
          {hero?.slice(0, 4).map((image, index) => (
            <div
              key={image?._id}
              onClick={() => setCurrentIndex(index)}
              className={`card w-[15%] hover:brightness-100 hover:scale-95 duration-300 h-full overflow-hidden rounded-lg cursor-pointer ${
                index === currentIndex
                  ? "brightness-100 scale-95"
                  : "brightness-[0.7]"
              }`}
            >
              <Image
                src={image.banner}
                alt={image.name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
