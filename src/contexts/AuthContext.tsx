import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { registerUnauthorizedHandler, STORAGE_KEY } from "../api/api";
import { authApi } from "../api/resources";
import { AuthContext } from "./authContextInstance";
import type { AuthContextValue } from "./authContextInstance";
import type { AuthUser, LoginPayload, RegisterPayload } from "../types/models";

function readStoredUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  useEffect(() => {
    registerUnauthorizedHandler(() => {
      setUser(null);
      navigate("/login");
    });
  }, [navigate]);

  const persist = (nextUser: AuthUser | null) => {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user?.token),
      login: async (payload: LoginPayload) => {
        const response = await authApi.login(payload);
        persist(response);
        return response;
      },
      register: async (payload: RegisterPayload) => {
        const response = await authApi.register(payload);
        persist(response);
        return response;
      },
      logout: () => {
        persist(null);
        navigate("/login");
      },
    }),
    [navigate, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
