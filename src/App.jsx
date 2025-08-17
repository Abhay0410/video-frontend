import { AuthProvider } from "./context/AuthContext.jsx";
import Router from "./router.jsx";
import "./index.css";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
