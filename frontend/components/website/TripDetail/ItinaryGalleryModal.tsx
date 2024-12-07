"use client";
import React, { useEffect, useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
import { Loader } from "lucide-react";
import "./GalleryImage.css";

interface NewGalleryProps {
  media: any[];
  setOpenItinenaryModal: React.Dispatch<React.SetStateAction<boolean>>; // Adjust the type of `media` based on its structure
}

const ItinenariesGallery = ({
  media,
  setOpenItinenaryModal,
}: NewGalleryProps) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const closeGalleryModal = () => {
    setOpenItinenaryModal(false);
  };

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0  bg-black bg-opacity-100 z-50 overflow-y-auto `}
      >
        <div className="relative max-h-screen ">
          <button
            onClick={closeGalleryModal}
            className="absolute top-[4rem] right-5 text-white text-3xl z-10" // Updated position and z-index
          >
            &times;
          </button>
          <div className="pb-[3rem] ">
            <div className="lg:w-[60%] md:w-[60%] sm:w-[100%] xs:w-[100%] 4xl:w-12/12 mx-auto">
              <div className="grid grid-cols-12 gap-2">
                {/* Main Image */}
                <div className="col-span-12 md:col-span-12 h-[35rem]  relative">
                  {media.length > 0 ? (
                    <img
                      src={media[0]} // The main image
                      alt="Main"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => openImageViewer(0)}
                    />
                  ) : (
                    <Loader size={16} className="animate-spin mr-2" />
                  )}

                  {/* Top Gradient Overlay for Nav Overlap */}
                  <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/50 to-transparent"></div>
                </div>

                {/* Thumbnails */}
                {media.length > 0 ? (
                  <div className="col-span-12 md:col-span-12 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-1">
                    {media.slice(1).map((image: any, index: any) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index}`}
                        className="w-full h-[25.125rem] object-cover cursor-pointer hover:opacity-75 transition duration-300 "
                        onClick={() => openImageViewer(index + 1)}
                      />
                    ))}
                  </div>
                ) : (
                  <Loader size={16} className="animate-spin mr-2" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      {isViewerOpen && (
        <div className="w-full bg-black h-screen fixed top-9 left-0 pt-[4rem] z-[50]">
          <ImageViewer
            src={media.map((item: any) => item.media)}
            currentIndex={currentImage}
            onClose={closeImageViewer}
            disableScroll={false}
            closeOnClickOutside={true}
          />
        </div>
      )}
    </>
  );
};

export default ItinenariesGallery;
