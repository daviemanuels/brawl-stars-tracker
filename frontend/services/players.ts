import { api } from "./api";

export const getPlayer = async (tag: string) => {
  const cleanTag = tag?.replace("#", "").trim();

  if (!cleanTag) {
    throw new Error("Tag inválida");
  }

  const res = await api.get(`/players/${cleanTag}`);
  return res.data;
};
