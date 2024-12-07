"use server";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: parseInt(process.env.SMTP_PORT as string, 10), // Ensure port is an integer
  secure: process.env.SMTP_SECURE === "true", // Convert secure to boolean
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASSWORD as string,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { to, subject, message } = await request.json();
    const token = crypto.randomBytes(20).toString("hex");

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER as string,
      to: to,
      subject: subject,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <!-- Header Section -->
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #f97316; margin: 0;">Contour Expedition</h2>
              <p style="font-size: 16px; color: #555;">${subject}</p>
            </div>
            
            <!-- Content Section -->
            <div style="padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <p style="font-size: 16px; margin: 0;">
                ${message}
              </p>
            </div>
            
            <!-- Footer Section -->
            <div style="margin-top: 20px; text-align: center; color: #777;">
              <p style="font-size: 14px; margin: 10px 0;">
                Thank you for being a valued customer.
              </p>
             <p style="font-size: 14px; margin: 10px 0;">
                <strong>Contour Expedition</strong><br />
                Phone: <a href="tel:9864755749" style="color: #f97316;">9864755749</a> | Email: <a href="mailto:Contour Expedition@gmail.com" style="color: #f97316;">Contour Expedition@gmail.com</a>
              </p>
              <div style="margin-top: 10px;">
                <a href="https://www.facebook.com/" style="margin: 0 5px; color: #f97316 background-color: #f97316;"><img src="https://img.icons8.com/ios-filled/50/000000/facebook.png" alt="Facebook" style="width: 24px; height: 24px;"/></a>
                <a href="https://www.facebook.com/" style="margin: 0 5px; color: #f97316"><img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" alt="Twitter" style="width: 24px; height: 24px;"/></a>
                <a href="https://www.facebook.com/" style="margin: 0 5px; color: #f97316"><img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" style="width: 24px; height: 24px;"/></a>
                <a href="https://www.facebook.com/" style="margin: 0 5px; color: #f97316"><img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" style="width: 24px; height: 24px;"/></a>
              </div>
              <p style="font-size: 12px; margin-top: 20px; color: #aaa;">
                This email was sent by Contour Expedition You are receiving this email because you opted in at our website.
              </p>
            </div>
          </div>
      </div>`,
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Mail sent successfully",
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
