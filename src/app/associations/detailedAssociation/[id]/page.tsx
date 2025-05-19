"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/utils/api";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/app/_components/Breadcrumb";
import { ProgressBar } from "@/app/_components/ProgressBar";
import { ProductCardList } from "@/app/_components/ProductCardList";

export default function DetailedAssociationPage() {
  const { id } = useParams();

  const { data: association, isLoading } = api.association.getByIdWithStats.useQuery(id as string);


  if (isLoading) {
  return <p>Chargement...</p>;
}

  if (!association) return notFound();

  return (
    <main className="px-6 py-12 text-black max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Associations", href: "/associations" },
          { label: association.name },
        ]}
      />

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

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">📊 Objectif de collecte</h2>
          <p className="text-gray-600 mb-2">
            Grâce à vos achats solidaires, {(association.currentAmount / 100).toFixed(2)} € ont
            déjà été collectés sur un objectif de {(association.goalAmount / 100).toFixed(2)} €.
          </p>
          <ProgressBar current={association.currentAmount} goal={association.goalAmount} />
        </div>

        {association.activities && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">🪴 Activités principales</h2>
            <p className="text-gray-700">{association.activities}</p>
          </div>
        )}

        {association.supportReasons && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">💚 Pourquoi les soutenir ?</h2>
            <p className="text-gray-700">{association.supportReasons}</p>
          </div>
        )}

        {association.impact && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">🌍 Impact concret</h2>
            <p className="text-gray-700">{association.impact}</p>
          </div>
        )}

        <h2 className="text-2xl font-semibold mt-10 mb-4">🎁 Produits solidaires</h2>
        {association.products.length === 0 ? (
          <p className="text-gray-500">Aucun produit disponible.</p>
        ) : (
          <ProductCardList products={association.products} />
        )}
      </div>
    </main>
  );
}
