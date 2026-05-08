import { api } from "./api";

export const getPlayerBattles = async (tag: string, page = 1, limit = 20) => {
  const res = await api.get(`/players/${tag}/battles`, {
    params: { page, limit },
  });

  return res.data;
};
