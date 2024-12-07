import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {};

function RelatedBlogs({}: Props) {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full md:w-11/12 mx-auto flex gap-5 flex-col pb-[3rem]">
      <h1 className="text-2xl md:text-5xl title w-full text-center relative tracking-wide mt-10 title font-bold text-secondary-500">
        RELATED BLOGS
      </h1>
      <div className="grid w-full justify-center grid-cols-1 place-content-center items-center place-items-center gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {BlogData.map((item, index) => (
          <Link
            key={item.id}
            rel="noopener noreferrer"
            href="blog_detail"
            className={`w-full mx-auto group ${
              index === 0 ? "h-full" : ""
            } relative hover:scale-95 duration-200 w-full hover:no-underline shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] focus:no-underline dark:bg-gray-50 ${
              index > 1 ? "hidden sm:block" : ""
            }`}
          >
            <div className="w-full h-44   overflow-hidden">
              <Image
                alt=""
                width={1000}
                height={1000}
                role="presentation"
                className="object-cover w-full  h-full group-hover:scale-105  duration-200   "
                src={item.imageSrc}
              />
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-medium tracking-wide group-hover:underline group-focus:underline title">
                {item.title}
              </h3>
              <span className="text-xs text-secondary-500 font-medium">
                {item.date}
              </span>
              <p className="text-sm font-medium text-secondary-400">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedBlogs;

const BlogData = [
  {
    id: 1,
    imageSrc:
      "https://images.unsplash.com/photo-1594495894542-a46cc73e081a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "In usu laoreet repudiare legendos",
    date: "January 21, 2021",
    description:
      "Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.",
  },
  {
    id: 2,
    imageSrc:
      "https://images.unsplash.com/photo-1523506591153-1504ba186b3b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "In usu laoreet repudiare legendos",
    date: "January 22, 2021",
    description:
      "Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.",
  },
  {
    id: 3,
    imageSrc:
      "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "In usu laoreet repudiare legendos",
    date: "January 23, 2021",
    description:
      "Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.",
  },
  //   {
  //     id: 4,
  //     imageSrc:
  //       "https://images.unsplash.com/photo-1642933196504-62107dac9258?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?4",
  //     title: "In usu laoreet repudiare legendos",
  //     date: "January 24, 2021",
  //     description:
  //       "Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.",
  //   },
];
