"use client";
import { AxiosInstance, ClientSideAxiosInstance } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loadStripe } from "@stripe/stripe-js";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Icon } from "@iconify/react";
import FieldOptionalText from "@/components/FieldOptionalText";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader } from "lucide-react";
import Login from "./(components)/Login";
import Register from "./(components)/Register";
import { formSchema } from ".";
import { toast } from "sonner";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaymentImg from "@/public/payment-img.png";
import jsPDF from "jspdf";
import moment from "moment";

export default function BookForm({ expeditionId }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      dob: new Date(),
      adults: 1,
      childrens: 0,
      note: "",
      passportNumber: "",
      isTermAndConditionChecked: false,
      emergencyName: "",
      emergencyRelationship: "",
      emergencyPhone: "",
      paymentOption: "full-payment",
      postalCode: 0,
      additionalServices: [],
    },
  });

  const { watch, setValue } = form;
  const [applying, setApplying] = useState(false);
  const [isUserAlreadyHaveAccount, setisUserAlreadyHaveAccount] =
    useState(false);
  const [adultsPrice, setAdultsPrice] = useState(0);
  const [childrensPrice, setChildrensPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [vat, setVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [amountDue, setAmountDue] = useState(0);
  const [bankCharge, setBankCharge] = useState(0);
  const [promoDiscount, setPromoDiscount] = useState(0);
  // States to get expeditionId and departureId from the URL
  const searchParams = useSearchParams();
  const departureId = searchParams.get("departure");
  const price = searchParams.get("price");
  console.log(price);
  const whichDeparture = departureId?.split("_")[0];

  //fetch additional services
  const [addOns, setAddOns] = useState<any>([]);
  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        const res = await AxiosInstance.get(`/add-ons`);
        setAddOns(res?.data?.data);
        console.log(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddOns();
  }, []);

  // Get Expedition Detail
  const [expedition, setExpedition] = useState<any>([]);
  const [adultDiscounts, setAdultDiscounts] = useState<any[]>([]);
  const [childrenDiscounts, setChildrenDiscounts] = useState<any[]>([]);
  const [pricePerAdult, setPricePerAdult] = useState<any>(0);
  const [pricePerChildren, setPricePerChildren] = useState<any>(0);

  useEffect(() => {
    const fetchExpedition = async () => {
      try {
        const res = await AxiosInstance.get(`/expeditions/${expeditionId}`);
        console.log(res?.data?.data);
        setExpedition(res?.data?.data);
        res?.data?.data &&
          setAdultDiscounts(res?.data?.data?.price?.adult?.discountsA || []);
        res?.data?.data &&
          setChildrenDiscounts(
            res?.data?.data?.price?.children?.discountsC || []
          );
        res?.data?.data &&
          setPricePerAdult(
            res?.data?.data?.price?.adult?.pricePerAdult || price
          );
        res?.data?.data &&
          setPricePerChildren(
            res?.data?.data?.price?.children?.pricePerChildren || price
          );
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpedition();
  }, [expeditionId]);

  useEffect(() => {
    console.log(adultDiscounts);
    console.log(childrenDiscounts);
  }, [adultDiscounts, childrenDiscounts]);

  const today = new Date();
  //check for available promo
  const [isPromoAvailable, setIsPromoAvailable] = useState("no");

  const applyPromo = () => {
    setApplying(true);
    console.log(expedition?.promoCode);
    if (expedition?.promoCode) {
      console.log(code);
      if (expedition?.promoCode?.code == code) {
        const expiration = new Date(expedition?.promoCode?.expiration);
        expiration.setHours(23, 59, 59);
        if (today <= expiration) {
          console.log(expiration);
          console.log(true);
          setIsPromoAvailable("true");
          console.log(today);
          console.log(expiration);
        } else {
          console.log(today);
          console.log(expedition?.promoCode?.expiration);
          console.log(false);
          setIsPromoAvailable("false");
          toast.error("Promo has been expired.");
        }
      } else {
        setIsPromoAvailable("false");
        toast.error("Promo doesn't exist.");
      }
      setApplying(false);
    } else {
      setIsPromoAvailable("false");
      setApplying(false);
      console.log(isPromoAvailable);
      toast.error("Promo doesn't exist.");
    }
  };

  useEffect(() => {
    console.log(isPromoAvailable);
  }, [isPromoAvailable]);
  // Get Departure Detail
  const [departure, setDeparture] = useState<any>({});
  useEffect(() => {
    const fetchDeparture = async () => {
      try {
        if (whichDeparture === "groupDeparture") {
          const res = await AxiosInstance.get(`/groupDeparture/${departureId}`);
          console.log(res.data);
          setDeparture(res?.data?.data);
        }

        if (whichDeparture === "privateDeparture") {
          const res = await AxiosInstance.get(
            `/privateDeparture/${departureId}`
          );
          setDeparture(res?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeparture();
  }, [departureId, whichDeparture]);

  const updateMaxQuantity = async () => {
    if (whichDeparture === "groupDeparture") {
      try {
        const { data } = await AxiosInstance.patch(`groupDeparture/${departure?.groupDepartureId}`, {
          total: Number(adults) + Number(childrens)
        })
        console.log(data)
      } catch (error: any) {
        console.log(error)
      }
    }

  }

  const handleAllField = form.watch();

  const paymentOption = form.watch("paymentOption");
  const selectedAdditionalServices = form.watch("additionalServices");
  const adults = form.watch("adults");
  const childrens = form.watch("childrens");
  const selectedAdultDiscounts = form.watch("adultDiscounts");
  const selectedChildrenDiscounts = form.watch("childrenDiscounts");
  const [totalAdultPrice, setTotalAdultPrice] = useState<number>(0);
  const [totalChildrenPrice, setTotalChildrenPrice] = useState<number>(0);
  const [discountedPricePerAdult, setDiscountedPricePerAdult] =
    useState<any>(undefined);
  const [discountedPricePerChildren, setDiscountedPricePerChildren] =
    useState<any>(undefined);
  //update adult price when discount is selected.
  useEffect(() => {
    if (adultDiscounts && pricePerAdult) {
      setDiscountedPricePerAdult(undefined);
      console.log(adults);
      const matchedDiscount = adultDiscounts.find((item: any) => {
        console.log(item);
        return adults >= item.minQuantity && adults <= item.maxQuantity;
      });

      if (matchedDiscount) {
        console.log(matchedDiscount);
        const adultPrice = adults * matchedDiscount?.price;
        setDiscountedPricePerAdult(matchedDiscount?.price);

        setTotalAdultPrice(adultPrice);
        setValue(
          "adultDiscounts",
          `${matchedDiscount.minQuantity} - ${matchedDiscount.maxQuantity} = ${matchedDiscount.price}$`
        );
      } else {
        const adultPrice = adults * pricePerAdult;
        setTotalAdultPrice(adultPrice);
        form.setValue("adultDiscounts", "");
      }
    }
  }, [adults, adultDiscounts, pricePerAdult]);

  //update chidlren price when discount is selected
  useEffect(() => {
    if (childrenDiscounts && pricePerChildren) {
      console.log(childrens);
      const matchedDiscount = childrenDiscounts.find((item: any) => {
        console.log(item);
        return childrens >= item.minQuantity && childrens <= item.maxQuantity;
      });

      if (matchedDiscount) {
        console.log(matchedDiscount);
        const childPrice = childrens * matchedDiscount?.price;
        setDiscountedPricePerAdult(matchedDiscount?.price);

        setTotalChildrenPrice(childPrice);
        setValue(
          "childrenDiscounts",
          `${matchedDiscount.minQuantity} - ${matchedDiscount.maxQuantity} = ${matchedDiscount.price}$`
        );
      } else {
        const childrenPrice = childrens * pricePerChildren;
        setTotalChildrenPrice(childrenPrice);
        form.setValue("childrenDiscounts", "");
      }
    }
  }, [childrens, childrenDiscounts, pricePerChildren]);

  const code = watch("code");

  //  For Calculation after the input state changes
  useEffect(() => {
    const tripPrice = totalAdultPrice + totalChildrenPrice;
    const newVat = tripPrice * 0.13;
    const newBankCharge = tripPrice * 0.03; // bank charge as 3% of tripPrice
    //dynamic add on price calculation
    let additionalServiceCost = 0;
    if (selectedAdditionalServices) {
      additionalServiceCost = selectedAdditionalServices.reduce(
        (total: any, service: any) => {
          console.log(service);
          console.log(adults);
          console.log(childrens);
          return (
            total + (service?.price || 0) * (Number(adults) + Number(childrens))
          );
        },
        0
      );
    }

    console.log(tripPrice);
    console.log(additionalServiceCost);
    let newGrandTotal =
      tripPrice + newVat + newBankCharge + additionalServiceCost;

    let discount = 0;
    console.log(newGrandTotal);
    if (isPromoAvailable === "true") {
      console.log(discount);
      discount = (expedition?.promoCode?.percentage / 100) * newGrandTotal;
      newGrandTotal = newGrandTotal - discount;
    }
    console.log(newGrandTotal);

    setTotalPrice(tripPrice);
    setVat(newVat);
    setBankCharge(newBankCharge);
    setGrandTotal(newGrandTotal);
    setPromoDiscount(discount);

    if (paymentOption === "deposit-payment") {
      const newDepositAmount = newGrandTotal * 0.5;
      const newAmountDue = newGrandTotal - newDepositAmount;
      setDepositAmount(newDepositAmount);
      setAmountDue(newAmountDue);
    } else {
      setDepositAmount(0);
      setAmountDue(0);
    }
  }, [
    form,
    handleAllField,
    paymentOption,
    selectedAdditionalServices,
    code,
    totalAdultPrice,
    totalChildrenPrice,
  ]);

  //  Get User data after login success
  const [checkCurrentUser, setCheckCurrentUser] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const tokenExist = localStorage.getItem("accessToken");
        console.log(tokenExist);

        if (tokenExist) {
          const res = await ClientSideAxiosInstance.get(
            "/users/get-user-from-token/pass-token-in-header"
          );
          console.log(res);
          res && setCurrentUser(res.data.data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();
  }, [checkCurrentUser]);

  // Handle booking form submission and payment intent creation
  const [loading, setLoading] = useState(false);

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
      `Additional Services: ${booking?.additionalServices
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

  useEffect(() => {
    console.log(adults);
  }, [adults]);

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      // Create booking in the database without paymentId we will update it after payment success using stripe webhook
      const bookingRes = await AxiosInstance.post(`/bookings`, {
        ...data,
        expedition: expedition?._id,
       departure:whichDeparture=="groupDeparture"? departure?._id:null,
     
        startDate: departure.startDate,
        endDate: departure.endDate,
        totalAmount: grandTotal,
        depositAmount: 0,
        remainingAmount: 0,
        type: "trip",
        user: currentUser?._id,
      });
      console.log(bookingRes.status);
      console.log(bookingRes.data.data._id);
      console.log(bookingRes.data.data.bookingId);

      if (bookingRes.status === 201) {
        // Get the booking ID from the response
        const bookingId = bookingRes.data.data.bookingId;
        const booking_id = bookingRes.data.data._id;

        // Make payment with Stripe
        const paymentResponse = await makePayment({
          paymentOption: data.paymentOption,
          grandTotal,
          depositAmount,
          amountDue,
          bookingId,
          booking_id,
        });

        console.log(paymentResponse);

        form.reset();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const makePayment = async (data: any) => {
    // const stripe: any = await loadStripe("pk_test_51Pdoi1RuZnZAwk3CqntaIZRocOQcs5U4jZeL0bbJvC3KnxMrRGsirlIVraiwHtE7Vh8RbWb3E05XOZfoAimAmMqV00r0ZnAki9");
    const stripe: any = await loadStripe(
      "pk_test_51PJx9VP6BesDH0OVTE3ZT8b9e5Jbi5AORD3vtQzhrqBdPSfpvGjUZvx9rtXEigAA247bhHdhacTnPOPFzAMfC89i00mu2vfNCf"
    );
    // const stripe:any = await loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);

    const amountToCharge =
      data.paymentOption === "full-payment"
        ? data.grandTotal
        : data.depositAmount;
    console.log("grandTotal:", data.grandTotal);
    console.log("depositAmount:", data.depositAmount);
    console.log("amountToCharge:", amountToCharge);
    console.log(data.bookingId);

    const fetchStripe = await fetch("/api/create-payment-intent", {
      // const fetchStripe = await fetch("https://contour-frontend-new-updated.vercel.app/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountToCharge,
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
      generatePDF(bookingUpdate.data?.data);
      // updateMaxQuantity()

      const result: any =
        stripe && (await stripe.redirectToCheckout({ sessionId: response.id }));

      if (result.error) {
        console.error(result.error.message);
      }
    }
  };

  return (
    <>
      <div className="w-full relative  flex justify-center text-center items-center h-[70vh]">
        <div className="absolute top-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[50%] z-10 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            width={5000}
            height={5000}
            alt="book-hero"
            src={expedition?.banner}
            className="w-full h-full object-cover object-top brightness-50"
          ></Image>
        </div>
        <div className="w-[95%] title  z-10 md:w-[80%] font-black text-2xl pt-[5rem] flex flex-col gap-2 text-white title relative  md:text-5xl  text-center justify-center items-center">
          Book your
          <span className="text-yellow-500"> {expedition?.name}</span>{" "}
          <span></span>
          <span className="text-base text-center text-zinc-300  flex items-center justify-center gap-4">
            {departure?.startDate}{" "}
            <Icon icon="hugeicons:arrow-right-04" className="w-6 h-6" />{" "}
            {departure?.endDate}
          </span>
        </div>
      </div>
      <div className="3xl:max-w-7xl mx-auto pb-[3rem]  ">
        <div className="grid lg:grid-cols-3 rounded-lg bg-[#FFFFFF]  p-2  md:px-16 md:py-10 my-[2rem] w-11/12  lg:w-10/12 mx-auto gap-5  ">
          <div className="mx-auto md:col-span-2  w-full  rounded-sm">
            {/* show while current user is not present */}
            {currentUser === undefined && (
              <div className="flex lg:w-[60%]  bg-[#1E1E1E] rounded-xl md:py-2 md:px-2 p-1 w-full mx-auto gap-2  md:mx-0 justify-center  items-center text-sm mb-3">
                <div
                  className={`${isUserAlreadyHaveAccount
                    ? " bg-zinc-200 text-zinc-800 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                    : "shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-[#1E1E1E] text-white "
                    } cursor-pointer  font-semibold  w-full text-center  py-2 rounded-md`}
                  onClick={() =>
                    setisUserAlreadyHaveAccount(!isUserAlreadyHaveAccount)
                  }
                >
                  I Already Have an Account
                </div>
                <div
                  className={`${!isUserAlreadyHaveAccount
                    ? " bg-zinc-200 text-zinc-800 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                    : "shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  bg-[#1E1E1E] text-white "
                    } cursor-pointer  font-semibold w-full text-center py-2 rounded-md`}
                  onClick={() =>
                    setisUserAlreadyHaveAccount(!isUserAlreadyHaveAccount)
                  }
                >
                  I am New, Register
                </div>
              </div>
            )}

            {/* show while current user is not present */}
            {currentUser === undefined && (
              <div className="bg-[#F8F8F9] py-6 px-3 md:px-8  rounded-lg">
                {isUserAlreadyHaveAccount ? (
                  <Login setCheckCurrentUser={setCheckCurrentUser} />
                ) : (
                  <Register />
                )}
              </div>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-6 "
              >
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
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Phone number{" "}
                          <span className="text-yellow-500">*</span>
                        </FormLabel>
                        <FormControl className="w-full">
                          <PhoneInput
                            className="w-full"
                            defaultCountry="usa"
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
                    name="passportNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Passport Number{" "}
                          <span className="text-yellow-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
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
                          Date of Birth{" "}
                          <span className="text-yellow-500">*</span>
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            type="date"
                            value={
                              field.value
                                ? field.value.toISOString().split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            }
                            className="!w-full"
                          // {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col lg:flex-row gap-2">
                  {adultDiscounts && (
                    <>
                      <FormField
                        control={form.control}
                        name="adultDiscounts"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Adult discounts
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              disabled={adultDiscounts?.length == 0}
                              value={selectedAdultDiscounts}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    className="cursor-not-allowed"
                                    placeholder="Adult group discounts"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {adultDiscounts?.length > 0 &&
                                  adultDiscounts?.map((item: any, idx: any) => (
                                    <SelectItem
                                      key={idx}
                                      value={`${item?.minQuantity} - ${item?.maxQuantity} = ${item?.price}$`}
                                    >{`For group of ${item?.minQuantity} - ${item?.maxQuantity} , price per adult = ${item?.price}$`}</SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <FormItem className="w-full ">
                        <FormLabel className="font-semibold">
                          Adults <span className="text-yellow-500">*</span>
                        </FormLabel>
                        <div className="flex shadow-sm items-center justify-between border rounded-md overflow-hidden space-x-2">
                          <button
                            type="button"
                            onClick={() =>
                              // field.onChange(
                              //   field.value > 0? field.value - 1: field.value-0
                              // )

                              field.onChange(Math.max(0, field.value - 1))
                            }
                            className="px-5 py-1 bg-zinc-800 text-white"
                          >
                            -
                          </button>
                          <span className="px-4">{field.value}</span>
                          <button
                            type="button"
                            onClick={() => field.onChange(field.value + 1)}
                            className="px-5 py-1 bg-zinc-800 text-white"
                          >
                            +
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col lg:flex-row gap-2">
                  {childrenDiscounts && (
                    <>
                      <FormField
                        control={form.control}
                        name="childrenDiscounts"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Children discounts
                            </FormLabel>
                            <Select
                              disabled={childrenDiscounts?.length == 0}
                              onValueChange={field.onChange}
                              value={selectedChildrenDiscounts}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Children group discounts" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {childrenDiscounts?.length > 0 &&
                                  childrenDiscounts?.map(
                                    (item: any, idx: any) => (
                                      <SelectItem
                                        key={idx}
                                        value={`${item?.minQuantity} - ${item?.maxQuantity} = ${item?.price}$`}
                                      >{`For group of ${item?.minQuantity} - ${item?.maxQuantity}, price per child = ${item?.price}$`}</SelectItem>
                                    )
                                  )}
                                {childrenDiscounts?.length == 0 &&
                                  childrenDiscounts?.map(
                                    (item: any, idx: any) => (
                                      <SelectItem
                                        key={idx}
                                        value={`No discounts available`}
                                      >
                                        No discounts available
                                      </SelectItem>
                                    )
                                  )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  <FormField
                    control={form.control}
                    name="childrens"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Children
                        </FormLabel>
                        <div className="flex shadow-sm items-center justify-between border rounded-md overflow-hidden space-x-2">
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange(
                                field.value > 0 ? field.value - 1 : 0
                              )
                            }
                            className="px-5 py-1 bg-zinc-800 text-white"
                          >
                            -
                          </button>
                          <span className="px-4">{field.value}</span>
                          <button
                            type="button"
                            onClick={() => field.onChange(field.value + 1)}
                            className="px-5 py-1 bg-zinc-800 text-white"
                          >
                            +
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex lg:flex-row flex-col w-full gap-3 justify-center items-center">
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Note to Organizer <FieldOptionalText />
                        </FormLabel>
                        <FormControl>
                          <textarea
                            className="oultine-none w-full h-[5rem] border rounded-md p-2 shadow-sm"
                            {...field}
                            placeholder="Write any note here.."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="additionalServices"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base font-semibold">
                            Additional Services or Add-ons
                          </FormLabel>
                          <FormDescription>
                            Select any additional services or add-ons you would
                            like to include in your trip.
                          </FormDescription>
                        </div>
                        {addOns &&
                          addOns.map((item: any) => (
                            <FormField
                              key={item.addOnId}
                              control={form.control}
                              name="additionalServices"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.addOnId}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={
                                          field.value?.find(
                                            (i: any) =>
                                              i?.addOnId == item?.addOnId
                                          )
                                            ? true
                                            : false
                                        }
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                              ...field.value,
                                              item,
                                            ])
                                            : field.onChange(
                                              field.value?.filter(
                                                (value: any) =>
                                                  value?.addOnId !==
                                                  item?.addOnId
                                              )
                                            );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {item.fieldName}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="code"
                    render={() => (
                      <FormItem>
                        <div className="">
                          <FormLabel className="text-base font-semibold">
                            Promo Code
                          </FormLabel>
                        </div>
                        <FormField
                          control={form.control}
                          name="code"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <div className="flex flex-col gap-2 w-full">
                                  <FormControl>
                                    <Input
                                      disabled={isPromoAvailable === "true"}
                                      placeholder="ACXsrTGv"
                                      {...field}
                                      className={` ${
                                        isPromoAvailable === "true"
                                          ? "border border-1 border-green-400"
                                          : isPromoAvailable == "false"
                                          ? "border border-1 border-red-400"
                                          : ""
                                      }`}
                                    />
                                  </FormControl>
                                  <button
                                    type="button"
                                    disabled={isPromoAvailable === "true"}
                                    onClick={() => applyPromo()}
                                    className={`text-white  w-fit     font-medium rounded-md text-sm px-10 py-2.5 text-center me-2  flex items-center gap-1 ${
                                      isPromoAvailable === "true"
                                        ? "bg-green-400"
                                        : "bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 hover:bg-gradient-to-br"
                                    }`}
                                  >
                                    {isPromoAvailable === "true"
                                      ? "Applied"
                                      : "Apply"}{" "}
                                    {applying && (
                                      <Loader
                                        className="  animate-spin "
                                        size={16}
                                      />
                                    )}
                                  </button>
                                </div>
                                {/* {isPromoAvailable === "false" && code?.length>0 && <p className="text-red-500">Promo code isn't available.</p>} */}
                              </FormItem>
                            );
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-lg text-zinc-800 font-bold mt-5">
                    Emergency Contact and Information
                  </label>
                  <div className="flex lg:flex-row flex-col gap-3 justify-center items-center mt-2">
                    <FormField
                      control={form.control}
                      name="emergencyName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Name <FieldOptionalText />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Jonny Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyRelationship"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Relation <FieldOptionalText />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Brother" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyPhone"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">Phone</FormLabel>
                          <FormControl className=" w-fulL">
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
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="isTermAndConditionChecked"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-semibold">
                          Agreements and Consent{" "}
                          <span className="text-yellow-500">*</span>
                        </FormLabel>
                        <FormDescription>
                          I agree to the{" "}
                          <Link
                            href="/terms-and-conditions"
                            className="text-blue-600 underline"
                          >
                            terms and conditions
                          </Link>
                          .
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentOption"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-semibold">
                        Payment Option{" "}
                        <span className="text-yellow-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="full-payment" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Pay Full Amount Now
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="deposit-payment" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Pay Partial Amount Now (Deposit)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="text-white mt-5 home-about-button  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-10 py-2.5 text-center me-2 mb-2 flex items-center gap-1"
                >
                  {loading ? "Submitting.." : "Submit"}{" "}
                  {loading && <Loader className="  animate-spin " size={16} />}
                </button>
              </form>
            </Form>
          </div>
          <div className="flex w-full relative flex-col">
            <div className="flex flex-col md:sticky top-[5rem] bg-[#F8F8F9] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] left-0   rounded-lg overflow-hidden gap-2">
              {/* Price Summary */}
              <div className="mb-6 flex flex-col gap-4 ">
                {/* title  */}
                <div className="w-auto flex-col flex gap-2 bg-[#1E1E1E]  p-5  overflow-hidden    justify-center items-center">
                  <h3 className="text-lg font-bold text-white uppercase title">
                    Price Summary
                  </h3>
                  {/* <hr className="bg-yellow-400 h-[3px] overflow-hidden w-[40%]" /> */}
                </div>

                {/* price  */}
                <div className="px-5 flex flex-col gap-4">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[14px]">
                        Trip Price for Adults:
                      </span>
                      <span className="text-[14px] font-semibold text-yellow-500">
                        {form.watch("adults")} * $
                        {discountedPricePerAdult
                          ? discountedPricePerAdult
                          : pricePerAdult}
                      </span>
                    </div>
                    <span className="font-semibold text-sm text-zinc-700">
                      ${totalAdultPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[14px]">
                        Trip Price for Children:
                      </span>
                      <span className="text-[14px] font-semibold text-yellow-500">
                        {form.watch("childrens")} * ${pricePerChildren}
                      </span>
                    </div>
                    <span className="font-semibold text-sm text-zinc-700">
                      ${totalChildrenPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-[14px]">
                      Total Trip Price:
                    </span>
                    <span className="font-semibold text-sm text-zinc-700">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-[14px]">
                      Bank Charge (3%):
                    </span>
                    <span className="font-semibold text-sm text-zinc-700">
                      ${bankCharge.toFixed(2)}
                    </span>
                  </div>

                  <div className=" space-y-2">
                    {selectedAdditionalServices &&
                      selectedAdditionalServices.map((item: any, idx: any) => (
                        <>
                          <div className="flex justify-between">
                            <span className="font-semibold text-[14px]">
                              {item.fieldName}{" "}
                              <span className="text-[14px] font-semibold text-yellow-500">
                                {item?.price}
                                {" $ "} (/person)
                              </span>{" "}
                            </span>
                            <span className="font-semibold text-sm text-zinc-700">
                              $
                              {(
                                item?.price *
                                (Number(form.watch("adults")) +
                                  Number(form.watch("childrens")) || 0)
                              ).toFixed(2)}
                            </span>
                          </div>
                        </>
                      ))}
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-[14px]">
                      Tax (13% VAT):
                    </span>
                    <span className="font-semibold text-sm text-zinc-700">
                      ${vat.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[14px]">
                      Promo code discount {"("}
                      {expedition?.promoCode?.percentage}
                      {"% )"}:
                    </span>
                    <span className="font-semibold text-sm text-zinc-700">
                      {"-"}${promoDiscount.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between py-3 px-5 border-b  mt-3 font-bold">
                  <span>Grand Total:</span>
                  <span className="text-lg">${grandTotal.toFixed(2)}</span>
                </div>
                {paymentOption === "deposit-payment" && (
                  <>
                    <div className="flex px-5 justify-between">
                      <span className="font-semibold text-[14px]">
                        Amount Due:
                      </span>
                      <span>${amountDue.toFixed(2)}</span>
                    </div>
                    <div className="flex px-5 justify-between">
                      <span className="font-semibold text-[14px]">
                        To be Paid Now:
                      </span>
                      <span>${depositAmount.toFixed(2)}</span>
                    </div>
                  </>
                )}

                <div className="flex flex-col justify-center items-center px-5 gap-2">
                  <span className="text-nowrap text-zinc-800 title text-sm font-bold items-center">
                    We accept:
                  </span>{" "}
                  <Image
                    src={PaymentImg}
                    alt="payment-img"
                    className="w-[45%]"
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const additionalServices = [
  {
    id: "transportation",
    label: "Transportation",
  },
  {
    id: "travel-insurance",
    label: "Travel Insurance",
  },
  {
    id: "accommodation",
    label: "Accommodation",
  },
] as const;
