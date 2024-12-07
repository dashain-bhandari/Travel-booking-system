"use client";
import cloudinary from "@/utils/cloudinary";
import { useState } from "react";
import { toast } from "sonner";

export default function useCloudinaryFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleFileUpload = (file: any) => {
    if (file) {
      setUploading(true);

      if (file?.size < 10485760) {
        // Get the current year and month
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const folderPath = `${year}/${month}`;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "website");
        formData.append("folder", folderPath);
        // cloudinary.image("leather_bag_gray.jpg")

        fetch("https://api.cloudinary.com/v1_1/dbbl19osz/image/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            // Set the imageUrl using setImageUrl
            console.log(data);
            setImageUrl(data.url);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
            toast.error("Error uploading image");
          })
          .finally(() => {
            setUploading(false);
          });
      }
      else {
        setUploading(false)
        toast.error("Max file size limit is 10 mb.");
      }


    }
  };

  return { uploading, handleFileUpload, imageUrl, setImageUrl };
}


