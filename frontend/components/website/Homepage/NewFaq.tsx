"use client";
import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import ContourMountain from "@/public/contour-mountain.jpg";
import SplitType from "split-type";

type Props = {};

export default function NewFaq({}: Props) {
  const { contextSafe } = useGSAP();
  const [openAns, setOpenAns] = useState(false);
  const handleOpenAns = contextSafe((index: number) => {
    if (!openAns) {
      gsap.to(`.ans-${index}`, {
        height: "auto",
        duration: 0.2,
        ease: "sine.inOut",
      });
      setOpenAns(true);
    }
    if (openAns) {
      gsap.to(`.ans-${index}`, {
        height: 0,
        duration: 0.2,
        ease: "sine.inOut",
      });
      setOpenAns(false);
    }
  });

  const homeFaqRef = useRef(null);
  useGSAP(() => {
    // ANIMATION CODE
    const textSplitFaq = new SplitType(".home-faq-title");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-faq-title",
        // markers: true,
        start: "top 90%",
        end: "50% 50%",
        scrub: 2,
      },
    });
    // Perform the animations
    tl.from(
      textSplitFaq.chars,
      {
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "sine.inOut",
      },
      "tl"
    );

    gsap.from(".home-faq-desc", {
      opacity: 0,
      duration: 1.5,
      y: "100px",
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".home-faq-desc",
        // markers: true,
        start: "top 90%",
        end: "50% 50%",
        scrub: 2,
      },
    });

    gsap.from(homeFaqRef.current, {
      opacity: 0,
      duration: 1.5,
      y: "50px",
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: homeFaqRef.current,
        // markers: true,
        start: "top 90%",
        end: "50% 50%",
        scrub: 2,
      },
    });
  });
  return (
    <div className="w-full pb-[10rem]  relative">
      {/* <div className="wave-container !h-[5vh]"></div> */}
      {/* top title  */}
      <div className="flex w-11/12 mx-auto 4xl:w-10/12 pt-[3rem] justify-center items-center text-center flex-col gap-3">
        {/* title  */}
        <div className="w-auto flex-col flex gap-2 justify-center items-center">
          <h1 className="text-mainHeading-md home-faq-title title uppercase text-secondary-500 text-center text-main-title-md lg:text-main-title-lg font-primary font-bold">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <hr className="bg-yellow-400 h-[4px] overflow-hidden w-[50%]" />
        </div>
        <p className="w-full md:w-[50%] home-faq-desc text-secondary-300 normal-paragraph-md lg:text-normal-paragraph-lg font-primary">
          {`Got a question? We're here to help! If you don't see your question
          below, drop us a line on our`}{" "}
          <span className="underline font-semibold text-secondary-500 italic cursor-pointer">
            <Link href="contact_us">Contact Page</Link>
          </span>
        </p>
      </div>

      {/* faqs  */}
      <div
        ref={homeFaqRef}
        className="w-11/12 md:w-8/12 mt-[3%]   mx-auto columns-1 md:columns-2 flex-col space-y-5  justify-start items-start"
      >
        {FaqData.map((item, index) => (
          <div
            onClick={() => handleOpenAns(index)}
            key={index}
            className="w-full bg-white   rounded-md relative  cursor-pointer break-inside-avoid   px-5 pt-5 pb-2 flex flex-col gap-1 justify-between shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
          >
            {/* question  */}
            <div className="w-full pb-3 gap-2  flex justify-between items-center">
              <span className="w-[95%]  font-semibold text-normal-paragraph-md lg:text-normal-paragraph-lg font-primary">
                {item.question}
              </span>
              <span className="cursor-pointer overflow-hidden w-[1.5rem] h-[1.5rem]">
                <Icon
                  icon="mdi:arrow-down-drop"
                  className="w-full h-full object-cover text-yellow-500 object-center"
                />
              </span>
            </div>
            {/* ans  */}
            <p
              className={`h-0 overflow-hidden leading-relaxed w-full text-normal-paragraph-md  font-primary text-secondary-400 text-start ans-${index}`}
            >
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const FaqData = [
  {
    id: "1",
    question: "What are the best times of year for trekking in Nepal?",
    answer:
      "The best times for trekking in Nepal are during the pre-monsoon (March to May) and post-monsoon (September to November) seasons. During these times, the weather is generally clear and stable, offering the best views and conditions for trekking.",
  },
  {
    id: "2",
    question: "What should I pack for a trekking expedition?",
    answer:
      "You should pack essentials like sturdy hiking boots, comfortable clothing, a warm jacket, rain gear, a good backpack, a first aid kit, water purification tablets, and personal items such as sunscreen, a hat, and sunglasses.",
  },
  {
    id: "3",
    question: "Do I need a permit for trekking in Nepal?",
    answer:
      "Yes, most trekking areas in Nepal require a trekking permit. The types of permits vary depending on the region. Popular permits include the TIMS (Trekkers' Information Management System) card and specific area permits like the Annapurna Conservation Area Permit (ACAP) and the Sagarmatha National Park Permit.",
  },
  {
    id: "4",
    question: "Is it safe to trek alone in Nepal?",
    answer:
      "While many people trek alone in Nepal without issues, it's generally safer to trek with a guide or in a group. Guides can help navigate trails, provide information about the area, and assist in emergencies. Trekking with others also enhances the overall experience.",
  },
  {
    id: "5",
    question: "What other activities can I do in Nepal besides trekking?",
    answer:
      "Besides trekking, Nepal offers a range of activities including white-water rafting, jungle safaris, paragliding, cultural tours, and mountaineering expeditions. The diverse landscapes and rich culture provide endless opportunities for adventure and exploration.",
  },
];
