import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received payment request:", body);
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/confirm-order`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: body.name,
            },
            unit_amount: body.amount *100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    });
    return NextResponse.json({ message: session });
  } catch (error) {
    console.error("Stripe API Error:", error);
    return NextResponse.json(
      {
        message: "Error creating checkout session",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
