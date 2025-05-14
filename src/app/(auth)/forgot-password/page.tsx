'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('idle');
    setError(null);

    try {
      await authClient.forgetPassword({
        email,
        redirectTo: 'http://localhost:3000/reset-password', // change si besoin en prod
      });

      setStatus('success');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erreur inconnue.';
      setError(message ?? 'Erreur inconnue.');
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-md bg-gray-100 p-6 rounded-2xl shadow-lg">
        <h1 className="text-xl font-semibold text-center mb-4">Mot de passe oublié</h1>

        {status === 'success' ? (
          <p className="text-green-700 text-center">
            📬 Un lien de réinitialisation t’a été envoyé !
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Ton email"
              className="p-3 rounded-xl border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
            >
              Envoyer le lien
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
