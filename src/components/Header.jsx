// src/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <header className="full-header">
      <div className="header-inner">
        <div>
          <h1 className="header-title">🏥 DiaCare</h1>
          <p className="header-subtitle">
            AI-Powered Diabetes Prediction & Health Insights
          </p>
        </div>
        <button
          className="header-btn"
          onClick={() => (window.location.href = "/home")}
        >
          Dashboard
        </button>
      </div>
    </header>
  );
};

export default Header;
