import { AxiosInstance } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { whileViewVarients } from "../Animation/WhileViewVarients";
import { motion } from "framer-motion";
type Props = {};

function RelatedActivities({ activity }: any) {
  const router = useRouter();
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      if (activity) {
        try {
          const { data } = await AxiosInstance.get("/activities");
          const newArr = data?.data?.filter(
            (i: any) => i.activityId !== activity.activityId
          );
          setActivities(shuffleArray(newArr));
        } catch (error: any) {
          console.log(error.message);
        }
      }
    };
    fetchActivities();
  }, [activity]);
  return (
    <>
      {activity && activities && activities.length > 0 && (
        <div className="w-11/12 4xl:w-10/12 pb-[3rem] mx-auto">
          {/* TITLE  */}
          <motion.h1
            variants={whileViewVarients}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="text-2xl title font-bold pb-3 relative tracking-wide   italic text-secondary-500"
          >
            RELATED
          </motion.h1>
          {/* NAVIGATION  activities */}
          <div className="w-full">
            <motion.div
              variants={whileViewVarients}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="w-full overflow-x-scroll md:overflow-x-visible flex md:grid gap-3 grid-cols-4 md:place-content-center place-items-center"
            >
              {activities.map((item, idx) => (
                <>
                  {idx < 4 && (
                    <div
                      onClick={() =>
                        router.push(`/other_activities/${item.activityId}`)
                      }
                      key={item.id}
                      className="min-w-[80%] rounded-md md:w-full cursor-pointer group relative overflow-hidden flex justify-center items-center h-[30vh]"
                    >
                      <div className="absolute bottom-0 left-0  w-full h-[10rem] group-hover:h-[100%] duration-200 z-20 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>
                      {/* <div className="absolute top-0 left-0 w-full h-full group-hover:opacity-[0.7] bg-zinc-950 opacity-[0.2] z-10 duration-300"></div> */}
                      <div className="absolute top-0 left-0 w-full h-full">
                        <Image
                          width={1000}
                          height={1000}
                          src={item.banner}
                          alt={item.name}
                          className="w-full h-full object-cover object-center"
                        ></Image>
                      </div>
                      {/* name  */}
                      <div className="w-full relative p-4 z-20 font-medium text-[15px ]  text-zinc-50 h-full flex justify-start items-end">
                        {item.name}
                      </div>
                      {/* view  */}
                      <div className="absolute font-semibold text-sm top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 opacity-0 group-hover:opacity-[1] text-white group-hover:top-[50%] duration-300 uppercase cursor-pointer">
                        VIEW
                      </div>
                    </div>
                  )}
                </>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}

export default RelatedActivities;

const RelatedActivitiesData = [
  {
    id: 1,
    name: "Paragliding",
    desc: "Experience the thrill of paragliding over scenic landscapes and enjoy a bird's eye view of nature.",
    img: "https://images.unsplash.com/photo-1573507712396-586c2fc99b36?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Rafting",
    desc: "Enjoy the excitement and adrenaline rush of white water rafting through challenging rapids.",
    img: "https://images.unsplash.com/photo-1508166466920-f65aa51f727c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Mountain Biking",
    desc: "Ride through rugged trails and explore mountainous terrain on a mountain bike.",
    img: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TU9VTlRBSU4lMjBCSUtJTkd8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Heli Tour",
    desc: "Take a leisurely ride or a competitive race on a bicycle, enjoying the freedom of the open road.",
    img: "https://images.unsplash.com/photo-1534867758447-521fe739fb14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
