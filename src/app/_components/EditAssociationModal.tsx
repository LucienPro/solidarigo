"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

type EditAssociationModalProps = {
  association: {
    id: string;
    name: string;
    description: string;
    category: string;
    logoUrl?: string | null;
  };
  onClose: () => void;
};

export const EditAssociationModal = ({
  association,
  onClose,
}: EditAssociationModalProps) => {
  const utils = api.useUtils();

  const [form, setForm] = useState({
    name: association.name,
    description: association.description,
    category: association.category,
  });

  const updateMutation = api.association.update.useMutation({
    onSuccess: () => {
      void utils.association.getAll.invalidate();
      onClose(); // Fermer le modal après succès
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ id: association.id, ...form });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg max-w-lg w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4">Modifier l&apos;association</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 rounded border"
          />
          <input
            type="text"
            placeholder="Catégorie"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-2 rounded border"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 rounded border"
          />
          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
