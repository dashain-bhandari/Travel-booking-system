import React from "react";

type Props = {
  title: string;
};

export default function IndicatorBlue({ title }: Props) {
  return (
    <span className="bg-blue-100 text-blue-800  dark:bg-blue-900 dark:text-blue-300  inline-flex items-center  text-xs font-medium px-2.5 py-0.5 rounded-full ">
    <span className="bg-blue-500 w-2 h-2 me-1   rounded-full "></span>
    <p className=" capitalize"> {title}</p>
  </span>
  );
}
