"use client";
import gsap from "gsap";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import Lhotse from "@/public/Lhotse-peak.jpg";
import Similar from "./Similar";
import TripReview from "./TripReview";
import Reviews from "../Homepage/Reviews";
import parse from "html-react-parser";
import { motion, AnimatePresence } from "framer-motion";
import ImageViewer from "react-simple-image-viewer";

type Props = {};
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function TripDetailMain({ expedition }: any) {
  const [openToggleDesc, setOpenToggleDesc] = useState(false);
  console.log(expedition);
  const toggleOpen = (index: number) => {
    if (!openToggleDesc) {
      gsap.to(`.toggle2-${index}`, {
        rotate: "180deg",
        top: "50%",
        duration: 0.5,
        transformOrigin: "center",
      });
      gsap.to(`.open-desc-${index}`, {
        opacity: 1,
        height: "auto",
        duration: 0.5,
        ease: "power3.inOut",
      });

      setOpenToggleDesc(true);
    } else {
      gsap.to(`.toggle2-${index}`, {
        rotate: "90deg",
        top: "50%",
        duration: 0.5,
        transformOrigin: "center",
      });
      gsap.to(`.open-desc-${index}`, {
        opacity: 0,
        height: "0",
        duration: 0.5,
        ease: "power3.inOut",
      });
      setOpenToggleDesc(false);
    }
  };

  // scroll  higlight
  const [activeId, setActiveId] = useState<any>("trip-attraction");

  const useIntersectionObserver = (sectionIds: any, setActiveId: any) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.id;
            if (entry.isIntersecting) {
              // Set the active ID when the section starts to enter the viewport
              setActiveId(id);
            } else if (!entry.isIntersecting && id === activeId) {
              // Clear the active ID when the section is out of view
              setActiveId(null);
            }
          });
        },
        {
          threshold: 0, // Start observing as soon as any part of the section enters the viewport
          rootMargin: "0px 0px -50% 0px", // Trigger when the section is 50% out of the viewport from the bottom
        }
      );

      sectionIds.forEach((id: any) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });

      return () => {
        sectionIds.forEach((id: any) => {
          const element = document.getElementById(id);
          if (element) {
            observer.unobserve(element);
          }
        });
      };
    }, [sectionIds, setActiveId]);
    // }, [sectionIds, setActiveId, activeId]);
  };

  // Define section IDs based on your actual section IDs
  const sectionIds = [
    "trip-attraction",
    "overview",
    "itinerary",
    "route-map",
    "value-addition",
    "inclusion",
    "exclusion",
    "essential-information",
    "trip-fact",
    "faq",
    "essential-equipment",
    "gallery",
    "reviews",
  ];

  useIntersectionObserver(sectionIds, setActiveId);

  const [iteneraries, setIteneraries] = useState([]);
  useEffect(() => {
    const fetItenaries = async () => {
      if (expedition?._id) {
        try {
          const res = await AxiosInstance.get(
            `/iternaries/by-expeditionId/${expedition?._id}`
          );
          const sortedData = res?.data?.data?.sort((a: any, b: any) => {
            const num1 = a?.day?.match(/(\d+)/) && a?.day?.match(/(\d+)/)[0];
            const num2 = b?.day?.match(/(\d+)/) && b?.day?.match(/(\d+)/)[0];
            return num1 - num2;
          });

          setIteneraries(sortedData);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetItenaries();
  }, [expedition._id]);

  const [minDeparture, setMinDeparture] = useState<any>(undefined);

  useEffect(() => {
    const fetMinDeparture = async () => {
      if (expedition?._id) {
        try {
          const res = await AxiosInstance.get(
            `/expeditions/min-price/${expedition?._id}`
          );

          setMinDeparture(res?.data?.result);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetMinDeparture();
  }, [expedition._id]);
  //value additions
  const [valueAdditions, setValueAdditions] = useState<any[]>([]);
  useEffect(() => {
    const fetValueAdditions = async () => {
      if (expedition?._id) {
        try {
          const res = await AxiosInstance.get(
            `/valueAddition/by-expiditionId/${expedition?._id}`
          );
          setValueAdditions(res?.data?.data);
          console.log(valueAdditions);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetValueAdditions();
  }, [expedition?._id]);

  const [inclusions, setInclusions] = useState([]);
  useEffect(() => {
    const fetItenaries = async () => {
      if (expedition?._id) {
        try {
          const res = await AxiosInstance.get(
            `/cost-includes/by-expiditionId/${expedition?._id}`
          );

          setInclusions(res?.data?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetItenaries();
  }, [expedition._id]);

  console.log(inclusions);

  const [exclusions, setExclusions] = useState([]);
  useEffect(() => {
    const fetItenaries = async () => {
      if (expedition?._id) {
        try {
          const res = await AxiosInstance.get(
            `/cost-excludes/by-expiditionId/${expedition?._id}`
          );

          console.log(res);

          setExclusions(res?.data?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetItenaries();
  }, [expedition._id]);

  console.log(exclusions);

  const [attractions, setAttractions] = useState([]);
  useEffect(() => {
    const fetItenaries = async () => {
      if (expedition?._id) {
        try {
          const res = await AxiosInstance.get(
            `/tripAttraction/by-expiditionId/${expedition?._id}`
          );

          console.log(res);

          setAttractions(res?.data?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetItenaries();
  }, [expedition._id]);

  console.log(attractions);

  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    const fetItenaries = async () => {
      if (expedition?._id) {
        try {
          const res = await AxiosInstance.get(
            `/faq/by-expiditionId/${expedition?._id}`
          );

          console.log(res);

          setFaqs(res?.data?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetItenaries();
  }, [expedition._id]);

  useEffect(() => {
    console.log(faqs);
  }, [faqs]);

  const [facts, setFacts] = useState([]);
  useEffect(() => {
    const fetItenaries = async () => {
      if (expedition?._id) {
        try {
          const res = await AxiosInstance.get(
            `/fact/by-expiditionId/${expedition?._id}`
          );

          console.log(res);

          setFacts(res?.data?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetItenaries();
  }, [expedition._id]);

  const [media, setMedia] = useState<any>([]);
  useEffect(() => {
    const fetMedia = async () => {
      if (expedition?._id) {
        try {
          const res = await AxiosInstance.get(
            `/medias/by-expiditionId/${expedition?._id}`
          );

          console.log(res);

          setMedia(res?.data?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetMedia();
  }, [expedition._id]);

  //reviews
  const [avgRating, setAvgRating] = useState<any>(0);
  const [totalReviews, setTotalReviews] = useState<any>(0);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetReviews = async () => {
      if (expedition?._id) {
        try {
          const res = await AxiosInstance.get(
            `/review/by-expiditionId/${expedition?._id}`
          );
          console.log(res);
          setReviews(res?.data?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetReviews();
  }, [expedition._id]);

  useEffect(() => {
    if (reviews) {
      let sum = 0;
      reviews &&
        reviews.map((item: any) => {
          sum = item?.rating + sum;
        });
      console.log(sum);
    }
  }, [reviews]);

  console.log(facts);

  console.log(expedition);

  const PackageDetail = [
    {
      id: 1,
      title: "Group Size",
      icon: "grommet-icons:group",
      desc: `${expedition?.groupSize} People`,
    },
    {
      id: 2,
      title: "Trip Duration",
      icon: "clarity:date-line",
      desc: `${expedition?.duration} Days`,
    },
    {
      id: 3,
      title: "Coordinates",
      icon: "fontisto:map",
      desc: `${expedition?.coordinates}`,
    },
    {
      id: 4,
      title: "Mountain Range",
      icon: "mdi:mountain",
      desc: `${expedition?.mountainRange}`,
    },
    {
      id: 5,
      title: "Maximum Altitude",
      icon: "material-symbols:altitude-outline",
      desc: `${expedition?.maxElevation}`,
    },
    {
      id: 5,
      title: "Best Season",
      icon: "fluent:weather-partly-cloudy-day-16-regular",
      desc: `${
        expedition?.season
          ? expedition?.season[0].toUpperCase() + expedition?.season?.slice(1)
          : ""
      }`,
    },
    {
      id: 5,
      title: "Activities",
      icon: "iconoir:trekking",
      desc: `${expedition?.activity}`,
    },
    {
      id: 5,
      title: "Difficulty",
      icon: "carbon:skill-level",
      desc: `${expedition?.physical}`,
    },
    {
      id: 5,
      title: "Accomodation",
      icon: "ph:buildings",
      desc: `${expedition?.accomodation}`,
    },
  ];

  const [readToggle, setReadToggle] = useState(false);

  // gear list
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  // downlaod materials
  const handleGearSubmit = async (e: any) => {
    e.preventDefault();
    // Trigger download if the email field is filled
    if (email) {
      const url1 = expedition?.gearList?.replace(/^http:/, "https:");
      const response = await fetch(url1);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url || expedition?.gearList;
      link.download = `Mountaineering-Gear-Guide-${expedition?.slug}`; // Desired filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        setGearDownload(false);
        toast.success("Gear list downloaded");
      }, 1000);

      //send to subscribe
      try {
        const { data } = await AxiosInstance.post("/subscribers", { email });
        console.log(data?.data);
      } catch (error: any) {
        console.log(error?.message);
      }

      document.body.style.overflowY = "auto";
    }
  };
  const [gearDownlaod, setGearDownload] = useState(false);
  const handleGearDownloadOpen = () => {
    setGearDownload(true);
    document.body.style.overflowY = "hidden";
  };

  const handleGearDownloadClose = () => {
    setGearDownload(false);
    document.body.style.overflowY = "auto";
  };

  // downlaod equipment
  const handleEquipmentSubmit = async (e: any) => {
    e.preventDefault();
    // Trigger download if the email field is filled
    if (email) {
      const url1 = expedition?.equipmentList?.replace(/^http:/, "https:");
      const response = await fetch(url1);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url || expedition?.equipmentList;
      link.download = `Equipment-list-${expedition?.slug}`; // Desired filename for download

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        setEquipmentDownload(false);
        toast.success("Equipment list downloaded");
      }, 1000);

      //send to subscriber
      try {
        const { data } = await AxiosInstance.post("/subscribers", { email });
        console.log(data?.data);
      } catch (error: any) {
        console.log(error?.message);
      }

      document.body.style.overflowY = "auto";
    }
  };

  const [equipmentDownload, setEquipmentDownload] = useState(false);

  const handleEquipmentDownloadOpen = () => {
    setEquipmentDownload(true);
    document.body.style.overflowY = "hidden";
  };

  const handleEquipmentDownloadClose = () => {
    setEquipmentDownload(false);
    document.body.style.overflowY = "auto";
  };

  // image view gallery
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const [userEmail, setUserEmail] = useState(""); // Updated state name
  const [openValueAdditionForm, setOpenValueAdditionForm] = useState(false);

  const handleSubmitValueAddition = async (e: any) => {
    e.preventDefault();
    // Trigger download if the userEmail field is filled
    if (userEmail) {
      const url1 = selectedValueA?.documents?.replace(/^http:/, "https:");
      const response = await fetch(url1);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url || selectedValueA?.documents;
      link.download = `Value-Addition-${expedition?.slug}`; // Desired filename for download

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      document.body.style.overflowY = "auto";
      setTimeout(() => {
        setOpenValueAdditionForm(false);
        toast.success("Value addition downloaded");
      }, 1500);
      try {
        const { data } = await AxiosInstance.post("/subscribers", {
          email: userEmail,
        });
        console.log(data?.data);
      } catch (error: any) {
        console.log(error?.message);
      }
    }
  };

  const handleOpenValueForm = (valueA: any) => {
    setOpenValueAdditionForm(true);
    setSelectedValueA(valueA);
    document.body.style.overflowY = "hidde   n";
  };
  const handleCloseValueForm = () => {
    setOpenValueAdditionForm(false);
    document.body.style.overflowY = "auto";
  };

  const [selectedValueA, setSelectedValueA] = useState<any>();

  return (
    <>
      {expedition && (
        <div className="w-full bg-[#EAEAEA]  h-full  title relative">
          <PageHero
            heading={expedition?.name}
            desc={expedition?.subheading}
            heroImg={expedition?.banner}
            imgHeight="100vh"
            showBreadCrumb="true"
            showRating="true"
            nameNav={expedition?.name}
            alt={`${expedition?.name}-img`}
          />
          {/* desc overview main  */}
          <div className="bg-[#1E1E1E]  w-full mx-auto relative ">
            <div className="py-10 w-11/12 4xl:w-10/12  mx-auto grid grid-cols-2 md:grid-cols-3 gap-y-3 place-content-center place-items-center gap-x-20">
              {PackageDetail.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: false, amount: 0.3 }}
                  key={index}
                  className="flex flex-col md:flex-row cursor-pointer w-full gap-3 mx-auto items-center justify-start"
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-[3.5rem] p-4 h-[3.5rem] rounded-md">
                      <Icon
                        className="w-full text-yellow-500 h-full object-cover object-center"
                        icon={item.icon}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-50 text-center md:text-left">
                      {item.title}
                    </span>
                    <span className="text-zinc-300 text-center md:text-left text-sm ">
                      {item.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="wave-container-detail !h-[5vh]"></div>
            <div className=" flex md:w-11/12 4xl:w-10/12  w-full pt-[5rem] flex-col md:flex-row justify-center relative items-start gap-3 mx-auto">
              {/* tab  link  */}
              <div className="mx-auto  w-full md:w-[15%] z-10 flex-col gap-8  backdrop-blur-sm bg-[#1E1E1E] md:bg-transparent text-zinc-50 md:text-zinc-800   sticky top-[4rem]  md:top-[6rem] left-0  flex  font-medium items-center">
                <div className="w-full overflow-x-auto gap-10 md:gap-0   md:overflow-hidden  flex md:flex-col justify-start md:justify-center px-5 py-4 md:py-0 md:px-0  font-medium  md:items-start items-center">
                  {buttonLabels.map((item) => (
                    <a
                      href={`#${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                      key={item.id}
                      className={`flex items-center md:border-b border-zinc-300 group ${
                        activeId ===
                        item.label.replace(/\s+/g, "-").toLowerCase()
                          ? "text-yellow-500"
                          : "md:text-zinc-800 text-zinc-200"
                      } hover:text-yellow-500 duration-200 w-full justify-between`}
                      onClick={() =>
                        setActiveId(
                          item.label.replace(/\s+/g, "-").toLowerCase()
                        )
                      }
                    >
                      <div className="flex items-center">
                        <Icon
                          icon={item.icon}
                          className="w-[1.5rem] h-[1.5rem]"
                        />
                        <span
                          className={`cursor-pointer text-sm md:text-wrap w-full py-3 group-hover:scale-105 duration-200 flex justify-start px-2 text-nowrap items-center`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <Icon
                        icon="ri:arrow-drop-right-line"
                        className="hidden md:block"
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* BOOOK  card for mobile */}
              <div className="mx-auto md:hidden w-11/12  !md:w-[25%] bg-[#1E1E1E] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]   md:w-[20%] flex-col gap-8 pb-2 overflow-hidden  md:sticky  top-[4rem] overflow-x-scroll md:overflow-x-visible  rounded-md md:top-[6rem] left-0  flex    items-center">
                <div className="flex w-full  flex-col gap-4 py-5 0 px-3  rounded-b-3xl   border-b">
                  {/* <div className="w-full rounded-md p-2  border"> */}
                  <span className="font-semibold text-zinc-50 text-lg">
                    USD
                  </span>
                  {/* </div> */}
                  <span className="flex gap-1 items-start justify-start font-medium">
                    <div className="flex flex-col">
                      <span className="text-zinc-50 text-sm">
                        From{" "}
                        <span className="font-semibold text-normal text-yellow-500">
                          ${minDeparture?.price ? minDeparture?.price : 0}
                        </span>
                      </span>
                      <del className="text-zinc-300">
                        US $
                        {minDeparture?.previousPrice
                          ? minDeparture?.previousPrice
                          : 0}
                      </del>
                    </div>{" "}
                    <span className="text-zinc-300 text-sm">/ person</span>
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      Guarenteed Departures
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      All Inclusive Pricing
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      Customizable Iteneraries
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      24/7 customer support
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      Easy cancellation
                    </span>
                  </div>
                </div>

                {/* BUTTON  */}
                <a href="#book" className="w-11/12 mx-auto">
                  <button type="button" className="primary-button !w-full">
                    Book now
                  </button>
                </a>
              </div>

              {/* detail  */}
              {
                <div className="mx-auto w-11/12  md:w-[65%] bg-[#F6F6F6]  flex flex-col">
                  {/* MAJOR TRIP INFODRMATION  */}
                  {attractions && attractions?.length > 0 && (
                    <>
                      <div className="mx-auto  w-full bg-[#F6F6F6]  flex flex-col">
                        <div
                          id="trip-attraction"
                          className="w-full mx-auto py-[4.5rem] border-b-[5px] border-zinc-300 bg-[#F6F6F6] md:px-[2rem] px-[1rem]"
                        >
                          <div className="md:text-2xl text-xl !font-bold  mb-4 uppercase flex items-center  gap-1 route-map relative tracking-wide title title">
                            <motion.span
                              variants={whileViewVarients}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: false, amount: 0.3 }}
                            >
                              Major Trip Attraction
                            </motion.span>
                            {/* <hr className="w-full h-[3px] bg-yellow-400" /> */}
                          </div>
                          <div className="flex flex-col gap-3 mt-1">
                            {attractions &&
                              attractions.map((attraction: any, index) => (
                                <motion.div
                                  variants={whileViewVarients}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: false, amount: 0.3 }}
                                  key={index}
                                  className="flex gap-5 items-start"
                                >
                                  <Icon
                                    icon="icon-park-outline:check-correct"
                                    className="min-w-5 min-h-5 mt-[1.5px] object-cover object-center text-green-800"
                                  ></Icon>

                                  <p className=" text-zinc-800/90">
                                    <span className="text-zinc-900 font-semibold ">
                                      {attraction.title}
                                    </span>
                                    {attraction.description &&
                                      `: ${parse(attraction.description)}`}
                                  </p>
                                </motion.div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {expedition?.overview?.length > 0 && (
                    <>
                      <div
                        id="overview"
                        className="w-full mx-auto  py-[4.5rem] border-b-[5px] border-zinc-300  md:px-[2rem] px-[1rem]"
                      >
                        <div className="md:text-2xl text-xl !font-bold  mb-4 uppercase flex items-center  gap-1 overview relative tracking-wide title title">
                          <motion.span
                            variants={whileViewVarients}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                          >
                            Overview
                          </motion.span>
                          {/* <hr className="w-full h-[3px] bg-yellow-400" /> */}
                        </div>
                        {/* <motion.div
                      variants={whileViewVarients}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.3 }}
                      className="w-full   text-zinc-800/90"
                    >
                      {expedition.overview &&
                        readToggle &&
                        parse(expedition.overview)}

                      {expedition.overview &&
                        !readToggle &&
                        parse(expedition.overview.slice(0, 800))}
                    </motion.div> */}
                        <div className="w-full   text-zinc-800/90">
                          {expedition.overview &&
                            readToggle &&
                            parse(expedition.overview)}

                          {expedition.overview &&
                            !readToggle &&
                            parse(expedition.overview.slice(0, 800))}
                        </div>
                        {expedition &&
                          expedition.overview &&
                          expedition.overview.length > 800 && (
                            <motion.button
                              variants={whileViewVarients}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: false, amount: 0.3 }}
                              className="font-medium mt-3  underline"
                              onClick={() => setReadToggle(!readToggle)}
                            >
                              {readToggle ? "Read less" : "Read more"}
                            </motion.button>
                          )}
                      </div>
                    </>
                  )}
                  {/* iternary  */}
                  {iteneraries && iteneraries.length > 0 && (
                    <div
                      id="itinerary"
                      className="w-full mx-auto py-[4.5rem] border-b-[5px] border-zinc-300 bg-[#F6F6F6md:] px-[2rem px-[1rem] "
                    >
                      {/* tile  */}
                      <div className="md:text-2xl text-xl !font-bold  mb-4 uppercase flex items-center  gap-1 itinerary it relative tracking-wide title title">
                        <motion.span
                          variants={whileViewVarients}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, amount: 0.3 }}
                        >
                          Itinerary
                        </motion.span>
                        {/* <hr className="w-full h-[3px] bg-yellow-400" /> */}
                      </div>
                      <div className="w-full h-full mt-6 flex flex-col gap-2">
                        {iteneraries &&
                          iteneraries.map((iternary: any, index) => (
                            <motion.div
                              variants={whileViewVarients}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: false, amount: 0.3 }}
                              onClick={() => toggleOpen(index)}
                              key={iternary._id}
                              className="w-full cursor-pointer  rounded-md  border-b border-zinc-200   py-4 md:py-2  overflow-hidden    items-center flex flex-col justify-between"
                            >
                              <div className="w-full  flex   justify-between items-center">
                                <div className="flex gap-3 md:gap-5 items-center">
                                  {/* day */}
                                  <div className="font-semibold justify-center items-center min-w-[4rem] md:w-[5rem] leading-none py-3 rounded-md overflow-hidden  text-yellow-400 bg-[#1E1E1E]   text-[11px] px-1   md:text-[12px] flex  gap-1">
                                    {/* <span>Day</span> */}
                                    <span>{iternary.day}</span>
                                  </div>
                                  {/* title */}
                                  <span className=" font-medium text-zinc-800">
                                    {iternary.title}
                                  </span>
                                </div>
                                {/* open */}
                                <div className="relative w-[3rem] h-[3rem]  overflow-hidden cursor-pointer">
                                  <span className="absolute toggle1 bg-yellow-500 h-[2px] top-[50%] w-[15px] left-[50%] -translate-x-[50%] inline-block"></span>
                                  <span
                                    className={`absolute toggle2-${index} bg-yellow-500 h-[2px] top-[50%] rotate-90 w-[15px] left-[50%] -translate-x-[50%] inline-block`}
                                  ></span>
                                </div>
                              </div>

                              {/* desc  */}
                              <div
                                className={`open-desc-${index} w-full  h-0  flex justify-start text-zinc-800/90 items-center  opacity-0`}
                              >
                                <p className={`open-desc-text-${index} py-4`}>
                                  {iternary.shortDescription}
                                </p>
                              </div>

                              <div
                                className={`open-desc-${index} w-full   h-0  flex justify-start text-zinc-800/90 items-center  opacity-0`}
                              >
                                <p className={`open-desc-text-${index} py-4`}>
                                  {iternary.description &&
                                    parse(iternary.description)}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* value addition */}
                  {valueAdditions && valueAdditions.length > 0 && (
                    <div
                      id="value-addition"
                      className="w-full mx-auto py-[4.5rem] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-[#F6F6F6] px-[2rem] md:px-[1rem]"
                    >
                      {/* title */}
                      <div className="md:text-2xl text-xl !font-bold mb-4 uppercase flex items-center gap-1 relative tracking-wide">
                        <motion.span
                          variants={whileViewVarients}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, amount: 0.3 }}
                        >
                          Value Addition
                        </motion.span>
                      </div>

                      <div className="w-full grid md:grid-cols-2 h-full mt-6 gap-2">
                        {valueAdditions.map((valueAddition, index) => (
                          <motion.div
                            variants={whileViewVarients}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.1 }}
                            key={valueAddition?._id}
                            className="w-full cursor-pointer border rounded-md border-zinc-200 px-5 py-4 md:py-2 overflow-hidden flex flex-col justify-between"
                          >
                            <div className="w-full flex flex-col gap-1 justify-between items-center">
                              {/* title */}
                              <span className="font-semibold text-start w-full text-zinc-800">
                                {valueAddition?.title}
                              </span>
                              <Image
                                alt="img-value-addition"
                                src={valueAddition?.image}
                                width={400}
                                height={400}
                                className="w-full h-[20vh] object-cover object-center"
                              />
                              <p className="text-sm font-medium text-zinc-700">
                                {valueAddition?.shortDescription &&
                                  parse(valueAddition?.shortDescription)}
                              </p>
                            </div>

                            <div className="w-full relative flex justify-start items-center">
                              <button
                                onClick={() =>
                                  handleOpenValueForm(valueAddition)
                                }
                                className="text-white mt-5 relative z-10 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center"
                              >
                                Download
                              </button>
                            </div>

                            <div
                              className={`open-desc-${index} w-full h-0 flex justify-start text-zinc-800/90 items-center opacity-0`}
                            >
                              {/* files */}
                              {/* <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-3 rounded-md gap-2">
                                {valueAddition.documents &&
                                <Image
                            
                                src={valueAddition?.do}
                                alt="value-addition"
                                width={400}
                                height={400}
                                className="w-full h-[40vh] rounded-md object-cover object-center brightness-90 cursor-pointer hover:brightness-100 duration-200"
                              />
                                  }
                                   
                              </div> */}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <AnimatePresence>
                    {openValueAdditionForm && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed top-0 left-0 w-full z-[105] backdrop-blur-md bg-black/40 h-screen flex items-center justify-center"
                      >
                        <div className="w-full max-w-md mx-auto px-6 py-12 bg-white relative border-0 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-md">
                          <span
                            onClick={handleCloseValueForm}
                            className="absolute uppercase top-[5%] cursor-pointer right-[5%] text-zinc-800"
                          >
                            <Icon
                              icon="material-symbols:close"
                              className="text-zinc-600 w-6 h-6"
                            />
                          </span>
                          <h1 className="text-2xl font-bold mb-8">
                            Fill up the form
                          </h1>
                          <form
                            id="form"
                            onSubmit={handleSubmitValueAddition}
                            className="relative"
                          >
                            {/* <div className="relative z-0 w-full mb-5">
                              <input
                                required
                                type="text"
                                placeholder="Full name"
                                className="pt-3 text-sm pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 focus:border-zinc-300 border-gray-200"
                              />
                            </div> */}

                            <div className="relative z-0 w-full mb-5">
                              <input
                                required
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="Email address"
                                className="pt-3 text-sm pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 focus:border-zinc-300 border-gray-200"
                              />
                            </div>
                            <button
                              type="submit"
                              className="text-white w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm py-2.5 text-center"
                            >
                              Download
                            </button>
                          </form>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* route map  */}
                  {expedition &&
                    expedition.routeMap &&
                    expedition.routeMap != "" && (
                      <>
                        <div
                          id="route-map"
                          className="w-full mx-auto py-[4.5rem] border-b-[5px] border-zinc-300 bg-[#F6F6F6md:] px-[2rem px-[1rem] "
                        >
                          {/* tile  */}
                          <div className="md:text-2xl text-xl !font-bold  mb-4 uppercase flex items-center  gap-1 itinerary it relative tracking-wide title ">
                            <motion.span
                              variants={whileViewVarients}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: false, amount: 0.3 }}
                            >
                              Route map
                            </motion.span>
                            {/* <hr className="w-full h-[3px] bg-yellow-400" /> */}
                          </div>

                          <motion.div
                            variants={whileViewVarients}
                            initial="hidden"
                            whileInView="visible"
                          >
                            <Image
                              width={1000}
                              height={1000}
                              src={expedition.routeMap}
                              className="overflow-hidded w-full h-full rounded-md object-cover object-center"
                              alt=""
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  {/* INclusion  */}
                  {inclusions && inclusions.length > 0 && (
                    <>
                      {" "}
                      <div
                        id="inclusion"
                        className="w-full mx-auto py-[4.5rem] border-b-[5px] border-zinc-300 bg-[#F6F6F6md:] px-[2rem px-[1rem] "
                      >
                        {/* tile  */}
                        <div className="md:text-2xl text-xl !font-bold  mb-4 uppercase flex items-center  gap-1 itinerary it relative tracking-wide title ">
                          <motion.span
                            variants={whileViewVarients}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                          >
                            Inclusion
                          </motion.span>
                          {/* <hr className="w-full h-[3px] bg-yellow-400" /> */}
                        </div>
                        <div className="w-full h-full mt-6 flex flex-col gap-2">
                          {inclusions &&
                            inclusions.map((inclusion: any, index) => (
                              <motion.div
                                variants={whileViewVarients}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.3 }}
                                onClick={() => toggleOpen(index)}
                                key={inclusion._id}
                                className="w-full items-center flex flex-col  justify-between"
                              >
                                <div className="w-full py-2 flex justify-between items-start">
                                  <div className="flex gap-5 items-start">
                                    {/* icon */}
                                    <Icon
                                      icon="icon-park-outline:check-correct"
                                      className="min-w-5 min-h-5 mt-[1.5px] object-cover object-center text-green-500"
                                    ></Icon>

                                    {/* title */}
                                    <p className=" text-zinc-800/90">
                                      <span className="text-zinc-900 font-semibold ">
                                        {inclusion.title}
                                      </span>
                                      : {inclusion.description}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                    </>
                  )}
                  {/* EXLUSION  */}
                  {exclusions && exclusions.length > 0 && (
                    <div
                      id="exclusion"
                      className="w-full mx-auto py-[4.5rem] border-b-[5px] border-zinc-300 bg-[#F6F6F6md:] px-[2rem px-[1rem] "
                    >
                      {/* tile  */}
                      <div className="md:text-2xl text-xl !font-bold  mb-4 uppercase flex items-center  gap-1 itinerary it relative tracking-wide title title">
                        <motion.span
                          variants={whileViewVarients}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, amount: 0.3 }}
                        >
                          Exlclusion
                        </motion.span>
                        {/* <hr className="w-full h-[3px] bg-yellow-400" /> */}
                      </div>
                      <div className="w-full h-full mt-6 flex flex-col gap-2">
                        {exclusions &&
                          exclusions.map((exclusion: any, index) => (
                            <motion.div
                              variants={whileViewVarients}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: false, amount: 0.3 }}
                              onClick={() => toggleOpen(index)}
                              key={exclusion._id}
                              className="w-full items-center flex flex-col justify-between"
                            >
                              <div className="w-full py-2 flex  justify-between items-start">
                                <div className="flex gap-2 items-start">
                                  {/* icon */}
                                  <Icon
                                    icon="clarity:remove-line"
                                    className="min-w-5 min-h-5 mt-[1.5px] object-cover object-center text-red-600"
                                  ></Icon>
                                  {/* title */}
                                  <p className=" text-zinc-800/90">
                                    <span className="text-zinc-900   font-semibold ">
                                      {exclusion.title}
                                    </span>
                                    : {exclusion.description}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* essential indormatrion  */}
                  <div
                    id="essential-information"
                    className="w-full mx-auto py-[4.5rem] border-b-[5px] border-zinc-300 bg-[#F6F6F6] md:px-[2rem] px-[1rem]"
                  >
                    {/* tile  */}
                    <motion.div
                      variants={whileViewVarients}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.3 }}
                      className="md:text-2xl text-wrap text-xl !font-bold  mb-4 uppercase flex items-center  gap-1 itinerary it relative tracking-wide title title"
                    >
                      Essential Information
                      {/* <hr className="w-full h-[3px] bg-yellow-400" /> */}
                    </motion.div>
                    <div className="w-full h-full flex flex-col gap-2">
                      {EssentialInformation.map((item) => (
                        <motion.div
                          variants={whileViewVarients}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, amount: 0.3 }}
                          key={item.id}
                          className="flex mt-2 flex-col"
                        >
                          <h2 className="font-semibold text-zinc-800">
                            {item.title} :
                          </h2>
                          <p className="  text-[16px] text-zinc-800/90">
                            {item.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* TRIP FACT  */}
                  <div id="trip-fact">
                    {facts && facts.length > 0 && <FactSection facts={facts} />}
                  </div>
                  {/* FAq  */}
                  <div id="faq">
                    {faqs && faqs.length > 0 && <FaqSection faqs={faqs} />}
                  </div>

                  {/* gear listS  */}
                  {expedition &&
                    (expedition?.gearList || expedition?.equipmentList) && (
                      <div
                        id="essential-equipment"
                        className="w-full mx-auto py-[4.5rem] border-b-[5px] border-zinc-300 bg-[#F6F6F6] md:px-[2rem] px-[1rem]"
                      >
                        {/* tile  */}
                        <motion.div
                          variants={whileViewVarients}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, amount: 0.3 }}
                          className="md:text-2xl text-xl !font-bold  mb-4 uppercase flex items-center  gap-1 itinerary it relative tracking-wide title title"
                        >
                          Essential equipment
                          {/* <hr className="w-full h-[3px] bg-yellow-400" /> */}
                        </motion.div>
                        <div className="w-[60%] mt-5 flex flex-col gap-2">
                          <div className="flex  items-center  justify-between">
                            <motion.p
                              variants={whileViewVarients}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: false, amount: 0.3 }}
                              className="font-semibold text-zinc-800/90"
                            >
                              Gear Guide Book for Lhotse Expedition
                            </motion.p>
                          </div>
                          <motion.div
                            variants={whileViewVarients}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            className="flex md:flex-row flex-col mt-5 gap-5 items-start"
                          >
                            {expedition.gearList && (
                              <button
                                onClick={() => handleGearDownloadOpen()}
                                type="button"
                                className="text-white text-nowrap  flex gap-1 items-center justify-center  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-5 py-2.5 text-center "
                              >
                                Gear List
                                <Icon
                                  icon="line-md:download-outline-loop"
                                  className="w-5 h-5"
                                />
                              </button>
                            )}
                            {expedition.equipmentList && (
                              <button
                                onClick={() => handleEquipmentDownloadOpen()}
                                type="button"
                                className="text-white text-nowrap  flex gap-1 items-center justify-center  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-5 py-2.5 text-center "
                              >
                                Equipment Checklist
                                <Icon
                                  icon="line-md:download-outline-loop"
                                  className="w-5 h-5"
                                />
                              </button>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    )}
                  {/* download gear popup  */}
                  <AnimatePresence>
                    {gearDownlaod && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-screen  flex justify-center items-center z-[100] bg-black/40  backdrop-blur-md fixed top-0 left-0"
                      >
                        <div className="mx-auto bg-white px-5 py-10 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]   mt-5 w-11/12  relative md:w-5/12 grid  grid-cols-1">
                          <div
                            onClick={() => handleGearDownloadClose()}
                            className="absolute hover:rotate-3 duration-200 text-zinc-700 hover:text-zinc-800 top-5 right-5 cursor-pointer"
                          >
                            <Icon icon="raphael:cross" className="w-7 h-7" />
                          </div>
                          <div className="">
                            <h2 className="text-2xl text-start md:text-center font-bold  text-zinc-700">
                              Get PDF before flying Nepal
                            </h2>
                            <p className="mt-2 text-[15px]  md:text-center text-zinc-700">
                              Get PDF before flying Nepal Experience the world
                              class tour package at the best rate. ABC offers
                              you the best tour package at the effective rate.
                              Here you can find the variety of tour packages!!
                            </p>
                            <form
                              className="mt-6 mx-auto flex flex-col md:flex-row gap-y-2 md:gap-y-0 max-w-md gap-x-4"
                              onSubmit={handleGearSubmit}
                            >
                              <label
                                htmlFor="email-address"
                                className="sr-only"
                              >
                                Email address
                              </label>
                              <input
                                onChange={handleEmailChange}
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                                autoComplete="email"
                                className="min-w-0 flex-auto rounded-md border border-gray-200  px-3.5 py-2 text-zinc-700 focus:border-gray-300 shadow-sm    outline-none sm:text-sm sm:leading-6"
                              />
                              <button
                                type="submit"
                                className="text-white cursor-pointer  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center "
                              >
                                Download
                              </button>
                            </form>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* download equipment popup  */}
                  <AnimatePresence>
                    {equipmentDownload && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-screen  flex justify-center items-center z-[100] bg-black/40  backdrop-blur-md fixed top-0 left-0"
                      >
                        <div className="mx-auto bg-white px-5 py-10 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]   mt-5 w-11/12  relative md:w-5/12 grid  grid-cols-1">
                          <div
                            onClick={() => handleEquipmentDownloadClose()}
                            className="absolute hover:rotate-3 duration-200 text-zinc-700 hover:text-zinc-800 top-5 right-5 cursor-pointer"
                          >
                            <Icon icon="raphael:cross" className="w-7 h-7" />
                          </div>
                          <div className="">
                            <h2 className="text-2xl text-start md:text-center font-bold  text-zinc-700">
                              Get PDF before flying Nepal
                            </h2>
                            <p className="mt-2 text-[15px]  md:text-center text-zinc-700">
                              Get PDF before flying Nepal Experience the world
                              class tour package at the best rate. ABC offers
                              you the best tour package at the effective rate.
                              Here you can find the variety of tour packages!!
                            </p>
                            <form
                              className="mt-6 mx-auto flex flex-col md:flex-row gap-y-2 md:gap-y-0 max-w-md gap-x-4"
                              onSubmit={handleEquipmentSubmit}
                            >
                              <label
                                htmlFor="email-address"
                                className="sr-only"
                              >
                                Email address
                              </label>
                              <input
                                onChange={handleEmailChange}
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                                autoComplete="email"
                                className="min-w-0 flex-auto rounded-md border border-gray-200  px-3.5 py-2 text-zinc-700 focus:border-gray-300 shadow-sm    outline-none sm:text-sm sm:leading-6"
                              />
                              <button
                                type="submit"
                                className="text-white cursor-pointer  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center "
                              >
                                Download
                              </button>
                            </form>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* gallery  */}
                  {media && media.length > 0 && (
                    <div
                      id="gallery"
                      className="w-full mx-auto py-[4.5rem] border-b-[5px] border-zinc-300 bg-[#F6F6F6] md:px-[2rem] px-[1rem]"
                    >
                      {/* tile  */}
                      <div className="md:text-2xl text-xl !font-bold  mb-4 uppercase flex items-center  gap-1 itinerary it relative tracking-wide title title">
                        <motion.span
                          variants={whileViewVarients}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, amount: 0.3 }}
                        >
                          Gallery
                        </motion.span>
                        {/* <hr className="w-full h-[3px] bg-yellow-400" /> */}
                      </div>
                      <motion.div
                        variants={whileViewVarients}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        className="w-full   mt-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-md  gap-2"
                      >
                        {media &&
                          media?.length > 0 &&
                          media.map((item: any, idx: any) => (
                            <>
                              <Image
                                key={idx}
                                onClick={() => openImageViewer(idx)}
                                src={item?.media}
                                alt="gallery"
                                width={400}
                                height={400}
                                className="w-full h-[30vh] md:h-[40vh] rounded-md object-cover object-center brightness-90 cursor-pointer hover:brightness-100 duration-200 "
                              ></Image>

                              {isViewerOpen && (
                                <div className="w-full bg-black h-screen fixed top-0 left-0 pt-[4rem] z-[50]">
                                  <ImageViewer
                                    src={media.map((item: any) => item.media)}
                                    currentIndex={currentImage}
                                    onClose={closeImageViewer}
                                    disableScroll={false}
                                    closeOnClickOutside={true}
                                  />
                                </div>
                              )}
                            </>
                          ))}
                      </motion.div>
                    </div>
                  )}
                  {/* Book  */}
                  <div
                    id="book"
                    className="w-full mx-auto overflow-hidden  py-[6rem] border-b-[5px] border-zinc-300 bg-[#F6F6F6] md:px-[2rem] px-[1rem]"
                  >
                    {/* tile  */}
                    <div className="md:text-2xl text-xl !font-bold  mb-4 uppercase flex items-center  gap-1 itinerary  relative tracking-wide ">
                      <motion.span
                        variants={whileViewVarients}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        className="title"
                      >
                        Book your trip
                      </motion.span>
                      {/* <hr className="w-full h-[3px] bg-yellow-400" /> */}
                    </div>
                    <BookingTab expedition_id={expedition._id} />
                  </div>

                  {/* trip review  */}
                  <div id="reviews" className="py-[6rem]">
                    <TripReview id={expedition._id} />
                  </div>
                </div>
              }
              {/* BOOK for web*/}
              <div className="mx-auto hidden w-11/12   !md:w-[25%] bg-[#1E1E1E] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]   md:w-[20%] flex-col gap-8 pb-2 overflow-hidden  sticky top-[4rem] overflow-x-scroll md:overflow-x-visible  rounded-md md:top-[6rem] left-0   md:flex   items-center">
                <div className="flex w-full  flex-col gap-4 py-5 0 px-3  rounded-b-3xl   border-b">
                  {/* <div className="w-full rounded-md p-2  border"> */}
                  <span className="font-semibold text-zinc-50 text-lg">
                    USD
                  </span>
                  {/* </div> */}
                  <span className="flex gap-1 items-start justify-start font-medium">
                    <div className="flex flex-col">
                      <span className="text-zinc-50 text-sm">
                        From{" "}
                        <span className="font-semibold text-normal text-yellow-500">
                          $ {minDeparture?.price ? minDeparture?.price : 0}
                        </span>
                      </span>
                      <del className="text-zinc-300">
                        US ${" "}
                        {minDeparture?.previousPrice
                          ? minDeparture?.previousPrice
                          : 0}
                      </del>
                    </div>{" "}
                    <span className="text-zinc-300 text-sm">/ person</span>
                  </span>
                </div>

                <div className="flex flex-col gap-2 px-2">
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      Guarenteed Departures
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      All Inclusive Pricing
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      Customizable Iteneraries
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      24/7 customer support
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:offer"
                      className="w-[1.5rem] h-[1.5rem] text-yellow-400"
                    />
                    <span className="text-sm text-zinc-300 font-medium">
                      Easy cancellation
                    </span>
                  </div>
                </div>

                {/* BUTTON  */}
                <a href="#book" className="w-10/12 mx-auto">
                  <button type="button" className="primary-button !w-full">
                    Book now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        // </div>
      )}

      {/* similar package  */}
      <Similar id={expedition?.category?._id} />
    </>
  );
}

export default TripDetailMain;

const buttonLabels = [
  { id: 1, label: "Trip Attraction", icon: "grommet-icons:attraction" },
  { id: 2, label: "Overview", icon: "grommet-icons:overview" },
  { id: 3, label: "Itinerary", icon: "bi:bar-chart-steps" },
  { id: 4, label: "Route Map", icon: "tabler:map-route" },
  { id: 4, label: "Value Addition", icon: "ic:round-add-task" },
  { id: 5, label: "Inclusion", icon: "icon-park-outline:check-correct" },
  { id: 6, label: "Exclusion", icon: "clarity:remove-line" },
  { id: 7, label: "Essential Information", icon: "ri:information-2-line" },
  { id: 8, label: "Trip Fact", icon: "material-symbols:fact-check-outline" },
  { id: 9, label: "FAQ", icon: "mdi:faq" },
  { id: 10, label: "Essential Equipment", icon: "carbon:gears" },
  { id: 11, label: "Gallery", icon: "solar:gallery-bold" },
  { id: 12, label: "Reviews", icon: "gg:calendar-dates" },
];

const EssentialInformation = [
  {
    id: 1,
    title: `Risk and Liability:`,
    desc: `Contour Expeditions(P) Ltd will make every effort to ensure that your Expedition is smooth and as pleasant as possible. However, please be reminded that all programs in Nepal are strictly conducted under the rules and regulations of the Nepal Government and Tourism Bureau. Therefore, we Contour Expeditions(P) Ltd. shall not be responsible for any changes in the itinerary due to unavoidable circumstances to Government
restrictions, landslides, road blockages, flooding, snowfall, political disturbances, illnesses or accidents. Any additional costs that are a result of such circumstances will be borne by you at the very spot.`,
  },

  {
    id: 2,
    title: `Medical Examination`,
    desc: `Expedition members should have all the immunizations that are required for visiting Nepal and be free of any medical condition that might pose a risk to themselves or fellow climbers during the trip. Our Peak climbing guides team Our group of IFMGA guide and assistants Climbing sherpa are enthusiastic, motivated and regarded as the

strongest and most cohesive group of Sherpas and other ethnic groups in Nepal. It is indicative of the reputation that our expedition team has earned - that Sherpa from other expeditions enthusiastically pursue a future position with the Contour Expeditions team.`,
  },

  {
    id: 3,
    title: `Documentation and Photographs`,
    desc: `Expedition trek members will need to provide 4 Photos passport size, occupation, Home address for trekking and climbing permits and a copy of their passport bio-data page. Passport photocopy (should be very clear with color scan) and validity minimum 6 months. We recommend having your passport ready well in advance to avoid last moment visa procedures Kindly consult your doctor and get yourself examined.

As trekking is situated at high altitudes please start exercises like walking, jogging, yoga, cardio, climbing and other breathing exercises in order to have a successful Trek and alpine climbing. Kindly get yourself medical insurance for this Trek. Please make sure you cover yourself for emergency evacuation (helicopter) insurance.`,
  },

  {
    id: 4,
    title: `Deposit`,
    desc: `An initial deposit of USD $1000 /-per person is required to secure a place on the trip`,
  },

  {
    id: 5,
    title: `Balance and Payments :`,
    desc: `The payment balance for this trip is 30 days before departure. All payments should be made by bank wire transfer to the following bank and account:`,
  },

  {
    id: 6,
    title: `SAFETY for this trek:`,
    desc: `Your safety is our major concern. So, the first aid kit boxes are supplied along the trek. The guides will take care of you if minor problems occur. But in case of harsh situations, emergency evacuation, and rescue, choppers with an experienced team will be there for you.`,
  },

  {
    id: 7,
    title: `BEST TIME TO DO`,
    desc: `The best time for this trek is during the spring (March to May) and autumn (October to December) season.`,
  },

  {
    id: 8,
    title: `TRAVEL INSURANCE`,
    desc: `It is your responsibility to ensure that you are fully and adequately insured for the duration of your trip. Please ensure that all activities, excursions, and destinations in your itinerary are included in your insurance policy, We advise our climbers to have full insurance against Medical, Evacuation, Trip cancellation, lost or damaged baggage, Air delays, etc. for this peak, you must be covered up to 6200m altitude.  Please take a copy of your insurance policy to the pre-trip briefing, as the guide will need to collect

your insurance details. We also ask that you keep a copy of your policy summary (containing policy number and emergency contact number for you insure) in your daypack at all times, so that we can access the information should we need to contact the insured on your behalf. We recommend international insurance company is https://www.globalrescue.com`,
  },
  {
    id: 9,
    title: `MEAL DURING TREK and Manaslu Expedition`,
    desc: `During our trek, you can appreciate bona fide Nepalese nourishment also the more typical international food (Tibetan, Continental, Italian, Indian, and so forth.). The essential menu for nourishment includes local food. You might not have more choices for nourishment, yet whatever you eat is healthy. The sustenance menu has

dal, Bhat, tarkari, momo (dumplings) and noodles on top. Breakfast and meals will be given from the teahouse or from a hotel menu where we go through the night; however lunch will be given while in transit to the next destination. All suppers, including breakfast, lunch, and supper, will be given during trekking while just breakfast will be accessible in Kathmandu and Pokhara. There will likewise be welcome and goodbye meals. For beverages, you can pick anything from tea, espresso, as well as some flavored beverages.`,
  },

  {
    id: 10,
    title: `ACCOMMODATION DURING TREK`,
    desc: `At City: Kathmandu and Ramechhap

Hotel (one room for two people)

Note: if you need a single room, email us at info@contourexpeditions.com

For the Single Room, we charge a single supplement.`,
  },
  {
    id: 11,
    title: `While Trekking and base camp:`,
    desc: `Eco Lodges ( a small house with few rooms at remote areas) best camping tent at base camp full setup, and one sleeping Mera v25 model at Manaslu Expedition, sharing base 2 people at base camp.`,
  },
  {
    id: 12,
    title: `ELECTRICAL SOCKETS`,
    desc: `There are 2 types of electrical sockets in Nepal –type D which are old UK style (3 round pins) and type C which are standard European style (2 round pins) –and are 220v, same as the UK. The type D socket is commonly found in India, so any adapter that is suitable for India will be the right size, and a European adaptor will be fine for the type C socket.`,
  },
  {
    id: 13,
    title: `Is there a mobile network on this trek? Are there any electricity charging points on this trek?`,
    desc: `Network on Ncell and Namaste Nepal telecom is available along the trek. Major tea houses have the facility to make calls for an additional charge. You can buy Wi-Fi at all tea houses for 200-300 NPR. Tea houses charge you 100-300 NPR for the use of electricity charging points. The rates increase as you go higher up on the trail. The dining area in tea houses at lower altitudes usually have common charging points that you can use for free.`,
  },
  {
    id: 14,
    title: `Toilets`,
    desc: `Starting the Manaslu Expedition, you won’t find western style toilets in most hotels. It is always easier and cleaner to maintain squat toilets. Water is stored in drums. Since toilets are common for a floor, it can get dirty in peak seasons, when there’s a high flow of trekkers.`,
  },
];

import type { SVGProps } from "react";
import { AxiosInstance } from "@/utils";
import BookingTab from "@/components/BookingTab";
import { date } from "zod";
import PageHero from "@/components/comp/PageHero";
import { TransparencyGridIcon } from "@radix-ui/react-icons";
import { whileViewVarients } from "../Animation/WhileViewVarients";
import { toast } from "sonner";

export function IconReview(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        d="m16 8l1.912 3.703l4.088.594L19 15l1 4l-4-2.25L12 19l1-4l-3-2.703l4.2-.594z"
      ></path>
      <path
        fill="currentColor"
        d="M17.736 30L16 29l4-7h6a1.997 1.997 0 0 0 2-2V8a1.997 1.997 0 0 0-2-2H6a1.997 1.997 0 0 0-2 2v12a1.997 1.997 0 0 0 2 2h9v2H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-4.835Z"
      ></path>
    </svg>
  );
}

function FactSection({ facts }: any) {
  return (
    <div
      id="trip-attraction"
      className="w-full mx-auto py-[4.5rem] border-b-[5px] border-zinc-300 bg-[#F6F6F6] md:px-[2rem] px-[1rem]"
    >
      <div className="md:text-2xl text-xl !font-bold  mb-4 uppercase flex items-center  gap-1 route-map relative tracking-wide title title">
        <motion.span
          variants={whileViewVarients}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          Fact About This Trip
        </motion.span>
        {/* <hr className="w-full h-[3px] bg-yellow-400" /> */}
      </div>
      <div className="flex flex-col gap-3 mt-1">
        {facts &&
          facts.map((fact: any) => (
            <motion.div
              variants={whileViewVarients}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              key={fact._id}
              className="flex gap-5 items-start"
            >
              {/* <Icon
                icon="icon-park-outline:check-correct"
                className="min-w-5 min-h-5 mt-[1.5px] object-cover object-center text-green-800"
              ></Icon> */}

              <div
                dangerouslySetInnerHTML={{ __html: fact.icon }}
                // style={{ width: '24px', height: '24px' }}
              />
              <p className=" text-zinc-800/90">
                <span className="text-zinc-900 font-semibold ">
                  {fact.title}
                </span>
                {fact.description != "" && ":"}
                {fact.description && parse(fact.description)}
              </p>
            </motion.div>
          ))}
      </div>
    </div>
  );
}

function FaqSection({ faqs }: any) {
  console.log(faqs);
  return (
    <div
      id="trip-attraction"
      className="w-full mx-auto py-[4.5rem] border-b-[5px] border-zinc-300 bg-[#F6F6F6] md:px-[2rem] px-[1rem]"
    >
      <div className="md:text-2xl text-xl !font-bold  mb-4 uppercase flex items-center  gap-1 route-map relative tracking-wide title title">
        <motion.span
          variants={whileViewVarients}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          Frequenty Asked Question About This Trip
        </motion.span>
      </div>
      <motion.div
        variants={whileViewVarients}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-col gap-3 mt-1"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs &&
            faqs.map((faq: any) => (
              <AccordionItem key={faq._id} value={faq._id}>
                <AccordionTrigger>{faq.title}</AccordionTrigger>
                <AccordionContent>
                  {/* Yes. It adheres to the WAI-ARIA design pattern. */}
                  {faq?.description && parse(faq?.description)}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
