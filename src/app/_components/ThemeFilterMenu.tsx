"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const THEMES = [
  "Écologie",
  "Solidarité",
  "Éducation",
  "Santé",
  "Culture",
  "Inclusion",
];

type Props = {
  activeTheme: string | null;
  onSelectTheme: (theme: string | null) => void;
};

export const ThemeFilterMenu = ({ activeTheme, onSelectTheme }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterClick = (theme: string) => {
    const entries = Array.from(searchParams.entries());
    const newParams = new URLSearchParams(entries);

    if (theme === activeTheme) {
      onSelectTheme(null);
      newParams.delete("theme");
    } else {
      onSelectTheme(theme);
      newParams.set("theme", theme);
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {THEMES.map((theme) => (
        <button
          key={theme}
          onClick={() => handleFilterClick(theme)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
            activeTheme === theme
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-black border-gray-300 hover:bg-gray-100"
          }`}
          
        >
          {theme}
        </button>
      ))}
    </div>
  );
};
