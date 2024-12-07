"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CustomizeTripHero from "./CustomizeTripHero";
import { Icon } from "@iconify/react";
import { AxiosInstance } from "@/utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { whileViewVarients } from "../Animation/WhileViewVarients";
type Props = {};

const CustomizeTrip = ({ }: Props) => {
  const [activeTab, setActiveTab] = useState("people");
  const [activeTabNo, setActiveTabNo] = useState(1);
  const tabsRef = useRef(null);

  // FOR SELECTED SIZE
  const [selectedSize, setSelectedSize] = useState("1 person");

  const handleSizeClick = (size: any) => {
    setSelectedSize(size);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const allInputField = watch();

  const [collections, setCollections] = useState<any>(undefined);
  const [categories, setCategories] = useState<any>(undefined);
  const [trips, setTrips] = useState<any>(undefined);
  const [selectedCollection, setSelectedCollection] = useState<any>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<any>(undefined);
  const [selectedTrip, setSelectedTrip] = useState<any>(undefined);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await AxiosInstance.get("/collections");
        setCollections(data?.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      if (selectedCollection) {
        try {
          const { data } = await AxiosInstance.get(
            `/categories/collection/${selectedCollection}`
          );
          setCategories(data?.data);
        } catch (error: any) {
          console.log(error.message);
        }
      }
    };
    fetchCategories();
  }, [selectedCollection]);

  useEffect(() => {
    const fetchTrips = async () => {
      if (selectedCategory) {
        try {
          const { data } = await AxiosInstance.get(
            `/expeditions/category/${selectedCategory}`
          );
          setTrips(data?.data);
        } catch (error: any) {
          console.log(error.message);
        }
      }
    };
    fetchTrips();
  }, [selectedCategory]);

  // FOR SELECTED DATE
  const [selectedDateOption, setSelectedDateOption] = useState("exactDate");
  const [travelDate, setTravelDate] = useState<any>(undefined);
  const handleDateOptionClick = (option: any) => {
    setSelectedDateOption(option);
    if (option == "decide-later") {
      setTravelDate({ travelDate: "decide-later" });
    } else {
      setTravelDate({});
    }
  };

  //FOR Package
  const [activeCategory, setActiveCategory] = useState("mountaineering");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    // Set the first sub-category as active by default when the category changes
    const firstSubCategory = Object.keys(
      activitiesData[activeCategory].subCategories
    )[0];
    setActiveSubCategory(firstSubCategory);
    setSelectedCategory(firstSubCategory);
    setSelectedPackage(""); // Reset selected package when category changes
    setSelectedTrip("");
  }, [activeCategory, selectedCollection]);

  const { description, subCategories, imageSrc } =
    activitiesData[activeCategory];

  // for accomodation
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<string>("Basic");

  const handleSelection = (accommodation: string) => {
    setSelectedAccommodation(accommodation);
  };

  // FOR BUDGET
  const [selectedBudget, setSelectedBudget] =
    useState<any>("I will decide later.");

    const [budget,setBudget]=useState<string>("I will decide later.");
  const handleSelectionBudget = (budget: string) => {
    setSelectedBudget(budget);

  };

  const [successBook, setSuccessBook] = useState("text");
  const onSubmit = async () => {
    try {
      const { data } = await AxiosInstance.post("/custom-trip", {
        ...allInputField,
        noOfTravelers: selectedSize,
        travelDate,
        budget: selectedBudget,
        accomodation: selectedAccommodation,
        expedition: selectedTrip,
      });
      // toast.success("Inquiry sent.");
      setSuccessBook("true");
      reset();
    } catch (error: any) {
      // toast.error("something went wrong.");
      setSuccessBook("false");
    }
  };

  return (
    <>
      <CustomizeTripHero />
      <div className="flex flex-col items-center py-[2rem] pb-[5rem] w-11/12 lg:w-10/12 3xl:w-8/12 mx-auto  gap-10">
        {/* tab main  step */}
        <div
          id="tab"
          ref={tabsRef}
          className="w-full  flex justify-start items-center overflow-x-scroll md:overflow-visible md:justify-center gap-2"
        >
          <div
             onClick={() =>activeTabNo>=1 && setActiveTab("people")}
            className={`cursor-pointer flex justify-center  gap-1 items-center px-5  md:px-2  py-4 rounded-md w-full text-center text-sm font-medium transition-all duration-300 ${activeTab === "people"
              ? "bg-yellow-400"
              : "bg-zinc-300 text-zinc-800"
              }`}
          >
            People
            <Icon icon="ic:baseline-people" className="w-5 h-5" />
          </div>
          <Icon
            icon="ic:baseline-double-arrow"
            className="min-w-4 min-h-4 text-zinc-600"
          />
          <div
             onClick={() => activeTabNo>=2 && setActiveTab("date")}
            className={`cursor-pointer flex justify-center  gap-1 items-center px-5  md:px-2  py-4 rounded-md w-full text-center text-sm font-medium transition-all duration-300 ${activeTab === "date"
              ? "bg-yellow-400"
              : "bg-zinc-300 text-zinc-800"
              }`}
          >
            Date
            <Icon icon="fontisto:date" className="w-5 h-5" />
          </div>
          <Icon
            icon="ic:baseline-double-arrow"
            className="min-w-4 min-h-4 text-zinc-600"
          />
          <div
             onClick={() =>activeTabNo>=3 && setActiveTab("location")}
            className={`cursor-pointer flex justify-center  gap-1 items-center px-5  md:px-2  py-4 rounded-md w-full text-center text-sm font-medium transition-all duration-300 ${activeTab === "location"
              ? "bg-yellow-400"
              : "bg-zinc-300 text-zinc-800"
              }`}
          >
            Location
            <Icon icon="mdi:location" className="w-5 h-5" />
          </div>
          <Icon
            icon="ic:baseline-double-arrow"
            className="min-w-4 min-h-4 text-zinc-600"
          />
          <div
             onClick={() =>activeTabNo>=4 && setActiveTab("accomodation")}
            className={`cursor-pointer flex justify-center  gap-1 items-center px-5  md:px-2  py-4 rounded-md w-full text-center text-sm font-medium transition-all duration-300 ${activeTab === "accomodation"
              ? "bg-yellow-400"
              : "bg-zinc-300 text-zinc-800"
              }`}
          >
            Accomodation
            <Icon icon="ic:round-house" className="w-5 h-5" />
          </div>
          <Icon
            icon="ic:baseline-double-arrow"
            className="min-w-4 min-h-4 text-zinc-600"
          />
          <div
             onClick={() =>activeTabNo>=5 && setActiveTab("budget")}
            className={`cursor-pointer flex justify-center  gap-1 items-center px-5  md:px-2  py-4 rounded-md w-full text-center text-sm font-medium transition-all duration-300 ${activeTab === "budget"
              ? "bg-yellow-400"
              : "bg-zinc-300 text-zinc-800"
              }`}
          >
            Budget
            <Icon icon="mdi:attach-money" className="w-5 h-5" />
          </div>
          <Icon
            icon="ic:baseline-double-arrow"
            className="min-w-4 min-h-4 text-zinc-600"
          />
          <div
           onClick={() =>activeTabNo>=6 && setActiveTab("form")}
            className={`cursor-pointer flex justify-center  gap-1 items-center px-5  md:px-2  py-4 rounded-md w-full text-center text-sm font-medium transition-all duration-300 ${activeTab === "form"
              ? "bg-yellow-400"
              : "bg-zinc-300 text-zinc-800"
              }`}
          >
            Form
            <Icon icon="mdi:form" className="w-5 h-5" />
          </div>
        </div>

        {activeTab === "people" && (
          <motion.div
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="flex flex-col justify-center items-center gap-5 bg-zinc-100 rounded-md w-full py-[3rem] px-[2rem]"
          >
            <div className="flex items-center flex-col gap-4">
              <h2 className="text-2xl font-bold mb-4">
                How many travelers will there be?
              </h2>
              <div className="flex flex-wrap gap-x-10 gap-y-5">
                <div
                  className={`cursor-pointer  ${selectedSize === "1 person"
                    ? "text-yellow-500"
                    : "hover:text-yellow-500 text-zinc-700"
                    } duration-200 font-semibold text-lg gap-2 flex justify-center items-center`}
                  onClick={() => handleSizeClick("1 person")}
                >
                  One individual
                  <Icon icon="material-symbols:person" className="w-5 h-5" />
                </div>
                <div
                  className={`cursor-pointer  ${selectedSize !== "1 person" &&
                    selectedSize !== "decide-later"
                    ? "text-yellow-500"
                    : "hover:text-yellow-500 text-zinc-700"
                    } duration-200 font-semibold text-lg gap-2 flex justify-center items-center`}
                  onClick={() => handleSizeClick("2 persons")}
                >
                  Group
                  <Icon icon="flowbite:users-group-solid" className="w-5 h-5" />
                </div>
                <div
                  className={`cursor-pointer  ${selectedSize === "decide-later"
                    ? "text-yellow-500"
                    : "hover:text-yellow-500 text-zinc-700"
                    } duration-200 font-semibold text-lg gap-2 flex justify-center items-center`}
                  onClick={() => handleSizeClick("decideLater")}
                >
                  Finalize later
                  <Icon icon="ic:outline-watch-later" className="w-5 h-5" />
                </div>
              </div>
            </div>
            {selectedSize !== "decideLater" && selectedSize !== "1 person" && (
              <div className="flex w-full mt-5">
                {/* <select
                  className="w-full md:w-[20vw] md:mx-auto py-3 px-5 outline-none bg-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] focus:ring-1 ring-yellow-500 rounded-md"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <>
                    <option value="1 person">1 person</option>
                    <option value="2 persons">2 persons</option>
                    <option value="3 persons">3 persons</option>
                    <option value="4 persons">4 persons</option>
                    <option value="5 persons">5 persons</option>
                    <option value="6 persons">6 persons</option>
                    <option value="7 persons">7 persons</option>
                    <option value="8 persons">8 persons</option>
                    <option value="9 persons">9 persons</option>
                    <option value="10 persons">10 persons</option>
                    <option value="11 persons">11 persons</option>
                    <option value="12+ persons">12+ persons</option>
                    <option value="decide-later">Decide later</option>
                  </>
                </select> */}

                <label
                  htmlFor="group-size"
                  className="block text-sm font-medium text-gray-700"
                >
                  Group Size
                </label>
                <select
                  id="group-size"
                  className="w-full md:w-[20vw] md:mx-auto py-3 px-5 outline-none bg-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] focus:ring-1 ring-yellow-500 rounded-md"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="1 person">1 person</option>
                  <option value="2 persons">2 persons</option>
                  <option value="3 persons">3 persons</option>
                  <option value="4 persons">4 persons</option>
                  <option value="5 persons">5 persons</option>
                  <option value="6 persons">6 persons</option>
                  <option value="7 persons">7 persons</option>
                  <option value="8 persons">8 persons</option>
                  <option value="9 persons">9 persons</option>
                  <option value="10 persons">10 persons</option>
                  <option value="11 persons">11 persons</option>
                  <option value="12+ persons">12+ persons</option>
                  <option value="decide-later">Decide later</option>
                </select>
              </div>
            )}

            <div className="flex justify-end w-11/12 mx-auto">
              <button
                onClick={() => {
                  // Set the active tab
                  setActiveTab("date");
                  setActiveTabNo(2)
                  // Scroll to the element with ID 'tab'
                  const tabElement = document.getElementById("tab");
                  if (tabElement) {
                    const elementPosition =
                      tabElement.getBoundingClientRect().top;
                    const offsetPosition =
                      elementPosition +
                      window.pageYOffset -
                      window.innerHeight / 2 +
                      tabElement.clientHeight / 2;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
                type="submit"
                className="primary-button
               "
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* date selection  */}
        {activeTab === "date" && (
          <motion.div
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="flex flex-col justify-center items-center gap-5 bg-zinc-100 rounded-md w-full py-[2rem] px-[1.5rem]"
          >
            <div className="flex items-center flex-col gap-4">
              <h2 className="text-2xl font-bold mb-4">
                What’s your travel date?
              </h2>
              <div className="flex flex-wrap gap-x-10 gap-y-5">
                <div
                  className={`cursor-pointer ${selectedDateOption === "exactDate"
                    ? "text-yellow-500"
                    : "hover:text-yellow-500 text-zinc-700"
                    } duration-200 font-semibold text-lg gap-2 flex justify-center items-center`}
                  onClick={() => handleDateOptionClick("exactDate")}
                >
                  On Exact Date
                  <Icon
                    icon="clarity:date-outline-badged"
                    className="w-5 h-5"
                  />
                </div>
                <div
                  className={`cursor-pointer ${selectedDateOption === "certainDate"
                    ? "text-yellow-500"
                    : "hover:text-yellow-500 text-zinc-700"
                    } duration-200 font-semibold text-lg gap-2 flex justify-center items-center`}
                  onClick={() => handleDateOptionClick("certainDate")}
                >
                  On Certain Date
                  <Icon icon="fluent-mdl2:date-time-2" className="w-5 h-5" />
                </div>
                <div
                  className={`cursor-pointer ${selectedDateOption === "decide-later"
                    ? "text-yellow-500"
                    : "hover:text-yellow-500 text-zinc-700"
                    } duration-200 font-semibold text-lg gap-2 flex justify-center items-center`}
                  onClick={() => handleDateOptionClick("decide-later")}
                >
                  Finalize later
                  <Icon icon="ic:outline-watch-later" className="w-5 h-5" />
                </div>
              </div>
            </div>
            {/* SELECT DATE  */}
            <div className="w-full md:w-auto flex gap-5 mb-5">
              {selectedDateOption === "exactDate" && (
                <div className="w-full">
                  <label
                    htmlFor="exact-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="exact-date"
                    name="exact-date"
                    onChange={(e) =>
                      setTravelDate({ exactDate: e.target.value })
                    }
                    className="w-full md:w-[20vw] md:mx-auto py-3 px-5 outline-none bg-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] focus:ring-1 ring-yellow-500 rounded-md mt-1"
                  />
                </div>
              )}

              {selectedDateOption === "certainDate" && (
                <motion.div
                  variants={whileViewVarients}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  className="flex md:flex-row  flex-col gap-5 mb-5 w-full md:w-auto"
                >
                  <div className="w-full">
                    <label
                      htmlFor="departure-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Departure Date
                    </label>
                    <input
                      type="date"
                      id="departure-date"
                      name="departure-date"
                      onChange={(e) =>
                        setTravelDate({
                          ...travelDate,
                          departureDate: e.target.value,
                        })
                      }
                      className="w-full md:w-[20vw] mx-auto py-3 px-5 outline-none bg-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] focus:ring-1 ring-yellow-500 rounded-md mt-1"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="arrival-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Arrival Date
                    </label>
                    <input
                      type="date"
                      id="arrival-date"
                      onChange={(e) =>
                        setTravelDate({
                          ...travelDate,
                          arrivalDate: e.target.value,
                        })
                      }
                      name="arrival-date"
                      className="w-full md:w-[20vw] py-3 px-5 outline-none bg-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] focus:ring-1 ring-yellow-500 rounded-md mt-1"
                    />
                  </div>
                </motion.div>
              )}
            </div>
            {((selectedDateOption == "exactDate" && travelDate?.exactDate) ||
              (selectedDateOption == "certainDate" &&
                travelDate?.arrivalDate &&
                travelDate?.departureDate) ||
              selectedDateOption == "decide-later") && (
                <>
                  <div className="flex justify-end w-11/12 mx-auto">
                    <button
                      onClick={() => {
                        // Set the active tab
                        setActiveTab("location");
                        setActiveTabNo(3)
                        // Scroll to the element with ID 'tab'
                        const tabElement = document.getElementById("tab");
                        if (tabElement) {
                          const elementPosition =
                            tabElement.getBoundingClientRect().top;
                          const offsetPosition =
                            elementPosition +
                            window.pageYOffset -
                            window.innerHeight / 2 +
                            tabElement.clientHeight / 2;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                          });
                        }
                      }}
                      type="button"
                      className="primary-button
                   "
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}
          </motion.div>
        )}

        {/* for location and package  */}
        {activeTab === "location" && (
          <motion.div
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="flex flex-col justify-center items-center gap-5 bg-zinc-100 rounded-md w-full py-[2rem] px-[1.5rem]"
          >
            <div className="flex  flex-col justify-center items-center text-center gap-3">
              <h2 className="text-2xl font-bold mb-4">{description}</h2>
              <motion.div
                variants={whileViewVarients}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="flex w-full md:w-auto md:flex-row flex-col  gap-5 mb-5"
              >
                {collections &&
                  collections.map((item: any, idx: any) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedCollection(item._id)}
                      className={`w-full md:w-[15rem] relative h-[20vh] cursor-pointer rounded-md overflow-hidden ${selectedCollection === item?._id
                        ? "ring-4 ring-yellow-500"
                        : "hover:ring-2 hover:ring-yellow-500"
                        }`}
                    >
                      <div className="absolute bottom-2 left-2 z-10 text-zinc-50 font-medium">
                        {item?.name}
                      </div>
                      <Image
                        width={1000}
                        height={1000}
                        src={
                          item.image?.length > 0
                            ? item.image[0]
                            : "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt={`${item.name} image`}
                        className="w-full h-full brightness-75 object-cover object-top rounded-md"
                      />
                    </div>
                  ))}
              </motion.div>
            </div>
            <div className="flex flex-col gap-4">
              <motion.div
                variants={whileViewVarients}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="flex flex-wrap gap-2 items-center md:justify-center"
              >
                {categories &&
                  categories.map((item: any, idx: any) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedCategory(item?._id);
                        setSelectedTrip("");
                      }}
                      className={`px-2 md:px-5 py-2 text-center rounded-md cursor-pointer ${selectedCategory === item?._id
                        ? "bg-yellow-500 text-white"
                        : "bg-zinc-800 text-zinc-50"
                        }`}
                    >
                      {item?.name}
                    </div>
                  ))}
              </motion.div>

              <div className="flex mt-5 flex-col gap-2">
                <motion.h2
                  variants={whileViewVarients}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  className="text-left md:text-center font-bold text-zinc-700"
                >
                  Pick a package
                </motion.h2>
                <motion.div
                  variants={whileViewVarients}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  className="flex w-8/12 justify-center mx-auto flex-wrap gap-2"
                >
                  {trips &&
                    trips?.map((pkg: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => setSelectedTrip(pkg?._id)}
                        className={`cursor-pointer rounded-md text-sm font-medium px-10 py-2 ${selectedTrip === pkg?._id
                          ? "bg-yellow-500 text-white"
                          : "bg-zinc-300 text-black"
                          }`}
                      >
                        {pkg?.name}
                      </div>
                    ))}
                </motion.div>
              </div>
            </div>

            {selectedTrip && selectedTrip.length > 0 && (
              <>
                <div className="flex justify-end w-11/12 mx-auto">
                  <button
                    onClick={() => {
                      // Set the active tab
                      setActiveTab("accomodation");
                      setActiveTabNo(4)
                      // Scroll to the element with ID 'tab'
                      const tabElement = document.getElementById("tab");
                      if (tabElement) {
                        const elementPosition =
                          tabElement.getBoundingClientRect().top;
                        const offsetPosition =
                          elementPosition +
                          window.pageYOffset -
                          window.innerHeight / 2 +
                          tabElement.clientHeight / 2;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        });
                      }
                    }}
                    type="button"
                    className="primary-button"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* for accomodation  */}
        {activeTab === "accomodation" && (
          <motion.div
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="flex  flex-col justify-center items-center gap-5 bg-zinc-100 rounded-md w-full py-[2rem] px-[1.5rem]"
          >
            <h2 className="text-2xl font-bold mb-4">
              What sort of accommodations are you looking for ?
            </h2>
            <div className="flex flex-wrap gap-x-10 gap-y-5">
              <div
                onClick={() => handleSelection("Basic")}
                className={`cursor-pointer  font-semibold text-lg gap-2 flex justify-center items-center ${selectedAccommodation === "Basic"
                  ? "text-yellow-500"
                  : "text-zinc-700 hover:text-yellow-500 duration-200"
                  }`}
              >
                Basic
                <Icon icon="clarity:house-solid" className="w-5 h-5" />
              </div>
              <div
                onClick={() => handleSelection("Luxury")}
                className={`cursor-pointer  font-semibold text-lg gap-2 flex justify-center items-center ${selectedAccommodation === "Luxury"
                  ? "text-yellow-500"
                  : "text-zinc-700 hover:text-yellow-500 duration-200"
                  }`}
              >
                Upscale
                <Icon icon="ri:hotel-fill" className="w-5 h-5" />
              </div>
              <div
                onClick={() => handleSelection("Tents")}
                className={`cursor-pointer  font-semibold text-lg gap-2 flex justify-center items-center ${selectedAccommodation === "Tents"
                  ? "text-yellow-500"
                  : "text-zinc-700 hover:text-yellow-500 duration-200"
                  }`}
              >
                Tents
                <Icon icon="ph:tent-fill" />
              </div>
              <div
                onClick={() => handleSelection("Self book")}
                className={`cursor-pointer  font-semibold text-lg gap-2 flex justify-center items-center ${selectedAccommodation === "Self book"
                  ? "text-yellow-500"
                  : "text-zinc-700 hover:text-yellow-500 duration-200"
                  }`}
              >
                Self-arrange
                <Icon icon="material-symbols:person-pin" className="w-5 h-5" />
              </div>
            </div>

            <div className="flex justify-end w-11/12 mx-auto">
              <button
                onClick={() => {
                  // Set the active tab
                  setActiveTab("budget");
                  setActiveTabNo(5)
                  // Scroll to the element with ID 'tab'
                  const tabElement = document.getElementById("tab");
                  if (tabElement) {
                    const elementPosition =
                      tabElement.getBoundingClientRect().top;
                    const offsetPosition =
                      elementPosition +
                      window.pageYOffset -
                      window.innerHeight / 2 +
                      tabElement.clientHeight / 2;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
                type="button"
                className="primary-button"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === "budget" && (
          <motion.div
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="flex flex-col justify-center items-center gap-5 bg-zinc-100 rounded-md w-full py-[2rem] px-[1.5rem]"
          >
            <h2 className="text-2xl font-bold mb-4">
              What is the status of your budget?
            </h2>
            <div className="flex flex-wrap gap-x-10 gap-y-5">
              <div
                onClick={() => {setBudget("I'm on a budget.")
                  setSelectedBudget(undefined)}}
                className={`cursor-pointer p-4 rounded-md font-semibold text-lg gap-2 flex justify-center items-center ${budget === "I'm on a budget."
                  ? "text-yellow-500"
                  : "text-zinc-700 hover:text-yellow-500 duration-200 "
                  }`}
              >
                {` I'm on a budget.`}
                <Icon
                  icon="fluent-emoji-high-contrast:money-bag"
                  className="w-5 h-5"
                />
              </div>
              <div
                onClick={() => {setBudget("I will decide later.")
              handleSelectionBudget("I will decide later.")}
              }
                className={`cursor-pointer p-4 rounded-lg font-semibold text-lg gap-2 flex justify-center items-center ${budget === "I will decide later."
                  ? "text-yellow-500"
                  : "text-zinc-700 hover:text-yellow-500 duration-200 "
                  }`}
              >
                I will decide later.
                <Icon icon="ic:outline-watch-later" className="w-5 h-5" />
              </div>
            </div>
           {
            budget=="I'm on a budget." && ( <div className="w-full flex flex-col justify-center items-center gap-1" >
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-gray-700"
              >
                Budget range in $
              </label>
              <input
                id="budget"
                placeholder="4000-8000"
                onChange={(e) =>
                  setSelectedBudget(
                  e.target.value
                  )
                }
                name="budget"
                className="w-full md:w-[20vw] py-3 px-5 outline-none bg-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] focus:ring-1 ring-yellow-500 rounded-md mt-1"
              />
            </div>)
           }
         {
          (selectedBudget && (   <div className="flex justify-end w-11/12 mx-auto">
            <button
              onClick={() => {
                // Set the active tab
                setActiveTab("form");
                setActiveTabNo(6);
                // Scroll to the element with ID 'tab'
                const tabElement = document.getElementById("tab");
                if (tabElement) {
                  const elementPosition =
                    tabElement.getBoundingClientRect().top;
                  const offsetPosition =
                    elementPosition +
                    window.pageYOffset -
                    window.innerHeight / 2 +
                    tabElement.clientHeight / 2;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              type="button"
              className="primary-button"
            >
              Continue
            </button>
          </div>))
         }
          </motion.div>
        )}

        {/* Fill form */}

        {activeTab === "form" && (
          <motion.div
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="flex flex-col w-full justify-center items-center gap-5"
          >
            <h2 className="text-2xl font-bold mb-3">Fill the form below</h2>
            <div className="w-full md:w-8/12 mx-auto bg-white p-8 rounded-lg shadow-lg">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-2">
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name <span className="text-yellow-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      {...register("fullName")}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-zinc-700 sm:text-sm"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country <span className="text-yellow-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      {...register("country")}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-zinc-700 sm:text-sm"
                      placeholder="Your country"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address <span className="text-yellow-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-zinc-700 sm:text-sm"
                      placeholder="Your email address"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Number <span className="text-yellow-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-number"
                      {...register("phone")}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-zinc-700 sm:text-sm"
                      placeholder="Your contact number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message <span className="text-yellow-500"></span>
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={4}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-zinc-700 sm:text-sm"
                    placeholder="Your message"

                  />
                </div>

                <div>
                  <button type="submit" className="primary-button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {successBook !== "text" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-screen   flex justify-center items-center z-[100] bg-black/20  backdrop-blur-sm fixed top-0 left-0"
          >
            <div className="w-11/12 mx-auto md:w-[30vw] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]  py-[3rem] relative rounded-md  font-semibold bg-white text-zinc-800 flex justify-center items-center">
              <div
                onClick={() => setSuccessBook("text")}
                className="absolute hover:rotate-3 duration-200 text-zinc-700 hover:text-zinc-800 top-5 right-5 cursor-pointer"
              >
                <Icon icon="raphael:cross" className="w-7 h-7" />
              </div>
              {successBook == "true" ? (
                <div className="flex gap-2 justify-center items-center">
                  Trip Enquiry Successfull
                  <Icon
                    icon="icon-park-solid:success"
                    className="w-10 h-10 text-green-500"
                  />{" "}
                </div>
              ) : (
                <div className="flex gap-2 justify-center items-center">
                  Something went wrong !
                  <Icon
                    icon="raphael:cross"
                    className="w-10 h-10 text-red-600"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomizeTrip;

const activitiesData: any = {
  mountaineering: {
    title: "Mountaineering",
    description: "Activities in Nepal - Mountaineering",
    subCategories: {
      "Over 8000 meters": [
        "EVEREST/LHOTSE DOUBLE 8000'ERS",
        "LHOTSE EXPEDITION (8,516M)",
        "MANASLU EXPEDITION (8,163M)",
        "CHO-OYU EXPEDITION (8,188M)",
        "MAKALU EXPEDITION (8,485M)",
        "MK2 EXPEDITION (8,611M)",
      ],
      "Over 7000 meters": [
        "PEAK EXPEDITION 1",
        "PEAK EXPEDITION 2",
        // Add more packages as needed
      ],
      "Over 6000 meters": [
        "PEAK EXPEDITION 3",
        "PEAK EXPEDITION 4",
        // Add more packages as needed
      ],
    },
    imageSrc:
      "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  trekking: {
    title: "Trekking",
    description: "Activities in Nepal - Trekking",
    subCategories: {
      "Everest Region": ["EVEREST BASE CAMP TREK", "EVEREST GOKYO LAKES TREK"],
      "Annapurna Region": [
        "ANNAPURNA CIRCUIT TREK",
        "ANNAPURNA BASE CAMP TREK",
      ],
      "Langtang Region": ["LANGTANG VALLEY TREK", "GOSAIKUNDA TREK"],
    },
    imageSrc:
      "https://plus.unsplash.com/premium_photo-1677002240252-af3f88114efc?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  otherActivities: {
    title: "Other Activities",
    description: "Activities in Nepal - Other Activities",
    subCategories: {
      "Adventure Sports": [
        "WHITE WATER RAFTING",
        "PARAGLIDING IN POKHARA",
        "BUNGEE JUMPING",
      ],
      "Cultural Tours": ["KATHMANDU HERITAGE TOUR", "PATAN AND BHAKTAPUR TOUR"],
      "Wildlife Safari": [
        "CHITWAN NATIONAL PARK SAFARI",
        "BARDIA NATIONAL PARK SAFARI",
      ],
    },
    imageSrc:
      "https://images.unsplash.com/photo-1508287459906-37445322fdf6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
};
