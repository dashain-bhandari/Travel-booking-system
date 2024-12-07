"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
// SOCIAL images
import Instagram from "@/public/Social/instagram.png";
import Facebook from "@/public/Social/facebook.png";
import Whatsapp from "@/public/Social/whatsapp.png";
import Frame from "@/public/frame.png";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
const profileDetail = [
  {
    route: "dinesh_bogati",
    href: "/profile/dinesh_bogati",
    src: "/Team/MD.jpg",
    role: "Managing Director (MD)",
    name: "Dinesh Bogati",
    desc: "Experience the world-class tour package at the best rate and safety offers you.",
    cv: "/certificates/dinesh-bogati/dinesh-bogati-cv.pdf",
    certificates: [
      { id: 1, image: "/certificates/dinesh-bogati/Certificate1.jpeg" },
      { id: 2, image: "/certificates/dinesh-bogati/Certificate2.jpeg" },
      { id: 3, image: "/certificates/dinesh-bogati/Certificate3.jpeg" },
      { id: 4, image: "/certificates/dinesh-bogati/Certificate4.jpeg" },
      { id: 5, image: "/certificates/dinesh-bogati/Certificate5.jpeg" },
      { id: 6, image: "/certificates/dinesh-bogati/Certificate6.jpeg" },
      { id: 7, image: "/certificates/dinesh-bogati/Certificate7.jpeg" },
      { id: 8, image: "/certificates/dinesh-bogati/Certificate8.jpeg" },
      { id: 9, image: "/certificates/dinesh-bogati/Certificate9.jpeg" },
      { id: 10, image: "/certificates/dinesh-bogati/Certificate10.jpeg" },
      { id: 11, image: "/certificates/dinesh-bogati/Certificate11.jpeg" },
      { id: 12, image: "/certificates/dinesh-bogati/Certificate12.jpeg" },
      { id: 13, image: "/certificates/dinesh-bogati/Certificate13.jpeg" },
      { id: 14, image: "/certificates/dinesh-bogati/Certificate14.jpeg" },
      { id: 15, image: "/certificates/dinesh-bogati/Certificate15.jpeg" },
      { id: 16, image: "/certificates/dinesh-bogati/Certificate16.jpeg" },
      { id: 17, image: "/certificates/dinesh-bogati/Certificate17.jpeg" },
      { id: 18, image: "/certificates/dinesh-bogati/Certificate18.jpeg" },
      { id: 19, image: "/certificates/dinesh-bogati/Certificate19.jpeg" },
    ], // Add Dinesh's certificates here
  },
  {
    route: "prem_gurung",
    href: "/profile/prem_gurung",
    src: "/Team/Guide.jpg",
    role: "IFMGA / UIAGM Guide",
    name: "Prem Gurung",
    desc: "28 years experience in high mountain guiding including 8000m Peaks in Nepal Himalaya.",
    cv: "/certificates/prem-gurung/prem-gurung-cv.pdf",
    certificates: [
      { id: 1, image: "/certificates/prem-gurung/Certificate1.jpeg" },
      { id: 2, image: "/certificates/prem-gurung/Certificate2.jpeg" },
      { id: 3, image: "/certificates/prem-gurung/Certificate3.jpeg" },
      { id: 4, image: "/certificates/prem-gurung/Certificate4.jpeg" },
      { id: 5, image: "/certificates/prem-gurung/Certificate5.jpeg" },
      { id: 6, image: "/certificates/prem-gurung/Certificate6.jpeg" },
      { id: 7, image: "/certificates/prem-gurung/Certificate7.jpeg" },
      { id: 8, image: "/certificates/prem-gurung/Certificate8.jpeg" },
      { id: 9, image: "/certificates/prem-gurung/Certificate9.jpeg" },
      { id: 10, image: "/certificates/prem-gurung/Certificate10.jpeg" },
      { id: 11, image: "/certificates/prem-gurung/Certificate11.jpeg" },
      { id: 12, image: "/certificates/prem-gurung/Certificate12.jpeg" },
      { id: 13, image: "/certificates/prem-gurung/Certificate13.jpeg" },
      { id: 14, image: "/certificates/prem-gurung/Certificate14.jpeg" },
      { id: 15, image: "/certificates/prem-gurung/Certificate15.jpeg" },
      { id: 16, image: "/certificates/prem-gurung/Certificate16.jpeg" },
      { id: 17, image: "/certificates/prem-gurung/Certificate17.jpeg" },
      { id: 18, image: "/certificates/prem-gurung/Certificate18.jpeg" },
      { id: 19, image: "/certificates/prem-gurung/Certificate19.jpeg" },
    ],
  },
];

type Props = {};

export default function TeamProfile({}: Props) {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const pathnameCurrent = usePathname();
  const profile = profileDetail.find((p) => pathnameCurrent.includes(p.route));

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const handleMediaClick = (item: any) => {
    setSelectedMedia(item.image);
  };

  const closeMediaViewer = () => {
    setSelectedMedia(null);
  };


  const handleDownloadCV = () => {
    const cvUrl = `${profile.cv}`; // Replace with the actual path to your CV file in the public folder
    const link = document.createElement("a");
    link.href = cvUrl;
    link.setAttribute(
      "download",
      `${profile.name.toLowerCase().replace(/ /g, "-")}-cv.pdf`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <div className="w-full pt-[6rem] border-b">
        <div className="w-11/12 relative pb-[3rem] flex flex-col md:flex-row md:gap-5 gap-10 mx-auto">
          <div className="flex flex-col gap-2">
            <Image
              src={profile.src}
              alt={profile.name}
              className="w-full h-[60vh] object-cover object-center rounded-md"
              width={500}
              height={500}
            />
            <div className="flex items-center justify-center flex-col">
              <div className="flex flex-col gap-1">
                {/* name */}
                <span className="font-semibold title">{profile.name}</span>
                {/* role */}
                <span className="italic text-sm font-medium">
                  {profile.role}
                </span>
                {/* desc */}
                <p className="text-sm text-zinc-700">{profile.desc}</p>
                <div className="w-full  flex  justify-between items-center">
                  {/* social icons */}
                  <div className="flex  gap-2">
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
                </div>

                <div className="mt-2">
                  <button
                    onClick={() => handleDownloadCV()}
                    type="button"
                    className="text-white text-nowrap  flex gap-1 items-center justify-center  bg-gradient-to-r from-black via-zinc-800 to-zinc-900 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-5 py-2.5 text-center "
                  >
                    Download CV
                    <Icon
                      icon="line-md:download-outline-loop"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full md:w-[80%] flex-col">
            <div className="w-full pb-10 flex flex-col gap-4 mx-auto">
              {/* title */}
              <div className="w-auto flex-col flex gap-2 justify-center items-start">
                <h1 className="text-xl uppercase text-secondary-500 text-left font-bold">
                  My story
                </h1>
                <hr className="bg-yellow-400 h-[4px] overflow-hidden md:w-[5%] w-[20%]" />
              </div>
              <p className="text-zinc-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                aperiam dicta placeat assumenda, quo tenetur et accusantium
                officia dolore reiciendis. Similique harum maiores nihil neque
                quaerat pariatur velit, ex illo. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Tempore aperiam dicta placeat
                assumenda, quo tenetur et accusantium officia dolore reiciendis.
                Similique harum maiores nihil neque quaerat pariatur velit, ex
                illo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempore aperiam dicta placeat assumenda, quo tenetur et
                accusantium officia dolore reiciendis. Similique harum maiores
                nihil neque quaerat pariatur velit, ex illo.
              </p>
            </div>
            <div className="w-full pb-[3rem] flex flex-col gap-4 mx-auto">
              {/* title */}
              <div className="w-auto flex-col flex gap-2 justify-center items-start">
                <h1 className="text-xl uppercase text-secondary-500 text-left font-bold">
                  My Vision
                </h1>
                <hr className="bg-yellow-400 h-[4px] overflow-hidden md:w-[5%] w-[20%]" />
              </div>
              <p className="text-zinc-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                aperiam dicta placeat assumenda, quo tenetur et accusantium
                officia dolore reiciendis. Similique harum maiores nihil neque
                quaerat pariatur velit, ex illo. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Tempore aperiam dicta placeat
                assumenda, quo tenetur et accusantium officia dolore reiciendis.
                Similique harum maiores nihil neque quaerat pariatur velit, ex
                illo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempore aperiam dicta placeat assumenda, quo tenetur et
                accusantium officia dolore reiciendis. Similique harum maiores
                nihil neque quaerat pariatur velit, ex illo.
              </p>
            </div>
          </div>
        </div>

        {/* certificates */}
        <div className="w-11/12 mx-auto pb-[3rem] flex flex-col justify-center items-center">
          {/* title  */}
          <div className="w-auto flex-col flex gap-2 justify-center items-center">
            <h1 className="text-3xl title uppercase text-secondary-500 text-center  font-bold">
              CERTIFICATES
            </h1>
            <hr className="bg-yellow-400 h-[4px] overflow-hidden w-[60%]" />
          </div>
          <div className="mt-[1rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full lg:w-10/12 3xl:w-8/12 mx-auto">
            {profile.certificates.map((item, index) => (
              <div
                onClick={() => handleMediaClick(item)}
                key={index}
                className={`w-full image-${index}  h-[60vh] relative  cursor-pointer  `}
              >
                <Image
                  width={5000}
                  height={5000}
                  src={Frame}
                  alt="frame"
                  className="w-full h-full object-fit z-10 object-center absolute top-0 left-0"
                ></Image>

                <Image
                  width={5000}
                  height={5000}
                  src={item.image}
                  alt={`certificate`}
                  className="w-full h-full object-fit p-5 object-center absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
                ></Image>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {selectedMedia && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed pt-[5rem] backdrop-blur-sm inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              >
                <div className="w-11/12 relative  h-full flex justify-center items-center">
                  <div className="max-w-4xl max-h-[85vh]">
                    <Image
                      src={selectedMedia}
                      alt="Selected media"
                      width={600}
                      height={600}
                      className="max-w-full max-h-[85vh] object-contain"
                    />
                    <button
                      className="absolute top-0  lg:right-20 bg-black text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
                      onClick={closeMediaViewer}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
