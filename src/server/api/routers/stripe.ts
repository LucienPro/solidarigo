import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // retire apiVersion si ça crée un conflit
  // apiVersion: "2025-04-30.basil",
});

export const stripeRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async () => {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
      active: true,
    });

    return products.data.map((p) => {
      const price = p.default_price as Stripe.Price;

      return {
        id: p.id,
        name: p.name,
        description: p.description,
        image: p.images?.[0] ?? null,
        price: price.unit_amount ?? 0,
        currency: price.currency,
        priceId: price.id,
      };
    });
  }),

  createCheckoutSession: publicProcedure
    .input(
      z.array(
        z.object({
          priceId: z.string(),
          quantity: z.number().min(1),
        })
      )
    )
    .mutation(async ({ input }) => {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: input.map((item) => ({
          price: item.priceId,
          quantity: item.quantity,
        })),
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/merci?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/panier`,
      });

      return { url: session.url };
    }),
});
