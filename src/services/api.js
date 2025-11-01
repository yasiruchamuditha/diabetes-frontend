// src/services/api.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // you can add withCredentials: true if needed
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ===========================
// 🔹 Prediction & Explainability
// ===========================
export const submitAssessment = (data) =>
  api.post("/api/predict", data).then((r) => r.data);

export const getShapSummary = () => 
  api.get("/api/shap-summary").then((r) => r.data);

// // NOTE: keep a single canonical risk-trend endpoint — adjust if your backend uses a different path
// export const getRiskTrends = () => api.get("/api/risk-trends").then((r) => r.data);

// ✅ Add token-aware function
export const getUserTrends = async (token) => {
  try {
    const response = await api.get("/api/user-trends", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // backend should send { success: true, data: [...] }
  } catch (error) {
    console.error("Error fetching user trends:", error);
    return { success: false, data: [] };
  }
};
// ===========================
// 🔹 Risk Trends (supports both user + global)
// ===========================
export const getRiskTrends = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${process.env.REACT_APP_API_URL || "http://127.0.0.1:5001"}/api/risk-trends`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  return await res.json();
};


// ===========================
// 🔹 Auth
// ===========================
export const registerUser = (userData) =>
  api.post("/api/register", userData).then((r) => r.data);

export const loginUser = (credentials) =>
  api.post("/api/login", credentials).then((r) => r.data);

// ===========================
// 🔹 PDF Reports
// ===========================
export const downloadReportById = async (predictionId) => {
  if (!predictionId) throw new Error("predictionId required");
  try {
    const res = await api.get(`/api/report/${encodeURIComponent(predictionId)}`, {
      responseType: "blob",
    });
    // return blob (response.data) — callers expect a Blob
    return res.data;
  } catch (err) {
    console.error("downloadReportById error:", err);
    throw err;
  }
};

export const downloadLatestReport = async () => {
  try {
    const res = await api.get(`/api/report/latest`, { responseType: "blob" });
    return res.data;
  } catch (err) {
    console.error("downloadLatestReport error:", err);
    throw err;
  }
};

export const generateReportPreview = async (predictionDoc) => {
  if (!predictionDoc) throw new Error("predictionDoc required");
  try {
    const res = await api.post(`/api/report/generate`, predictionDoc, {
      responseType: "blob",
    });
    return res.data;
  } catch (err) {
    console.error("generateReportPreview error:", err);
    throw err;
  }
};

// ===========================
// 🔹 Compatibility Helper
// ===========================
export async function fetchRiskTrends() {
  try {
    return await getRiskTrends();
  } catch (err) {
    console.error("fetchRiskTrends error:", err);
    return { success: false, data: [] };
  }
}

// ===========================
// 🔹 What-If Simulation (AI Explainability)
// ===========================
export const simulatePrediction = async (predictionId, changes) => {
  if (!predictionId) throw new Error("predictionId required");
  try {
    const token = localStorage.getItem("token");
    const res = await api.post(
      "/api/simulate",
      {
        prediction_id: predictionId,
        changes,
      },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return res.data; // { success, new_risk, category }
  } catch (err) {
    console.error("simulatePrediction error:", err);
    throw err;
  }
};

// ===========================
// 🔹 User Progress Tracker
// ===========================
export const getUserProgress = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get("/api/user-progress", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data; // { success, data: [...] }
  } catch (err) {
    console.error("getUserProgress error:", err);
    throw err;
  }
};

// ✅ Get user prediction history
export const getUserHistory = async () => {
  try {
    const res = await api.get("/api/user/history");
    return res.data;
  } catch (err) {
    console.error("❌ getUserHistory error:", err);
    return { success: false, data: [] };
  }
};

// ===========================
// 🎯 Gamified Health Goals (NEW)
// ===========================
export const getGamifiedGoals = async () => {
  try {
    const res = await api.get("/api/gamified-goals");
    return res.data; // { success: true, data: {...} }
  } catch (error) {
    console.error("Gamified goals fetch error:", error);
    return { success: false, error: "Failed to fetch gamified goals" };
  }
};


export default api;