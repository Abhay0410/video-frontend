import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000",
  withCredentials: true, // send/receive HttpOnly cookie
});

// ---------- AUTH ----------
export const register = async (payload) => {
  const { data } = await api.post("/api/auth/register", payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await api.post("/api/auth/login", payload);
  return data;
};

export const logout = async () => {
  // if your backend has a /logout, call it. Otherwise clear cookie server-side as you prefer.
  try { await api.post("/api/auth/logout"); } catch {}
  return true;
};

export const getMe = async () => {
  const { data } = await api.get("/api/auth/me");
  return data;
};

// ---------- USERS ----------
export const listUsers = async () => {
  const { data } = await api.get("/api/users");
  return data;
};

// ---------- STREAM ----------
export const getStreamToken = async () => {
  const { data } = await api.get("/api/stream/token");
  return data; // { token }
};

export default api;
