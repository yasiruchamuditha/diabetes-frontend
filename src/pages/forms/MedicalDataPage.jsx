import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const MedicalDataPage = ({ data, update, onSubmit, loading }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    update("medicalData", { ...data, [field]: value });
    setError("");
  };

  // ✅ Auto-calculate BMI
  const bmi = useMemo(() => {
    const w = parseFloat(data.weight);
    const h = parseFloat(data.height);
    if (w && h) return (w / ((h / 100) ** 2)).toFixed(1);
    return null;
  }, [data.weight, data.height]);

  // ✅ Determine BMI category
  const bmiCategory = useMemo(() => {
    if (!bmi) return "";
    const val = parseFloat(bmi);
    if (val < 18.5) return "Underweight";
    if (val < 25) return "Normal";
    if (val < 30) return "Overweight";
    return "Obese";
  }, [bmi]);

  const bmiColor = useMemo(() => {
    if (!bmi) return "";
    if (bmiCategory === "Normal") return "#48bb78";
    if (bmiCategory === "Underweight") return "#ed8936";
    if (bmiCategory === "Overweight") return "#f6ad55";
    return "#e53e3e";
  }, [bmiCategory]);

  // ✅ Validate before submitting
  const handleNext = () => {
    if (!data.weight || !data.height) {
      setError("⚠️ Please enter both weight and height before continuing.");
      return;
    }
    onSubmit();
  };

  return (
    <div className="container py-5 mt-5 fade-in">
      <div className="page-card p-4 shadow-sm bg-white rounded-3">
        {/* Header */}
        <h2 className="fw-bold text-primary mb-2">🩺 Medical Data</h2>
        <p className="text-muted mb-4">
          Please provide your recent measurements. BMI will be calculated automatically.
        </p>

        {/* 🧍 Body Measurements Section */}
        <div className="border rounded-3 shadow-sm p-4 bg-light mb-4">
          <h5 className="fw-semibold text-dark mb-3">📏 Body Measurements</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-medium">
                💪 Weight (kg) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                min="20"
                max="200"
                className="form-control"
                placeholder="e.g., 65"
                value={data.weight || ""}
                onChange={(e) => handleChange("weight", e.target.value)}
              />
              <small className="text-muted">
                Used to calculate BMI (Body Mass Index)
              </small>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">
                📏 Height (cm) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                min="100"
                max="250"
                className="form-control"
                placeholder="e.g., 170"
                value={data.height || ""}
                onChange={(e) => handleChange("height", e.target.value)}
              />
              <small className="text-muted">
                Required for accurate BMI estimation
              </small>
            </div>
          </div>
        </div>

        {/* 💡 BMI Result */}
        {bmi && (
          <div
            className="border rounded-3 shadow-sm p-4 mb-4"
            style={{ background: "#f8fafc" }}
          >
            <h5 className="fw-semibold mb-3">💡 Calculated BMI</h5>
            <div
              className="p-3 rounded-3"
              style={{
                borderLeft: `6px solid ${bmiColor}`,
                background: "#fff",
              }}
            >
              <p className="mb-1">
                <strong>Your BMI:</strong>{" "}
                <span style={{ fontSize: "1.3em" }}>{bmi}</span>
              </p>
              <p style={{ color: bmiColor, fontWeight: "600" }}>
                Category: {bmiCategory}
              </p>
            </div>

            <div className="mt-3 small text-muted">
              <span className="me-2">
                <span className="badge bg-warning me-1">&nbsp;</span> Underweight
                (&lt;18.5)
              </span>
              <span className="me-2">
                <span className="badge bg-success me-1">&nbsp;</span> Normal
                (18.5–24.9)
              </span>
              <span className="me-2">
                <span className="badge bg-info me-1">&nbsp;</span> Overweight
                (25–29.9)
              </span>
              <span>
                <span className="badge bg-danger me-1">&nbsp;</span> Obese (≥30)
              </span>
            </div>
          </div>
        )}

        {/* 🧪 Clinical Data Section */}
        <div className="border rounded-3 shadow-sm p-4 bg-light mb-4">
          <h5 className="fw-semibold text-dark mb-3">🧪 Clinical Data</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-medium">
                HbA1c (%) <small className="text-muted">(optional)</small>
              </label>
              <input
                type="number"
                step="0.1"
                min="3"
                max="15"
                className="form-control"
                placeholder="e.g., 5.8"
                value={data.hba1c || ""}
                onChange={(e) => handleChange("hba1c", e.target.value)}
              />
              <small className="text-muted">
                Average glucose over 3 months (normal: 4.0–5.6%)
              </small>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">
                Fasting Blood Sugar (mg/dL){" "}
                <small className="text-muted">(optional)</small>
              </label>
              <input
                type="number"
                step="1"
                min="50"
                max="500"
                className="form-control"
                placeholder="e.g., 95"
                value={data.fbs || ""}
                onChange={(e) => handleChange("fbs", e.target.value)}
              />
              <small className="text-muted">
                Normal range: 70–99 mg/dL
              </small>
            </div>
          </div>
        </div>

        {/* Validation Message */}
        {error && (
          <div className="alert alert-danger mt-3 text-center small">
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary px-4"
            onClick={() => navigate("/form/medical-history")}
          >
            ← Back
          </button>

          <button
            className={`btn btn-success px-4 ${loading ? "disabled" : ""}`}
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? "⏳ Analyzing..." : "🔍 Get Assessment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalDataPage;
