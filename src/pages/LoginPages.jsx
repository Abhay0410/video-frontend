import { useState } from "react";
import { login } from "../lib/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuthUser, refetchMe } = useAuthUser();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form);
      setAuthUser(user);
      await refetchMe();
      toast.success("Logged in");
      navigate("/dashboard");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          disabled={loading}
          className="w-full px-3 py-2 border rounded hover:bg-gray-50"
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>

      <p className="mt-3 text-sm">
        New here?{" "}
        <Link to="/register" className="underline">Create account</Link>
      </p>
    </div>
  );
}
