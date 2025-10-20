import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { setAuthData, clearAuth } from "../utils/auth";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginUser({ email, password });

      if (res.success) {
        setAuthData(res.user, res.token); // ✅ store safely
        onLogin(res.user);
        navigate("/form/demographics"); // ✅ redirect to form start
      } else {
        setError(res.error || "Invalid credentials");
      }
    } catch (err) {
      clearAuth();
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-card">
      <h2>🔐 Login</h2>
      <p className="subtitle">Sign in to begin your health assessment.</p>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      <button onClick={handleLogin} className="btn btn-primary" disabled={loading}>
        {loading ? "⏳ Logging in..." : "Login"}
      </button>

      {error && <p className="text-danger">{error}</p>}

      <div className="register-link">
        <p>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer", color: "#667eea", fontWeight: 600 }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
