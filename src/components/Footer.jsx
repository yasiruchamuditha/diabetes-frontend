// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="full-footer">
      <div className="footer-inner">
        <div className="footer-left">
          © {new Date().getFullYear()} <strong>DiaCare</strong> | Empowering Youth with AI Health
        </div>
        <div className="footer-links">
           <strong>Yasiru</strong> | Built with ❤️
        </div>
      </div>
    </footer>
  );
};

export default Footer;
