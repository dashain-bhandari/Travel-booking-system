"use client";
import { wordTruncate } from "@/utils/wordTruncate";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import moment from "moment";
type Props = {
  blogs: any;
};

export default function Blogs({ blogs }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full mt-[2rem] text-zinc-950">
      <div className="w-full md:w-8/12 mx-auto flex justify-center items-center">
        {isLoading ? (
          <div className="w-full text-black text-5xl  h-[80vh] flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="w-full grid grid-cols-3 gap-2 h-auto  max-h-auto   mt-4">
            {blogs &&
              blogs.map((blog: any, index: number) => (
                <Link
                  key={blog._id}
                  href={`/blogs/${blog.slug}`}
                  className="w-full hover:bg-gradient-to-r z-40 duration-300 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]  from-yellow-400 via-yellow-200  to-yellow-800  text-sm md:text-lg   flex-col relative text-zinc-950  cursor-pointer overflow-hidden hover:border-secondary-300 border-primary-100 rounded-md p-[1px]   flex gap-3 mb-4"
                >
                  <div className="bg-[#EAEAEA] flex flex-col gap-3 p-3 rounded-md w-full h-auto">
                    {/* image */}

                    <div className="w-full h-[15rem] bg-primary-200 overflow-hidden rounded-md">
                      <Image
                        width={1000}
                        height={1000}
                        src={blog.banner}
                        className="w-full h-full object-cover group-hover:scale-105 duration-300 object-center"
                        alt="blog-img"
                      />
                    </div>
                    <div className="w-full relative z-20  flex flex-col gap-3 items-start">
                      <div className="text-zinc-950 title font-medium">
                        {wordTruncate(blog.title, 20)}
                      </div>

                      <div className="w-full flex font-medium title  text-[13px] justify-between items-center">
                        <div className="text-zinc-600  ">
                          {moment(blog.createdAt).format("ll")}
                        </div>

                        <span className="text-zinc-700">#category</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

const BlogData = ["1", "2", "3", "4"];
