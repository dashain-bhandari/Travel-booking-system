import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { whileViewVarients } from "../Animation/WhileViewVarients";
type Props = {};

export default function Aboutus({}: Props) {
  return (
    <>
      <div className="w-11/12 4xl:w-10/12 flex items-center justify-center    mx-auto relative">
        <div className="w-full justify-center items-start py-[3rem] flex flex-col  gap-3">
          <motion.div
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="relative"
          >
            <span className="text-3xl title font-bold uppercase text-nowrap">
              Our story
            </span>
            <hr className="absolute top-[100%] left-0 w-[50%] bg-yellow-400 z-10 h-[5px]" />
          </motion.div>
          <div className="w-full">
            <motion.p
              variants={whileViewVarients}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-zinc-700 leading-relaxed"
            >
              In 2023, a team of six seasoned professionals, including Dinesh
              Bogati, Prem Bahadur Gurung, Chija Gurung, Krishna Gurung, Rojit
              Shahi, and Resh Bahadur Gurung, combined their decade-long
              business acumen to establish Contour Expeditions in Nepal. Led by
              Prem Bahadur Gurung, a highly experienced IFMGA/UIAGM Guide with
              28 years of expertise in high mountain guiding, the company was
              founded on a commitment to delivering exceptional adventure
              experiences in the Himalayas.
            </motion.p>
          </div>
        </div>
        <div className="w-full justify-center items-start  flex flex-col  gap-3">
          <motion.div
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="relative"
          >
            <span className="text-3xl title font-bold uppercase text-nowrap">
              Our vision
            </span>
            <hr className="absolute top-[100%] left-0 w-[50%] bg-yellow-400 z-10 h-[5px]" />
          </motion.div>
          <div className="w-full">
            <motion.p
              variants={whileViewVarients}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-zinc-700 leading-relaxed"
            >
              Welcome to Contour Expeditions, where every step is a guided
              adventure with professionals. Our team of experienced guides is
              committed to providing you with unforgettable expeditions,
              ensuring safety, expertise, and a deep connection to nature
              throughout your journey. Join us as we explore the world’s most
              breathtaking landscapes, summit majestic peaks, and create
              memories that will last a lifetime. Get ready to embark on your
              next adventure with Contour Expeditions.
            </motion.p>
          </div>
        </div>

        {/* bottom goals  */}
      </div>
      <div className="w-11/12 4xl:w-10/12 mx-auto  grid md:grid-cols-3 gap-5 pb-[5rem]">
        {Vision.map((item) => (
          <motion.div
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            key={item.id}
            className="w-full cursor-pointer hover:border-zinc-400 hover:scale-95 group relative   duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]   rounded-md  flex flex-col p-10"
          >
            {/* NUM  */}
            <div className="w-full flex justify-between pb-3 items-center">
              <span className="text-2xl font-semibold">{item.id}.</span>
              <Icon
                icon={item.icon}
                className="w-[2rem] text-yellow-500 object-cover group-hover:rotate-[360deg] duration-300  object-center h-[2rem]"
              />
            </div>

            {/* title  */}
            <h2 className="font-semibold text-xl">{item.name}</h2>

            {/* desc  */}
            <p className="text-sm text-zinc-700">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}

const Vision = [
  {
    id: 1,
    icon: "system-uicons:eye",
    name: "Passion for Adventure",
    desc: "We are driven by a love for the outdoors and a commitment to delivering unforgettable experiences.",
  },
  {
    id: 2,
    icon: "mingcute:safety-certificate-fill",
    name: "Safety First",
    desc: "We prioritize the safety and well-being of our clients through rigorous safety standards and expert guides.",
  },
  {
    id: 3,
    icon: "mdi:leaf",

    name: "Environmental Stewardship",
    desc: "We minimize our impact on the environment and support local conservation efforts.",
  },
  {
    id: 4,
    icon: "ion:telescope",
    name: "Quality and Excellence",
    desc: "We strive for excellence in all aspects of our operations to ensure a seamless and memorable adventure.",
  },
  {
    id: 5,
    icon: "fluent:people-team-28-filled",
    name: "Community Engagement",
    desc: "We engage with and support the communities we visit, contributing to local economies and development.",
  },
  {
    id: 6,
    icon: "fluent:arrow-growth-20-filled",
    name: "Personal Growth",
    desc: "We believe in the transformative power of adventure, fostering personal growth and self-discovery in our clients.",
  },
];
