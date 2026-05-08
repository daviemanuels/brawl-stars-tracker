"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import type { PlayerAnalytics } from "@/app/types/analytics";

export default function AnalyticsPage({ params }: { params: { tag: string } }) {
  const [data, setData] = useState<PlayerAnalytics | null>(null);

  useEffect(() => {
    if (!params?.tag) return;

    const cleanTag = params.tag.replace("#", "").trim();

    api.get(`/players/${cleanTag}/analytics`).then((res) => {
      setData(res.data);
    });
  }, [params.tag]);

  if (!data) return <div className="p-6">Carregando analytics...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Analytics</h1>

      <pre className="bg-white p-4 rounded-xl shadow overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
