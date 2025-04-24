"use client";

import Link from "next/link";

export const HeroSection = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("after-hero");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center text-white animate-gradient-x">
      <div className="text-center px-6 max-w-4xl flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          🌍 Rejoignez le mouvement solidaire
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl">
          Découvrez des associations engagées, soutenez des causes qui vous tiennent à cœur,
          et faites la différence dès aujourd’hui.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link
            href="/associations"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow transition"
          >
            Explorer les associations
          </Link>
          <Link
            href="#boutique"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow transition"
          >
            Faire un don
          </Link>
        </div>
      </div>

      <button
        onClick={scrollToNextSection}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-2xl text-gray-600"
        aria-label="Scroll vers la suite"
      >
        ⬇️
      </button>
    </section>
  );
};
