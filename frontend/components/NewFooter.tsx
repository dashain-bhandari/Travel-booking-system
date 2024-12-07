"use client";
import Image from "next/image";
import ContourMap from "@/public/contour-line.svg";
import Logo from "@/public/logo-white.png";
import { AxiosInstance } from "@/utils";
import { wordTruncate } from "@/utils/wordTruncate";
import Link from "next/link";
import { useEffect, useState } from "react";
import Instagram from "@/public/Social/instagram.png";
import Facebook from "@/public/Social/facebook.png";
import Whatsapp from "@/public/Social/whatsapp.png";
import Partners from "./website/Homepage/Partners";
import PaymentImg from "@/public/payment-img.png";
import { setErrorMap } from "zod";
import { toast } from "sonner";

import CustomButton from "./comp/CustomButton";
import NewPartners from "./website/Homepage/NewPartners";
type Props = {};

export default function NewFooter({}: Props) {
  function nestData(data: any) {
    const collectionsMap = new Map();
    const categoriesMap = new Map();

    // Ensure 'data.expedition', 'data.collections', and 'data.categories' are arrays
    if (!Array.isArray(data.expedition)) {
      console.error("Expected 'data.expedition' to be an array.");
      return [];
    }
    if (!Array.isArray(data.collections)) {
      console.error("Expected 'data.collections' to be an array.");
      return [];
    }
    if (!Array.isArray(data.categories)) {
      console.error("Expected 'data.categories' to be an array.");
      return [];
    }

    // Initialize collectionsMap from data.collections
    data.collections.forEach((collection: any) => {
      collectionsMap.set(collection._id, {
        _id: collection._id,
        name: collection.name,
        image: collection.image,
        categories: new Map(),
      });
    });

    // Initialize categoriesMap from data.categories
    data.categories.forEach((category: any) => {
      categoriesMap.set(category._id, {
        _id: category._id,
        name: category.name,
        image: category.image,
        expeditions: [],
      });
    });

    // Process expeditions
    data.expedition.forEach((expedition: any) => {
      // Ensure 'collections' and 'category' exist
      if (!expedition.collections || !expedition.category) {
        // console.error("Missing 'collections' or 'category' in expedition:", expedition);
        return;
      }

      const { collections, category, ...rest } = expedition;

      // Add categories to collections if they are referenced in the expedition
      const collection = collectionsMap.get(collections._id);
      if (collection) {
        if (!collection.categories.has(category._id)) {
          collection.categories.set(category._id, {
            _id: category._id,
            name: category.name,
            image: category.image,
            expeditions: [],
          });
        }
        const cat = collection.categories.get(category._id);
        if (cat) {
          cat.expeditions.push(rest);
        }
      }
    });

    // Convert maps to arrays and structure the final result
    const result = Array.from(collectionsMap.values()).map((collection) => ({
      ...collection,
      categories: Array.from(collection.categories.values()),
    }));

    return result;
  }

  const [nestedData, setNestedData] = useState<any>([]);
  const [otherAct, setOtherAct] = useState<any>([]);

  useEffect(() => {
    // nestedData.length == 0 && (fetchNestedData(), fetchOther());

    const fetchNestedData = async () => {
      try {
        const res = await AxiosInstance.get(
          "/nested-data-route/get-data-for-navbar"
        );
        const response = res.data;
        const nested = nestData(response);
        setNestedData(nested);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOther = async () => {
      try {
        const params = {
          select: "name activityId slug",
        };
        const res = await AxiosInstance.get("/activities", {
          headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
          data: params,
        });
        const response = res.data.data;
        setOtherAct(response || []);
      } catch (error) {
        console.log(error);
      }
    };

    nestedData.length == 0 && fetchNestedData();
    nestedData.length == 0 && fetchOther();
  }, [nestedData.length]);
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");

  const onsubmit = async () => {
    try {
      console.log("hiii");
      const { data } = await AxiosInstance.post("/subscribers", { email });
      toast.success("You are subscribed!");
      setEmail("");
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || error?.message);
      setEmail("");
    }
  };
  return (
    <div className="w-full bg-[#1E1E1E] overflow-x-hidden relative">
      <div className="wave-container"></div>
      <div className="h-full mx-auto  py-9  relative">
        <Image
          width={1000}
          height={1000}
          src={ContourMap}
          alt="expedition-image"
          className="w-full absolute top-0 left-0 opacity-[0.04]  rounded-md h-full mx-auto object-cover object-center"
        />
        <div className="w-11/12 4xl:w-10/12  mx-auto grid md:grid-cols-4 py-3 relative place-items-start gap-5">
          <div className="flex w-full flex-col gap-5 col-span-2">
            <Image alt="contour-logo" src={Logo} className="w-[8rem]"></Image>
            {/* social icon  */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-nav-heading-md lg:text-nav-heading-lg font-primary text-zinc-100">
                  Address
                </span>
                <p className="text-zinc-300 text-normal-paragraph-md lg:text-normal-paragraph-lg font-primary">
                  Uttardhoka, Lazimpath; Kathmandu, Nepal <br /> +977-9803267220
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-nav-heading-md lg:text-nav-heading-lg text-zinc-100">
                  Email
                </span>
                <p className="text-zinc-300 text-normal-paragraph-md lg:text-normal-paragraph-lg font-primary">
                  <span className="font-medium">For inquiries:</span>{" "}
                  inquiry@contourexpedition.com <br />{" "}
                  {/* <span className="font-medium">For booking: </span>
                  book@contourexpeditions.com */}
                </p>
              </div>

              <div className="flex gap-2">
                <div className="w-[1.5rem] h-[1.5rem] hover:scale-105 cursor-pointer duration-200">
                  <Image
                    src={Instagram}
                    alt="social-icon"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="w-[1.5rem] h-[1.5rem] hover:scale-105 cursor-pointer duration-200">
                  <Image
                    src={Facebook}
                    alt="social-icon"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="w-[1.5rem] h-[1.5rem] hover:scale-105 cursor-pointer duration-200">
                  <Image
                    src={Whatsapp}
                    alt="social-icon"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="flex justify-start flex-wrap gap-5 mt-5 items-start">
                <NewPartners />
                {/* card  */}
                <div className="flex flex-col gap-2">
                  <span className="text-nowrap text-zinc-300 title text-nav-heading-md lg:text-nav-heading-lg font-primary font-semibold items-center">
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

            <div className="mx-auto w-full">
              {/* <div className="mx-auto w-full grid  grid-cols-1">
                <div className="">
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-50">
                    Get PDF before flying Nepal
                  </h2>
                  <p className="mt-2 text-[14px]  text-gray-300">
                    Get PDF before flying Nepal Experience the world class tour
                    package at the best rate. ABC offers you the best tour
                    package at the effective rate. Here you can find the variety
                    of tour packages!!
                  </p>
                  <div className="mt-6 flex max-w-md gap-x-4">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="submit"
                      className="text-white  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center "
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div> */}

              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
              >
                {/* <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                /> */}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5 justify-center items-start">
            <h1 className="font-semibold text-nav-heading-md lg:text-nav-heading-lg font-primary text-zinc-50">
              Company
            </h1>
            <div className="flex flex-col  gap-2 text-sm">
              {CompanyLinks.map((link, index) => (
                <span
                  key={index}
                  className="text-zinc-400 flex gap-1 text-sm cursor-pointer hover:font-semibold hover:ml-2 duration-300 hover:text-yellow-500"
                >
                  <div className="flex flex-col">
                    <Link href={link.href}>
                      <span className="text-normal-paragraph-md lg:text-normal-paragraph-lg font-primary mb-2">
                        {link.name}
                      </span>
                    </Link>
                  </div>
                </span>
              ))}
            </div>
          </div>
          {nestedData &&
            nestedData.slice(0, 2).map((collection: any) =>
              collection.name === "Mountaineering" ? (
                ""
              ) : (
                <div
                  key={collection._id}
                  className="w-full flex flex-col gap-5 justify-center items-start"
                >
                  <h1 className="font-semibold text-nav-heading-md lg:text-nav-heading-lg font-primary  text-zinc-50">
                    {collection.name}
                  </h1>
                  {collection.name === "Mountaineering" ? (
                    ""
                  ) : (
                    <div className="flex flex-col  gap-2 text-sm">
                      {collection?.categories?.map((category: any) => (
                        <span
                          key={category._id}
                          className="text-zinc-400 flex gap-1 text-normal-paragraph-md lg:text-normal-paragraph-lg font-primary cursor-pointer hover:font-semibold hover:ml-2 duration-300 hover:text-yellow-500"
                        >
                          <Link
                            href={`/expedition/${collection?._id}?cat=${category?._id}`}
                            className=" flex flex-col"
                          >
                            {/* {category?.map((expedition: any) => (
                          <span
                            key={expedition._id}
                            className="font-medium mb-2"
                          > */}
                            {wordTruncate(category.name, 5)}
                            {/* </span>
                        ))} */}
                          </Link>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          {/* {
            <div className="w-full flex flex-col gap-5 justify-center items-start">
              <h1 className="font-semibold text-nav-heading-md lg:text-nav-heading-lg font-primary  text-zinc-50">
                Other Activities
              </h1>
              <div className="flex flex-col  gap-2 text-sm">
                {otherAct?.map((category: any, index: number) => (
                  <span
                    key={index}
                    className="text-zinc-400 flex gap-1 text-normal-paragraph-md lg:text-normal-paragraph-lg font-primary cursor-pointer hover:font-semibold hover:ml-2 duration-300 hover:text-yellow-500"
                  >
                    <Link
                      href={`/other_activities/` + category?.slug}
                      className=" flex flex-col"
                    >
                     
                      {wordTruncate(category.name, 5)}
                     
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          } */}
        </div>

        {/* <div className="mx-auto md:mt-[-5%]  w-11/12 relative md:w-5/12 grid  grid-cols-1">
          <div className="">
            <h2 className="text-main-title-lg lg:text-main-title-lg font-primary text-start md:text-center font-bold  text-zinc-50">
              Get PDF before flying Nepal
            </h2>
            <p className="mt-2 normal-paragraph-lg lg:text-normal-paragraph-lg font-primary  md:text-center text-gray-400">
              Get PDF before flying Nepal Experience the world class tour
              package at the best rate. ABC offers you the best tour package at
              the effective rate. Here you can find the variety of tour
              packages!!
            </p>
            <div className="mt-6 mx-auto flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
              />
             
              <div className="cursor-pointer" onClick={onsubmit}>
                <CustomButton text="Subscribe" arrow="false" />
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* bottom  */}
      <div className="w-full border-t border-zinc-800   py-2">
        <div className="justify-between w-11/12 mx-auto  items-start md:items-center flex flex-col gap-2  md:flex-row">
          <span className="text-[12px] text-zinc-300">
            © Copyright {currentYear}, Contour Expeditions Pvt. Ltd. I All
            Rights Reserved
          </span>
          <span className="text-[12px]  text-zinc-300">
            Designed and developed by{" "}
            <Link
              href="https://webxnep.com/"
              target="_blank"
              className="font-medium underline hover:scale-105 duration-200 text-zinc-50 italic cursor-pointer"
            >
              WebX
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

const CompanyLinks = [
  {
    name: "About us",
    href: "/about_us",
  },
  // {
  //   name: "Our team",
  //   href: "/our_team",
  // },
  // {
  //   name: "Message from CEO",
  //   href: "/message_from_ceo",
  // },
  {
    name: "Certificates",
    href: "/certificates",
  },
];
