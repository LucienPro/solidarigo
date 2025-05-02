// 'use client';

// import { useState } from 'react';
// import { authClient } from '@/lib/auth-client';
// import { useRouter } from 'next/navigation';

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       if (isLogin) {
//         const res = await authClient.signIn.email({ email, password });
//         if (res.error) throw new Error(res.error.message);
//       } else {
//         const res = await authClient.signUp.email({ email, password, name: email?.split('@')[0] ?? "user"
//         });
//         if (res.error) throw new Error(res.error.message);
//       }

//       router.push('/'); // Redirection après login
//     } catch (err: any) {
//       console.error("Erreur Better Auth :", err);
//       setError(err?.message || JSON.stringify(err) || 'Erreur inconnue');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
//       <div className="w-full max-w-md p-6 bg-gray-100 rounded-2xl shadow-lg">
//         <h1 className="text-xl font-semibold mb-4 text-center">
//           {isLogin ? 'Connexion' : 'Inscription'}
//         </h1>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="p-3 rounded-xl border"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Mot de passe"
//             className="p-3 rounded-xl border"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
//           >
//             {isLogin ? 'Se connecter' : 'Créer un compte'}
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{' '}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-blue-600 hover:underline"
//           >
//             {isLogin ? "S'inscrire" : 'Se connecter'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await authClient.signIn.email({ email, password });
      if (res.error) throw new Error(res.error.message);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-2xl shadow-lg">
        <h1 className="text-xl font-semibold mb-4 text-center">Connexion</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-xl border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <div className="text-right text-sm">
          <div className="text-right text-sm">
  <a href="/forgot-password" className="text-blue-600 hover:underline">
    Mot de passe oublié ?
  </a>
</div>

</div>

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            S’inscrire
          </a>
        </div>
      </div>
    </div>
  );
}
