import { useState } from "react";

async function deleteImage(imageUrl: string): Promise<{ status: string; message?: string }> {
  try {
    const response = await fetch("/api/cloudinary", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete image");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error deleting image:", error.message);
    return { status: "error", message: error.message };
  }
}

export function useImageDeleteFromCloudinary() {
  const [deleteStatus, setDeleteStatus] = useState<{ status: string; message?: string }>({ status: "" });

  const deleteImageFromCloudinary = async (imageUrl: string) => {
    const result = await deleteImage(imageUrl);
    setDeleteStatus(result);
  };
  return { deleteImageFromCloudinary, deleteStatus };
}
