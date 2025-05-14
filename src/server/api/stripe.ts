// server/api/stripe.ts (ou trpc/stripe.router.ts)
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil",
});

export const getStripeProducts = async () => {
  const products = await stripe.products.list({ expand: ["data.default_price"] });

  return products.data.map((p) => {
    const price = p.default_price as Stripe.Price;
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
};
