// "use client";
// import AllTrekMain from "@/components/website/AllTrek/AllTrekMain";
// import AllTrekPackage from "@/components/website/AllTrekPackage/AllTrekPackage";

import AllTrekPackage from "@/components/website/AllTrekPackage/AllTrekPackage";
import React, { useEffect } from "react";


type Props = {};

function Page({ params }: any) {
  const { region } = params;

  return (
    <main className="bg-secondary-50 z-[20] relative">
      <AllTrekPackage region={region} />
    </main>
  );
}

export default Page;
