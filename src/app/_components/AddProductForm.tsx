"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

type Props = {
  isAdmin?: boolean;
};

type ProductFormData = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  associationId: string;
};

export const AddProductForm = ({ isAdmin = false }: Props) => {
  const utils = api.useUtils();

  const [form, setForm] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    associationId: "",
  });

  const { data: associations = [], isLoading } = api.association.getAll.useQuery();

  const {
    mutate: createProduct,
    isPending,
    error,
    isError,
  } = api.product.create.useMutation({
    onSuccess: () => {
      void utils.product.getAll.invalidate();
      setForm({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        associationId: "",
      });
    },
  });

  if (!isAdmin) return null;
  if (isLoading) return <p className="text-black">Chargement des associations...</p>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createProduct({ ...form, price: Number(form.price) });
      }}
      className="space-y-5 bg-white border border-gray-300 p-6 rounded-md shadow max-w-xl mx-auto mt-10 text-black"
    >
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
        🛍️ Ajouter un produit solidaire
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">Nom du produit</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ex : Tote Bag Éthique"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Détaillez brièvement le produit"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Prix (en centimes)</label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ex : 1500 pour 15 €"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">URL de l’image</label>
        <input
          type="text"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ex : /assets/images/totebag.png"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Association liée</label>
        <select
          value={form.associationId}
          onChange={(e) => setForm({ ...form, associationId: e.target.value })}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Choisir une association --</option>
          {associations.map((a: { id: string; name: string }) => (
  <option key={a.id} value={a.id}>
    {a.name}
  </option>
))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow disabled:opacity-60"
        >
          {isPending ? "Ajout en cours..." : "Ajouter le produit"}
        </button>
      </div>

      {isError && (
        <p className="text-red-500 text-sm mt-2">❌ {error?.message}</p>
      )}
    </form>
  );
};
