"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

type Props = {
  priceId: string;
  name: string;
  image?: string | null;
  price: number;
  quantity: number;
};

export const CartItemCard = ({ priceId, name, image, price, quantity }: Props) => {
  const { removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 border-b pb-4">
      {image && (
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          className="object-cover rounded"
        />
      )}
      <div className="flex-1">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">
          {(price / 100).toFixed(2)} € × {quantity}
        </p>
      </div>
      <button
        onClick={() => removeFromCart(priceId)}
        className="text-red-600 hover:underline text-sm"
      >
        Retirer
      </button>
    </div>
  );
};
