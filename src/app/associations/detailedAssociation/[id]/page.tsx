import { notFound } from "next/navigation";
import Image from "next/image";
import { db } from "~/server/db";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

// ... (imports inchangés)

export default async function DetailedAssociationPage({ params }: Props) {
  const association = await db.association.findUnique({
    where: { id: params.id },
    include: {
      products: true,
    },
  });

  if (!association) return notFound();

  return (
    <main className="px-6 py-12 text-black max-w-4xl mx-auto">
      <Link
        href="/associations"
        className="text-green-600 hover:underline mb-4 inline-block transition-transform hover:translate-x-1"
      >
        ← Retour aux associations
      </Link>

      <div className="bg-white shadow-md rounded-lg p-6">
        {association.logoUrl && (
          <Image
            src={association.logoUrl}
            alt={association.name}
            width={800}
            height={300}
            className="rounded-lg object-cover w-full h-64 mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-4">{association.name}</h1>
        <p className="text-gray-700 mb-6">{association.description}</p>
        <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full mb-6">
          {association.category}
        </span>

        {/* 🪴 Activités */}
        {association.activities && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">🪴 Activités principales</h2>
            <p className="text-gray-700">{association.activities}</p>
          </div>
        )}

        {/* 💚 Raisons de les soutenir */}
        {association.supportReasons && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">💚 Pourquoi les soutenir ?</h2>
            <p className="text-gray-700">{association.supportReasons}</p>
          </div>
        )}

        {/* 🌍 Impact */}
        {association.impact && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">🌍 Impact concret</h2>
            <p className="text-gray-700">{association.impact}</p>
          </div>
        )}

        {/* 🎁 Produits solidaires */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">🎁 Produits solidaires</h2>
        {association.products.length === 0 ? (
          <p className="text-gray-500">Aucun produit disponible.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {association.products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="font-medium text-green-700">{(product.price / 100).toFixed(2)} €</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

