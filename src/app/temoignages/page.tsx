// app/temoignages/page.tsx
"use client";

import { TestimonialCarouselWrapper } from "../_components/TestimonialCarouselWrapper";
import { TestimonialForm } from "../_components/TestimonialForm";

export default function TemoignagesPage() {
  return (
    <main className="px-6 py-12 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-4 text-center">Témoignages</h1>
      <p className="text-center text-gray-600 mb-10">
        Découvrez ce que nos utilisateurs pensent de SolidariGo 💚
      </p>

      <TestimonialCarouselWrapper />

      <div className="mt-16">
        <TestimonialForm />
      </div>
    </main>
  );
}
