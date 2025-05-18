"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { AssociationCard } from "./AssociationCard";
import { ThemeFilterMenu } from "./ThemeFilterMenu";

type Association = {
  id: string;
  name: string;
  description: string;
  category: string;
  logoUrl?: string | null;
};


function AssociationListWithFilter() {
  const { data: associations = [], isLoading } = api.association.getAll.useQuery();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const filtered = selectedTheme
    ? associations.filter((a: Association) => a.category === selectedTheme)
    : associations;

  return (
    <>
      <ThemeFilterMenu activeTheme={selectedTheme} onSelectTheme={setSelectedTheme} />

      {isLoading ? (
        <p className="text-center text-gray-500">Chargement en cours...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucune association trouvée pour ce thème.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((asso) => (
            <AssociationCard key={asso.id} association={asso} />
          ))}
        </div>
      )}
    </>
  );
}

export default AssociationListWithFilter;
