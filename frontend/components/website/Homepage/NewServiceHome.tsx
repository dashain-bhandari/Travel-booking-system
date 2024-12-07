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
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
// import ContourMountain from "@/public/contour-mountain.jpg";
type Props = {};

export default function NewServicesHome({}: Props) {
  useGSAP(() => {
    const textSplit = new SplitType(".home-service-title");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-service-title",
        // markers: true,
        start: "top 90%",
        end: "50% 50%",
        scrub: 2,
      },
    });
    // Perform the animations
    tl.from(
      textSplit.chars,
      {
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "sine.inOut",
      },
      "tl"
    );
    tl.from(
      ".home-service-border",
      {
        opacity: 0,
        duration: 1.5,
        ease: "sine.inOut",
      },
      "tl"
    );
    ServicesData.forEach((item, index) => {
      gsap.from(`.service-desc-${index}`, {
        // rotate: index % 2 === 0 ? "-20deg" : "20deg",
        opacity: 0.4,
        duration: 1.5,
        y: "100px",
        scrollTrigger: {
          trigger: `.service-desc-${index}`,
          // markers: true,
          start: "top 90%",
          end: "50% 50%",
          scrub: 2,
        },
      });
      gsap.from(`.service-image-${index}`, {
        rotate: 0,
        opacity: 0.4,
        duration: 1.5,
        // x: index % 2 === 0 ? "100px" : "-100px",
        scrollTrigger: {
          trigger: `.service-image-${index}`,
          // markers: true,
          start: "top 90%",
          end: "50% 50%",
          scrub: 2,
        },
      });
    });
  });
  return (
    <div className="mx-auto py-[2rem] mb-[3rem] w-11/12 md:w-8/12 rounded-md bg-zinc-50 relative ">
      {/* title  */}
      <div className="w-auto flex-col flex gap-2 justify-center items-center">
        <h1 className="text-card-title-md lg:text-card-title-lg  title home-service-title uppercase  text-center  font-bold font-primary text-dark-dark">
          Why choose us ?
        </h1>
        <hr className="bg-yellow-400 h-[4px] overflow-hidden w-[10%]" />
      </div>
      <div className="w-11/12 md:w-9/12  mx-auto rounded-lg grid grid-cols-1 mt-[2rem]  relative">
        {ServicesData.map((item, index) => (
          <div
            key={index}
            className="w-full cursor-pointer md:h-[50vh] overflow-hidden relative font-primary text-text-dark"
          >
            <div className="w-full justify-center gap-4  md:gap-10 relative h-full flex  flex-col md:flex-row items-center">
              {index % 2 !== 0 && (
                <div
                  className={`w-full hidden  md:w-[50%] service-image-${index}  py-6 h-[50vh] md:h-full md:flex justify-center items-center`}
                >
                  <Image
                    src={item.img}
                    alt=""
                    className="w-full h-full  object-cover object-center rounded-md"
                  ></Image>
                </div>
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
              <div
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
                <h2 className="font-semibold text-sub-title-lg ">
                  {item.name}
                </h2>
                <p className="text-zinc-600 font-medium  text-normal-paragraph-md lg:text-normal-paragraph-lg leading-relaxed ">
                  {item.desc}
                </p>
              </div>
              {index % 2 === 0 && (
                <div
                  className={`w-full hidden  md:w-[50%] service-image-${index} py-6 h-[50vh] md:h-full md:flex justify-center items-center`}
                >
                  <Image
                    src={item.img}
                    alt=""
                    className="w-full h-full  object-cover object-center rounded-md"
                  ></Image>
                </div>
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
