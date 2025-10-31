// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { registerUser } from "../services/api";

const Register = ({ onRegister }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setMsg("");
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please complete all fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser(form);
      if (res?.success) {
        setMsg("✅ Registered successfully! Redirecting to login...");
        setTimeout(() => {
          onRegister?.();
          navigate("/login");
        }, 1200);
      } else {
        setError(res?.error || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar user={null} />
      <Header />
      <main className="container py-8">
        <div className="page-card max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-2">🧾 Create an Account</h2>
          <p className="text-sm text-gray-600 mb-4">Sign up to save your results and receive personalized insights.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Choose a secure password (6+ chars)"
                required
                minLength={6}
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "⏳ Creating account..." : "Create account"}
              </button>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => navigate("/login")}
              >
                Back to login
              </button>
            </div>

            {msg && <p className="text-success mt-3" role="status">{msg}</p>}
            {error && <p className="text-danger mt-3" role="alert">{error}</p>}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
