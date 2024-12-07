import Stripe from "stripe";
import { AxiosInstance } from "@/utils";
import moment from "moment";
import jsPDF from "jspdf";
const config = {
  api: {
    bodyParser: false,
  },
};

const generatePDF = async (booking: any) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const margin = 15;
  const pageWidth = 210;
  const pageHeight = 295;

  let yPosition = margin;

  // Function to add a new page if needed
  const addPageIfNeeded = (heightNeeded: number) => {
    if (yPosition + heightNeeded > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
  };

  const fontSize = 12; // Set a default font size
  const lineHeight = fontSize * 1; // Line height (1.2 times the font size is a common choice)

  const setFont = (size: number, style: "normal" | "bold" = "normal") => {
    pdf.setFontSize(size);
    pdf.setFont("helvetica", style);
  };

  const addText = (text: string, x: number, y: number, maxWidth?: number) => {
    const lines = pdf.splitTextToSize(
      text,
      maxWidth || pageWidth - 2 * margin
    );
    lines.forEach((line: any) => {
      addPageIfNeeded(lineHeight);
      pdf.text(line, x, y);
    });
  };

  // Title
  setFont(18, "bold");

  pdf.text("Contour Expeditions", pageWidth / 2, yPosition, {
    align: "center",
  });
  yPosition += 20;

  // Booking Details
  setFont(14, "bold");
  addText("Booking Details", margin, yPosition);
  yPosition += 10;

  setFont(12, "normal");
  const bookingDetails = [
    `Package Name: ${booking?.expedition?.name}`,
    `Trip Duration: ${moment(booking?.startDate).format(
      "MMMM Do YYYY"
    )} to ${moment(booking?.endDate).format("MMMM Do YYYY")}`,
  ];

  bookingDetails.forEach((detail: any) => {
    addText(detail, margin, yPosition);
    yPosition += lineHeight;
  });
  yPosition += 20;
  // User Details
  setFont(14, "bold");
  addText("User Details", margin, yPosition);
  yPosition += 10;

  const userDetails = [
    `User Full Name: ${booking?.fullName}`,
    `Email Address: ${booking?.email || booking?.user?.email}`,
    `Date of Birth: ${booking?.dob?.slice(0, 10)}`,
    `No of Adults: ${booking?.adults}`,
    `No of Children: ${booking?.childrens}`,
    `Postal Code: ${booking?.postalCode}`,
    `Note: ${booking?.note}`,
    `Additional Services: ${
      booking?.additionalServices
        ? booking?.additionalServices.join(", ")
        : ""
    }`,
  ];
  setFont(12, "normal");
  userDetails.forEach((detail: any) => {
    addText(detail, margin, yPosition);
    yPosition += lineHeight;
  });
  yPosition += 20;
  // Emergency Contact
  addPageIfNeeded(20);
  setFont(14, "bold");
  addText("Emergency Contact", margin, yPosition);
  yPosition += 10;

  const emergencyContact = [
    `Full Name: ${booking?.emergencyName}`,
    `Phone Number: ${booking?.emergencyPhone}`,
    `Relationship: ${booking?.emergencyRelationship}`,
  ];
  setFont(12, "normal");
  emergencyContact.forEach((contact: any) => {
    addText(contact, margin, yPosition);
    yPosition += lineHeight;
  });

  yPosition += 20;
  // Payment Details
  addPageIfNeeded(20);
  setFont(14, "bold");
  addText("Payment Details", margin, yPosition);
  yPosition += 10;

  const paymentDetails = [
    `Payment Method: ${booking?.paymentMethod}`,
    `Payment Option: ${booking?.paymentOption}`,
    `Payment Status: ${booking?.paymentStatus}`,
    `Total Amount: ${booking?.totalAmount}`,
    `Deposited Amount: ${booking?.depositAmount}`,
    `Remaining Amount: ${booking?.remainingAmount}`,
  ];
  setFont(12, "normal");
  paymentDetails.forEach((payment: any) => {
    addText(payment, margin, yPosition);
    yPosition += lineHeight;
  });

  yPosition += 20;
  // Trip Details
  addPageIfNeeded(20);
  setFont(14, "bold");
  addText("Trip Details", margin, yPosition);
  yPosition += 10;

  const tripDetails = [
    `Trip Name: ${booking?.expedition?.name}`,
    `Max Elevation: ${booking?.expedition?.maxElevation}`,
    `Duration: ${booking?.expedition?.duration}`,
    `Accommodation: ${booking?.expedition?.accommodation}`,
    `Season: ${booking?.expedition?.season}`,
  ];
  setFont(12, "normal");
  tripDetails.forEach((trip: any) => {
    addText(trip, margin, yPosition);
    yPosition += lineHeight;
  });



  const pdfOutput = pdf.output("datauristring");
  const pdfToSend = pdfOutput.split(",")[1];
  console.log({ pdf: pdfToSend });
  try {
    const res = await AxiosInstance.post(
      `/bookings/sendInvoice/${booking?.bookingId}`,
      { pdf: pdfToSend }
    );
    console.log(res);
  } catch (error: any) {
    console.log(error.message);
  }
};


const updateMaxQuantity = async (bookingUpdate:any) => {
  console.log("max quantity")
  if (bookingUpdate?.departure ) {
    try {
      const adults=bookingUpdate?.adults?bookingUpdate?.adults:0
      const childrens=bookingUpdate?.childrens?bookingUpdate?.childrens:0
      const { data } = await AxiosInstance.patch(`groupDeparture/sold/${bookingUpdate?.groupDeparture?.groupDepartureId}`, {
        total: Number(adults) + Number(childrens)
      })
      console.log("after update departure",data)
    } catch (error: any) {
      console.log(error)
    }
  }

}


async function savePaymentStatus(paymentId: string, status: string, amountPaid: number, amountDue: number, grandTotal: number) {
  const res = await AxiosInstance.get(`/bookings`, {
    params: {
      paymentId: paymentId,
    },
  });
  const bookingId = res.data.data[0].bookingId;

  const bookingUpdate = await AxiosInstance.patch(`/bookings/payment/${bookingId}`, {
    depositAmount: amountPaid,
    remainingAmount: res.data.data[0].totalAmount - amountPaid,
    paymentStatus: status,
  });
  generatePDF(bookingUpdate.data?.data);

}

async function handleStripeWebhook(event: Stripe.Event) {
  const { type, data } = event;
  const obj: any = data.object as Stripe.Checkout.Session;

  // Extract additional payment details
  const amountPaid = obj.amount_total / 100; // Stripe amounts are in cents
  const amountDue = 0;
  const grandTotal = obj.amount_total / 100;

  switch (type) {
    case "checkout.session.completed":
    case "charge.succeeded":
      await savePaymentStatus(obj.id, "succeeded", amountPaid, amountDue, grandTotal);
      return new Response(JSON.stringify({ message: "Payment completed!" }), { status: 200 });

    case "charge.failed":
      await savePaymentStatus(obj.id, "failed", amountPaid, amountDue, grandTotal);
      return new Response(JSON.stringify({ message: "Payment failed!" }), { status: 200 });

    case "charge.refunded":
      await savePaymentStatus(obj.id, "refunded", amountPaid, amountDue, grandTotal);
      return new Response(JSON.stringify({ message: "Refund completed!" }), { status: 200 });

    default:
      return new Response(JSON.stringify({ error: "Unhandled event type" }), { status: 400 });
  }
}

export async function POST(request: any) {
  try {
    const rawBody = await request.text();
    const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
    const stripeWebhookSecret = `${process.env.STRIPE_WEBHOOK_SECRET}`;

    const sig = request.headers.get("Stripe-Signature");
    if (!sig) {
      throw new Error("Stripe Signature missing");
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, stripeWebhookSecret);
    } catch (err: any) {
      return new Response(JSON.stringify({ error: "Webhook signature verification failed" }), { status: 400 });
    }

    const webhookResponse = await handleStripeWebhook(event);
    return new Response(webhookResponse.body, { status: webhookResponse.status });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Webhook handler failed." }), { status: 500 });
  }
}
