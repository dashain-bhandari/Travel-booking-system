import React from "react";
import { useSwipeable } from "react-swipeable";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";

const ImageModal = ({ images, currentIndex, onClose, onNext, onPrev }:any) => {
  const handlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrev,
    // preventDefaultTouchmove: true,
    trackMouse: true,
  });

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-[80%] max-h-[80%] flex items-center justify-center"
        {...handlers}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-[-60px] md:right-[-70px] right-[-20px] bg-none border-none text-white text-2xl cursor-pointer z-50"
          onClick={onClose}
        >
          {""}
          <RxCross2 />
        </button>
        <button
          className="absolute left-20 bg-none border-none text-white text-5xl cursor-pointer z-50 transform md:bottom-1/2 -bottom-20"
          onClick={onPrev}
        >
            {""}
          <MdKeyboardArrowLeft />
        </button>
        <Image
        height={500}

        width={500}
          src={images[currentIndex]}
          alt="modal"
          className="sm:max-w-[60%] sm:max-h-[60%]"
        />
        <button
          className="absolute right-20 bg-none border-none text-white text-5xl cursor-pointer z-50 transform md:bottom-1/2 -bottom-20"
          onClick={onNext}
        >
            {""}
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
