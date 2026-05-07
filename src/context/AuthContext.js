"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("auth");

    if (stored) {
      setUser(JSON.parse(stored));
    }

    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    const authData = await loginUser(email, password);

    localStorage.setItem("auth", JSON.stringify(authData));
    setUser(authData);

    router.push(
      authData.role === "teacher" ? "/dashboard/teacher" : "/dashboard/principal",
    );
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
