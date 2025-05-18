"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

type SessionInfo = {
  email?: string;
  amount_total?: number;
  customer_name?: string;
};

export default function MerciClientContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<SessionInfo | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/stripe/session/${sessionId}`);
        const data = (await res.json()) as SessionInfo;
        setSessionData(data);
        if (typeof window !== "undefined") clearCart();
      } catch (err) {
        console.error("Erreur de récupération de la session :", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchSession();
  }, [sessionId, clearCart]);

  if (loading) {
    return <p className="text-center py-12 text-black">Chargement...</p>;
  }

  return (
    <div className="max-w-xl mx-auto text-center py-16 px-6 text-black">
      <h1 className="text-3xl font-bold mb-4">🎉 Merci pour votre soutien !</h1>
      <p className="mb-4">
        {sessionData?.customer_name
          ? `Merci ${sessionData.customer_name}, votre paiement a bien été reçu.`
          : "Votre paiement a bien été reçu."}
      </p>

      {sessionData?.amount_total && (
        <p className="text-green-700 font-semibold mb-4">
          Montant total : {(sessionData.amount_total / 100).toFixed(2)} €
        </p>
      )}

      {sessionData?.email && (
        <p className="text-gray-600 text-sm">
          Un reçu a été envoyé à {sessionData.email}
        </p>
      )}

      <Link
        href="/"
        className="mt-6 inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
