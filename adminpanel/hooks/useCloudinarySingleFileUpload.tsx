"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useCloudinarySingleFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>("");

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  const handleFileUpload = (file: any) => {
    if (file) {
      
      setUploading(true);
     
        console.log(file);
      if(file?.size<10485760){
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "website");

        fetch("https://api.cloudinary.com/v1_1/dbbl19osz/raw/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            // Set the imageUrl using setImageUrl
            console.log("data",data);
           data?.url && setImageUrl(data?.url);
           data?.error &&  toast.error("Error uploading file");
           
          })
          .catch((error) => {
            console.log("hii")
            console.error("Error uploading file:", error);
            toast.error("Error uploading file");
          })
          .finally(() => {
            setUploading(false);
          });
      
      }
      else{
        setUploading(false)
        toast.error("Max file size limit is 10 mb.");
      }
    }
  };

  return { uploading, handleFileUpload, imageUrl, setImageUrl };
}
