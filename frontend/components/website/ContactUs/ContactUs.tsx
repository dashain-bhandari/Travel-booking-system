"use client";
import React, { useEffect } from "react";
import Banner from "@/public/banner.webp";
import Logo from "@/public/logo/contour/ContourLogo.jpg";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { AxiosInstance } from "@/utils";
import { toast } from "sonner";
import ContactHero from "@/public/contact.jpg";
import PageHero from "@/components/comp/PageHero";
import { motion } from "framer-motion";
import { whileViewVarients } from "../Animation/WhileViewVarients";
type Props = {};

export default function ContactUs({}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const allInputField = watch();

  const onSubmit = async () => {
    try {
      const { data } = await AxiosInstance.post("/inquiries", allInputField);
      console.log(data);

      toast.success("Inquiry sent.");
      reset();
    } catch (error: any) {
      console.log(error.message);
      toast.error("something went wrong.");
    }
  };
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* <div className="w-full h-[70vh]  relative  flex justify-center items-end">
        <div className="absolute top-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[20vh] z-10 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>

        <Image
          width={1000}
          height={1000}
          src={ContactHero}
          alt="expedition-image"
          className="absolute top-0 brightness-50 left-0 w-full h-full object-cover object-bottom"
        />
        <div className="w-full flex flex-col gap-3 ml-[5%] 4xl:ml-[9.4%] mb-[4%] z-10 relative text-white">
          <h1 className="text-5xl md:text-6xl relative uppercase mt-10  font-black">
            CONTACT US
          </h1>
          <p className="md:w-[70%] w-11/12 text-zinc-100">
            {`We are honored to have earned numerous certifications and awards for our excellence in mountaineering and trekking.`}
          </p>
        </div>
      </div> */}

      <PageHero
        heading="Contact us"
        desc={`Got questions or need assistance? We're here to help you with all your mountaineering and trekking needs.`}
        heroImg={ContactHero}
        
        imgHeight="70vh"
      />

      <div className="w-11/12 4xl:w-8/12 mx-auto py-[3rem]  gap-3 flex flex-col justify-center  items-center">
        <motion.form
          variants={whileViewVarients}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto p-3 md:p-5  bg-white gap-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md gap-x-4  grid md:grid-cols-2"
        >
          <div className="w-full  rounded-md  h-full relative overflow-hidden">
            <Image
              src={Banner}
              alt=""
              className="w-full h-full object-cover object-right brightness-75"
            ></Image>

            <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black to-transparent z-10"></div>

            <div className="absolute z-30 text-white w-[3.5rem] h-[3.5rem]   top-5 left-3 gap-1 flex flex-col">
              {/* socio icon  */}
              <Image
                src={Logo}
                alt="contour-logo"
                className="w-full h-full  rounded-md"
              ></Image>
            </div>

            <div className="absolute z-30 text-white bottom-5 left-3 gap-1 flex flex-col">
              {/* socio icon  */}
              <div className="flex  flex-col  text-sm  gap-3">
                <div className="flex gap-2 items-center">
                  <div className="w-[1.5rem] h-[1.5rem]">
                    <Icon
                      icon="mdi:location"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <span className="text-[13px]">
                    Uttar dhoka,Lazimpat <br />
                    Kathmandu,Nepal
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-[1.5rem] h-[1.5rem]">
                    <Icon
                      icon="mdi:phone"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <span className="text-[13px]">
                    (+977) 9856-008848 <br /> (+977) 9856-046041
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-[1.5rem] h-[1.5rem]">
                    <Icon
                      icon="mdi:mail"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <span className="text-[13px]">
                    inquiry@contourexpeditions.com <br />{" "}
                    book@contourexpeditions.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full  mx-auto  md:py-[3rem]  flex justify-center rounded-md  flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="uppercase font-semibold">Get in touch</h2>
              <p className="text-sm text-zinc-700 leading-relaxed">
                Our team will help! Reach out with any questions or inquiries
                you may have.
              </p>
            </div>

            <div className="grid gap-2 gap-y-3 grid-cols-2">
              <div className="flex  gap-1 col-span-2  flex-col  overflow-hidden   w-full">
                <span className="text-[13px] font-medium text-zinc-700">
                  Full name <span className="text-yellow-500">*</span>
                </span>
                <input
                  required
                  type="text"
                  placeholder="Your full name"
                  {...register("fullName", { required: true })}
                  className="outline-none rounded-md border border-zinc-300 focus:border-zinc-400  w-full py-3 px-5 text-sm placeholder:text-sm bg-gray-50 shadow-sm text-zinc-700"
                />
              </div>
              {/* email  */}
              <div className="flex  gap-1 col-span-2  flex-col  overflow-hidden   w-full">
                <span className="text-[13px] font-medium text-zinc-700">
                  Email <span className="text-yellow-500">*</span>
                </span>
                <input
                  required
                  type="email"
                  placeholder="example@gmail.com"
                  {...register("email", { required: true })}
                  className="outline-none rounded-md border border-zinc-300 focus:border-zinc-400  w-full py-3 px-5 text-sm placeholder:text-sm bg-gray-50 shadow-sm text-zinc-700"
                />
              </div>

              <div className="flex  gap-1 col-span-2  flex-col  overflow-hidden   w-full">
                <span className="text-[13px] font-medium text-zinc-700">
                  Address <span className="text-yellow-500">*</span>
                </span>
                <input
                  required
                  type="text"
                  placeholder="Your address"
                  {...register("address", { required: true })}
                  className="outline-none rounded-md border border-zinc-300 focus:border-zinc-400  w-full py-3 px-5 text-sm placeholder:text-sm bg-gray-50 shadow-sm text-zinc-700"
                />
              </div>

              {/* phone number  */}
              <div className="flex  gap-1 col-span-2  flex-col  overflow-hidden   w-full">
                <span className="text-[13px] font-medium text-zinc-700">
                  Phone number <span className="text-yellow-500">*</span>
                </span>
                <input
                  required
                  type="number"
                  placeholder="Your number"
                  {...register("phoneNo", { required: true })}
                  className="outline-none rounded-md border border-zinc-300 focus:border-zinc-400  w-full py-3 px-5 text-sm placeholder:text-sm bg-gray-50 shadow-sm text-zinc-700"
                />
              </div>

              {/* message  */}
              <div className="flex  gap-1 col-span-2  flex-col  overflow-hidden   w-full">
                <span className="text-[13px] font-medium text-zinc-700">
                  Message <span className="text-yellow-500">*</span>
                </span>
                {/* <textarea
                  name=""
                  id=""
                  placeholder="Write something here"
                  className="w-full h-full outline-none rounded-md border border-zinc-300 focus:border-zinc-400  p-3 text-sm placeholder:text-sm bg-gray-50 shadow-sm"
                ></textarea> */}
                <textarea
                  className="w-full h-full outline-none rounded-md border border-zinc-300 focus:border-zinc-400  p-3 text-sm placeholder:text-sm bg-gray-50 shadow-sm"
                  placeholder="Write your thoughts here..."
                  {...register("message", { required: true })}
                ></textarea>
              </div>

              <div>
                {/* BUTTON  */}
                <button type="submit" className="primary-button">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.9467638926862!2d85.31799757607914!3d27.718929924979417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a5032a9243%3A0xb8683e0e1a86fbc6!2sContour%20Expeditions%20Pvt.%20Ltd!5e0!3m2!1sen!2snp!4v1721215943008!5m2!1sen!2snp"
        className="w-full h-[65vh] object-cover object-center pb-[3rem]"
        // style="border:0;"
        // allowfullscreen=""
        loading="lazy"
        // referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
}
