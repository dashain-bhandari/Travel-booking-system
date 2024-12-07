import React from "react";
import BlogHero from "./BlogHero";
import Blogs from "./Blogs";

type Props = {
  blogs: any;
};

export default function BlogMain({blogs}: Props) {
  return (
    <div className="w-full">
      <BlogHero />
      <Blogs blogs={blogs} />
    </div>
  );
}
