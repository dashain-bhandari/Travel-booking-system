"use client";
import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import parse from "html-react-parser";
type Props = {
  blog: any;
};

export default function BlogDetailMain({ blog }: Props) {
  return (
    <>
      <div className="w-11/12 relative md:w-11/12 mx-auto py-[5rem]">
        <Link
          href="/blogs"
          className="w-[70%] mx-auto flex justify-start">
          <div className="text-zinc-700 z-40 hover:scale-105 duration-300 hover:text-zinc-800 flex  justify-center items-center">
            <div className="overflow-hidden title flex justify-center items-center">
              <Icon
                icon="ic:outline-arrow-left"
                className="w-[1.5rem] h-[1.5rem]"
              />
            </div>
            <div className="font-medium">Back</div>
          </div>
        </Link>
        {blog && (
          <div className="w-full flex flex-col gap-5 justify-start items-start">
            {/* title  */}
            <div className="w-full">
              <h1 className="text-3xl title md:text-6xl mb-5 w-full text-center relative tracking-wide mt-10 title font-bold text-secondary-500">{blog?.title}</h1>
            </div>

            {/* image  */}
            {blog.banner && (
              <Image
                width={1000}
                height={1000}
                src={blog.banner}
                alt="expedition-image"
                className="w-[70%] mx-auto h-[60vh] rounded-md object-cover object-top"
              />
            )}

            <div className="w-full md:w-[70%] mx-auto flex gap-5 justify-end items-center">
              <div className="flex items-center text-[12px] gap-2">
                <Icon icon="uil:calender" />
                <span className="">{blog.createdAt}</span>
              </div>
            </div>

            {/* CONTENT  */}
            <div className="flex flex-col gap-4">
              {/* topic 1  */}
              <div className="flex w-full md:w-[70%] mx-auto flex-col gap-2">
                <div className="text-zinc-700 leading-relaxed">
                  {blog?.description && parse(blog.description)}

                  {/* {parse(blog?.description || "")} */}
                </div>
              </div>
            </div>

            {/* bottom part  */}
            <div className="flex mx-auto flex-col md:flex-row gap-5 justify-between md:items-center items-start w-full md:w-[70%]">
              {/* TAGS  */}
              <div className="flex justify-center items-center gap-2">
                <span className="0 rounded-md text-[12px] text-zinc-800 px-5 py-1.5">#tag1</span>
                <span className="0 rounded-md text-[12px] text-zinc-800 px-5 py-1.5">#tag2</span>
                <span className="0 rounded-md text-[12px] text-zinc-800 px-5 py-1.5">#tag3</span>
                <span className="0 rounded-md text-[12px] text-zinc-800 px-5 py-1.5">#tag4</span>
              </div>

              {/* share  */}
              <div className="flex justify-center items-center gap-4">
                <span className="text-[12px] font-semibold">Share:</span>
                {/* socio icon  */}
                <div className="flex justify-center items-center  gap-1">
                  <div className="cursor-pointer">
                    <Icon
                      icon="logos:twitter"
                      className="w-[1.5rem] h-[1.5rem] object-cover object-center"
                    />
                  </div>
                  <div className="cursor-pointer">
                    <Icon
                      icon="logos:facebook"
                      className="w-[1.5rem] h-[1.5rem] object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related blogs  */}
      {/* <div className="w-11/12 md:w-11/12 mx-auto">
        <RelatedBlogs />
      </div> */}
    </>
  );
}
