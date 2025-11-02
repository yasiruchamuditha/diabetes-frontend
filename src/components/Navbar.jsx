// // src/components/Navbar.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { logoutUser, isAuthenticated } from "../utils/auth";

// const Navbar = () => {
//   const navigate = useNavigate();

//   if (!isAuthenticated()) return null;

//   return (
//     <nav className="navbar">
//       <div className="navbar-inner">
//         <a className="nav-link" onClick={() => navigate("/home")}>
//           Home
//         </a>
//         <a className="nav-link" onClick={() => navigate("/user-trends")}>
//           user-trends
//         </a>
//           <a className="nav-link" onClick={() => navigate("/risk-trends")}>
//           Trends
//         </a>
//         <a className="nav-link" onClick={() => navigate("/results-history")}>
//           Results
//         </a>
//         <a className="nav-link" onClick={() => navigate("/learn")}>
//           Learn
//         </a>
//         <a className="nav-link" onClick={() => { logoutUser(); navigate("/login"); }}>
//           Logout
//         </a>
//       </div>
//     </nav>
//   );
// };

// // export default Navbar;
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { logoutUser, isAuthenticated } from "../utils/auth";

// const Navbar = () => {
//   const navigate = useNavigate();

//   if (!isAuthenticated()) return null;

//   return (
//     <nav className="navbar">
//       <div className="navbar-inner">
//         <Link className="nav-link" to="/home">Home</Link>
//         <Link className="nav-link" to="/user-trends">User Trends</Link>
//         <Link className="nav-link" to="/risk-trends">Trends</Link>
//         <Link className="nav-link" to="/results-history">Results</Link>
//         <Link className="nav-link" to="/learn">Learn</Link>
//         <button
//           className="nav-link text-red-600"
//           onClick={() => {
//             logoutUser();
//             navigate("/login");
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, isAuthenticated } from "../utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();

  if (!isAuthenticated()) return null;

  return (
      <nav
      className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm border-bottom py-2 "
      style={{ marginTop: "110px" }} // ✅ Added margin top
    >
      <div className="container-fluid px-4">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/home">
          DiaCare
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-lg-3">
            <li className="nav-item">
              <Link className="nav-link fw-medium text-dark" to="/home">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-medium text-dark" to="/user-trends">
                User Trends
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-medium text-dark" to="/risk-trends">
                Trends
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-medium text-dark" to="/results-history">
                Results
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-medium text-dark" to="/learn">
                Learn
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-outline-danger btn-sm px-3 ms-lg-3"
                onClick={() => {
                  logoutUser();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
