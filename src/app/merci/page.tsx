import { Suspense } from "react";
import MerciClientContent from "@/app/_components/MerciClientContent";

export default function MerciPage() {
  return (
    <Suspense fallback={<p className="text-center py-12 text-black">Chargement...</p>}>
      <MerciClientContent />
    </Suspense>
  );
}
