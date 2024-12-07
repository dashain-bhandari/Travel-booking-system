
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
                console.log(file)
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "website");
                fetch("https://api.cloudinary.com/v1_1/dbbl19osz/image/upload", {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // Set the imageUrl using setImageUrl
                        console.log(data);
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