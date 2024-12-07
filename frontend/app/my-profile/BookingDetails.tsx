import { Icon } from "@iconify/react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import moment from "moment";

interface BookingDetailsProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  booking: any
}

export default function BookingDetails({ setIsOpen, booking }: BookingDetailsProps) {
  const handleOpenDetail = () => {
    setIsOpen(false);
    document.body.style.overflowY = "auto";
  };
  return (
    <>
      <AnimatePresence>
        <div className="fixed top-0 left-0 backdrop-blur-sm bg-black/20  z-50 w-full h-screen flex justify-center items-center">
          <motion.div
            initial={{ y: "200px" }}
            animate={{ y: 0 }}
            exit={{ y: "100px" }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="max-w-4xl relative h-[80vh] mt-[4rem] overflow-y-scroll custom-scrollbar mx-auto bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg overflow-hidden pb-6 px-6"
          >
            <div className="sticky flex mb-4 py-4 bg-white  justify-between items-center top-0 ">
              <h1 className="text-2xl font-bold  title uppercase">
                Booking Details
              </h1>
              <div
                className="text-sm font-semibold hover:text-red-500 duration-300  text-zinc-700  cursor-pointer"
                onClick={() => handleOpenDetail()}
              >
                <Icon icon="zondicons:close-solid" className="w-6 h-6" />
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="">
                <p className="mb-2">
                  <span className="font-medium text-sm mr-2 text-zinc-800">
                    Package name:
                  </span>
                  <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                    {booking?.expedition?.name}{" "}
                    {/* <Icon icon="ph:link" className="w-4 h-4" /> */}
                  </span>
                </p>
                <p className="mb-6">
                  <span className="font-medium text-sm mr-2 text-zinc-800">
                    Trip Duration:
                  </span>
                  <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                    <time>{moment(booking?.startDate)?.format("MMMM Do YYYY")}</time>
                    {' '}
                    to
                    {' '}
                    <time>{moment(booking?.endDate)?.format("MMMM Do YYYY")}</time>
                  </span>




                </p>
              </div>

              <div className="image"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold mb-2">User Details</h2>
                <p>
                  <span className="font-medium text-sm mr-1 text-zinc-800">
                    User Full Name:
                  </span>{" "}
                  <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                    {booking?.fullName}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-sm mr-1 text-zinc-800">
                    Email Address:
                  </span>{" "}
                  <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                    {booking?.user?.email}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-sm mr-1 text-zinc-800">
                    Date of birth:
                  </span>{" "}
                  <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                    {booking?.dob?.slice(0, 10)}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-sm mr-1 text-zinc-800">
                    No of adults:
                  </span>{" "}
                  <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                    {booking?.adults}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-sm mr-1 text-zinc-800">
                    No of children:
                  </span>{" "}
                  <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                    {booking?.childrens}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-sm mr-1 text-zinc-800">
                    Postal Code:
                  </span>{" "}
                  <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                    {booking?.postalCode}
                  </span>
                </p>
               {
                booking?.note?.length>0 && ( <p>
                  <span className="font-medium text-sm mr-1 text-zinc-800">
                    Note:
                  </span>
                  <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                    {booking?.note}
                  </span>
                </p>)
               }
               {
                booking?.additionalServices?.length>0 && ( <p>
                  <span className="font-medium text-sm mr-1 text-zinc-800">
                    Additional Services:
                  </span>{" "}
                  <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                    {
                      booking && booking?.additionalServices && booking?.additionalServices?.map((item: any, idx: any) => (<span key={idx} className="text-muted-foreground mt-1">{item + ", "}
                      </span>))
                    }
                  </span>
                </p>)
               }
              </div>
              <div>
                <h2 className="text-lg font-bold mb-4">Emergency Contact</h2>
                <div className="flex flex-col gap-2">
                  <p>
                    <span className="font-medium text-sm mr-1 text-zinc-800">
                      Full Name:
                    </span>
                    <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                      {booking?.emergencyName}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-sm mr-1 text-zinc-800">
                      Phone Number:
                    </span>{" "}
                    <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                      {booking?.emergencyPhone}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-sm mr-1 text-zinc-800">
                      Relationship:
                    </span>{" "}
                    <span className="p-1 px-3  inline-block cursor-pointer rounded-md text-sm bg-zinc-200/60 hover:scale-105 duration-300">
                      {booking?.emergencyRelationship}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4">Payment Details</h2>
              <div className="bg-zinc-200/60 p-4 rounded-lg flex flex-col gap-2">
                <p>
                  <span className="font-medium text-sm">Payment Method:</span>{" "}
                  {booking?.paymentMethod}
                </p>
                <p>
                  <span className="font-medium text-sm ">Payment Option:</span>{" "}
                  {booking?.paymentOption}
                </p>
                <p>
                  <span className="font-medium text-sm mr-1 text-zinc-800 ">
                    Payment Status:
                  </span>{" "}
                  {booking?.paymentStatus == "succeeded" ? (<>
                    <span className="bg-green-500 text-[13px] rounded-full text-white font-medium text-sm px-3 py-1">
                      {booking.paymentStatus}
                    </span>
                  </>) : (<>
                    <span className="bg-red-500 text-[13px] rounded-full text-white font-medium text-sm px-3 py-1">
                      {booking.paymentStatus}
                    </span>
                  </>)}


                </p>
                <p>
                  <span className="font-medium text-sm ">Total Amount:</span>{" "}
                  {booking?.totalAmount}
                </p>
                <p>
                  <span className="font-medium text-sm ">
                    Deposited Amount:
                  </span>{" "}
                  {booking?.depositAmount}
                </p>
                <p>
                  <span className="font-medium text-sm ">
                    Remaining Amount:
                  </span>{" "}
                  {booking?.remainingAmount}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4">Trip Details</h2>
              <div className="bg-zinc-200/60 p-4 rounded-lg flex flex-col gap-2">
                <p>
                  <span className="font-medium text-sm ">Trip Name:</span> Mt.
                  {booking?.expedition?.name}
                </p>
                <p>
                  <span className="font-medium text-sm ">Max elevation:</span>{" "}
                  {booking?.expedition?.maxElevation}
                </p>
                <p>
                  <span className="font-medium text-sm ">Duration:</span> {booking?.expedition?.duration} days
                </p>
                <p>
                  <span className="font-medium text-sm ">Group Size:</span>{booking?.expedition?.groupSize}
                </p>
                <p>
                  <span className="font-medium text-sm ">Season:</span> {booking?.expedition?.season}
                </p>
              </div>
            </div>

            <p className="mt-6 text-[13px] font-medium text-gray-600">
              Booked on : {moment(booking?.createdAt)?.format("Do MMM YYYY")}
            </p>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
}
