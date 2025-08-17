// import { createContext, useEffect, useState, useMemo } from "react";
// import { getMe, logout as apiLogout } from "../lib/api";
// import { useQuery } from "@tanstack/react-query";

// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [authUser, setAuthUser] = useState(null);

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["me"],
//     queryFn: getMe,
//     retry: false,
//   });

//   useEffect(() => {
//     if (data) setAuthUser(data);
//   }, [data]);

//   const logout = async () => {
//     await apiLogout();
//     setAuthUser(null);
//     await refetch(); // ensures hooks re-evaluate
//   };

//   const value = useMemo(
//     () => ({ authUser, setAuthUser, isLoading, refetchMe: refetch, logout }),
//     [authUser, isLoading, refetch]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }
// src/context/AuthContext.jsx
import { createContext, useEffect, useState, useMemo } from "react";
import { getMe, logout as apiLogout } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(() => {
    // restore user from localStorage if available
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  // when API confirms user, update state + localStorage
  useEffect(() => {
    if (data) {
      setAuthUser(data);
      localStorage.setItem("authUser", JSON.stringify(data));
    }
  }, [data]);

  // keep localStorage in sync if authUser changes manually
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);

  const logout = async () => {
    await apiLogout();
    setAuthUser(null);
    localStorage.removeItem("authUser");
    await refetch(); // ensures hooks re-evaluate
  };

  const value = useMemo(
    () => ({ authUser, setAuthUser, isLoading, refetchMe: refetch, logout }),
    [authUser, isLoading, refetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
