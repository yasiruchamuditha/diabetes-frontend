// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredToken, getStoredUser } from "../utils/auth";
import {
  AlertCircle,
  BarChart3,
  Activity,
  FileText,
} from "lucide-react";
import ActionCard from "../components/ActionCard";

const HomePage = () => {
  const navigate = useNavigate();
  const [latestResult, setLatestResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = getStoredUser();

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const token = getStoredToken();
        if (!token) return;
        const res = await fetch(
          `${process.env.REACT_APP_API_URL || "http://127.0.0.1:5001"}/api/user/latest`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (data.success && data.data) setLatestResult(data.data);
      } catch (e) {
        console.error("Error fetching latest result:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="home-container max-w-6xl mx-auto py-10 px-6 space-y-10">
      {/* === Welcome Section === */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          👋 Welcome, {user?.name || "User"}!
        </h1>
        <p className="text-gray-600">
          Empowering Sri Lankan Youth through AI-driven Diabetes Awareness.
        </p>
      </div>

      {/* === Latest Result ActionCard === */}
      <div className="action-card indigo">
        <div className="icon-wrapper">
          <BarChart3 size={30} />
        </div>

        <h3>Latest Risk Summary</h3>
        {loading ? (
          <p>Loading your latest results...</p>
        ) : latestResult ? (
          <div className="text-gray-700">
            <p className="text-lg font-medium">
              Risk Score:{" "}
              <span className="text-indigo-600 font-bold">
                {(latestResult.risk_score * 100).toFixed(1)}%
              </span>
            </p>

            <p className="text-md mt-1">
              Category:{" "}
              <span
                className={`font-semibold ${
                  latestResult.risk_category === "High"
                    ? "text-red-600"
                    : latestResult.risk_category === "Moderate"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {latestResult.risk_category}
              </span>
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Recorded on: {new Date(latestResult.created_at).toLocaleString()}
            </p>

            <div className="divider"></div>

            <button
              onClick={() => navigate("/results")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 mt-3 rounded-lg transition"
            >
              View Detailed Report
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No previous results found.</p>
        )}
      </div>

      {/* === Action Cards Grid === */}
      <div className="space-y-8">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ActionCard
            icon={Activity}
            title="Start New Assessment"
            description="Answer a few quick questions to assess your current risk."
            color="indigo"
            onClick={() => navigate("/form/demographics")}
          />

          <ActionCard
            icon={FileText}
            title="View Past Results"
            description="See your previous predictions and health trends."
            color="green"
            onClick={() => navigate("/results-history")}
          />
        </div>

        {/* Row 2 */}
        <div className="flex justify-center">
          <div className="w-full sm:w-2/3 md:w-1/2">
            <ActionCard
              icon={BarChart3}
              title="Global Insights"
              description="Explore patterns and global health insights from youth data."
              color="yellow"
              onClick={() => navigate("/insights")}
            />
          </div>
        </div>
      </div>

      {/* === Disclaimer === */}
      {/* <div className="text-sm text-gray-500 text-center mt-10 flex justify-center items-center gap-2">
        <AlertCircle size={16} />
        <p>
          This tool provides educational awareness — not a medical diagnosis.
        </p>
      </div> */}
    </div>
  );
};

export default HomePage;
