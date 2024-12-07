"use client";
import Image from "next/image";
import React, { useState } from "react";

import { Icon } from "@iconify/react";
import teamMembers from "@/data/TeamData";
import { motion } from "framer-motion";
import { whileViewVarients } from "../Animation/WhileViewVarients";
type Props = {};

export default function OurTeam({}: Props) {
  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => {
    setOpenForm(true);
    document.body.style.overflowY = "hidden";
  };
  const handleCloseForm = () => {
    setOpenForm(false);
    document.body.style.overflowY = "auto";
  };

  // Filter team members to only include those with category 'BOD'
  // Filter team members by category
  const bodMembers = teamMembers.filter((member) => member.category === "BOD");
  const expeditionGuideMembers = teamMembers.filter(
    (member) => member.category === "Expedition guide"
  );
  const trekkingGuideMembers = teamMembers.filter(
    (member) => member.category === "Trekking guide"
  );
  const porterGuideMembers = teamMembers.filter(
    (member) => member.category === "Porter guide"
  );
  console.log(porterGuideMembers);
  const cookMembers = teamMembers.filter(
    (member) => member.category === "Cook"
  );
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [openTeamDetail, setOpenTeamDetail] = useState(false);

  const handleOpenTeamDetail = (member: any) => {
    setSelectedMember(member);
    setOpenTeamDetail(true);
  };

  const handleCloseTeamDetail = () => {
    setOpenTeamDetail(false);
    setSelectedMember(null);
  };
  return (
    <>
      <div className="pb-[3rem] w-full">
        <div className="w-full md:w-[70%] pb-[3rem] mx-auto flex flex-col gap-5">
          <motion.h1
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="title text-2xl md:text-6xl text-center relative  mt-10 title font-bold text-secondary-500"
          >
            MADE FOR CLIMBERS
          </motion.h1>
          <div className="flex md:flex-row justify-center  flex-col w-11/12 mx-auto md:w-full gap-5">
            {/* left  */}
            <div className="w-full md:w-[50%] flex flex-col gap-2">
              {/* <span className="text-lg font-medium text-secondary-400">
                Meet Our Experts
              </span> */}
              <motion.span
                variants={whileViewVarients}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="text-4xl text-zinc-800 font-medium"
              >
                Creating the deltaboard has been our team
              </motion.span>
            </div>
            {/* RIGHT  */}
            <div className="flex w-full md:w-[70%] flex-col gap-5">
              <motion.div
                variants={whileViewVarients}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0 }}
              >
                <span className="text-sm font-bold"> Meet Our Experts</span>
                <p className="text-secondary-400 leading-relaxed">
                  Our dedicated team of climbers and guides shares a deep
                  passion for the mountains. With extensive knowledge and
                  experience, they ensure your journey is safe and
                  unforgettable. From skilled mountaineers to seasoned trekkers,
                  each member is an expert and an avid explorer, committed to
                  providing exceptional guidance and support throughout your
                  adventure.
                </p>
              </motion.div>
              {/* <div>
              <span className="text-sm font-bold">title</span>
              <p className="text-secondary-400  leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo adipisci recusandae reprehenderit at facilis quaerat,
                necessitatibus facere nobis delectus quas deserunt vel illo
                doloribus nam consequatur. Vero, voluptatem neque consectetur
                maiores debitis adipisci minima alias. Saepe, dolor quis. Unde
                nihil ratione doloribus culpa magni ea sit perspiciatis soluta
                quisquam. Accusamus! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. At modi vitae ad illo dolore ipsum distinctio
                consequuntur quis natus quidem.
              </p>
            </div> */}
            </div>
          </div>
        </div>
        {/* bod  */}
        <div className="w-11/12  4xl:w-10/12 pb-[3rem]  mx-auto flex flex-col gap-5 justify-start">
          <motion.h1
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-semibold text-2xl text-center"
          >
            Board of Directors
          </motion.h1>
          <div className="grid w-full mx-auto gap-3 grid-cols-1 md:grid-cols-4 place-items-center place-content-center">
            {bodMembers.map((teamMember, index) => (
              <motion.div
                variants={whileViewVarients}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0 }}
                key={index}
                onClick={() => handleOpenTeamDetail(teamMember)}
                className="w-full"
              >
                <div className={`flex min-w-full flex-col  gap-1`}>
                  <div className="relative group h-[50vh] rounded-md overflow-hidden cursor-pointer">
                    <div className="absolute md:group-hover:opacity-[0.5] duration-300  top-0  opacity-0 left-0 w-full h-[50vh] bg-black"></div>
                    <div className="absolute bottom-[5%] opacity-0  duration-300 md:group-hover:opacity-[1] left-0 w-full px-5 text-white">
                      <p>{teamMember.desc}</p>
                    </div>
                    <Image
                      width={1000}
                      height={1000}
                      src={teamMember.img}
                      alt="banner-image"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="w-full gap-2 justify-between flex px-2">
                    <span className="text-nowrap font-sm uppercase tracking-wide font-semibold title">
                      {teamMember.name}
                    </span>
                    <span className="text-[14px] italic flex items-end text-right font-medium text-zinc-700">
                      {teamMember.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* adventure  */}
        <div className="w-11/12  4xl:w-10/12  mx-auto flex flex-col gap-5  justify-start">
          <motion.h1
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-semibold  text-3xl text-center"
          >
            Adventure Heroes
          </motion.h1>
          <div className="pl-2  relative ">
            <div className="w-[10px] border-l-[2px] border-t-[2px] border-yellow-500 h-full absolute top-3 left-0"></div>
            <motion.span
              variants={whileViewVarients}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="font-semibold pl-3 italic text-xl  text-nowrap"
            >
              Expedition guide
            </motion.span>
            <div className="grid w-full pl-5 mt-5 pb-[3rem]  mx-auto md:gap-3  gap-10 grid-cols-1 md:grid-cols-4">
              {expeditionGuideMembers.map((teamMember, index) => (
                <motion.div
                  variants={whileViewVarients}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0 }}
                  onClick={() => handleOpenTeamDetail(teamMember)}
                  key={index}
                >
                  <div className={`flex flex-col  gap-1`}>
                    <div className="relative group h-[50vh] rounded-md overflow-hidden cursor-pointer">
                      <div className="absolute md:group-hover:opacity-[0.5] duration-300  top-0  opacity-0 left-0 w-full h-[50vh] bg-black"></div>
                      <div className="absolute bottom-[5%] opacity-0  duration-300 md:group-hover:opacity-[1] left-0 w-full px-5 text-white">
                        <p>{teamMember.desc}</p>
                      </div>
                      <Image
                        width={1000}
                        height={1000}
                        src={teamMember.img}
                        alt="banner-image"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="w-full gap-2 justify-between flex px-2">
                      <span className="text-nowrap font-sm uppercase tracking-wide font-semibold title">
                        {teamMember.name}
                      </span>
                      <span className="text-[14px] italic flex items-end text-right font-medium text-zinc-700">
                        {teamMember.role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-11/12  4xl:w-10/12   mx-auto flex flex-col gap-5  justify-start">
          <div className="pl-2  relative ">
            <div className="w-[10px] border-l-[2px] border-t-[2px] border-yellow-500 h-full absolute top-3 left-0"></div>
            <motion.span
              variants={whileViewVarients}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="font-semibold pl-3 italic text-xl  text-nowrap"
            >
              Trekking guide
            </motion.span>
            <div className="grid w-full pl-5 mt-5 pb-[3rem]  mx-auto md:gap-3  gap-10 grid-cols-1 md:grid-cols-4">
              {trekkingGuideMembers.map((teamMember, index) => (
                <motion.div
                  variants={whileViewVarients}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0 }}
                  key={index}
                  onClick={() => handleOpenTeamDetail(teamMember)}
                >
                  <div className={`flex flex-col  gap-1`}>
                    <div className="relative group h-[50vh] rounded-md overflow-hidden cursor-pointer">
                      <div className="absolute md:group-hover:opacity-[0.5] duration-300  top-0  opacity-0 left-0 w-full h-[50vh] bg-black"></div>
                      <div className="absolute bottom-[5%] opacity-0  duration-300 md:group-hover:opacity-[1] left-0 w-full px-5 text-white">
                        <p>{teamMember.desc}</p>
                      </div>
                      <Image
                        width={1000}
                        height={1000}
                        src={teamMember.img}
                        alt="banner-image"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="w-full gap-2 justify-between flex px-2">
                      <span className="text-nowrap font-sm uppercase tracking-wide font-semibold title">
                        {teamMember.name}
                      </span>
                      <span className="text-[14px] italic flex items-end text-right font-medium text-zinc-700">
                        {teamMember.role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* poter gude  */}
        <div className="w-11/12  4xl:w-10/12 mb-[3rem]   mx-auto flex flex-col gap-5  justify-start">
          <div className="pl-2  relative ">
            <div className="w-[10px] border-l-[2px] border-t-[2px] border-yellow-500 h-full absolute top-3 left-0"></div>
            <motion.span
              variants={whileViewVarients}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="font-semibold pl-3 italic text-xl  text-nowrap"
            >
              Poter guide
            </motion.span>
            <div className="grid w-full pl-5 mt-5   mx-auto md:gap-3  gap-10 grid-cols-1 md:grid-cols-4">
              {porterGuideMembers.map((teamMember, index) => (
                <motion.div
                  variants={whileViewVarients}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0 }}
                  onClick={() => handleOpenTeamDetail(teamMember)}
                  key={index}
                >
                  <div className={`flex flex-col  gap-1`}>
                    <div className="relative group h-[50vh] rounded-md overflow-hidden cursor-pointer">
                      <div className="absolute md:group-hover:opacity-[0.5] duration-300  top-0  opacity-0 left-0 w-full h-[50vh] bg-black"></div>
                      <div className="absolute bottom-[5%] opacity-0  duration-300 md:group-hover:opacity-[1] left-0 w-full px-5 text-white">
                        <p>{teamMember.desc}</p>
                      </div>
                      <Image
                        width={1000}
                        height={1000}
                        src={teamMember.img}
                        alt="banner-image"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="w-full gap-2 justify-between flex px-2">
                      <span className="text-nowrap font-sm uppercase tracking-wide font-semibold title">
                        {teamMember.name}
                      </span>
                      <span className="text-[14px] italic flex items-end text-right font-medium text-zinc-700">
                        {teamMember.role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* cook  */}
        <div className="w-11/12 4xl:w-10/12  mx-auto flex flex-col gap-5 justify-start">
          <motion.h1
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-semibold text-2xl text-center"
          >
            Cook
          </motion.h1>
          <div className="grid w-full  mx-auto md:gap-3  gap-10 grid-cols-1 md:grid-cols-4">
            {cookMembers.map((teamMember, index) => (
              <motion.div
                variants={whileViewVarients}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0 }}
                key={index}
                onClick={() => handleOpenTeamDetail(teamMember)}
              >
                <div className={`flex flex-col  gap-1`}>
                  <div className="relative group h-[50vh] rounded-md overflow-hidden cursor-pointer">
                    <div className="absolute md:group-hover:opacity-[0.5] duration-300  top-0  opacity-0 left-0 w-full h-[50vh] bg-black"></div>
                    <div className="absolute bottom-[5%] opacity-0  duration-300 md:group-hover:opacity-[1] left-0 w-full px-5 text-white">
                      <p>{teamMember.desc}</p>
                    </div>
                    <Image
                      width={1000}
                      height={1000}
                      src={teamMember.img}
                      alt="banner-image"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="w-full gap-2 justify-between flex px-2">
                    <span className="text-nowrap font-sm uppercase tracking-wide font-semibold title">
                      {teamMember.name}
                    </span>
                    <span className="text-[14px] italic flex items-end text-right font-medium text-zinc-700">
                      {teamMember.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {openTeamDetail && selectedMember && (
        <div className="fixed top-0 left-0 w-full h-screen z-[100] bg-black/50 backdrop-blur-sm flex justify-center items-center">
          <motion.div
            initial={{ y: "100px" }}
            animate={{ y: 0 }}
            exit={{ y: "100px" }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="w-11/12 md:w-5/12 rounded-md mx-auto flex flex-col py-10 p-8 bg-zinc-50 relative"
          >
            <span
              onClick={handleCloseTeamDetail}
              className="absolute top-5 hover:scale-105 text-zinc-800 duration-200 right-5 cursor-pointer"
            >
              <Icon className="w-8 h-8" icon="material-symbols:close" />
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <Image
                  width={1000}
                  height={1000}
                  src={selectedMember.img}
                  alt={selectedMember.name}
                  className="w-20  rounded-full h-20 object-cover object-center"
                />
                <span className="text-lg font-semibold">
                  {selectedMember.name}
                </span>
                <span className="text-[13px] text-zinc-800 font-medium">
                  {selectedMember.role}
                </span>
              </div>
              <p className="text-zinc-700">{selectedMember.desc}</p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
