"use client";

import { useCart } from "@/context/CartContext";
import { CartItemCard } from "../_components/CartItemCard";
import { CartSummary } from "../_components/CartSummary";

export default function PanierPage() {
  const { cart } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8 text-center">🛒 Votre panier</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <CartItemCard key={item.priceId} {...item} />
            ))}
          </div>

          <CartSummary />
        </>
      )}
    </div>
  );
}
