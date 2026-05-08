"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import type { BattlesResponse } from "@/app/types/battle";

export default function BattlesPage({ params }: { params: { tag: string } }) {
  const [data, setData] = useState<BattlesResponse | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!params?.tag) return;

    const cleanTag = params.tag.replace("#", "").trim();

    api.get(`/players/${cleanTag}/battles?page=${page}`).then((res) => {
      setData(res.data);
    });
  }, [params.tag, page]);

  if (!data) {
    return <div className="p-6 text-gray-500">Carregando battles...</div>;
  }

  const { pagination } = data;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Battles</h1>

      {/* TOTAL INFO */}
      <div className="bg-white p-4 rounded-xl shadow flex justify-between">
        <p className="text-sm text-gray-500">
          Total de battles:{" "}
          <span className="font-semibold text-black">{pagination.total}</span>
        </p>

        <p className="text-sm text-gray-500">
          Página {pagination.page} de {pagination.totalPages}
        </p>
      </div>

      {/* LISTA */}
      {data.battles.map((b) => (
        <div key={b.id} className="bg-white p-4 rounded-xl shadow">
          <p className="font-semibold">{b.mode}</p>
          <p className="text-sm text-gray-500">{b.result}</p>
        </div>
      ))}

      {/* PAGINAÇÃO */}
      <div className="flex gap-2 justify-center pt-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={pagination.page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={pagination.page === pagination.totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
