"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loadStripe } from "@stripe/stripe-js";
import jsPDF from "jspdf";

const formSchema = z.object({
  fullName: z.string().min(1, {
    message: "Name is required.",
  }),
  email: z.string().min(1, {
    message: "Email is required.",
  }),
  phone: z.string().min(1, {
    message: "Number is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
  dob: z.string().min(1, {
    message: "Dob is required.",
  }),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  activityName:z.string().optional(),
  postalCode: z.coerce.number(),

})

import React, { act, useContext, useEffect, useState } from 'react'
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css";
import Link from "next/link"
import { AxiosInstance } from "@/utils"
import { toast } from "sonner"
import { Loader, Save } from "lucide-react"
import moment from "moment"
import { GlobalContext } from "@/context/GlobalContext"

type Props = {
  params: {
    activity: string;
  };
};
function Page({ params }: Props) {
const {currentUser}=useContext(GlobalContext) as any

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      dob: undefined,
      startDate: undefined,
      endDate: undefined,
postalCode:0
    },
  })

  const [isCreating, setIsCreating] = useState<boolean>(false);

  const { watch, setValue } = form;
  const [activity, setActivity] = useState<any>(undefined);
  console.log(params.activity)
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const { data } = await AxiosInstance.get(`/activities/${params?.activity}`);
        console.log(data)
        setActivity(data?.data);
        setValue("activityName",data?.data?.name)
      } catch (error: any) {
        console.log(error?.message)
      }
    }
    fetchActivity()
  }, [params?.activity])


  //generate invoice

  const generatePDF = async (booking: any) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 15;
    const pageWidth = 210;
    const pageHeight = 295;

    let yPosition = margin;

    // Function to add a new page if needed
    const addPageIfNeeded = (heightNeeded: number) => {
      if (yPosition + heightNeeded > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
    };

    const fontSize = 12; // Set a default font size
    const lineHeight = fontSize * 1; // Line height (1.2 times the font size is a common choice)

    const setFont = (size: number, style: "normal" | "bold" = "normal") => {
      pdf.setFontSize(size);
      pdf.setFont("helvetica", style);
    };

    const addText = (text: string, x: number, y: number, maxWidth?: number) => {
      const lines = pdf.splitTextToSize(
        text,
        maxWidth || pageWidth - 2 * margin
      );
      lines.forEach((line: any) => {
        addPageIfNeeded(lineHeight);
        pdf.text(line, x, y);
      });
    };

    // Title
    setFont(18, "bold");

    pdf.text("Contour Expeditions", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 20;

    // Booking Details
    setFont(14, "bold");
    addText("Booking Details", margin, yPosition);
    yPosition += 10;

    setFont(12, "normal");
    const bookingDetails = [
      `Package Name: ${booking?.expedition?.name}`,
      `Trip Duration: ${moment(booking?.startDate).format(
        "MMMM Do YYYY"
      )} to ${moment(booking?.endDate).format("MMMM Do YYYY")}`,
    ];

    bookingDetails.forEach((detail: any) => {
      addText(detail, margin, yPosition);
      yPosition += lineHeight;
    });
    yPosition += 20;
    // User Details
    setFont(14, "bold");
    addText("User Details", margin, yPosition);
    yPosition += 10;

    const userDetails = [
      `User Full Name: ${booking?.fullName}`,
      `Email Address: ${booking?.email || booking?.user?.email}`,
      `Date of Birth: ${booking?.dob?.slice(0, 10)}`,
      `No of Adults: ${booking?.adults}`,
      `No of Children: ${booking?.childrens}`,
      `Postal Code: ${booking?.postalCode}`,
      `Note: ${booking?.note}`,
      `Additional Services: ${
        booking?.additionalServices
          ? booking?.additionalServices.join(", ")
          : ""
      }`,
    ];
    setFont(12, "normal");
    userDetails.forEach((detail: any) => {
      addText(detail, margin, yPosition);
      yPosition += lineHeight;
    });
    yPosition += 20;
    // Emergency Contact
    addPageIfNeeded(20);
    setFont(14, "bold");
    addText("Emergency Contact", margin, yPosition);
    yPosition += 10;

    const emergencyContact = [
      `Full Name: ${booking?.emergencyName}`,
      `Phone Number: ${booking?.emergencyPhone}`,
      `Relationship: ${booking?.emergencyRelationship}`,
    ];
    setFont(12, "normal");
    emergencyContact.forEach((contact: any) => {
      addText(contact, margin, yPosition);
      yPosition += lineHeight;
    });

    yPosition += 20;
    // Payment Details
    addPageIfNeeded(20);
    setFont(14, "bold");
    addText("Payment Details", margin, yPosition);
    yPosition += 10;

    const paymentDetails = [
      `Payment Method: ${booking?.paymentMethod}`,
      `Payment Option: ${booking?.paymentOption}`,
      `Payment Status: ${booking?.paymentStatus}`,
      `Total Amount: ${booking?.totalAmount}`,
      `Deposited Amount: ${booking?.depositAmount}`,
      `Remaining Amount: ${booking?.remainingAmount}`,
    ];
    setFont(12, "normal");
    paymentDetails.forEach((payment: any) => {
      addText(payment, margin, yPosition);
      yPosition += lineHeight;
    });

    yPosition += 20;
    // Trip Details
    addPageIfNeeded(20);
    setFont(14, "bold");
    addText("Trip Details", margin, yPosition);
    yPosition += 10;

    const tripDetails = [
      `Trip Name: ${booking?.expedition?.name}`,
      `Max Elevation: ${booking?.expedition?.maxElevation}`,
      `Duration: ${booking?.expedition?.duration}`,
      `Accommodation: ${booking?.expedition?.accommodation}`,
      `Season: ${booking?.expedition?.season}`,
    ];
    setFont(12, "normal");
    tripDetails.forEach((trip: any) => {
      addText(trip, margin, yPosition);
      yPosition += lineHeight;
    });

  

    const pdfOutput = pdf.output("datauristring");
    const pdfToSend = pdfOutput.split(",")[1];
    console.log({ pdf: pdfToSend });
    try {
      const res = await AxiosInstance.post(
        `/bookings/sendInvoice/${booking?.bookingId}`,
        { pdf: pdfToSend }
      );
      console.log(res);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const makePayment = async (data: any) => {
    // const stripe: any = await loadStripe("pk_test_51Pdoi1RuZnZAwk3CqntaIZRocOQcs5U4jZeL0bbJvC3KnxMrRGsirlIVraiwHtE7Vh8RbWb3E05XOZfoAimAmMqV00r0ZnAki9");
    const stripe: any = await loadStripe(
      "pk_test_51PJx9VP6BesDH0OVTE3ZT8b9e5Jbi5AORD3vtQzhrqBdPSfpvGjUZvx9rtXEigAA247bhHdhacTnPOPFzAMfC89i00mu2vfNCf"
    );
    // const stripe:any = await loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);

 
    console.log("grandTotal:", data.grandTotal);
    console.log("depositAmount:", data.depositAmount);
    console.log("amountToCharge:", data?.amountDue);
    console.log(data.bookingId);

    const fetchStripe = await fetch("/api/create-payment-intent", {
      // const fetchStripe = await fetch("https://contour-frontend-new-updated.vercel.app/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: data?.grandTotal,
        email: "customer@example.com",
        success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-success?bookingId=${data.bookingId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-failure?bookingId=${data.bookingId}`,
        paymentOption: data.paymentOption,
      }),
    });

    const response = await fetchStripe.json();
    console.log(response);

    if (response.id) {
      console.log(response.id);

      const bookingData = await AxiosInstance.get(
        `/bookings/${data.bookingId}`
      );
      console.log(bookingData.data.data);
      // update
      const bookingUpdate = await AxiosInstance.patch(
        `/bookings/${data.bookingId}`,
        {
          paymentId: response.id,
        }
      );

      console.log(bookingUpdate.data.data.paymentId);
     

      const result: any =
        stripe && (await stripe.redirectToCheckout({ sessionId: response.id }));

      if (result.error) {
        console.error(result.error.message);
      }
    }
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true);

    try {
      console.log(values);
      const bookingRes = await AxiosInstance.post("bookings", { ...values, activity: activity?._id,user:currentUser?._id,type:"activity",
        paymentOption:"full-payment",
        totalAmount: 5000,
        depositAmount: 0,
        remainingAmount: 0,
       });
      if (bookingRes.status === 201) {
        // Get the booking ID from the response
        const bookingId = bookingRes.data.data.bookingId;
        const booking_id = bookingRes.data.data._id;

        // Make payment with Stripe
        const paymentResponse = await makePayment({
       
          grandTotal:5000,
          depositAmount:5000,
          amountDue:0,
          bookingId,
          booking_id,
        });

        console.log(paymentResponse);

      form.reset();
      setIsCreating(false);
      toast.success("Booking success");
    } }catch (error: any) {
      console.log(error)
      toast.error("Something went wrong");
      setIsCreating(false);
    }
  };

 

  return (
    <>
      <div className="w-11/12 4xl:w-10/12 relative  mx-auto py-[5rem]">
        <div className="flex rounded-lg w-full  flex-col items-center py-[2rem] pb-[5rem] px-[1rem] md:px-[5rem] lg:px-[10rem] gap-10 bg-[#FFF]">

          {
             (<>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                  <Link href={`/other_activities/${params?.activity}`} className="self-start underline-offset-1 underline text-yellow-500">back</Link>
                  <div className="flex  lg:flex-row flex-col gap-3 justify-center items-center">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Full Name <span className="text-yellow-500">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input
                              placeholder="John Doe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                      <FormField
                      control={form.control}
                      name="activityName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Activity Name <span className="text-yellow-500"></span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input
                            readOnly
                              placeholder="rafting"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>


                  <div className="flex lg:flex-row flex-col gap-3 w-full justify-center items-center">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Phone number <span className="text-yellow-500">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <PhoneInput
                              className="w-full"
                              defaultCountry="ua"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                      <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Postal Code <span className="text-yellow-500">*</span>
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            className="w-full"
                            type="number"
                            placeholder="649469"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Email <span className="text-yellow-500">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input
                              className="w-full"
                              type="email"
                              placeholder="ram@gmail.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </div>
                  <div className="flex  lg:flex-row flex-col gap-3 justify-center items-center">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Country <span className="text-yellow-500">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input
                              className="w-full"

                              placeholder="Nepal"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Date of birth <span className="text-yellow-500">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input
                              type="date"
                              className="w-full"

                              placeholder="Nepal"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex  lg:flex-row flex-col gap-3 justify-center items-center">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Arrival Date <span className="text-yellow-500">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input
                              type="date"
                              className="w-full"


                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Departure Date <span className="text-yellow-500">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input
                              type="date"
                              className="w-full"


                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" disabled={!activity}>
                  {isCreating ? (
                                <Loader
                                    size={16}
                                    className=" animate-spin mr-2 "
                                />
                            ) : (
                                <Save
                                    size={16}
                                    className="mr-1"
                                />
                            )}
                            Submit
                  </Button>
                </form>
              </Form>
            </>)
          }
        </div>
      </div>


    </>
  )
}

export default Page