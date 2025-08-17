import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/LoginPages.jsx";
import RegisterPage from "./pages/RegisterPages.jsx";
import Dashboard from "./pages/DashBoard.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import PageLoader from "./components/PageLoader.jsx";

function Protected({ children }) {
  const { authUser, isLoading } = useAuthUser();
  if (isLoading) return <PageLoader />;
  if (!authUser) return <Navigate to="/login" replace />;
  return children;
}

export default function Router() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <Protected>
              <ChatPage />
            </Protected>
          }
        />
        <Route
          path="/call/:id"
          element={
            <Protected>
              <CallPage />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}
