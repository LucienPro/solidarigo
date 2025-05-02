"use client";

import Image from "next/image";
import Link from "next/link";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
export type Association = RouterOutputs["association"]["getAll"][number];

type Props = {
  association: Association;
};

export const AssociationCard = ({ association }: Props) => {
  return (
    <Link
      href={`/associations/detailedAssociation/${association.id}`}
      className="bg-white rounded-lg shadow-md border p-6 flex flex-col justify-between h-full hover:shadow-lg transition-shadow"
    >
      {association.logoUrl ? (
        <Image
          src={association.logoUrl}
          alt={association.name}
          width={400}
          height={250}
          className="rounded-lg object-contain w-full h-64 mb-6"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500 text-sm">
          Aucun logo
        </div>
      )}
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-black mb-2">
          {association.name}
        </h3>
        <p className="text-gray-700 mb-2">{association.description}</p>
        <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
        {association.category}
        </span>
      </div>
    </Link>
  );
};
