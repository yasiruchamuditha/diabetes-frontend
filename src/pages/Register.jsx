//src/pages/Register.jsx

import React, { useState } from "react";
import { registerUser } from "../services/api";

const Register = ({ onRegister }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await registerUser(form);
      if (res.success) {
        setMsg("✅ Registered successfully! Redirecting to login...");
        setError("");
        setTimeout(onRegister, 1500);
      } else {
        setError(res.error || "Registration failed.");
      }
    } catch (err) {
      setError("Server connection error.");
    }
  };

  return (
    <div className="page-card">
      <h2>🧾 Register</h2>
      <div className="form-group">
        <label>Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your full name"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="example@gmail.com"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Choose a secure password"
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-primary">
        Register
      </button>

      {msg && <p className="text-success">{msg}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Register;
