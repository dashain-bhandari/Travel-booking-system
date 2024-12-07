import React, { ButtonHTMLAttributes } from "react";
import { IoMdArrowForward } from "react-icons/io";

type ButtonProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  text: String;
  className?: String | "";
  arrow: String | "";
};

const CustomButton = ({
  onClick,
  type,
  text,
  className,
  arrow,
}: ButtonProps) => {
  return (
    <>
      <div className="custom-btn">
        <button
          type={type}
          className={`flex items-center justify-center px-6  py-3 rounded-full font-semibold transition-colors duration-300 ease-in-out bg-primary-btn hover:bg-btn-hover
       text-text-dark   text-btn-text font-primary text-text-dark ${className}`}
          onClick={onClick}
        >
          <span className="mr-2">{text}</span>
          {arrow === "false" ? "" : <IoMdArrowForward size="20" />}
        </button>
      </div>
    </>
  );
};

export default CustomButton;
