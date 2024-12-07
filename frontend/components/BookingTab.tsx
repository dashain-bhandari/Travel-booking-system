"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AxiosInstance } from "@/utils";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";

export default function BookingTab({ expedition_id, priceList }: any) {
  const pathname = usePathname();
  const expeditionId = pathname.split("/")[2];

  const [groupDepartures, setGroupDepartures] = useState([]);
  const [privateDepartures, setPrivateDepartures] = useState([]);

  useEffect(() => {
    const fetchGroupDepartures = async () => {
      try {
        console.log(expedition_id);
        const res = await AxiosInstance.get(
          `/groupDeparture/by-expiditionId/${expedition_id}`
        );
        console.log(res.data?.data);
        const sortedData =
          res?.data?.data?.sort(
            (a: any, b: any) =>
              new Date(a?.startDate)?.getTime() -
              new Date(b?.startDate)?.getTime()
          ) || [];
        console.log(sortedData);
        setGroupDepartures(sortedData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPrivateDepartures = async () => {
      try {
        const res = await AxiosInstance.get(
          `/privateDeparture/by-expiditionId/${expedition_id}`
        );

        const sortedData =
          res?.data?.data?.sort(
            (a: any, b: any) =>
              new Date(a?.startDate)?.getTime() -
              new Date(b?.startDate)?.getTime()
          ) || [];
        console.log(sortedData);
        setPrivateDepartures(sortedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroupDepartures();
    fetchPrivateDepartures();
  }, [expedition_id]);

  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const getRemainingMonths = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const next12Months = [];
    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const yearOffset = Math.floor((currentMonth + i) / 12);
      next12Months.push({
        name: months[monthIndex],
        index: monthIndex,
        year: currentYear + yearOffset,
        disabled: false,
      });
    }
    return next12Months;
  };

  const handleMonthSelect = (index: number) => {
    setSelectedMonth(index);
  };

  //for initializing the month as selected at beginning when page loads
  //   const selectGroupDeparturesAuto=()=>{
  //     const months=getRemainingMonths().find((month)=>{
  //       console.log(month)
  // return groupDepartures?.find((gd:any)=>{
  //   console.log(gd)
  //   console.log(new Date(gd?.startDate).getMonth() )
  //  if( new Date(gd?.startDate).getMonth() === month?.index){
  //   console.log(gd)
  //   return gd
  //  }
  // })

  //     }

  //   )
  //   months && setSelectedMonth(months?.index)
  //   }

  //   useEffect(()=>{
  // selectGroupDeparturesAuto()
  //   },[groupDepartures])

  //for initializing the month as selected at beginning when page loads for private depts
  //   const selectPrivateDeparturesAuto=()=>{
  //     const months=getRemainingMonths().find((month)=>{
  //       console.log(month)
  // return privateDepartures?.find((pd:any)=>{
  //   console.log(pd)
  //   console.log(new Date(pd?.startDate).getMonth() )
  //  if( new Date(pd?.startDate).getMonth() === month?.index){
  //   console.log(pd)
  //   return pd
  //  }
  // })

  //     }

  //   )
  //   months && setSelectedMonth(months?.index)
  //   }

  //   useEffect(()=>{
  // selectPrivateDeparturesAuto()
  //   },[privateDepartures])

  const [filteredGDMonths, setFilteredGDMonths] = useState<any[]>([]);

  const filterGDRemainingMonths = () => {
    const remainingMonths = getRemainingMonths().filter((month) => {
      console.log(month);
      return groupDepartures?.find((gd: any) => {
        console.log(gd);
        console.log(new Date(gd?.startDate).getMonth());
        if (new Date(gd?.startDate).getMonth() === month?.index) {
          console.log(gd);
          return gd;
        }
      });
    });
    console.log(remainingMonths);
    remainingMonths && setFilteredGDMonths(remainingMonths);
    remainingMonths?.length > 0 && setSelectedMonth(remainingMonths[0]?.index);
  };
  useEffect(() => {
    filterGDRemainingMonths();
  }, [groupDepartures]);

  const getDeparturesForSelectedMonth = (departures: any) => {
    if (selectedMonth === null) return [];
    const selectedMonthName = getRemainingMonths().find(
      (month) => month.index === selectedMonth
    )?.name;
    return departures?.filter(
      (departure: any) =>
        new Date(departure.startDate).getMonth() === selectedMonth
    );
  };

  return (
    <div className="w-full flex items-center justify-center">
      <motion.div
        variants={whileViewVarients}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="w-full"
      >
        <Tabs defaultValue="group-expedition" className=" ">
          <div>
            <TabsList className="grid grid-cols-2 gap-2 md:gap-5  w-full h-14">
              {groupDepartures && groupDepartures.length > 0 && (
                <TabsTrigger
                  value="group-expedition"
                  className="h-10   bg-zinc-100  font-semibold shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                >
                  Group
                </TabsTrigger>
              )}
              {privateDepartures && privateDepartures.length > 0 && (
                <TabsTrigger
                  value="private-expedition"
                  className="h-10 text-zinc-700 font-semibold bg-zinc-100 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                >
                  Private
                </TabsTrigger>
              )}
            </TabsList>
          </div>
          <TabsContent value="group-expedition">
            {filteredGDMonths?.length > 0 && (
              <p className="font-semibold text-gray-700/90 mb-3 mt-2">
                Select a Departure Month
              </p>
            )}
            <div className="grid w-full grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
              {filteredGDMonths?.map((month: any) => (
                <Button
                  key={month.index}
                  variant={"outline"}
                  className={`py-16 px-12 flex flex-col hover:bg-yellow-400  hover:text-black transition-all ease-in-out duration-300 ${
                    selectedMonth === month.index
                      ? "bg-yellow-400 text-black"
                      : ""
                  }`}
                  onClick={() => handleMonthSelect(month.index)}
                  disabled={month.disabled}
                >
                  <span className="text-2xl font-bold">
                    {month.name.slice(0, 3)}
                  </span>{" "}
                  <span className="text-sm text-zinc-500">{month.year}</span>
                  {/* <div className="flex mt-4  rounded-full px-4   font-semibold gap-1  items-center justify-center">
                    <Icon
                      icon="fluent:person-available-20-regular"
                      className="w-4 h-4"
                    />
                    <span className="text-base">
                      <span className="text-[11px] font-bold">
                        10/15
                        
                        </span>{" "}
                      <span className="text-zinc-700">left</span>
                    </span>
                    <div className="flex text-[11px] gap-1 ml-1 text-green-500  justify-center items-center">
                      Available
                    </div>
                  </div> */}
                </Button>
              ))}
            </div>
            {filteredGDMonths?.length == 0 && (
              <div className="text-muted-foreground pb-[5rem]">
                No departures available
              </div>
            )}
            <div className="w-full ">
              {filteredGDMonths?.length > 0 && (
                <>
                  <motion.p
                    variants={whileViewVarients}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="font-semibold text-gray-700/95 mb-4 mt-12"
                  >
                    Pick a package for your journey
                  </motion.p>
                </>
              )}
              <div className="grid  w-full md:grid-cols-1 gap-7">
                {getDeparturesForSelectedMonth(groupDepartures)?.map(
                  (departure: any, index: any) => {
                    const isSoldOut =
                      departure.totalQuantity - departure.soldQuantity === 0;

                    return (
                      <motion.div
                        variants={whileViewVarients}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        key={index}
                      >
                        <Card className="relative  flex flex-col gap-2 lg:gap-2">
                          {departure?.previousPrice &&
                            departure?.previousPrice - departure.price !==
                              0 && (
                              <div className="absolute top-0 right-0 transform -translate-x-[1rem] -translate-y-1/2 bg-yellow-500 text-white font-semibold px-3 py-1 text-sm shadow-md rotate-0">
                                {departure?.previousPrice
                                  ? `${(
                                      ((departure.previousPrice -
                                        departure.price) /
                                        departure.previousPrice) *
                                      100
                                    ).toFixed(0)}% Off`
                                  : ""}
                              </div>
                            )}

                          <div className="flex flex-col md:flex-row  justify-around w-full items-start  relative px-5 lg:px-2 pb-2  pt-5 gap-0 md:gap-1">
                            <div className="flex flex-col gap-2 h-full  justify-start items-start text-start">
                              <div className="flex flex-col relative">
                                <span className="font-bold  text-[15px]">
                                  Date
                                </span>
                                <hr className="bg-yellow-500 w-[60%] h-[2.5px] absolute bottom-0 left-0" />
                              </div>
                              <CardDescription className="flex flex-row md:flex-col gap-0 md:gap-0  justify-center   items-start">
                                <span className="flex items-center text-[13px] lg:text-sm text-nowrap font-bold text-gray-700">
                                  {departure.startDate}{" "}
                                  <IoArrowForwardCircleOutline
                                    size="20px"
                                    className="mx-1"
                                  />{" "}
                                  {/* Adds a small margin around the icon */}
                                  {departure.endDate}
                                </span>
                                {/* <span className="font-semibold text-gray-700"> */}
                                {/* <Icon
                              icon="hugeicons:arrow-right-04"
                              className="w-4 h-4"
                            /> */}
                                {/* </span> */}
                                {/* <span className="text-[13px] lg:text-sm text-nowrap  font-bold text-gray-700">
                                {departure.endDate}
                              </span> */}
                              </CardDescription>
                            </div>

                            <div className="flex h-full flex-col gap-2 justify-start items-start">
                              <div className="flex flex-col relative">
                                <span className="font-bold  text-[15px]">
                                  Available
                                </span>
                                <hr className="bg-yellow-500 w-[60%] h-[2.5px] absolute bottom-0 left-0" />
                              </div>
                              <div className="flex font-semibold gap-1 md:flex-col  items-start  justify-start">
                                <div className="flex justify-start items-center gap-1">
                                  <Icon
                                    icon="fluent:person-available-20-regular"
                                    className="w-4 h-4 lg:w-5 lg:h-5 mb-1"
                                  />
                                  <span className="text-[13px] font-bold">
                                    {/* 10/15 */}
                                    {departure?.totalQuantity -
                                      departure?.soldQuantity}
                                    {"/"}
                                    {departure?.totalQuantity}
                                  </span>{" "}
                                  {/* <span className="text-zinc-700">left</span> */}
                                </div>
                                <div className="flex text-[13px] gap-1 ml-1 text-green-500  justify-center items-center">
                                  {departure?.totalQuantity -
                                    departure?.soldQuantity >
                                  0 ? (
                                    <span className="text-green-500">
                                      {" "}
                                      {departure?.totalQuantity -
                                        departure?.soldQuantity}{" "}
                                      slots available
                                    </span>
                                  ) : (
                                    <span className="text-red-500">
                                      Sold Out
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className=" h-full flex flex-col gap-2 justify-start items-start">
                              <div className="flex flex-col relative">
                                <span className="font-bold  text-[15px]">
                                  Price
                                </span>
                                <hr className="bg-yellow-500 w-[60%] h-[2.5px] absolute bottom-0 left-0" />
                              </div>
                              <div className="flex flex-col">
                                <div className="flex w-full items-center  justify-start gap-1">
                                  <span className="text-xl  text-nowrap  font-bold text-yellow-700">
                                    {" "}
                                    USD {departure.price}
                                  </span>{" "}
                                  <span className="font-semibold text-sm text-nowrap">
                                    / person
                                  </span>
                                </div>
                                {departure.previousPrice &&
                                  departure.price &&
                                  departure.previousPrice - departure.price >
                                    0 && (
                                    <del className="text-nowrap  font-bold text-yellow-700">
                                      {" "}
                                      USD {departure.previousPrice}
                                    </del>
                                  )}{" "}
                              </div>
                            </div>

                            <div className=" h-full flex flex-col gap-2 justify-start items-start">
                              <div className="flex flex-col relative">
                                <span className="font-bold  text-[15px]">
                                  Trip Status
                                </span>
                                <hr className="bg-yellow-500 w-[60%] h-[2.5px] absolute bottom-0 left-0" />
                              </div>
                              <div className="flex flex-col">
                                <div className="flex w-full items-center  justify-start gap-1">
                                  <span className="text-[rgb(161,98,7)] text-normal-paragraph-md font-primary">
                                    Guaranteed
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="gap-2 hidden w-full md:w-auto lg:flex flex-col justify-center items-center">
                              {/* <div className="text-[12px] w-full rounded-md text-center px-10 py-3 overflow-hidden  font-semibold  bg-black text-zinc-200 flex items-center justify-center gap-1">
                              <IconCheck
                                className={`text-green-500 h-6 w-6 ${
                                  departure.confirmed ? "" : "hidden"
                                }`}
                              />{" "}
                              {departure.confirmed
                                ? "Confirmed"
                                : "Not Confirmed"}
                            </div> */}
                              {isSoldOut ? (
                                <button
                                  type="button"
                                  className="primary-button !w-full mt-4 cursor-not-allowed !cursor-not-allowed"
                                  disabled
                                >
                                  Sold Out
                                </button>
                              ) : (
                                <Link
                                  href={`/checkout/${expeditionId}?departure=${departure.groupDepartureId}&price=${departure.price}`}
                                  className="w-full"
                                >
                                  <button
                                    type="button"
                                    className="primary-button !w-full mt-4"
                                  >
                                    Book now
                                  </button>
                                </Link>
                              )}
                            </div>
                          </div>

                          <div className="gap-2  w-full md:w-auto lg:hidden flex flex-col md:flex-row p-3   justify-center items-center">
                            {/* <div className="text-[12px] w-full rounded-md text-center px-10 py-3 overflow-hidden  font-semibold  bg-black text-zinc-200 flex items-center justify-center gap-1">
                            <IconCheck
                              className={`text-green-500 h-6 w-6 ${
                                departure.confirmed ? "" : "hidden"
                              }`}
                            />{" "}
                            {departure.confirmed
                              ? "Confirmed"
                              : "Not Confirmed"}
                          </div> */}
                            {/* <Link
                              href={`/booking/${expeditionId}?departure=${departure.groupDepartureId}&price=${departure.price}`}
                              className="w-full"
                            >
                              <button
                                type="button"
                                className="text-white w-full   text-nowrap  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-10 py-3 text-center "
                                // disabled={
                                //   departure?.totalQuantity -
                                //     departure?.soldQuantity ===
                                //   0
                                //     ? true
                                //     : false
                                // }
                              >
                                Book now
                              </button>
                            </Link> */}
                          </div>
                        </Card>
                      </motion.div>
                    );
                  }
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="private-expedition">
            <SingleTrekTab expeditionId={expedition_id} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

import type { SVGProps } from "react";
import { whileViewVarients } from "./website/Animation/WhileViewVarients";
// import Link from "next/link";
// import { AxiosInstance } from "@/utils";

function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a1 1 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a1 1 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a1 1 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a1 1 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a1 1 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a1 1 0 0 1-.696-.288l-.893-.893A2.98 2.98 0 0 0 12 2m3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253l-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function SingleTrekTab({ expeditionId }: any) {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    new Date().getMonth()
  );
  const [privateDepartures, setPrivateDepartures] = useState([]);

  useEffect(() => {
    // const fetchPrivateDepartures = async () => {
    //   try {
    //     const res = await AxiosInstance.get(`/privateDeparture`, {
    //       params: {
    //         expedition: expeditionId,
    //       },
    //     });
    //     setPrivateDepartures(res?.data?.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    console.log(expeditionId);
    const fetchPrivateDepartures = async () => {
      try {
        const res = await AxiosInstance.get(
          `/privateDeparture/by-expiditionId/${expeditionId}`
        );
        const sortedData =
          res?.data?.data?.sort(
            (a: any, b: any) =>
              new Date(a?.startDate)?.getTime() -
              new Date(b?.startDate)?.getTime()
          ) || [];
        console.log(sortedData);
        setPrivateDepartures(sortedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrivateDepartures();
  }, [expeditionId]);

  const getRemainingMonths = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const next12Months = [];
    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const yearOffset = Math.floor((currentMonth + i) / 12);
      next12Months.push({
        name: months[monthIndex],
        index: monthIndex,
        year: currentYear + yearOffset,
        disabled: false,
      });
    }
    return next12Months;
  };

  const handleMonthSelect = (index: number) => {
    setSelectedMonth(index);
  };

  //for private
  const [filteredPDMonths, setFilteredPDMonths] = useState<any[]>([]);

  const filterPDRemainingMonths = () => {
    const remainingMonths = getRemainingMonths().filter((month) => {
      console.log(month);
      return privateDepartures?.find((gd: any) => {
        console.log(gd);
        console.log(new Date(gd?.startDate).getMonth());
        if (new Date(gd?.startDate).getMonth() === month?.index) {
          console.log(gd);
          return gd;
        }
      });
    });
    console.log(remainingMonths);
    remainingMonths && setFilteredPDMonths(remainingMonths);
    remainingMonths?.length > 0 && setSelectedMonth(remainingMonths[0]?.index);
  };
  useEffect(() => {
    filterPDRemainingMonths();
  }, [privateDepartures]);

  const getDeparturesForSelectedMonth = (departures: any) => {
    if (selectedMonth === null) return [];
    return departures?.filter(
      (departure: any) =>
        new Date(departure.startDate).getMonth() === selectedMonth
    );
  };

  return (
    <div className="w-full">
      <p className="font-semibold text-gray-700/95 mb-6 mt-2">
        Select a Departure Month
      </p>
      <div className="grid w-full grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredPDMonths?.map((month: any) => (
          <Button
            key={month.index}
            variant={"outline"}
            className={`py-16 px-12 flex flex-col hover:bg-yellow-400  hover:text-black transition-all ease-in-out duration-300 ${
              selectedMonth === month.index ? "bg-yellow-400 text-black" : ""
            }`}
            onClick={() => handleMonthSelect(month.index)}
            disabled={month.disabled}
          >
            <span className="text-2xl font-bold">{month.name.slice(0, 3)}</span>{" "}
            <span className="text-sm text-zinc-500">{month.year}</span>
            {/* <div className="flex mt-4  rounded-full px-4   font-semibold gap-1  items-center justify-center">
              <Icon
                icon="fluent:person-available-20-regular"
                className="w-4 h-4"
              />
              <span className="text-base">
                <span className="text-[11px] font-bold">10/15</span>{" "}
                <span className="text-zinc-700">left</span>
              </span>
              <div className="flex text-[11px] gap-1 ml-1 text-green-500  justify-center items-center">
                Available
              </div>
            </div> */}
          </Button>
        ))}
      </div>

      {filteredPDMonths?.length == 0 && (
        <>
          <div className="text-muted-foreground">No departures available</div>
        </>
      )}

      <div>
        {filteredPDMonths?.length > 0 && (
          <>
            <p className="font-semibold text-gray-700/90 mb-6 mt-12">
              Pick a package for your journey
            </p>
          </>
        )}
        <div className="flex flex-col gap-4">
          {getDeparturesForSelectedMonth(privateDepartures)?.map(
            (departure: any, index: any) => {
              const isSoldOut =
                departure.totalQuantity - departure.soldQuantity === 0;
              return (
                <Card
                  key={index}
                  className="relative flex flex-col gap-2 lg:gap-0"
                >
                  {departure?.previousPrice &&
                    departure?.previousPrice - departure.price !== 0 && (
                      <div className="absolute top-0 right-0 transform -translate-x-[1rem] -translate-y-1/2 bg-yellow-500 text-white font-semibold px-3 py-1 text-sm shadow-md rotate-0">
                        {departure?.previousPrice &&
                        departure?.previousPrice - departure.price !== 0
                          ? `${(
                              ((departure.previousPrice - departure.price) /
                                departure.previousPrice) *
                              100
                            ).toFixed(0)}% Off`
                          : `US $${departure.price}`}
                      </div>
                    )}

                  <div className="flex flex-col md:flex-row  justify-around w-full items-start  relative px-5 lg:px-8 pb-2  pt-5 gap-4 md:gap-1">
                    <div className="flex flex-col gap-2 h-full  justify-start items-start text-start">
                      <div className="flex flex-col relative">
                        <span className="font-bold  text-[15px]">Date</span>
                        <hr className="bg-yellow-500 w-[60%] h-[2.5px] absolute bottom-0 left-0" />
                      </div>
                      <CardDescription className="flex flex-row md:flex-col gap-2 md:gap-0  justify-center   items-start">
                        <span className="flex items-center text-[13px] lg:text-sm text-nowrap font-bold text-gray-700">
                          {departure.startDate}{" "}
                          <IoArrowForwardCircleOutline
                            size="20px"
                            className="mx-1"
                          />{" "}
                          {/* Adds a small margin around the icon */}
                          {departure.endDate}
                        </span>
                        {/* <span className="font-semibold text-gray-700"> */}
                        {/* <Icon
                      icon="hugeicons:arrow-right-04"
                      className="w-4 h-4"
                    /> */}
                        {/* </span>
                      <span className="text-[13px] lg:text-sm text-nowrap  font-bold text-gray-700">
                        {departure.endDate}
                      </span> */}
                      </CardDescription>
                    </div>
                    {/* 
                  <div className="flex h-full flex-col gap-2 justify-start items-start">
                    <div className="flex flex-col relative">
                      <span className="font-bold  text-[15px]">Available</span>
                      <hr className="bg-yellow-500 w-[60%] h-[2.5px] absolute bottom-0 left-0" />
                    </div>
                    <div className="flex font-semibold gap-1 md:flex-col  items-start  justify-start">
                    
                      <div className="flex text-[13px] gap-1 ml-1 text-green-500  justify-center items-center">
                        {departure?.totalQuantity - departure?.soldQuantity >
                        0 ? (
                          <span className="text-green-500">
                            {" "}
                            {departure?.totalQuantity -
                              departure?.soldQuantity}{" "}
                            slots available
                          </span>
                        ) : (
                          <span className="text-red-500">Sold Out</span>
                        )}
                      </div>
                    </div>
                  </div> */}

                    <div className=" h-full flex flex-col gap-2 justify-start items-start">
                      <div className="flex flex-col relative">
                        <span className="font-bold  text-[15px]">Price</span>
                        <hr className="bg-yellow-500 w-[60%] h-[2.5px] absolute bottom-0 left-0" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex w-full items-center  justify-start gap-1">
                          <span className="text-xl  text-nowrap  font-bold text-yellow-700">
                            {" "}
                            USD {departure.price}
                          </span>{" "}
                          <span className="font-semibold text-sm text-nowrap">
                            / person
                          </span>
                        </div>
                        {departure.previousPrice &&
                          departure.price &&
                          departure.previousPrice - departure.price > 0 && (
                            <del className="text-nowrap  font-bold text-yellow-700">
                              {" "}
                              USD {departure.previousPrice}
                            </del>
                          )}{" "}
                      </div>
                    </div>

                    <div className="gap-2 hidden w-full md:w-auto lg:flex flex-col justify-center items-center">
                      {/* <div className="text-[12px] w-full rounded-md text-center px-10 py-3 overflow-hidden  font-semibold  bg-black text-zinc-200 flex items-center justify-center gap-1">
                      <IconCheck
                        className={`text-green-500 h-6 w-6 ${
                          departure.confirmed ? "" : "hidden"
                        }`}
                      />{" "}
                      {departure.confirmed ? "Confirmed" : "Not Confirmed"}
                    </div> */}
                      {isSoldOut ? (
                        <button
                          type="button"
                          className="primary-button !w-full mt-4 cursor-not-allowed !cursor-not-allowed"
                          disabled
                        >
                          Sold Out
                        </button>
                      ) : (
                        <Link
                          // href={`/booking/${expeditionId}?departure=${departure.groupDepartureId}&price=${departure.price}`}
                          href={`/checkout/${expeditionId}?departure=${departure.groupDepartureId}&price=${departure.price}`}
                          className="w-full"
                        >
                          <button
                            type="button"
                            className="primary-button !w-full mt-4"
                          >
                            Book now
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="gap-2  w-full md:w-auto lg:hidden flex flex-col md:flex-row p-3   justify-center items-center">
                    {/* <div className="text-[12px] w-full rounded-md text-center px-10 py-3 overflow-hidden  font-semibold  bg-black text-zinc-200 flex items-center justify-center gap-1">
                    <IconCheck
                      className={`text-green-500 h-6 w-6 ${
                        departure.confirmed ? "" : "hidden"
                      }`}
                    />{" "}
                    {departure.confirmed ? "Confirmed" : "Not Confirmed"}
                  </div> */}
                    <Link
                      // href={`/booking/${expeditionId}?departure=${departure.groupDepartureId}&price=${departure.price}`}
                      href={`/checkout/${expeditionId}?departure=${departure.groupDepartureId}&price=${departure.price}`}
                      className="w-full"
                    >
                      <button
                        type="button"
                        className="text-white w-full   text-nowrap  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-10 py-3 text-center "
                        // disabled={
                        //   departure?.totalQuantity - departure?.soldQuantity === 0
                        //     ? true
                        //     : false
                        // }
                      >
                        Book now
                      </button>
                    </Link>
                  </div>
                </Card>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
