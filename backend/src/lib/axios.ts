import axios from "axios";

export const brawlApi = axios.create({
  baseURL: process.env.BRAWL_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.BRAWL_API_KEY}`,
  },
});
