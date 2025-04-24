"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

type Props = {
  isAdmin?: boolean;
};

type AssociationFormData = {
  name: string;
  description: string;
  category: string;
};

export const AddAssociationForm = ({ isAdmin = false }: Props) => {
  const utils = api.useUtils();

  const [form, setForm] = useState<AssociationFormData>({
    name: "",
    description: "",
    category: "",
  });

  const {
    mutate: createAssociation,
    error,
    isPending,
    isError,
  } = api.association.create.useMutation({
    onSuccess: () => {
      void utils.association.getAll.invalidate();
      setForm({ name: "", description: "", category: "" });
    },
  });

  if (!isAdmin) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createAssociation(form);
      }}
      className="space-y-4 bg-white border border-gray-300 p-6 rounded-md shadow max-w-xl mx-auto mt-10 text-black"
    >
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        ➕ Ajouter une association
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">Nom</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Ex : Planète Verte"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Catégorie</label>
        <input
          type="text"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Ex : écologie, éducation..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Décrivez brièvement les missions de l’association"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow disabled:opacity-60"
        >
          {isPending ? "Enregistrement..." : "Ajouter"}
        </button>
      </div>

      {isError && (
        <p className="text-red-500 text-sm mt-2">❌ {error?.message}</p>
      )}
    </form>
  );
};
