"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Slider.module.css";
import { Icon } from "@iconify/react";
import Everest from "@/public/Hero/Hero1.jpg";
import Makalu from "@/public/Hero/Makalu.jpg";
import Annapurna from "@/public/Hero/Annapurna.jpg";
import Lhotse from "@/public/Hero/Lhotse.jpg";
import { AxiosInstance } from "@/utils";
import Link from "next/link";

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

const Slider = () => {
  const [itemActive, setItemActive] = useState(0);

  const [visibleItems, setVisibleItems] = useState(4); // Default to 4 items
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
              <div className="absolute top-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
              <Image
                src={src.banner}
                alt={`Slider ${index + 1}`}
                width={1920}
                height={1080}
              />
              <div
                className={`${styles.content} text-zinc-50 absolute left-[5%] 4xl:left-[9.4%] bottom-10  lg:top-[30%] z-[1]  `}
              >
                <p className="text-[12px] xs:text-[14px] md:text-sm lg:text-base">
                  Expedition
                </p>
                <h2 className="title font-bold md:w-[70%] w-[90%] text-[30px] sm:text-[45px] md:text-[60px] lg:text-[65px] xl:text-[70px] 2xl:text-[80px] 3xl:text-[90px] leading-tight lg:leading-none">
                  {src.name}
                </h2>
                <p className="text-sm lg:text-base w-[90%] lg:w-[55%]">
                  {/* {src.desc} */}
                </p>
                <Link className="mt-5  lg:mt-8" href={`/trip/${src?.slug}`}>
                  <button type="button" className="primary-button mt-5 ">
                    Explore now
                  </button>
                </Link>

                <div className={`${styles.arrows} flex gap-3 mt-[2rem]`}>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex justify-center items-center hover:bg-zinc-900 hover:scale-95 duration-200 !bg-zinc-800"
                  >
                    <Icon
                      icon="iconamoon:arrow-left-2-light"
                      className="w-7 h-7 object-cover object-center"
                    />
                    {""}
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex justify-center items-center hover:bg-zinc-900 hover:scale-95 duration-200 !bg-zinc-800"
                  >
                    <Icon
                      icon="iconamoon:arrow-right-2-light"
                      className="w-7 h-7 object-cover object-center"
                    />
                    {""}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div
        className={`${styles.thumbnail}  md:flex justify-end  items-end hidden absolute bottom-[5%] right-[5%] 4xl:right-[9.4%] z-[11]  gap-[10px] w-[50%] box-border `}
      >
        {images.slice(0, visibleItems).map((src, index) => (
          <div
            className={`${styles.item} ${
              index === itemActive ? styles.active : ""
            } cursor-pointer`}
            key={index}
            onClick={() => handleClick(index)}
          >
            <Image
              width={1920}
              height={1080}
              src={src.url}
              alt={`Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
