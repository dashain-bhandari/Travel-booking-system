"use client"
import BarChart1 from "@/components/dashboard/charts/BarChart1";
import BarChartInteractive1 from "@/components/dashboard/charts/BarChartInteractive1";
import PieChart1 from "@/components/dashboard/charts/PieChart1";
import PieChart2 from "@/components/dashboard/charts/PieChart2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { number } from "zod";
import { fetchAdvData, fetchBookingTrendsData, fetchData, fetchFullData } from "@/serverside/overviewFetch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { start } from "repl";
import Notification from "@/components/dashboard/Notification";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
export default function Page() {
  const [startDate, setStartDate] = React.useState<any>(null)
  const [endDate, setEndDate] = React.useState<any>(
    null
  )
  const [date, setDate] = useState<any>({
    startDate: "",
    endDate: ""
  })

  const [data, setData] = useState<any>({ bookings: 0, revenue: 0, trekkers: 0, averageBookingValue: 0, outstandingPayments: 0 });

  const [fullPayment, setFullPayment] = useState<any>({
    totalFullPayments: 0,
    averageFullPayments: 0
  })

  const [advPayment, setAdvPayment] = useState<any>({
    totalDepositPayments: 0,
    averageDepositPayments: 0
  })

  const [bookingTrend, setBookingTrend] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("this-year");

  // Fetch data on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        console.log(date)
        const response = await fetchData(date);
        console.log(response)
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [date]);


  useEffect(() => {
    const getBookingTrendData = async () => {
      try {
        console.log(date)
        const response = await fetchBookingTrendsData(date);
        console.log(response)
        response?.dailyPayments && setBookingTrend(response?.dailyPayments)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getBookingTrendData();
  }, [date]);


  useEffect(() => {
    const getFullPaymentData = async () => {
      try {
        console.log(date)
        const response = await fetchFullData(date);
        console.log(response)
        response && setFullPayment(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getFullPaymentData();
  }, [date]);

  useEffect(() => {
    const getAveragePaymentData = async () => {
      try {
        console.log(date)
        const response = await fetchAdvData(date);
        console.log(response)
        response && setAdvPayment(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAveragePaymentData();
  }, [date]);
  useEffect(
    () => {
      if (selected == "today") {
        const now = new Date();
        setDate({
          startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0),
          endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999),
        })
      }
      else if (selected == "yesterday") {
        const now = new Date();
        setDate({
          startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0, 0),
          endDate: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate() - 1, 23, 59, 59, 999),
        })
      }
      else if (selected == "this-month") {
        const now = new Date();

        // Start of the current month
        const startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)

        // End of the current month
        const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

        setDate({
          startDate,
          endDate
        });
      }
      else if (selected == "last-month") {
        const now = new Date();

        // Start of the current month
        const startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0)

        // End of the current month
        const endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)

        setDate({
          startDate,
          endDate
        });
      }
      else if (selected == "this-week") {
        const now = new Date();
        console.log(now.getDay());
        console.log(now.getDate());
        // Start of the current month
        const startDate = new Date();
        startDate.setDate(now.getDate() - now.getDay());
        startDate.setHours(0, 0, 0, 0)

        // End of the current month
        const endDate = now;
        endDate.setHours(23, 59, 59, 999)
        console.log(endDate)
        setDate({
          startDate,
          endDate
        });
      }
      else if (selected == "last-week") {
        const now = new Date();
        console.log(now.getDay());
        console.log(now.getDate());
        // Start of the current month
        const startDate = new Date();
        startDate.setDate(now.getDate() - now.getDay() - 6);
        startDate.setHours(0, 0, 0, 0)

        // End of the current month
        const endDate = now;
        endDate.setDate(now.getDate() - now.getDay());
        endDate.setHours(23, 59, 59, 999)
        console.log(endDate)
        setDate({
          startDate,
          endDate
        });
      }
      else if (selected == "this-year") {
        const now = new Date();
        console.log(now.getDay());
        console.log(now.getDate());
        // Start of the current month
        const startDate = new Date(now.getFullYear(), 0, 0);

        startDate.setHours(0, 0, 0, 0)


        const endDate = now;

        endDate.setHours(23, 59, 59, 999)
        console.log(endDate)
        setDate({
          startDate,
          endDate
        });
      }
      else if (selected == "last-year") {
        const now = new Date();
        console.log(now.getDay());
        console.log(now.getDate());
        // Start of the current month
        const startDate = new Date(now.getFullYear() - 1, 0, 0);

        startDate.setHours(0, 0, 0, 0)


        const endDate = new Date(now.getFullYear(), 0, 0);

        endDate.setHours(23, 59, 59, 999)
        console.log(endDate)
        setDate({
          startDate,
          endDate
        });
      }
      else if (selected == "this-quarter") {
        const now = new Date();
        const month = now.getMonth(); // 0 for January, 1 for February, etc.
        const year = now.getFullYear();

        let startDate, endDate;

        // Determine the start and end dates of the current quarter
        if (month >= 0 && month <= 2) { // Q1: January, February, March
          startDate = new Date(year, 0, 1); // January 1
          endDate = new Date(year, 2, 31); // March 31
        } else if (month >= 3 && month <= 5) { // Q2: April, May, June
          startDate = new Date(year, 3, 1); // April 1
          endDate = new Date(year, 5, 30); // June 30
        } else if (month >= 6 && month <= 8) { // Q3: July, August, September
          startDate = new Date(year, 5, 1); // July 1
          endDate = new Date(year, 8, 30); // September 30
        } else { // Q4: October, November, December
          startDate = new Date(year, 9, 1); // October 1
          endDate = new Date(year, 11, 31); // December 31
        }
        endDate.setHours(23, 59, 59, 999)
        console.log(endDate)
        setDate({
          startDate,
          endDate
        });
      }

      
    }, [selected]
  )

  useEffect(()=>{
    if(selected=="custom" && startDate && endDate)
      {
        setDate(
          {
            startDate,endDate
          }
        )
      }
  },[startDate,endDate])
  return (
    <div className="  w-full space-y-4">
      <div className="flex flex-row justify-between items-center">
        <div>Overview</div>
        {
          selected == "custom" && (<div className="flex flex-row gap-2 items-center">
           
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              -
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>End date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

    
          </div>)
        }
        <Select onValueChange={(val: any) => {
          setSelected(val)
        }} defaultValue={selected}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>

            <SelectItem value="custom">Custom</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="this-week">This week</SelectItem>
              <SelectItem value="last-week">Last week</SelectItem>
              <SelectItem value="this-month">This month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-year">This year</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
              <SelectItem value="this-quarter">This quarter</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className=" grid gap-4 md:grid-cols-2 xl:grid-cols-3 ">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>
              Total Revenue
            </CardTitle>
            <CardDescription>$ {data?.revenue}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>
              Total Bookings
            </CardTitle>
            <CardDescription>{data?.bookings}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>
              Total Trekkers
            </CardTitle>
            <CardDescription>{data?.trekkers}</CardDescription>
          </CardHeader>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>
              Average Booking Value
            </CardTitle>
            <CardDescription>$ {data?.averageBookingValue}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>
              Total Full Payments
            </CardTitle>
            <CardDescription>$ {fullPayment?.totalFullPayments}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>
              Average Full Payments
            </CardTitle>
            <CardDescription>$ {fullPayment?.averageFullPayments}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>
              Total advance payments
            </CardTitle>
            <CardDescription>$ {advPayment?.totalDepositPayments}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>
              Average Advance Payments
            </CardTitle>
            <CardDescription>$ {advPayment?.averageDepositPayments}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>
              Total Outstanding Payments
            </CardTitle>
            <CardDescription>$ {data?.outstandingPayments}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <BarChartInteractive1 bookingTrend={bookingTrend} />
      <Notification />
    </div>
  );
}

function StatCard({ title, value, icon, description }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium uppercase">{title}</CardTitle>

        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}
