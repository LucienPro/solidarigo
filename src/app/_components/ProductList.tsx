"use client";

import { api } from "@/utils/api";
import { useCart } from "@/context/CartContext";

export const ProductList = () => {
  const { data: products, isLoading } = api.stripe.getProducts.useQuery();
  const { addToCart } = useCart();
  if (isLoading) return <p className="text-black">Chargement des produits...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {products?.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col"
        >
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain rounded-md mb-4"
            />
          )}
          <h3 className="text-xl font-semibold text-black">{product.name}</h3>
          <p className="text-gray-700 mt-2 line-clamp-3">{product.description}</p>
          <p className="text-green-700 font-semibold mt-2">
            {(product.price / 100).toFixed(2)} €
          </p>

          <button
            className="mt-4 bg-black text-white px-4 py-2 rounded"
            onClick={() =>
              addToCart({
                priceId: product.priceId,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            
          >
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
};
