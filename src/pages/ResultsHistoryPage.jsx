import React, { useEffect, useState } from "react";
import { Clock, BarChart3, Activity, AlertTriangle } from "lucide-react";
import { getUserHistory } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const ResultsHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getUserHistory();
        if (res?.success) {
          setHistory(res.data || []);
        } else {
          console.warn("⚠ No valid data from backend");
        }
      } catch (e) {
        console.error("❌ Fetch history failed:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Function to color-code risk levels
  const getRiskColor = (category) => {
    switch (category?.toLowerCase()) {
      case "low":
        return "success";
      case "moderate":
        return "warning";
      case "high":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container py-5 mt-5 fade-in">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary mb-2">
          📜 Your Past Diabetes Risk Assessments
        </h2>
        <p className="text-muted">
          Review your previous prediction results and track progress over time.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-muted">⏳ Loading your history...</div>
      ) : history.length > 0 ? (
        <div className="row g-4">
          {history.map((item, i) => {
            const score = isNaN(item.risk_score)
              ? "N/A"
              : (item.risk_score * 100).toFixed(1);
            const category = item.risk_category || "Unknown";
            const color = getRiskColor(category);
            return (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div
                  className={`card border-0 shadow-sm h-100 border-top border-4 border-${color}`}
                  style={{
                    borderRadius: "15px",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className={`bg-${color} bg-opacity-10 text-${color} p-3 rounded-circle me-3`}
                      >
                        <Activity size={22} />
                      </div>
                      <h5 className="mb-0 fw-semibold text-dark">
                        Risk Assessment #{i + 1}
                      </h5>
                    </div>

                    <div className="mb-2">
                      <h6 className="fw-bold text-dark mb-1">
                        <BarChart3
                          size={18}
                          className={`text-${color} me-2 align-middle`}
                        />
                        Risk Score:
                        <span className={`text-${color} ms-2`}>
                          {score}%
                        </span>
                      </h6>
                      <p className="text-muted mb-0 small">
                        Category: <strong>{category}</strong>
                      </p>
                    </div>

                    <hr />

                    <p className="text-muted small mb-3">
                      <Clock
                        size={14}
                        className="text-secondary me-1 align-middle"
                      />
                      {item.created_at
                        ? new Date(item.created_at).toLocaleString()
                        : "Unknown date"}
                    </p>

                    <div className="d-flex justify-content-end">
                      <button
                        onClick={() => console.log(item)}
                        className={`btn btn-outline-${color} btn-sm px-3`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-muted py-5">
          <AlertTriangle size={30} className="text-warning mb-3" />
          <p>No previous records found.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsHistoryPage;
