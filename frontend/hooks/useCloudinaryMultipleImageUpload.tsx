
"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useCloudinaryFileUpload() {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<any>([]);

    useEffect(()=>{
        console.log(imageUrl)
    },[imageUrl])


    const handleFileUpload = (files: any) => {
        if (files) {
            console.log(files);
            setUploading(true);
            for (let file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "website");

                let uploadUrl = "";

                if (file.type.startsWith("image/")) {
                    // Handle image uploads
                    uploadUrl = "https://api.cloudinary.com/v1_1/dbbl19osz/image/upload";
                } else if (file.type.startsWith("video/")) {
                    // Handle video uploads
                    uploadUrl = "https://api.cloudinary.com/v1_1/dbbl19osz/video/upload";
                } else {
                    toast.error("Unsupported file type");
                    setUploading(false);
                    return;
                }
                fetch(uploadUrl, {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // Set the imageUrl using setImageUrl
                        setImageUrl((prevUrls:any) => [...prevUrls, data?.url]);
                      
                    })
                    .catch((error) => {
                        console.error("Error uploading image:", error);
                        toast.error("Error uploading image");
                    })
                    .finally(() => {
                        setUploading(false);
                    });
            }
         
           
        }
    };

    return { uploading, handleFileUpload, imageUrl, setImageUrl };
}