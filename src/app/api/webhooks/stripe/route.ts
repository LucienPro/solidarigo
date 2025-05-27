import { db } from "@/server/db";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}
const stripe = new Stripe(stripeSecretKey, {});

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
      expand: ["data.price"],
    });

    // 1. Enregistrer la commande
    await db.order.create({
      data: {
        userId,
        stripeCheckoutId: session.id,
        totalAmount: session.amount_total ?? 0,
        items: {
          create: lineItems.data.map((item) => ({
            name: item.description ?? "Produit inconnu",
            quantity: item.quantity ?? 1,
            unitPrice:
              typeof item.price === "object" && item.price?.unit_amount
                ? item.price.unit_amount
                : 0,
            priceId:
              typeof item.price === "object" && item.price?.id
                ? item.price.id
                : "inconnu",
          })),
        },
      },
    });
console.log("✅ Commande enregistrée dans Order :", session.id);

    // 2. Mettre à jour currentAmount de l’association
    for (const item of lineItems.data) {
  const price = item.price;

  if (!price || typeof price !== "object") continue;

  const priceId = price.id;

  const product = await db.product.findFirst({
    where: { stripePriceId: priceId },
    select: { associationId: true, price: true },
  });

  if (!product?.associationId) continue;

  const quantity = item.quantity ?? 1;
  const unitAmount = price.unit_amount ?? 0;
  const total = unitAmount * quantity;
  const reversed = Math.floor(total * 0.33); // 33 %

  await db.association.update({
    where: { id: product.associationId },
    data: {
      currentAmount: {
        increment: reversed,
      },
    },
  });

  console.log(`💸 +${(reversed / 100).toFixed(2)} € pour ${product.associationId}`);
}

  }

  return NextResponse.json({ received: true });
}
