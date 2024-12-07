"use client";
import { useState, useEffect, useRef } from "react";

import styles from "./NewSlider.module.css";

import Everest from "@/public/Hero/Hero1.jpg";
import Makalu from "@/public/Hero/Makalu.jpg";
import Annapurna from "@/public/Hero/Annapurna.jpg";
import Lhotse from "@/public/Hero/Lhotse.jpg";
import { AxiosInstance } from "@/utils";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import CustomButton from "@/components/comp/CustomButton";
import Typewriter from "typewriter-effect";

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

const NewSlider = () => {
  const [itemActive, setItemActive] = useState(0);

  const [visibleItems, setVisibleItems] = useState(4); // Default to 4 items
  const [hero, setHero] = useState<any[]>([]);
  const [focused, setFocused] = useState(false);

  async function fetchTripData() {
    try {
      const res = await AxiosInstance.get(
        `/expeditions/get-all/plane-data-without-populate`,
        {
          params: {
            showInHero: true,
            
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
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1280) {
        setVisibleItems(4); // Large screens (lg)
      } else if (window.innerWidth >= 1024) {
        setVisibleItems(3); // Medium screens (md)
      } else {
        setVisibleItems(0); // Default for smaller screens
      }
    };

    updateVisibleItems(); // Initial check
    window.addEventListener("resize", updateVisibleItems);

    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setItemActive((prev) => (prev + 1) % images.length);
  //   }, 8000);

  //   return () => clearInterval(interval);
  // }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItemActive((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (index: number) => {
    setItemActive(index);
  };

  const handleNext = () => {
    setItemActive((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setItemActive((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.list}>
        {hero &&
          hero.map((src, index) => (
            <div
              className={`${styles.item} ${
                index === itemActive ? styles.active : ""
              }`}
              key={index}
            >
              <div className="absolute top-0 left-0 w-full h-[20vh] xs:h-[15vh] lg:z-10  bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
              {/* <Image
                src={src.banner}
                alt={`Slider ${index + 1}`}
                width={1920}
                height={1080}
              /> */}

              <video autoPlay muted loop className="w-full h-auto">
                <source
                  // src="https://res.cloudinary.com/dbbl19osz/video/upload/v1724147683/2024/08/c1ab2gnxaducrokwvryh.mov"
                  src="https://res.cloudinary.com/dbbl19osz/video/upload/f_auto:video,q_auto/v1/2024/09/Everest_base_Camp"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <div
                className={`${styles.content}  font-primary font-primary absolute inset-0 flex flex-col items-center justify-center text-center z-[1]  `}
              >
                {/* <p className="hidden lg:block text-[12px] xs:text-[14px] md:text-sm lg:text-base ">
                  Expedition
                </p> */}
                <h1 className="hidden lg:block title font-bold w-[70%]  text-mainHeading-md lg:text-mainHeading-lg   leading-tight">
                  {/* {src.name} */}
                  Discover the Wonders of Everest Base Camp!
                </h1>
                {/* <p className="text-sm lg:text-base w-[90%] lg:w-[55%]"> */}
                {/* {src.desc} */}
                {/* </p> */}
                <Link
                  className="hidden lg:block mt-5 xs:mt-0 sm:mt-6 sm:mb-6 lg:mt-8"
                  // href={`/new-trip/${src?.slug}`}
                  href={`/expedition/trekking?cat=everest-region`}
                >
                  <CustomButton text="Plan Your Adventure" arrow="false" />
                </Link>

                {/* searchbar */}

                {/* <div className=" relative mt-8 xs:mt-1 lg:mt-10 lg:min-w-[59.375rem]  sm:min-w-[30.375rem]   mx-2  mx-auto flex items-center text-text-dark bg-white rounded-md shadow-lg overflow-hidden p-2 normal-paragraph-md lg:text-normal-paragraph-lg font-primary">
                  <span className="absolute left-4 text-gray-500 ">
                    Search for
                  </span>
                  <div className=" ml-[6.5rem] ">
                    {" "}
                  
                    <Typewriter
                      options={{
                        strings: ["Destination", "Trip", "Mountain", "Others"],
                        autoStart: true,
                        loop: true,
                        delay: 50, 
                        deleteSpeed: 25, 
                      }}
                    />
                  </div>
                  <span className="ml-auto mr-2 cursor-pointer ">
                    <CiSearch color="black" size="23px" />
                  </span>
                </div> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewSlider;
