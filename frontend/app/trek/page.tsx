// "use client";
// import AllTrekMain from "@/components/website/AllTrek/AllTrekMain";
import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/contour_expeditions_logo.png";
import AllTrekMain from "@/components/website/AllTrek/AllTrekMain";

type Props = {};

function Page() {
  return (
    <main className="z-[20] relative  w-full   flex justify-center ">
      <AllTrekMain />
    </main>
  );
}
export default Page;
