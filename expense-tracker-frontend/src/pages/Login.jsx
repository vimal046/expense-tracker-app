import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const { token } = res.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data || "Login failed";
      setError(typeof msg === "string" ? msg : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded p-6 mt-10 dark:bg-gray-900">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          required
          className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="mt-4 text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
