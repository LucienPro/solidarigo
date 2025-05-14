'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await authClient.signUp.email({
        email,
        password,
        name: `${firstName} ${lastName}`,
      });

      if (res.error) {
        console.error("Erreur signup:", res.error.message);
        throw new Error(res.error.message);
      }

      alert("📬 Un email de vérification t’a été envoyé.");
      void router.push('/login');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erreur inconnue';
      console.error("Erreur côté client :", err);
      setError(message ?? 'Erreur inconnue');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-2xl shadow-lg">
        <h1 className="text-xl font-semibold mb-4 text-center">Créer un compte</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-xl border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Prénom"
            className="p-3 rounded-xl border"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nom"
            className="p-3 rounded-xl border"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="p-3 rounded-xl border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
          >
            Créer un compte
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Déjà inscrit ?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Se connecter
          </a>
        </div>
      </div>
    </div>
  );
}
