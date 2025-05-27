import Stripe from "stripe";
import { headers } from "next/headers";
import { db } from "~/server/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export async function POST(req: Request) {
  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf);

  const sigHeaders = await headers();
  const signature = sigHeaders.get("stripe-signature") ?? "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("❌ Erreur de signature Stripe :", err);
    return new Response("Signature invalide", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = await stripe.checkout.sessions.retrieve(event.data.object.id);

    const userId = session.metadata?.userId;
    if (!userId) {
      console.warn("⚠️ Pas de userId dans la session.");
      return new Response("Session invalide", { status: 400 });
    }

    try {
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["customer"],
      });

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price"],
      });

      // 1. Enregistrer la commande
      await db.order.create({
        data: {
          stripeCheckoutId: fullSession.id,
          totalAmount: fullSession.amount_total ?? 0,
          status: "paid",
          userId,
          items: {
            create: lineItems.data.map((item) => ({
              name: item.description ?? "Produit",
              quantity: item.quantity ?? 1,
              priceId:
                typeof item.price === "object" && item.price?.id
                  ? item.price.id
                  : "unknown",
              unitPrice:
                typeof item.price === "object" && item.price?.unit_amount
                  ? item.price.unit_amount
                  : 0,
            })),
          },
        },
      });

      console.log("✅ Commande enregistrée pour :", userId);

      // 2. Mettre à jour la cagnotte de l'association
      for (const item of lineItems.data) {
        const priceId = typeof item.price === "object" && item.price?.id ? item.price.id : null;
        if (!priceId) continue;

        const product = await db.product.findFirst({
          where: { stripePriceId: priceId },
          select: { associationId: true, price: true },
        });

        if (product?.associationId) {
          const quantity = item.quantity ?? 1;
          const unitAmount = typeof item.price === "object" && item.price?.unit_amount ? item.price.unit_amount : 0;
          const total = unitAmount * quantity;
          const reversedAmount = Math.floor(total * 0.33); // 💚 33%

          await db.association.update({
            where: { id: product.associationId },
            data: {
              currentAmount: {
                increment: reversedAmount,
              },
            },
          });

          console.log(`💸 ${(reversedAmount / 100).toFixed(2)} € reversés à ${product.associationId}`);
        }
      }
    } catch (err) {
      console.error("❌ Erreur lors du traitement de la session :", err);
      return new Response("Erreur serveur", { status: 500 });
    }
  }

  return new Response("ok", { status: 200 });
}
