import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { getStripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const signature = (await headers()).get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret)
    return NextResponse.json(
      { error: "Webhook Stripe non configuré." },
      { status: 400 },
    );
  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      secret,
    );
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object;
      if (session.metadata?.orderId) {
        await db
          .update(orders)
          .set({ status: "paid", paymentStatus: "paid" })
          .where(eq(orders.id, session.metadata.orderId));
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook Stripe invalide :", error);
    return NextResponse.json(
      { error: "Signature Stripe invalide." },
      { status: 400 },
    );
  }
}
