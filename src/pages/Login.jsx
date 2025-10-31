// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { loginUser } from "../services/api";
import { setAuthData, clearAuth } from "../utils/auth";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault?.();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser({ email, password });

      if (res?.success) {
        // store token + user
        try {
          setAuthData(res.user, res.token);
        } catch (err) {
          // graceful fallback
          console.warn("setAuthData failed:", err);
        }
        onLogin?.(res.user);
        navigate("/home"); // go to home/dashboard after login
      } else {
        setError(res?.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      clearAuth();
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar user={null} /> */}
      <Header />
      <main className="container py-8">
        <div className="page-card max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-2">🔐 Login</h2>
          <p className="text-sm text-gray-600 mb-4">Sign in to begin your health assessment.</p>

          <form onSubmit={handleLogin} aria-labelledby="login-form">
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                aria-required="true"
                minLength={6}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "⏳ Signing in..." : "Sign in"}
              </button>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => navigate("/register")}
                aria-label="Register"
              >
                Create account
              </button>
            </div>

            {error && <p className="text-danger mt-3" role="alert">{error}</p>}
          </form>

          <div className="mt-6 text-sm text-gray-600">
            <p>
              By signing in you agree to the terms. If you forgot your password, contact support.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
