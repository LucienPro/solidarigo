"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";

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
  const [showCart, setShowCart] = useState(false);
  const [cartTimeout, setCartTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { cart, total } = useCart();

  const handleCartEnter = () => {
    if (cartTimeout) {
      clearTimeout(cartTimeout);
      setCartTimeout(null);
    }
    setShowCart(true);
  };
  
  const handleCartLeave = () => {
    const timeout = setTimeout(() => {
      setShowCart(false);
    }, 200);
    setCartTimeout(timeout);
  };
  

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">
          SolidariGo
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/associations"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith("/associations") ? "text-green-700" : "text-gray-600"
            } hover:underline`}
          >
            Associations
          </Link>

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

          {/* Zone utilisateur + Panier */}
          <div className="ml-auto flex items-center gap-6 relative">
            {/* 🛒 Panier avec hover */}
            <div
  className="relative"
  onMouseEnter={handleCartEnter}
  onMouseLeave={handleCartLeave}
>

              <button>
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </button>

              {showCart && (
                <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-lg p-4 z-50 animate-fade-in">
                  <h3 className="text-sm font-bold mb-2">🛒 Panier</h3>
                  {cart.length === 0 ? (
                    <p className="text-sm text-gray-500">Votre panier est vide.</p>
                  ) : (
                    <>
                      <ul className="space-y-2 max-h-40 overflow-y-auto">
                        {cart.map((item) => (
                          <li key={item.priceId} className="text-sm text-black flex justify-between">
                            <span>{item.name} × {item.quantity}</span>
                            <span>{((item.price * item.quantity) / 100).toFixed(2)} €</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 border-t pt-2 text-sm flex justify-between font-semibold text-black">
                        <span>Total</span>
                        <span>{(total / 100).toFixed(2)} €</span>
                      </div>
                      <div className="mt-4 text-right">
                        <Link
                          href="/panier"
                          className="inline-block px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                          Voir le panier
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 👤 Espace utilisateur */}
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
