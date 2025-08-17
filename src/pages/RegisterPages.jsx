import { useState } from "react";
import { register } from "../lib/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthUser();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(form);
      setAuthUser(user);
      toast.success("Registered");
      navigate("/dashboard");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Full name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />
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
          {loading ? "Please wait..." : "Create account"}
        </button>
      </form>

      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline">Login</Link>
      </p>
    </div>
  );
}
