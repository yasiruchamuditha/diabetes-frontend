import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Main prediction
export const submitAssessment = (data) =>
  api.post("/api/predict", data).then((r) => r.data);

// SHAP + Trends
export const getShapSummary = () =>
  api.get("/api/shap-summary").then((r) => r.data);
export const getRiskTrends = () =>
  api.get("/api/trends").then((r) => r.data);
export const getUserTrends = (token) =>
  api.get("/api/user-trends", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.data);

// Auth
export const registerUser = (userData) =>
  api.post("/api/register", userData).then((r) => r.data);
export const loginUser = (credentials) =>
  api.post("/api/login", credentials).then((r) => r.data);


// Add these exports to the end of services/api.js
// PDF Report APIs
export const downloadReportById = async (predictionId) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/api/report/${predictionId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    responseType: "blob",
  });
  return response;
};

export const downloadLatestReport = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/api/report/latest`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    responseType: "blob",
  });
  return response;
};

export const generateReportPreview = async (predictionDoc) => {
  const token = localStorage.getItem("token");
  const response = await api.post(`/api/report/generate`, predictionDoc, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    responseType: "blob",
  });
  return response;
};




export default api;
