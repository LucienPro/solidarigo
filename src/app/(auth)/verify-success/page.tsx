'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifySuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/login');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="max-w-md bg-green-50 p-6 rounded-2xl shadow text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Email vérifié ✅</h1>
        <p className="text-gray-700 mb-4">
          Ton adresse email a bien été vérifiée. Tu peux maintenant te connecter à ton compte.
        </p>
        <p className="text-sm text-gray-500">Redirection automatique dans 4 secondes...</p>
      </div>
    </div>
  );
}
