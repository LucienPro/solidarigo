"use client";

import { ProductCard } from "./ProductCard";

// Type minimal pour les produits depuis Prisma
type Props = {
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    stripePriceId: string | null;
  }[];
};

export const ProductCardList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.imageUrl ?? ""}
          priceId={product.stripePriceId ?? ""}
        />
      ))}
    </div>
  );
};
