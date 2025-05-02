"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // icônes (via lucide-react)
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";




const themes = [
  { name: "Écologie", slug: "Écologie" },
  { name: "Solidarité", slug: "Solidarité" },
  { name: "Éducation", slug: "Éducation" },
  { name: "Santé", slug: "sante" },
  { name: "Culture", slug: "culture" },
  { name: "Inclusion", slug: "inclusion" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();


  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          SolidariGo
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/associations"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith("/associations") ? "text-green-700" : "text-gray-600"
            } hover:underline`}
          >
            Associations
          </Link>

          {/* Dropdown Thématiques */}
          <div className="relative group">
  <div className="text-sm font-medium text-gray-600 hover:underline cursor-pointer">
    Thématiques
  </div>
  <div className="absolute left-0 top-full bg-white shadow rounded hidden group-hover:block z-10 py-2">
    {themes.map((theme) => (
      <Link
        key={theme.slug}
        href={`/associations/${theme.slug}`}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        {theme.name}
      </Link>
    ))}
  </div>
</div>


          <Link
            href="/boutique"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith("/boutique") ? "text-green-700" : "text-gray-600"
            } hover:underline`}
          >
            Boutique
          </Link>

          <Link
            href="/#temoignages"
            className="text-sm font-medium text-gray-600 hover:underline"
          >
            Témoignages
          </Link>

 {/* Zone utilisateur */}
 <div className="ml-auto flex items-center gap-4">
            {session ? (
              <UserMenu />
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
        </div>

        {/* Menu mobile hamburger */}
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <Link href="/associations" className="block py-2 text-gray-700">
            Associations
          </Link>
          <div className="py-2">
            <span className="block text-sm font-medium text-gray-600">Thématiques</span>
            {themes.map((theme) => (
              <Link
                key={theme.slug}
                href={`/associations/${theme.slug}`}
                className="block pl-4 py-1 text-gray-700 hover:bg-gray-100 rounded"
              >
                {theme.name}
              </Link>
            ))}
          </div>
          <Link href="/boutique" className="block py-2 text-gray-700">
            Boutique
          </Link>
          <Link href="/#temoignages" className="block py-2 text-gray-700">
            Témoignages
          </Link>
          {!session && (
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/login" className="text-sm border px-3 py-1 rounded text-center">
                Se connecter
              </Link>
              <Link
                href="/register"
                className="text-sm bg-green-600 text-white px-3 py-1 rounded text-center"
              >
                Créer un compte
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
