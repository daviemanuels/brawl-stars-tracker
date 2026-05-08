import { useEffect, useState } from "react";
import { getPlayer } from "@/services/players";

function normalizeTag(tag: string) {
  return tag.replace("#", "").trim();
}

export function usePlayer(tag: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!tag) return;

    const cleanTag = normalizeTag(tag);

    getPlayer(cleanTag).then(setData);
  }, [tag]);

  return { data };
}
