"use server";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../../utils/cloudinary/index";

export async function DELETE(request: NextRequest) {
  try {
    // Parse the request body
    const { imageUrl } = await request.json();
    const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
    
    let previousImageDeleted;
    try {
      previousImageDeleted = await cloudinary.uploader.destroy(publicId);
      console.log(previousImageDeleted);
    } catch (error) {
      return NextResponse.json(
        {
          status: "error",
          message: "Something went wrong while deleting previous image from Cloudinary",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Image deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
