'use client'
import React, { useEffect } from "react";
import AboutusHero from "./AboutUsHero";
import Aboutus from "./AboutUs";

type Props = {};

export default function AboutUsMain({}: Props) {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      <AboutusHero />
      <Aboutus />
    </div>
  );
}
