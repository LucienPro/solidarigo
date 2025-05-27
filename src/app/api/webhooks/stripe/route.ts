// src/app/api/webhooks/stripe/route.ts
import { db } from "@/server/db";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}
const stripe = new Stripe(stripeSecretKey, {
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
if (!sig) {
  return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
}

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
     const session = event.data.object;

    const userId = session.metadata?.userId;
    if (!userId) {
      console.warn("Aucun userId dans la metadata de la session");
      return NextResponse.json({}, { status: 400 });
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
  expand: ['data.price'],
});

await db.order.create({
  data: {
    userId,
    stripeCheckoutId: session.id,
    totalAmount: session.amount_total ?? 0,
    items: {
      create: lineItems.data.map((item) => ({
        name: item.description ?? "Produit inconnu",
        quantity: item.quantity ?? 1,
        unitPrice: item.amount_total ?? 0,
        priceId: item.price?.id ?? "inconnu",
      })),
    },
  },
});


  }

  return NextResponse.json({ received: true });
}
