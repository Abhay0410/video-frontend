import { createContext, useEffect, useState, useMemo } from "react";
import { getMe, logout as apiLogout } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  useEffect(() => {
    if (data) setAuthUser(data);
  }, [data]);

  const logout = async () => {
    await apiLogout();
    setAuthUser(null);
    await refetch(); // ensures hooks re-evaluate
  };

  const value = useMemo(
    () => ({ authUser, setAuthUser, isLoading, refetchMe: refetch, logout }),
    [authUser, isLoading, refetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
