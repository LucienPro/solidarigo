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
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="flex items-center justify-between border-b pb-4 gap-4">
      {/* 🖼 Image + Infos */}
      <div className="flex items-center gap-4 flex-1">
        {image && (
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            className="object-cover rounded"
          />
        )}
        <div>
          <p className="font-semibold text-black">{name}</p>
          <p className="text-sm text-gray-600">
            {(price / 100).toFixed(2)} € × {quantity}
          </p>
        </div>
      </div>

      {/* ➖ Quantité ➕ */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => decreaseQuantity(priceId)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          –
        </button>
        <span className="min-w-[24px] text-center text-black">{quantity}</span>
        <button
          onClick={() => increaseQuantity(priceId)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* ❌ Retirer */}
      <button
        onClick={() => removeFromCart(priceId)}
        className="text-red-600 hover:underline text-sm"
      >
        Retirer
      </button>
    </div>
  );
};
