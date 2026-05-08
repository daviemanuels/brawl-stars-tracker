"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PlayerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tag: string };
}) {
  const pathname = usePathname();

  const base = `/players/${params.tag}`;

  const isActive = (path: string) => pathname === path;

  return (
    <div className="space-y-6">
      {/* NAV GLOBAL DO PLAYER */}
      <div className="flex gap-2 mt-4">
        <Link
          href={base}
          className={`px-4 py-2 rounded ${
            isActive(base) ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Player
        </Link>

        <Link
          href={`${base}/battles`}
          className={`px-4 py-2 rounded ${
            isActive(`${base}/battles`) ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Battles
        </Link>

        <Link
          href={`${base}/analytics`}
          className={`px-4 py-2 rounded ${
            isActive(`${base}/analytics`)
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          Analytics
        </Link>
      </div>

      {/* CONTEÚDO DA PÁGINA */}
      {children}
    </div>
  );
}
