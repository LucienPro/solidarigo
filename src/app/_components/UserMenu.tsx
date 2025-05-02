"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function UserMenu() {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/"; // ou router.push("/") avec useRouter si tu veux
  };

  if (isPending) return null;

  const user = session?.user;

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <span className="text-sm text-gray-700">Bienvenue {user.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Se déconnecter
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="text-sm px-3 py-1 border border-green-600 rounded hover:bg-green-50"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Créer un compte
          </Link>
        </>
      )}
    </div>
  );
}
