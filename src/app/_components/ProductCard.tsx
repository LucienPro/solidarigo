"use client";

import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  priceId?: string;
};

export const ProductCard = ({ id: _, name, description, price, image, priceId }: Props) => {
  const { addToCart } = useCart();
  const [shaking, setShaking] = useState(false);

  const handleAdd = () => {
    addToCart({ name, price, image: image ?? "", priceId: priceId ?? "" });
    toast.success(`✅ ${name} ajouté au panier`);
    setShaking(true);
    setTimeout(() => setShaking(false), 300);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-gray-50 flex flex-col">
      <div className="flex-grow">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="font-medium text-green-700">{(price / 100).toFixed(2)} €</p>
      </div>
      <button
        onClick={handleAdd}
        className={`mt-4 bg-black text-white px-4 py-2 rounded transition-all ${shaking ? "animate-shake" : ""}`}
      >
        Ajouter au panier
      </button>
    </div>
  );
};
