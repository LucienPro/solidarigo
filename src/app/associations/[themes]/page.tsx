import { notFound } from "next/navigation";
import { AssociationCard } from "~/app/_components/AssociationCard";
import { db } from "~/server/db";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type Association = RouterOutputs["association"]["getAll"][number];

const THEME_EMOJIS: Record<string, string> = {
  Écologie: "🌿",
  Solidarité: "🤝",
  Éducation: "📚",
  Santé: "🏥",
  Culture: "🎭",
  Inclusion: "🌍",
};

export default async function ThemePage({
  params,
}: {
  params: { themes: string };
}) {
  const currentRaw = decodeURIComponent(params.themes);

  const currentCategory = Object.keys(THEME_EMOJIS).find(
    (key) => key.toLowerCase() === currentRaw.toLowerCase()
  );

  if (!currentCategory) notFound();

  const filteredAssociations = await db.association.findMany({
    where: { category: currentCategory },
    orderBy: { createdAt: "desc" },
  });

  const emoji = THEME_EMOJIS[currentCategory];

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
          {filteredAssociations.map((asso: Association) => (
            <AssociationCard key={asso.id} association={asso} />
          ))}
        </div>
      )}
    </main>
  );
}
