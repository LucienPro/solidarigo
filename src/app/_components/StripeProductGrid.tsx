"use client";

import { api } from "@/utils/api"; 
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";
import { useState } from "react";

export const StripeProductGrid = () => {
  const { data: products, isLoading } = api.stripe.getProducts.useQuery();
  const { addToCart } = useCart();
  const [shakingProductId, setShakingProductId] = useState<string | null>(null);

  if (isLoading) return <p className="text-black">Chargement...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products
        ?.filter((product): product is NonNullable<typeof product> => product !== null)
        .map((product) => (
          <div key={product.id} className="border p-4 rounded bg-white shadow-sm">
            <img
              src={product.image ?? "/placeholder.png"}
              alt={product.name}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold text-black">{product.name}</h3>
            <p className="text-sm text-gray-700">{product.description}</p>
            <p className="mt-2 font-bold text-green-600">{(product.price / 100).toFixed(2)} €</p>

            <button
              className={`mt-2 bg-black text-white px-4 py-2 rounded transition-all ${
                shakingProductId === product.id ? "animate-shake" : ""
              }`}
              onClick={() => {
                addToCart({
                  priceId: product.priceId,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                });
                toast.success(`✅ ${product.name} ajouté au panier`);
                setShakingProductId(product.id);
                setTimeout(() => setShakingProductId(null), 300);
              }}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
    </div>
  );
};
