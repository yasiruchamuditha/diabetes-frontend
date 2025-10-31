// //src/App.js
// import React, { useState, useCallback, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import "./App.css";

// import {
//   getStoredUser,
//   logoutUser,
//   isAuthenticated,
//   getStoredToken,
//   clearAuth
// } from "./utils/auth";

// import DemographicsPage from "./pages/forms/DemographicsPage";
// import StressPage from "./pages/forms/StressPage";
// import LifestylePage from "./pages/forms/LifestylePage";
// import SymptomsPage from "./pages/forms/SymptomsPage";
// import MedicalHistoryPage from "./pages/forms/MedicalHistoryPage";
// import MedicalDataPage from "./pages/forms/MedicalDataPage";
 

// import ResultsPage from "./pages/ResultsPage";
// import UserTrendDashboard from "./pages/UserTrendDashboard";
// import GlobalInsights from "./pages/GlobalInsights";
// import HealthReportPage from "./pages/HealthReportPage";
// import RuleDashboard from "./pages/RuleDashboard"; 
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
// import ResultsHistoryPage from "./pages/ResultsHistoryPage";

// import { submitAssessment } from "./services/api";

// // ✅ Wrapper for protected routes
// const PrivateRoute = ({ children }) => {
//   return isAuthenticated() ? children : <Navigate to="/login" replace />;
// };

// const App = () => {
//   const [user, setUser] = useState(getStoredUser());
//   const [loading, setLoading] = useState(false);
//   const [initialized, setInitialized] = useState(false);
//   const [result, setResult] = useState(null);
//   const [allData, setAllData] = useState({
//     demographics: {},
//     stress: Array(10).fill(null),
//     lifestyle: {},
//     symptoms: {},
//     medicalHistory: {},
//     medicalData: {},
//   });

//   const navigate = useNavigate();

//   // ✅ Ensure valid auth before routing
//   useEffect(() => {
//     const token = getStoredToken();
//     if (!token) clearAuth();
//     setInitialized(true);
//   }, []);

//   const updateData = useCallback((section, data) => {
//     setAllData((prev) => ({ ...prev, [section]: data }));
//   }, []);

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const response = await submitAssessment(allData);
//       if (response.success) {
//         setResult(response.data);
//         navigate("/results");
//       } else {
//         alert(response.error || "Assessment failed");
//       }
//     } catch {
//       alert("Connection error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     logoutUser();
//     setUser(null);
//   };

//   // 🚀 Wait for auth check before rendering anything
//   if (!initialized) {
//     return (
//       <div className="app">
//         <div className="page-card">
//           <h2>Loading...</h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="app">
//       <div className="app-header">
//         <div className="container">
//           <h1>🏥 Diabetes Risk Assessment</h1>
//           <p>AI-Powered Screening for Sri Lankan Youth</p>
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="btn btn-outline"
//               style={{ float: "right" }}
//             >
//               🚪 Logout
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="container main-content">
//         <Routes>
//           {/* 🔐 Public Routes */}
//           <Route path="/login" element={<Login onLogin={setUser} />} />
//           <Route path="/register" element={<Register onRegister={() => navigate("/login")} />} />

//           {/* 🧠 Protected Routes */}
//                   <Route
//             path="/home"
//             element={
//               <PrivateRoute>
//                 <HomePage />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/results-history"
//             element={
//               <PrivateRoute>
//                 <ResultsHistoryPage />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/form/demographics"
//             element={
//               <PrivateRoute>
//                 <DemographicsPage data={allData.demographics} update={updateData} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/form/stress"
//             element={
//               <PrivateRoute>
//                 <StressPage data={allData.stress} update={updateData} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/form/lifestyle"
//             element={
//               <PrivateRoute>
//                 <LifestylePage data={allData.lifestyle} update={updateData} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/form/symptoms"
//             element={
//               <PrivateRoute>
//                 <SymptomsPage data={allData.symptoms} update={updateData} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/form/medical-history"
//             element={
//               <PrivateRoute>
//                 <MedicalHistoryPage data={allData.medicalHistory} update={updateData} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/form/medical-data"
//             element={
//               <PrivateRoute>
//                 <MedicalDataPage
//                   data={allData.medicalData}
//                   update={updateData}
//                   onSubmit={handleSubmit}
//                   loading={loading}
//                 />
//               </PrivateRoute>
//             }
//           />

//           {/* 📊 Results & Reports */}
//           <Route
//             path="/results"
//             element={
//               <PrivateRoute>
//                 <ResultsPage result={result} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/trends"
//             element={
//               <PrivateRoute>
//                 <UserTrendDashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/insights"
//             element={
//               <PrivateRoute>
//                 <GlobalInsights />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/report"
//             element={
//               <PrivateRoute>
//                 <HealthReportPage latestResult={result} />
//               </PrivateRoute>
//             }
//           />
//             <Route
//             path="/dashboard/rules"
//             element={<RuleDashboard />}
//           />

      

//           {/* 🏠 Default route */}
//           <Route
//             path="/"
//             element={
//               <Navigate
//                 to={isAuthenticated() ? "/form/demographics" : "/login"}
//                 replace
//               />
//             }
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// // ✅ Router wrapper (required for hooks)
// const AppWithRouter = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default AppWithRouter;
// ===============================================
// App.js — Main Routing for DiaCare Hybrid Expert System
// ===============================================

import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// === Auth Utilities ===
import {
  getStoredUser,
  logoutUser,
  isAuthenticated,
  getStoredToken,
  clearAuth,
} from "./utils/auth";

// === Form Pages ===
import DemographicsPage from "./pages/forms/DemographicsPage";
import StressPage from "./pages/forms/StressPage";
import LifestylePage from "./pages/forms/LifestylePage";
import SymptomsPage from "./pages/forms/SymptomsPage";
import MedicalHistoryPage from "./pages/forms/MedicalHistoryPage";
import MedicalDataPage from "./pages/forms/MedicalDataPage";

// === Analytical Pages ===
import ResultsPage from "./pages/ResultsPage";
import UserTrendDashboard from "./pages/UserTrendDashboard";
import GlobalInsights from "./pages/GlobalInsights";
import HealthReportPage from "./pages/HealthReportPage";
import RuleDashboard from "./pages/RuleDashboard";
import RiskTrends from "./pages/RiskTrends";

// === Auth Pages ===
import Login from "./pages/Login";
import Register from "./pages/Register";

// === New Dashboard Pages ===
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ResultsHistoryPage from "./pages/ResultsHistoryPage";

// === API Service ===
import { submitAssessment } from "./services/api";
import Header from "./components/Header";
import Footer from "./components/Footer";

// ===============================================
// Private Route Wrapper
// ===============================================
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// ===============================================
// Core Application Component
// ===============================================
const App = () => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [result, setResult] = useState(null);

  const [allData, setAllData] = useState({
    demographics: {},
    stress: Array(10).fill(null),
    lifestyle: {},
    symptoms: {},
    medicalHistory: {},
    medicalData: {},
  });

  const navigate = useNavigate();

  // === Check JWT on startup ===
  useEffect(() => {
    const token = getStoredToken();
    if (!token) clearAuth();
    setInitialized(true);
  }, []);

  // === Data Updater ===
  const updateData = useCallback((section, data) => {
    setAllData((prev) => ({ ...prev, [section]: data }));
  }, []);

  // === Submit full form ===
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await submitAssessment(allData);
      if (response.success) {
        setResult(response.data);
        navigate("/results");
      } else {
        alert(response.error || "Assessment failed");
      }
    } catch {
      alert("Connection error");
    } finally {
      setLoading(false);
    }
  };

  // === Logout Handler ===
  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/login");
  };

  // === Wait for Auth Initialization ===
  if (!initialized) {
    return (
      <div className="app flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Loading...</h2>
          <p className="text-sm text-gray-500">Initializing system...</p>
        </div>
      </div>
    );
  }

  // ===============================================
  // Main JSX Layout
  // ===============================================
  return (
    <div className="app">
      {/* Global Navigation Bar */}
      <Navbar onLogout={handleLogout} />
      <Header />
      <Footer />

      {/* Main Container */}
      <div className="container main-content py-6">
        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route
            path="/register"
            element={<Register onRegister={() => navigate("/login")} />}
          />

          {/* 🏠 Home & Dashboard Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/results-history"
            element={
              <PrivateRoute>
                <ResultsHistoryPage />
              </PrivateRoute>
            }
          />

          {/* 🧠 Prediction Forms */}
          <Route
            path="/form/demographics"
            element={
              <PrivateRoute>
                <DemographicsPage
                  data={allData.demographics}
                  update={updateData}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/form/stress"
            element={
              <PrivateRoute>
                <StressPage data={allData.stress} update={updateData} />
              </PrivateRoute>
            }
          />
          <Route
            path="/form/lifestyle"
            element={
              <PrivateRoute>
                <LifestylePage data={allData.lifestyle} update={updateData} />
              </PrivateRoute>
            }
          />
          <Route
            path="/form/symptoms"
            element={
              <PrivateRoute>
                <SymptomsPage data={allData.symptoms} update={updateData} />
              </PrivateRoute>
            }
          />
          <Route
            path="/form/medical-history"
            element={
              <PrivateRoute>
                <MedicalHistoryPage
                  data={allData.medicalHistory}
                  update={updateData}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/form/medical-data"
            element={
              <PrivateRoute>
                <MedicalDataPage
                  data={allData.medicalData}
                  update={updateData}
                  onSubmit={handleSubmit}
                  loading={loading}
                />
              </PrivateRoute>
            }
          />

          {/* 📊 Results & Reports */}
          <Route
            path="/results"
            element={
              <PrivateRoute>
                <ResultsPage result={result} />
              </PrivateRoute>
            }
          />
         <Route
            path="/risk-trends"
            element={
              <PrivateRoute>
                <RiskTrends />
              </PrivateRoute>
            }
          />
              <Route
            path="/user-trends"
            element={
              <PrivateRoute>
                <UserTrendDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/insights"
            element={
              <PrivateRoute>
                <GlobalInsights />
              </PrivateRoute>
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoute>
                <HealthReportPage latestResult={result} />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/rules"
            element={
              <PrivateRoute>
                <RuleDashboard />
              </PrivateRoute>
            }
          />

          {/* 🏠 Default Redirect */}
          <Route
            path="/"
            element={
              <Navigate
                to={isAuthenticated() ? "/home" : "/login"}
                replace
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

// ===============================================
// Router Wrapper
// ===============================================
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
