"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    mutate: subscribe,
    isPending,
    isError,
    error,
  } = api.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe({ email });
  };

  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2 text-black">📬 Restez informé</h2>
      <p className="text-gray-600 mb-6">Inscrivez-vous à notre newsletter pour suivre nos actions !</p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <input
          type="email"
          placeholder="Votre adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full sm:w-auto px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded"
        >
          {isPending ? "Inscription..." : "Je m'inscris"}
        </button>
      </form>

      {success && (
        <p className="text-green-600 mt-4">✅ Merci pour votre inscription !</p>
      )}
      {isError && (
        <p className="text-red-500 mt-4">❌ Erreur : {error?.message}</p>
      )}
    </div>
  );
};
