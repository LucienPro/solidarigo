"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { api } from "@/utils/api";
import { AssociationCard } from "~/app/_components/AssociationCard";

const THEME_EMOJIS: Record<string, string> = {
  Écologie: "🌿",
  Solidarité: "🤝",
  Éducation: "📚",
  Santé: "🏥",
  Culture: "🎭",
  Inclusion: "🌍",
};

// 💡 Fonction pour ignorer les accents et la casse
const normalize = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function ThemePage() {
  const params = useParams();
  const currentRaw = decodeURIComponent(params.themes as string);

  const currentCategory = Object.keys(THEME_EMOJIS).find(
    (key) => normalize(key) === normalize(currentRaw)
  );

  const emoji = THEME_EMOJIS[currentCategory ?? ""];

  const { data: associations, isLoading } = api.association.getAllWithStats.useQuery();

  if (!currentCategory) return notFound();
  if (isLoading || !associations) return <p>Chargement...</p>;

  const filteredAssociations = associations.filter(
    (a) => normalize(a.category) === normalize(currentCategory)
  );

  return (
    <main className="px-6 py-12 text-black">
      <h1 className="text-3xl font-bold mb-2 text-center">
        {emoji} {currentCategory}
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Découvrez les associations engagées dans le domaine de{" "}
        <span className="font-semibold lowercase">{currentCategory}</span>.
      </p>

      {filteredAssociations.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucune association trouvée pour cette catégorie.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssociations.map((asso) => (
            <AssociationCard key={asso.id} association={asso} />
          ))}
        </div>
      )}
    </main>
  );
}
