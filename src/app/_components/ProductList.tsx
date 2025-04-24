"use client";

import { useState } from "react";
import Image from "next/image";
import { api } from "~/trpc/react";
import { EditProductModal } from "./EditProductModal";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type Product = RouterOutputs["product"]["getAll"][number];

type Props = {
  isAdmin?: boolean;
};

export const ProductList = ({ isAdmin = false }: Props) => {
  const utils = api.useUtils();
  const { data: products = [], isLoading } = api.product.getAll.useQuery();

  const deleteMutation = api.product.delete.useMutation({
    onSuccess: () => {
      void utils.product.getAll.invalidate();
    },
  });

  const [toDeleteId, setToDeleteId] = useState<string | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  if (isLoading) return <p className="text-black">Chargement des produits...</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 relative flex flex-col"
          >
            {product.imageUrl && (
              <Image
              src={product.imageUrl}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-auto object-contain rounded-md mb-4"
            />            
            )}
            <h3 className="text-xl font-semibold text-black">{product.name}</h3>
            <p className="text-gray-700 mt-2 line-clamp-3">{product.description}</p>
            <p className="text-green-700 font-semibold mt-2">
              {(product.price / 100).toFixed(2)} €
            </p>
            <p className="text-sm text-gray-500 mt-1 italic">
              Association : {product.association.name}
            </p>

            {isAdmin && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => setToDeleteId(product.id)}
                >
                  🗑
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setProductToEdit(product)}
                >
                  ✏️
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal suppression */}
      {isAdmin && toDeleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-black max-w-sm w-full">
            <p className="mb-4 text-lg font-semibold">Supprimer ce produit ?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setToDeleteId(null)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white"
                onClick={() => {
                  if (toDeleteId) deleteMutation.mutate(toDeleteId);
                  setToDeleteId(null);
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal édition */}
      {isAdmin && productToEdit && (
        <EditProductModal
          product={productToEdit}
          onClose={() => setProductToEdit(null)}
          onUpdated={() => {
            void utils.product.getAll.invalidate();
            setProductToEdit(null);
          }}
        />
      )}
    </>
  );
};
