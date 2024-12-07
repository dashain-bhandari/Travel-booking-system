import React from "react";

type Props = {};

export default function BlogHero({}: Props) {
  return (
    <div className="w-full h-[60vh] relative flex justify-center items-center text-white">
      {/* image  */}
      <div
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/264151/pexels-photo-264151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          position: "absolute",
          filter: "brightness(50%)",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        className="w-full h-screen z-10 flex justify-center items-center relative"
      ></div>
      <div className="relative z-10 flex items-center justify-center flex-col gap-2">
        <h1 className="text-6xl  uppercase relative tracking-wide mt-10 title font-black">
          Blogs
        </h1>
        <p className="w-[80%] text-sm text-secondary-50 mx-auto text-center">
          Explore insightful articles and the latest trends. Discover expert
          tips, stories, and more in our blog.
        </p>
      </div>
    </div>
  );
}
