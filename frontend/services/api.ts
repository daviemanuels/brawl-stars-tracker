import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000",
});

// 🔥 DEBUG GLOBAL
api.interceptors.request.use((config) => {
  const url = config.url || "";

  if (url === "/players/" || url.endsWith("/players/")) {
    console.error("❌ REQUEST VAZIO DETECTADO:", url);

    throw new Error("Blocked empty /players request");
  }

  console.log("🚀", config.method, url);

  return config;
});

api.interceptors.response.use(
  (res) => {
    console.log("✅ RESPONSE:", res.config.url);
    return res;
  },
  (err) => {
    console.log("❌ ERROR:", err.config?.url);
    return Promise.reject(err);
  },
);
