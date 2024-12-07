import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

export async function POST(request: Request) {
  const body = await request.json();
  // console.log(body);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(body.amount * 100), // Amount to charge in cents
          product_data: {
            name: body.paymentOption === "full-payment" ? "Full Trip Payment" : "Deposit Payment", // Payment description
          },
        },
        quantity: 1, // Single payment
      },
    ],
    success_url: body.success_url,
    cancel_url: body.cancel_url,
    metadata: {
      email: body.email,
      paymentOption: body.paymentOption,
    },
  });

  return NextResponse.json({ id: session.id });
}
