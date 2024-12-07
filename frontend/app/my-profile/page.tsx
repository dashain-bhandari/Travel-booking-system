"use client";
import { GlobalContext } from "@/context/GlobalContext";
import { Camera, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import Instagram from "@/public/Social/instagram.png";
import useCloudinaryFileUpload from "@/hooks/useCloudinaryFileUpload";
import Facebook from "@/public/Social/facebook.png";
import Whatsapp from "@/public/Social/whatsapp.png";
import { useRouter } from "next/navigation";
import { AxiosInstance, ClientSideAxiosInstance } from "@/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import ContourMap from "@/public/contour-bg.png";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { FilePenLine, Trash2, Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { formSchema } from "./index";

import BookingDetails from "./BookingDetails";
import PackageCard from "@/components/comp/PackageCard";
import { whileViewVarients } from "@/components/website/Animation/WhileViewVarients";

export default function Page() {
  const { currentUser, setCurrentUser } = useContext(GlobalContext) as any;
  const router = useRouter();

  console.log("current user",currentUser);
  //form edit profile
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      address: "",
      profile: "",
      coverPic: "",
      dob: "",
      gender: "",
      phoneNumber: "",
      priceRange: "",
    },
  });

 
  useEffect(() => {
    if (currentUser) {
      form.reset({
        firstName: currentUser?.firstName || "",
        middleName: currentUser?.middleName || "",
        lastName: currentUser?.lastName || "",
        address: currentUser?.address || "",

        profile: currentUser?.profile || "",
        availability: currentUser?.availability || [],
        coverPic: currentUser?.coverPic || "",
        dob: currentUser?.dob || "",
        gender: currentUser?.gender || "",
        phoneNumber: currentUser?.phoneNumber || "",
        priceRange: currentUser?.priceRange || "",
      });

      currentUser?.availability &&
        currentUser?.availability?.length > 0 &&
        setRanges(currentUser?.availability);
      currentUser?.profile && setPreviewUrl1(currentUser.profile);
      currentUser?.profile && setImageUrl1(currentUser.profile);
      currentUser?.coverPic && setPreviewUrl2(currentUser?.coverPic);
      currentUser?.coverPic && setImageUrl2(currentUser?.coverPic);
    }
  }, [form, currentUser]);

  // Handle logout
  const [isLogingOut, setIsLogingOut] = useState(false);
  const handleLogout = () => {
    setIsLogingOut(true);
    localStorage.removeItem("accessToken");
    toast.success("Logout success");
    setCurrentUser(undefined)
    setTimeout(() => {
      router.push("/login");
    }, 1000);
    setIsLogingOut(false);
  };

  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [previewUrl1, setPreviewUrl1] = useState<any>(undefined);
  const [previewUrl2, setPreviewUrl2] = useState<any>(undefined);
  const {
    uploading: uploading1,
    handleFileUpload: handleFileUpload1,
    imageUrl: imageUrl1,
    setImageUrl: setImageUrl1,
  } = useCloudinaryFileUpload();
  const {
    uploading: uploading2,
    handleFileUpload: handleFileUpload2,
    imageUrl: imageUrl2,
    setImageUrl: setImageUrl2,
  } = useCloudinaryFileUpload();

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isUpdatingAvailability, setIsUpdatingAvailability] =
    useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUpdating(true);
    try {
      console.log(values);
      console.log(imageUrl1);
      console.log(imageUrl2);
      const { data } = await AxiosInstance.patch(
        `users/${currentUser?.userId}`,
        { ...values, profile: imageUrl1, coverPic: imageUrl2 }
      );

      console.log(data.data);
      setCurrentUser(data?.data);
      setIsUpdating(false);

      setImageUrl1(data?.data?.profile);
      setImageUrl2(data?.data?.coverPic);
      setPreviewUrl1(data?.data?.profile);
      setPreviewUrl2(data?.data?.coverPic);
      toast.success("Profile updated successfully.");
    } catch (error: any) {
      setIsUpdating(false);

      toast.error(
        error.details || "An error occurred during update. Please try again."
      );

      return;
    }
  };

  useEffect(() => {
    const fetchMyBookings = async () => {
      if (currentUser) {
        try {
          const { data } = await AxiosInstance.get(
            `/bookings/user/${currentUser?._id}`
          );
          console.log(data?.data);
          setMyBookings(data?.data);
        } catch (error: any) {
          console.log(error.message);
        }
      }
    };
    fetchMyBookings();
  }, [currentUser]);

  const fileInputRef = useRef<any>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [openDetail,setOpenDetail]=useState<any>({});
  const handleOpenDetail = (detail:any) => {
    setIsOpen(true);
    setOpenDetail(detail)
    document.body.style.overflowY = "hidden";
  };

  //ranges
  const [ranges, setRanges] = useState<any[]>([]);

  const addRange = () => {
    setRanges([...ranges, { id: Date.now(), startDate: null, endDate: null }]);
  };

  const handleDateChange = (index: any, field: any, date: any) => {
    const updatedRanges = [...ranges];
    updatedRanges[index][field] = date;
    setRanges(updatedRanges);
  };

  const removeRange = (index: any) => {
    const updatedRanges = ranges.filter((_, i) => i !== index);
    setRanges(updatedRanges);
  };

  useEffect(() => {
    console.log(ranges);
  }, [ranges]);

  const updateAvailability = async () => {
    setIsUpdatingAvailability(true);
    try {
      console.log(ranges);
      const { data } = await AxiosInstance.patch(
        `users/role/${currentUser?.userId}`,
        { availability: ranges }
      );
      console.log(data?.data);

      toast.success("Profile updated successfully.");
      setIsUpdatingAvailability(false);
    } catch (error: any) {
      setIsUpdatingAvailability(false);

      toast.error(
        error.details || "An error occurred during update. Please try again."
      );

      return;
    }
  };

  return (
    <>
      <div className="">
        <div className="w-full h-[50vh] relative flex justify-center items-center">
          <div className="absolute top-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 transform border-[4px] border-zinc-200 translate-y-1/2 -translate-x-1/2 w-[15rem] h-[15rem] overflow-hidden bg-black z-10 rounded-full">
            <div className="cursor-pointer">
              <input
                type="file"
                ref={fileInputRef}
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e: any) => {
                  handleFileUpload1(e.target.files[0]);
                  const preview = URL?.createObjectURL(e.target.files[0]);
                  setPreviewUrl2(preview);
                  e.target.value = null;
                }}
              />
              <Image
                width={1000}
                height={1000}
                src={
                  currentUser?.profile ||
                  "https://images.unsplash.com/photo-1517475020140-cd7f966b0523?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="contour-team-image"
                className="w-full absolute top-0 left-0 h-full brightness-75 object-cover object-center"
                onClick={handleImageClick}
              ></Image>
            </div>
          </div>

          <div className="flex gap-3  absolute bottom-5 right-[5%] z-10">
            <div className="relative w-full h-full flex justify-center items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex gap-2 bg-black py-2 rounded-md text-white px-4 items-center justify-center">
                    Edit profile <Icon icon="mingcute:user-edit-line" />
                  </button>
                </SheetTrigger>

                <SheetContent className="sm:max-w-xl z-[200] h-screen overflow-y-scroll overflow-x-hidden pb-20">
                  <SheetHeader className="my-4">
                    <SheetTitle className="font-bold uppercase text-2xl title flex items-center gap-2">
                      Edit Profile
                      {/* <span className="text-primary">({activity?.name})</span> */}
                    </SheetTitle>
                    <SheetDescription className="font-medium">
                      Insert necessary data and click update profile when youre
                      done.
                    </SheetDescription>
                  </SheetHeader>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {" "}
                              First name{" "}
                              <span className="text-yellow-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Ram" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="middleName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {" "}
                              Middle name{" "}
                              <span className="text-yellow-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Bahadur" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {" "}
                              Last name{" "}
                              <span className="text-yellow-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Karki" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {currentUser && currentUser?.role?.includes("guide") && (
                        <>
                          <FormField
                            control={form.control}
                            name="priceRange"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {" "}
                                  Price range per day in ${" "}
                                  <span className="text-yellow-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="5000-6000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      <div className="grid grid-cols-2 w-full h-full justify-center items-center gap-3">
                        <FormField
                          control={form.control}
                          name="profile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Profile{" "}
                                <span className="text-yellow-500"></span>
                              </FormLabel>
                              <FormControl className="">
                                <button
                                  type="button"
                                  className="flex overflow-hidden w-40 h-40 rounded-full mx-auto  items-center justify-center  border border-dashed"
                                >
                                  <div className="absolute  w-10 h-10 flex justify-center items-center   bg-zinc-200 rounded-full ">
                                    {uploading1 ? (
                                      <Loader className=" animate-spin h-4 w-4 text-primary" />
                                    ) : (
                                      // <Upload className="h-10 w-4 text-primary " />
                                      <div className="w-6 h-6 p-[1px]  rounded-full bg-zinc-200">
                                        <Icon
                                          icon="material-symbols:photo-camera-front-outline"
                                          className="w-full h-full object-cover object-center"
                                        />
                                      </div>
                                    )}
                                    <span className="sr-only">Upload</span>
                                  </div>
                                  <Input
                                    onChange={(e: any) => {
                                      field.onChange(e.target.files[0]);
                                      handleFileUpload1(e.target.files[0]);
                                      const preview = URL?.createObjectURL(
                                        e.target.files[0]
                                      );
                                      setPreviewUrl1(preview);
                                    }}
                                    type="file"
                                    className="absolute w-56  cursor-pointer   z-50 opacity-0"
                                  />

                                  {previewUrl1 && (
                                    <Image
                                      src={previewUrl1}
                                      alt=""
                                      height={400}
                                      width={400}
                                      className="h-56 w-full object-scale-down"
                                    />
                                  )}
                                </button>
                              </FormControl>
                              <FormMessage />
                              {uploading1 && (
                                <p className="text-primary  text-[12px] text-center -mt-14">
                                  Uploading image please wait...
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="coverPic"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Cover Picture{" "}
                                <span className="text-yellow-500"></span>
                              </FormLabel>
                              <FormControl>
                                <button
                                  type="button"
                                  className="flex overflow-hidden h-40 w-full mx-auto  items-center justify-center   rounded-md border border-dashed"
                                >
                                  <div className="absolute w-10 h-10 flex justify-center items-center  bg-zinc-200 rounded-full">
                                    {uploading2 ? (
                                      <Loader className=" animate-spin h-4 w-4 text-primary" />
                                    ) : (
                                      // <Upload className="h-4 w-4 text-primary " />
                                      <div className="w-6 h-6 p-[1px]  rounded-full bg-zinc-200">
                                        <Icon
                                          icon="f7:photo-on-rectangle"
                                          className="w-full h-full object-cover object-center"
                                        />
                                      </div>
                                    )}
                                    <span className="sr-only">Upload</span>
                                  </div>
                                  <Input
                                    onChange={(e: any) => {
                                      field.onChange(e.target.files[0]);
                                      handleFileUpload2(e.target.files[0]);
                                      const preview = URL?.createObjectURL(
                                        e.target.files[0]
                                      );
                                      setPreviewUrl2(preview);
                                    }}
                                    type="file"
                                    className=" w-56 absolute  cursor-pointer   z-50 opacity-0"
                                  />

                                  {previewUrl2 && (
                                    <Image
                                      src={previewUrl2}
                                      alt=""
                                      height={400}
                                      width={400}
                                      className="h-56 w-full object-scale-down"
                                    />
                                  )}
                                </button>
                              </FormControl>
                              <FormMessage />
                              {uploading2 && (
                                <p className="text-primary  text-[12px] text-center -mt-14">
                                  Uploading image please wait...
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="z-[250]">
                                <SelectItem value="female" >Female</SelectItem>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

<FormField
  control={form.control}
  name="dob"
  render={({ field }) => {
   
    return (
      <FormItem>
        <FormLabel>Date of birth</FormLabel>
        <FormControl>
          <Input
          defaultValue={currentUser?.dob}
            type="date"
            {...field}
          
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>

                      <button
                        disabled={uploading1 || uploading2 || isUpdating}
                        className="self-end primary-button"
                        type="submit"
                      >
                        Update profile
                        {isUpdating ? (
                          <Loader size={16} className="animate-spin mr-2 " />
                        ) : (
                          <FilePenLine size={16} className="mr-1" />
                        )}
                      </button>
                    </form>
                  </Form>
                  {currentUser && currentUser?.role != "user" && currentUser?.role != "super-admin" && currentUser?.role != "admin" &&
                    (<>
                      <div className="mt-8">
                        <div className="flex flex-col gap-2 justify-center items-start w-full mt-4">
                          <div>Availability</div>
                          {ranges && ranges?.length > 0 && ranges.map((range, index) => (
                            <div key={range.id} className="range-item flex flex-row gap-2 items-center mb-2 mt-2">
                              <DatePicker
                              
                                className="py-2 border border-1 border-gray-300 px-2"
                                selected={range.startDate}
                                onChange={(date) => handleDateChange(index, 'startDate', date)}
                                selectsStart
                                startDate={range.startDate}
                                endDate={range.endDate}
                                placeholderText="Start Date"
                              />
                              <DatePicker
                                className="py-2 border border-1 border-gray-300 px-2  "
                                selected={range.endDate}
                                onChange={(date) => handleDateChange(index, 'endDate', date)}
                                selectsEnd
                                startDate={range.startDate}
                                endDate={range.endDate}
                                minDate={range.startDate}
                                placeholderText="End Date"
                              />
                              <button className="delete-btn  border border-1 border-red-700 px-4 py-2 rounded-md text-red-700" onClick={() => removeRange(index)}>
                                Delete
                              </button>
                            </div>
                          ))}
                          <button onClick={addRange} className="w-fit mb-4 border  border-1 border-black  text-black rounded-md px-4 py-2">Add Date Range</button>
                        </div>
                        <Button
                          disabled={isUpdatingAvailability}
                          className="float-end secondary-button"
                          type="button"
                          onClick={updateAvailability}
                        >
                          Update availability
                          {isUpdatingAvailability ? (
                            <Loader size={16} className="animate-spin mr-2 " />
                          ) : (
                            <FilePenLine size={16} className="mr-1" />
                          )}
                        </Button>
                      </div>
                    </>)
                  }
                
                </SheetContent>
              </Sheet>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLogingOut}
              type="submit"
              className="flex gap-2 bg-red-500 py-2 rounded-md text-white px-4 items-center justify-center "
            >
              Logout
              {isLogingOut ? (
                <Loader size={16} className="animate-spin mr-2" />
              ) : (
                <Icon icon="mi:log-out" className="" />
              )}
            </button>

            {/* <button className="flex gap-2 bg-black py-2 rounded-md text-white px-4 items-center justify-center">
                    Edit profile <Icon icon="mingcute:user-edit-line" />
                  </button> */}
          </div>

          <div className="w-full h-full bg-[#1E1E1E]">
            <Image
              width={1000}
              height={1000}
              src={currentUser?.coverPic || ContourMap}
              alt="contour-team-image"
              className="w-full absolute top-0 left-0 h-full brightness-50 object-cover object-center"
            ></Image>
          </div>
        </div>

        <div className="w-full pb-[3rem] flex items-center flex-col justify-center mt-[8rem]">
          <span className="font-semibold text-lg text-zinc-800">
            {`${currentUser?.firstName ? currentUser?.firstName : ""} ${currentUser?.middleName ? currentUser?.middleName : ""} ${currentUser?.lastName ? currentUser?.lastName : ""}`}
       
         
          </span>
        </div>

        <div className="flex flex-col gap-4 pb-[3rem] w-11/12 mx-auto">
          <motion.h1
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="text-3xl text-center uppercase font-bold"
          >
            My booking
          </motion.h1>
          <div className="grid md:grid-cols-3   lg:grid-cols-4 gap-5 mx-auto">
            {myBookings &&
              myBookings.length > 0 &&
              myBookings?.map((booking: any, index: any) => {
                console.log(booking);
                return (
                  <>
                    {booking && booking?.expedition && (
                      <>
                        <Link
                          href=""
                          key={index}
                          onClick={() => handleOpenDetail(booking)}
                        >
                          <PackageCard
                            banner={booking?.expedition?.banner}
                            packageName={booking?.expedition?.name}
                            physical={booking?.expedition?.physical}
                            duration={booking?.expedition?.duration}
                            season={booking?.expedition?.season}
                            maxElevation={booking?.expedition?.maxElevation}
                          />
                        </Link>

                      </>
                    )}
                  </>
                );
              })}
          </div>
        </div>
      </div>

      {isOpen && <BookingDetails setIsOpen={setIsOpen} booking={openDetail}/>}
    </>
  );
}
