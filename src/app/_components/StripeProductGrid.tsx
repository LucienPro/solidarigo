"use client";

import { api } from "@/utils/api";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type ProductType = NonNullable<RouterOutputs["stripe"]["getProducts"][number]>;

export const StripeProductGrid = () => {
  const { data: products, isLoading } = api.stripe.getProducts.useQuery();
  const { addToCart } = useCart();
  const [shakingProductId, setShakingProductId] = useState<string | null>(null);

  if (isLoading) return <p className="text-black">Chargement des produits...</p>;

  const validProducts = (products ?? []).filter((p): p is ProductType => p !== null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {validProducts.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded bg-white shadow-sm flex flex-col justify-between"
        >
          <div className="relative w-full h-48 mb-2">
            <Image
              src={product.image ?? "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover rounded"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>

          <h3 className="text-lg font-semibold text-black">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="mt-2 font-bold text-green-700">
            {(product.price / 100).toFixed(2)} €
          </p>

          <button
            className={`mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition ${
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
