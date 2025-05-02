"use client";

import { useCart } from "@/context/CartContext";
import { api } from "@/utils/api";

export const CartSummary = () => {
  const { cart, total, clearCart } = useCart();
  const checkoutMutation = api.stripe.createCheckoutSession.useMutation();

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const res = await checkoutMutation.mutateAsync(
      cart.map((item) => ({
        priceId: item.priceId,
        quantity: item.quantity,
      }))
    );
    if (res.url) {
      window.location.href = res.url;
    }
  };

  return (
    <div className="mt-8 flex justify-between items-center">
      <p className="text-lg font-bold">Total : {(total / 100).toFixed(2)} €</p>

      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={clearCart}
        >
          Vider le panier
        </button>

        <button
          className="px-4 py-2 bg-black text-white rounded"
          onClick={handleCheckout}
        >
          Payer avec Stripe
        </button>
      </div>
    </div>
  );
};
