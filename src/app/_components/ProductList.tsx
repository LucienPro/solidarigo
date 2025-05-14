"use client";

import { api } from "@/utils/api";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";
import { useState } from "react";

// 👇 Typage local du produit attendu (optionnel si tu veux plus fort encore)
type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  priceId: string;
};

export const ProductList = () => {
  const { data: products, isLoading } = api.stripe.getProducts.useQuery();
  const { addToCart } = useCart();
  const [shakingProductId, setShakingProductId] = useState<string | null>(null);

  if (isLoading) return <p className="text-black">Chargement des produits...</p>;

  // ✅ Filtrage des null avec typage fort
  const validProducts = (products ?? []).filter(Boolean) as ProductType[];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {validProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col"
        >
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain rounded-md mb-4"
            />
          )}

          <h3 className="text-lg font-semibold text-black">{product.name}</h3>
          <p className="text-gray-700 mt-2 line-clamp-3 text-sm">{product.description}</p>
          <p className="text-green-700 font-semibold mt-2 text-base">
            {(product.price / 100).toFixed(2)} €
          </p>
          <p className="text-xs text-purple-600 mt-1 italic">
            💚 33 % reversés à l’association
          </p>

          <button
            className={`mt-4 bg-black text-white px-4 py-2 rounded transition-all ${
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
