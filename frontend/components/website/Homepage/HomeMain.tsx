"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Faq from "./Faq";
import ServicesHome from "./ServicesHome";
import UpcomingExpedition from "./UpcomingExpedition";
import Banner from "./Banner";
import Slider from "./try2";
import PartnersHome from "./PartnerHome";
import HomeAbout from "./HomeAbout";
import Hero from "./Hero";
type Props = {};

gsap.registerPlugin(ScrollTrigger);

function HomeMain({ bestSellerExpeditions }: any) {
  return (
    <>
      <div className=" w-full relative overflow-hidden">
        <div className="h-screen relative w-full">
          {/* <Slider /> */}
          <Hero />
        </div>
        <div className="w-full relative  content-main  z-20">
          <div className="w-full  mx-auto">
            <PartnersHome />
          </div>
          <div className="w-full  mx-auto">
            <HomeAbout expeditions={bestSellerExpeditions} />
          </div>
          <div className="w-full mx-auto">
            <ServicesHome />
          </div>
          <div className="w-full  mx-auto">
            <UpcomingExpedition />
          </div>

          <div className="w-full mx-auto">
            <Faq />
          </div>
          <div className="w-full mx-auto">
            <Banner />
          </div>
          {/* <OurExpert /> */}
        </div>
      </div>
    </>
  );
}

export default HomeMain;
