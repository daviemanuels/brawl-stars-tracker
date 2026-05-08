"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlayersPage() {
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  function handleSearch() {
    const cleanTag = tag.replace("#", "").trim();

    if (!cleanTag) return;

    setLoading(true);
    setError(null);

    try {
      router.push(`/players/${cleanTag}`);
    } catch {
      setError("Erro ao buscar player");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Buscar Player</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="#ABC123"
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Buscando..." : "Buscar Player"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
