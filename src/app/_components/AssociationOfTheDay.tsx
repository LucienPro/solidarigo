"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProgressBar } from "./ProgressBar";


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
    return <p className="text-black text-center py-10">Chargement de l&apos;association du jour...</p>;
  }

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-2xl px-10 py-14 max-w-4xl mx-auto text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h3 className="text-3xl font-bold text-green-700 mb-4">
        {selectedAsso.name}
      </h3>
      <p className="text-gray-700 text-lg mb-2">
        {selectedAsso.description}
      </p>
      <p className="text-sm italic text-gray-500 mb-6">
        Thématique : {selectedAsso.category}
      </p>

            <ProgressBar
        current={selectedAsso.currentAmount ?? 0}
        goal={selectedAsso.goalAmount ?? 1000}
      />


      <Link
        href={`/associations/detailedAssociation/${selectedAsso.id}`}
        className="inline-block bg-green-600 hover:bg-green-700 text-white text-lg font-medium px-6 py-3 rounded-full transition shadow-md hover:shadow-lg"
      >
        💚 Découvrir cette association
      </Link>
    </motion.div>
  );
};
