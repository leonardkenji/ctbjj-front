import axios from "axios";

const STORAGE_KEY = "ctbjj.auth";

export const api = axios.create({
  baseURL: "",
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const parsed = JSON.parse(raw) as { token?: string };
    if (parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }
  return config;
});

let onUnauthorized: (() => void) | undefined;

export function registerUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEY);
      onUnauthorized?.();
    }
    return Promise.reject(error);
  },
);

export { STORAGE_KEY };
