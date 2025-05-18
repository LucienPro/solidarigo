"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { EditAssociationModal } from "./EditAssociationModal";

type Association = {
  id: string;
  name: string;
  description: string;
  category: string;
  logoUrl?: string | null;
  details?: string | null;
  createdAt: Date;
  updatedAt: Date;
  activities?: string | null;
  supportReasons?: string | null;
  impact?: string | null;
  currentAmount: number;
  goalAmount: number;
};

type Props = {
  isAdmin?: boolean;
};

export const AssociationList = ({ isAdmin = false }: Props) => {
  const utils = api.useUtils();
  const { data: associations = [], isLoading } = api.association.getAll.useQuery();

  const deleteMutation = api.association.delete.useMutation({
    onSuccess: () => {
      void utils.association.getAll.invalidate();
    },
  });

  const [toDeleteId, setToDeleteId] = useState<string | null>(null);
  const [selectedAsso, setSelectedAsso] = useState<Association | null>(null);

  if (isLoading) return <p className="text-black">Chargement des associations...</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {associations.map((asso: Association) => (
  <div
    key={asso.id}
    className="bg-white border border-gray-200 rounded-lg shadow-md p-6 relative"
  >
            <h3 className="text-xl font-semibold text-black">{asso.name}</h3>
            <p className="text-gray-700 mt-2">{asso.description}</p>
            <p className="text-sm text-gray-500 mt-1 italic">{asso.category}</p>

            {isAdmin && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => setToDeleteId(asso.id)}
                >
                  🗑
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setSelectedAsso(asso)}
                >
                  ✏️
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isAdmin && toDeleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-black max-w-sm w-full">
            <p className="mb-4 text-lg font-semibold">Supprimer cette association ?</p>
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

      {isAdmin && selectedAsso && (
        <EditAssociationModal
          association={selectedAsso}
          onClose={() => setSelectedAsso(null)}
        />
      )}
    </>
  );
};
