import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

export default function Navbar() {
  const { authUser, isLoading, logout } = useAuthUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isAuthScreen = pathname === "/login" || pathname === "/register";

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold">Stream Chat+Video</Link>

        {!isAuthScreen && (
          <div className="flex items-center gap-3">
            {isLoading ? (
              <span className="text-sm opacity-70">Loading...</span>
            ) : authUser ? (
              <>
                <span className="text-sm">Hello, {authUser.fullName}</span>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 border rounded hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1.5 border rounded">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-1.5 border rounded">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
