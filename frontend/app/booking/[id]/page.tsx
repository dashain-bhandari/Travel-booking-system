"use client";
import React from "react";
import BookForm from "@/components/website/BookTrip/BookForm";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: any) {
  const searchParams = useSearchParams();
  let departure = searchParams.get("departure");
  return (
    <div className=" ">
      <BookForm
        expeditionId={params.id}
        departureId={departure}
      />
    </div>
  );
}
