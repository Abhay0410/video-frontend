import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function useAuthUser() {
  const ctx = useContext(AuthContext);
  return ctx;
}
