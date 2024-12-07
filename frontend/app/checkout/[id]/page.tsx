"use client";
import React from "react";

import { useSearchParams } from "next/navigation";
import NewBookForm from "@/components/website/NewBookTrip/NewBookForm";

export default function Page({ params }: any) {
  const searchParams = useSearchParams();
  let departure = searchParams.get("departure");
  return (
    <div className=" ">
      <NewBookForm expeditionId={params.id} departureId={departure} />
    </div>
  );
}
