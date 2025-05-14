"use client";

import { useState } from "react";
import { api } from "@/utils/api";
import { authClient } from "@/lib/auth-client";
import Image from "next/image"; // ✅ Import du composant Image

export default function ProfilPage() {
  const { data: session, isPending } = authClient.useSession();
  const { data: orders = [], isLoading } = api.order.getAllByUser.useQuery();
  const [newName, setNewName] = useState(session?.user?.name ?? "");
  const utils = api.useUtils();

  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: () => {
      void utils.invalidate();
      alert("Profil mis à jour !");
    },
  });

  if (isPending) {
    return <p className="text-center text-gray-500 mt-8">Chargement...</p>;
  }

  if (!session?.user) {
    return (
      <p className="text-center text-red-500 mt-8">
        Vous devez être connecté(e) pour accéder à votre profil.
      </p>
    );
  }

  const { name, email, image } = session.user;

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-black space-y-10">
      <h1 className="text-3xl font-bold text-center">👤 Mon profil</h1>

      {/* 🧾 Infos utilisateur */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center gap-6">
        {image && (
          <Image
            src={image}
            alt={name ?? "Utilisateur"}
            width={80}
            height={80}
            className="rounded-full object-cover border"
          />
        )}
        <div>
          <p className="text-xl font-semibold">{name ?? "Nom non renseigné"}</p>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>

      {/* ✏️ Mise à jour du nom */}
      <div>
        <h2 className="text-xl font-semibold mb-4">✏️ Modifier mon nom</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile.mutate({ name: newName });
          }}
          className="space-y-4 max-w-sm"
        >
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Enregistrer
          </button>
        </form>
      </div>

      {/* 🧾 Historique des commandes */}
      <div>
        <h2 className="text-xl font-semibold mb-4">🧾 Mes commandes</h2>
        {isLoading ? (
          <p>Chargement des commandes...</p>
        ) : sortedOrders.length === 0 ? (
          <p className="text-gray-500">Aucune commande trouvée.</p>
        ) : (
          <ul className="space-y-4">
            {sortedOrders.map((order) => (
              <li
                key={order.id}
                className="border rounded-lg p-4 shadow-sm bg-white text-sm"
              >
                <p className="text-gray-700 font-medium">
                  🗓️ Passée le{" "}
                  {new Date(order.createdAt).toLocaleDateString("fr-FR")} • 💰{" "}
                  {(order.totalAmount / 100).toFixed(2)} €
                </p>
                {order.items.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-gray-600">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} × {item.quantity}{" "}
                        <span className="text-gray-400">
                          ({(item.unitPrice / 100).toFixed(2)} €)
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
