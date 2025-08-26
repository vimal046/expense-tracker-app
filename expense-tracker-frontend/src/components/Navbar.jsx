import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const getDisplayNameFromToken = (jwt) => {
    if (!jwt) return "";
    try {
      const parts = jwt.split(".");
      if (parts.length < 2) return "";
      const payload = JSON.parse(atob(parts[1]));
      return (
        payload.name ||
        payload.username ||
        payload.preferred_username ||
        payload.email ||
        payload.sub ||
        "User"
      );
    } catch (_) {
      return "User";
    }
  };

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-xl font-semibold text-gray-900 dark:text-gray-100"
        >
          Expense Tracker
        </Link>
        <div className="space-x-3 flex items-center">
          {token && !isAuthPage && (
            <span className="text-gray-700 dark:text-gray-300">
              Hi, {getDisplayNameFromToken(token)}
            </span>
          )}
          <button
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            className="px-3 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            title="Toggle theme"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          {token && !isAuthPage ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
