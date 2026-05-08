import { useEffect, useState } from "react";
import { getPlayerBattles } from "@/services/battles";

export function useBattles(tag: string, page: number) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!tag) return;
    getPlayerBattles(tag, page).then(setData);
  }, [tag, page]);

  return { data };
}
