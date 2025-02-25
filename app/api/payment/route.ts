import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/confirm-order",
      cancel_url: "http://localhost:3000/",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: body.name,
            },
            unit_amount: body.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    });
    return NextResponse.json({ message: session });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating checkout session",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
