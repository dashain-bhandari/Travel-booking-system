"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NewSlider from "./newTry2";
import NewPartnersHome from "./NewPartnerHome";
import NewHomeAbout from "./NewHomeAbout";
import NewUpcomingExpedition from "./NewUpcomingExpedition";
import NewFaq from "./NewFaq";
import NewSliderComponent from "./NewSliderComponent";

type Props = {};

gsap.registerPlugin(ScrollTrigger);

function NewHomeMain({ bestSellerExpeditions }: any) {
  return (
    <>
      <div className=" w-full relative overflow-hidden">
        <div className=" relative w-full">
          <NewSlider />
        </div>
        <div className="w-full relative  content-main  z-20">
          {/* <div className="w-full  mx-auto">
            <NewPartnersHome />
          </div> */}
          <div className="w-full  mx-auto">
            <NewHomeAbout expeditions={bestSellerExpeditions} />
          </div>

          <div className="w-full  mx-auto">
            <NewUpcomingExpedition />
          </div>
          <div className="w-full  mx-auto">
            <NewSliderComponent />
          </div>
          <div className="w-full mx-auto">
            <NewFaq />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewHomeMain;
