"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

type EditProductModalProps = {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    associationId: string;
  };
  onClose: () => void;
  onUpdated: () => void;
};

export const EditProductModal = ({
  product,
  onClose,
  onUpdated,
}: EditProductModalProps) => {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl ?? "",
    associationId: product.associationId,
  });

  const { data: associations } = api.association.getAll.useQuery();

  const updateMutation = api.product.update.useMutation({
    onSuccess: onUpdated,
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateMutation.mutate({ id: product.id, ...form });
        }}
        className="bg-white p-6 rounded shadow-lg max-w-lg w-full text-black space-y-4"
      >
        <h2 className="text-lg font-semibold mb-2">Modifier le produit</h2>

        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 rounded border"
          placeholder="Nom du produit"
          required
        />

        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 rounded border"
          placeholder="Description"
          required
        />

        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="w-full p-2 rounded border"
          placeholder="Prix (centimes)"
          required
        />

        <input
          type="text"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="w-full p-2 rounded border"
          placeholder="URL de l'image"
        />

        <select
          value={form.associationId}
          onChange={(e) => setForm({ ...form, associationId: e.target.value })}
          className="w-full p-2 rounded border"
          required
        >
          <option value="">-- Choisir une association --</option>
          {associations?.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {updateMutation.isPending ? "Enregistrement..." : "Mettre à jour"}
          </button>
        </div>
      </form>
    </div>
  );
};
