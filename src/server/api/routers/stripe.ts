import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export const stripeRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async () => {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
      active: true,
      limit: 100,
    });

    return products.data.map((p) => {
      const price = p.default_price as Stripe.Price | null;

      if (!price || typeof price.unit_amount !== "number") {
        console.warn(`⚠️ Produit sans prix valide : ${p.name}`);
        return null;
      }

      return {
        id: p.id,
        name: p.name,
        description: p.description,
        image: p.images?.[0] ?? null,
        price: price.unit_amount,
        currency: price.currency,
        priceId: price.id,
      };
    });
  }),

  createCheckoutSession: protectedProcedure
    .input(
      z.array(
        z.object({
          priceId: z.string(),
          quantity: z.number().min(1),
        })
      )
    )
    .mutation(async ({ input, ctx }) => {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: input.map((item) => ({
          price: item.priceId,
          quantity: item.quantity,
        })),
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/merci?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/panier`,
        metadata: {
          userId: ctx.session.user.id, // 🔥 Cette ligne est essentielle pour le webhook
        },
      });

      return { url: session.url };
    }),
});
