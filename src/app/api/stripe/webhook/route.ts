import Stripe from "stripe";
import { headers } from "next/headers";
import { db } from "~/server/db";

// Important pour désactiver le parsing automatique du body
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {

});

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
  const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
    expand: ["line_items.data.price"],
  });

  const userId = session.metadata?.userId;

  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items", "line_items.data.price"],
  }) as Stripe.Checkout.Session & {
    line_items: {
      data: Stripe.LineItem[];
    };
  };

  const lineItems = fullSession.line_items.data ?? [];

  console.log("👉 Session checkout ID :", fullSession.id);
  console.log("👉 User ID :", userId);
  console.log("👉 Items :", lineItems);

    try {
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items", "line_items.data.price"],
      });

      const userId = fullSession.metadata?.userId;

      if (userId && fullSession.line_items) {
        // 1. Enregistrer la commande
        await db.order.create({
          data: {
            stripeCheckoutId: fullSession.id,
            totalAmount: fullSession.amount_total ?? 0,
            status: "paid",
            userId,
            items: {
              create: fullSession.line_items.data.map((item) => ({
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

        console.log("✅ Commande enregistrée pour l'utilisateur :", userId);

        // 2. Reversement automatique à l’association
        for (const item of fullSession.line_items.data) {
          const priceId =
            typeof item.price === "object" && item.price?.id ? item.price.id : null;

          if (!priceId) continue;

          const product = await db.product.findFirst({
  where: { stripePriceId: priceId },
  select: { associationId: true, price: true },
});


          if (product?.associationId) {
            const quantity = item.quantity ?? 1;
            const unitAmount =
              typeof item.price === "object" && item.price?.unit_amount
                ? item.price.unit_amount
                : 0;

            const total = unitAmount * quantity;
            const reversedAmount = Math.floor(total * 0.33); // 💚 33% reversé

            await db.association.update({
              where: { id: product.associationId },
              data: {
                currentAmount: {
                  increment: reversedAmount,
                },
              },
            });

            console.log(
  `💸 ${(reversedAmount / 100).toFixed(2)} € reversés à l'association ${product.associationId}`
);

          }
        }
      } else {
        console.warn("⚠️ Session sans userId ou line_items");
      }
    } catch (err) {
      console.error("❌ Erreur lors du traitement de la session :", err);
      return new Response("Erreur serveur", { status: 500 });
    }
  }

  return new Response("ok", { status: 200 });
}
