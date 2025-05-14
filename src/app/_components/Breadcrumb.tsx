"use client";

import Link from "next/link";

type Props = {
  items: { label: string; href?: string }[];
};

export const Breadcrumb = ({ items }: Props) => {
  return (
    <nav className="text-sm text-gray-500 mb-6" aria-label="Fil d’Ariane">
      <ol className="list-none flex gap-2 flex-wrap">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1">
            {item.href ? (
              <Link
                href={item.href}
                className="hover:underline text-gray-600"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800 font-medium">{item.label}</span>
            )}

            {idx < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
