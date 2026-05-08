import { api } from "./api";

export const getPlayerAnalytics = async (tag: string) => {
  const res = await api.get(`/players/${tag}/analytics`);
  return res.data;
};
