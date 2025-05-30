"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { AssociationCard } from "../_components/AssociationCard";
import { ThemeFilterMenu } from "../_components/ThemeFilterMenu";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type Association = RouterOutputs["association"]["getAllWithStats"][number];

export default function AllAssociationsPage() {
  const { data: associations = [], isLoading } = api.association.getAllWithStats.useQuery();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const filtered = selectedTheme
    ? associations.filter((a) => a.category === selectedTheme)
    : associations;

  return (
    <main className="px-6 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4 text-center">Toutes les associations</h1>

      <ThemeFilterMenu activeTheme={selectedTheme} onSelectTheme={setSelectedTheme} />

      {isLoading ? (
        <p className="text-center text-gray-500">Chargement en cours...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucune association trouvée pour ce thème.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((asso: Association) => (
            <AssociationCard key={asso.id} association={asso} />
          ))}
        </div>
      )}
    </main>
  );
}
