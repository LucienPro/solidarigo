"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import Link from "next/link"; // <-- ajouter import Link

export const AssociationOfTheDay = () => {
  const { data: associations = [], isLoading } = api.association.getAll.useQuery();

  const [selectedAsso, setSelectedAsso] = useState<typeof associations[number] | null>(null);

  useEffect(() => {
    if (associations.length > 0) {
      const randomIndex = Math.floor(Math.random() * associations.length);
      const randomAsso = associations[randomIndex];
      if (randomAsso) setSelectedAsso(randomAsso);
    }
  }, [associations]);

  if (isLoading || !selectedAsso) {
    return <p className="text-black">Chargement de l&apos;association du jour...</p>;
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 max-w-xl mx-auto mt-10 text-black">
      <h3 className="text-xl font-semibold">{selectedAsso.name}</h3>
      <p className="mt-2 text-gray-700">{selectedAsso.description}</p>
      <p className="mt-1 text-sm italic text-gray-500">Catégorie : {selectedAsso.category}</p>

      <div className="mt-4 flex justify-end">
        <Link
          href={`/associations/detailedAssociation/${selectedAsso.id}`} // <-- lien dynamique vers la page détail
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          Découvrir
        </Link>
      </div>
    </div>
  );
};
