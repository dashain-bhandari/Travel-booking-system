"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useCloudinaryFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>([]);

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  const handleFileUpload = (files: any) => {
    if (files) {
      // Start uploading process
      setUploading(true);

      // Convert FileList to Array
      const fileArray = Array.from(files);

      // Create an array of promises for each file upload
      const uploadPromises = fileArray.map((file: any) => {
        if (file?.size < 10485760) { // Check file size
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "website");

          return fetch("https://api.cloudinary.com/v1_1/dbbl19osz/raw/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data?.url) {
                // Update the image URL state
                setImageUrl((prevUrls: any) => [...prevUrls, data?.url]);
              }
            })
            .catch((error) => {
              console.error("Error uploading file:", error);
              toast.error("Error uploading file");
            });
        } else {
          toast.error(`${file?.name} is larger than 10 MB.`);
          return Promise.resolve(); // Resolve promise to continue with other files
        }
      });

      // Wait for all uploads to finish
      Promise.all(uploadPromises)
        .finally(() => {
          // End uploading process
          setUploading(false);
        });
    }
  };

  return { uploading, handleFileUpload, imageUrl, setImageUrl };
}
