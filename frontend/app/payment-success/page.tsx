"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AxiosInstance } from "@/utils";
import jsPDF from "jspdf";
type Props = {};

export default function Page({}: Props) {
  //   const searchParams = useSearchParams();
  //   const bookingId = searchParams.get('bookingId');
  //   console.log(bookingId)
  //   const [booking, setBooking] = useState<any>(undefined);
  //   const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);
  //   useEffect(() => {

  //     const fetchBooking = async () => {
  //       try {
  //         const { data } = await AxiosInstance.get(`/bookings/${bookingId}`);
  //         console.log(data);
  //         setBooking(data?.data)
  //       } catch (error: any) {
  //         console.log(error.message);
  //       }
  //     }

  //     fetchBooking();

  //   }, [bookingId]);

  // useEffect(()=>{

  //   const generatePDF = async () => {
  //     if(booking && !booking.invoiceSent && !pdfGenerated)
  //     {
  //      const pdf = new jsPDF();
  //      pdf.setFontSize(16);
  //      pdf.text("Hello,Dashain!", 10, 10);
  //      const pdfOutput = pdf.output('datauristring');
  //      const pdfToSend = pdfOutput.split(',')[1];
  //      console.log({ pdf: pdfToSend })
  //      try {

  //        const {data}=await AxiosInstance.post( `/bookings/sendInvoice/${bookingId}`,{pdf:pdfToSend});
  //        setPdfGenerated(true);
  //        console.log(data);
  //      } catch (error: any) {
  //        console.log(error.message)
  //      }
  //     }
  //    };
  //    generatePDF();
  // },[booking])

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-11/12 md:w-4/12 lg:w-3/12   bg-gradient-to-br  from-zinc-50 to-zinc-200 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-md p-10 py-20 flex justify-center items-center flex-col gap-3">
        <div className="w-[5rem] h-[5rem]">
          <Icon
            icon="icon-park-solid:success"
            className="w-full text-green-500 h-full object-cover object-center"
          />
        </div>

        <p className="text-center text-zinc-700">
          Congratulation, Your payment has been successfully processed.
        </p>

        <Link href="/my-profile">
          <button className="text-white w-full mt-5  home-about-button  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center me-2 mb-2">
            Visit profile
          </button>
        </Link>
      </div>
    </div>
  );
}
