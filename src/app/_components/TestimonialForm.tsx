"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";

export const TestimonialForm = () => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const utils = api.useUtils();

  const testimonialMutation = api.testimonial.create.useMutation({
    onSuccess: () => {
      toast.success("Merci pour ton témoignage 💚");
      setAuthor("");
      setMessage("");
      void utils.testimonial.getAll.invalidate();
    },
    onError: () => {
      toast.error("Erreur lors de l'envoi du témoignage.");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void testimonialMutation.mutate({ author, message });
      }}
      className="bg-gray-50 p-6 rounded-xl shadow-md max-w-xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">💬 Laisser un témoignage</h2>

      <input
        type="text"
        placeholder="Ton prénom"
        className="w-full p-3 border border-gray-300 rounded mb-4"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <textarea
        placeholder="Ton message"
        className="w-full p-3 border border-gray-300 rounded mb-4"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={testimonialMutation.isPending}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
      >
        {testimonialMutation.isPending ? "Envoi en cours..." : "Envoyer"}
      </button>
    </form>
  );
};
