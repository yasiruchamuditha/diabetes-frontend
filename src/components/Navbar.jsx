// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, isAuthenticated } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();

  if (!isAuthenticated()) return null;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a className="nav-link" onClick={() => navigate("/home")}>
          Home
        </a>
        <a className="nav-link" onClick={() => navigate("/user-trends")}>
          user-trends
        </a>
          <a className="nav-link" onClick={() => navigate("/risk-trends")}>
          Trends
        </a>
        <a className="nav-link" onClick={() => navigate("/results-history")}>
          Results
        </a>
        <a className="nav-link" onClick={() => navigate("/dashboard/rules")}>
          Rules
        </a>
        <a className="nav-link" onClick={() => { logoutUser(); navigate("/login"); }}>
          Logout
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
