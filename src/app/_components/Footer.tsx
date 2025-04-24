"use client";

import Link from "next/link";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Bloc 1 : Logo + mission */}
        <div>
          <h3 className="text-xl font-bold mb-3">🌱 SolidariGo</h3>
          <p className="text-gray-400">
            La plateforme qui connecte citoyens et associations pour un monde plus solidaire.
          </p>
        </div>

        {/* Bloc 2 : Liens utiles */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Navigation</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="#themes" className="hover:underline">Thématiques</Link></li>
            <li><Link href="#boutique" className="hover:underline">Boutique solidaire</Link></li>
            <li><Link href="#how-it-works" className="hover:underline">Comment ça marche</Link></li>
            <li><Link href="#newsletter" className="hover:underline">Newsletter</Link></li>
          </ul>
        </div>

        {/* Bloc 3 : Réseaux sociaux */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Suivez-nous</h4>
          <div className="flex gap-4 text-2xl text-gray-300">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="hover:text-pink-500 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="hover:text-blue-400 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="hover:text-blue-500 transition" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} SolidariGo. Tous droits réservés.
      </div>
    </footer>
  );
};
