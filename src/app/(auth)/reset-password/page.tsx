'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError('Lien de réinitialisation invalide ou expiré.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const result = await authClient.resetPassword({
        token,
        newPassword: password,
      });

      if (result.error) throw new Error(result.error.message);

      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Une erreur est survenue.';
      console.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-6">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Réinitialisation du mot de passe
        </h1>

        {success ? (
          <div className="flex flex-col items-center justify-center gap-4 py-6">
            <div className="animate-ping-once">
              <svg
                className="w-16 h-16 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-700 font-semibold text-center">
              Ton mot de passe a bien été mis à jour 🎉
              <br />
              Redirection vers la connexion...
            </p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              className="p-3 rounded-xl border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              className="p-3 rounded-xl border"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
            >
              Réinitialiser
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
