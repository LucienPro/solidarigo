// app/components/StripeProductGrid.tsx (ou autre dossier de composants)

import { api } from "@/utils/api"; // si ton alias @ ou ~ est bien configuré

// éventuellement : import { useCart } from "~/hooks/useCart";

export const StripeProductGrid = () => {
  const { data: products, isLoading } = api.stripe.getProducts.useQuery();

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products?.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <img
            src={product.image ?? "/placeholder.png"}
            alt={product.name}
            className="w-full h-48 object-cover mb-2"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm">{product.description}</p>
          <p className="mt-2 font-bold">{(product.price / 100).toFixed(2)} €</p>
          <button
            className="mt-2 bg-black text-white px-4 py-2 rounded"
            onClick={() => console.log("TODO: Ajouter au panier", product)}
          >
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
};
