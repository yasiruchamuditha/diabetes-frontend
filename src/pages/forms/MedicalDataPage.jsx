//src/pages/forms/MedicalDataPage.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const MedicalDataPage = ({ data, update, onSubmit, loading }) => {
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    update("medicalData", { ...data, [field]: value });
  };

  // Auto-calculate BMI
  const bmi = useMemo(() => {
    const w = parseFloat(data.weight);
    const h = parseFloat(data.height);
    if (w && h) return (w / ((h / 100) ** 2)).toFixed(1);
    return null;
  }, [data.weight, data.height]);

  // 💡 Determine BMI category and color
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

  return (
    <div className="page-card fade-in">
      <h2>🩺 Medical Data</h2>
      <p className="subtitle">
        Please provide your recent measurements. BMI will be automatically calculated.
      </p>

      {/* === Section 1: Weight & Height === */}
      <div className="section-box">
        <h3>📏 Body Measurements</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>💪 Weight (kg)</label>
            <input
              type="number"
              min="20"
              max="200"
              placeholder="e.g., 65"
              value={data.weight || ""}
              onChange={(e) => handleChange("weight", e.target.value)}
            />
            <small>Used to calculate BMI (Body Mass Index)</small>
          </div>

          <div className="form-group">
            <label>📏 Height (cm)</label>
            <input
              type="number"
              min="100"
              max="250"
              placeholder="e.g., 170"
              value={data.height || ""}
              onChange={(e) => handleChange("height", e.target.value)}
            />
            <small>Required for accurate BMI estimation</small>
          </div>
        </div>
      </div>

      {/* === Section 2: BMI Result === */}
      {bmi && (
        <div className="section-box">
          <h3>💡 Calculated BMI</h3>
          <div
            className="bmi-box"
            style={{
              borderLeft: `6px solid ${bmiColor}`,
              background: "#f8fafc",
            }}
          >
            <p>
              <strong>Your BMI:</strong> <span style={{ fontSize: "1.3em" }}>{bmi}</span>
            </p>
            <p style={{ color: bmiColor, fontWeight: "600" }}>
              Category: {bmiCategory}
            </p>
          </div>

          {/* Optional visual legend */}
          <div className="bmi-legend">

            <span className="dot green"></span> Normal (18.5–24.9) <span> || </span> 
            <span className="dot orange"></span> Underweight (&lt;18.5) <span> || </span>
            <span className="dot yellow"></span> Overweight (25–29.9) <span> || </span>
            <span className="dot red"></span> Obese (≥30)

          </div>
        </div>
      )}

      {/* === Section 3: Blood Data === */}
      <div className="section-box">
        <h3>🧪 Clinical Data</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>HbA1c (%) <small>(optional)</small></label>
            <input
              type="number"
              step="0.1"
              min="3"
              max="15"
              placeholder="e.g., 5.8"
              value={data.hba1c || ""}
              onChange={(e) => handleChange("hba1c", e.target.value)}
            />
            <small>Average glucose over 3 months (normal: 4.0–5.6%)</small>
          </div>

          <div className="form-group">
            <label>Fasting Blood Sugar (mg/dL) <small>(optional)</small></label>
            <input
              type="number"
              step="1"
              min="50"
              max="500"
              placeholder="e.g., 95"
              value={data.fbs || ""}
              onChange={(e) => handleChange("fbs", e.target.value)}
            />
            <small>Normal range: 70–99 mg/dL</small>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/form/medical-history")}
        >
          ← Back
        </button>

        <button
          className={`btn btn-success ${loading ? "loading" : ""}`}
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? "⏳ Analyzing..." : "🔍 Get Assessment"}
        </button>
      </div>
    </div>
  );
};

export default MedicalDataPage;
