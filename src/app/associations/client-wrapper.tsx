"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const AssociationListWithFilter = dynamic(
  () => import("@/app/_components/AssociationListWithFilter"),
  { ssr: false }
);

export default function AssociationListWithFilterClient() {
  return (
    <Suspense fallback={<p className="text-center">Chargement des associations...</p>}>
      <AssociationListWithFilter />
    </Suspense>
  );
}
