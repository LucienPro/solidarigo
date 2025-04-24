"use client";

import Link from "next/link";

const THEMES = [
  { name: "Écologie", emoji: "🌿" },
  { name: "Solidarité", emoji: "🤝" },
  { name: "Éducation", emoji: "📚" },
  { name: "Santé", emoji: "🏥" },
  { name: "Culture", emoji: "🎭" },
  { name: "Inclusion", emoji: "🌍" },
];

export const ThemeList = () => {
  return (
    <section className="my-16 max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {THEMES.map((theme) => (
          <Link
            key={theme.name}
            href={`/associations/${encodeURIComponent(theme.name)}`}
            className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md hover:bg-gray-50 cursor-pointer transition"
          >
            <span className="text-3xl mb-2">{theme.emoji}</span>
            <p className="text-black font-medium text-center">{theme.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
