"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import Link from "next/link";
import { Player } from "@/app/types/player";
import { usePathname } from "next/navigation";

export default function PlayerPage({ params }: { params: { tag: string } }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (!params?.tag) return;

    const cleanTag = params.tag.replace("#", "").trim();

    async function load() {
      setLoading(true);

      const res = await api.get(`/players/${cleanTag}`);
      setPlayer(res.data);

      setLoading(false);
    }

    load();
  }, [params.tag]);

  if (loading) {
    return <div className="p-6 text-gray-500">Carregando player...</div>;
  }

  if (!player) {
    return <div className="p-6 text-red-500">Player não encontrado</div>;
  }

  const isActive = (path: string) => pathname === path;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold">{player.name}</h1>
        <p className="text-gray-500">{player.tag}</p>
      </div>

      {/* STATS BASE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Troféus" value={player.trophies} />
        <Stat label="Highest" value={player.highestTrophies} />
        <Stat label="Level" value={player.expLevel} />
        <Stat label="3v3 Wins" value={player.totalVictories3v3} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Stat label="Solo" value={player.soloVictories} />
        <Stat label="Duo" value={player.duoVictories} />
      </div>

      {/* CLUB */}
      {player.clubName && (
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">Club</p>
          <p className="font-semibold">
            {player.clubName}{" "}
            <span className="text-gray-400">{player.clubTag}</span>
          </p>
        </div>
      )}
    </div>
  );
}

type StatProps = {
  label: string;
  value: number | string | null | undefined;
};

function Stat({ label, value }: StatProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold">{value ?? 0}</p>
    </div>
  );
}
