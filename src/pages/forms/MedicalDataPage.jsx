import React from "react";
import { useNavigate } from "react-router-dom";

const MedicalDataPage = ({ data, update, onSubmit, loading }) => {
  const navigate = useNavigate();

  return (
    <div className="page-card">
      <h2>🩺 Medical Data</h2>
      <p className="subtitle">
        Please provide your recent clinical measurements if available.
      </p>

      <div className="form-grid">
        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={data.weight || ""}
            onChange={(e) =>
              update("medicalData", { ...data, weight: e.target.value })
            }
            placeholder="e.g., 65"
          />
        </div>

        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            value={data.height || ""}
            onChange={(e) =>
              update("medicalData", { ...data, height: e.target.value })
            }
            placeholder="e.g., 170"
          />
        </div>

        <div className="form-group">
          <label>HbA1c (%) <small>(optional)</small></label>
          <input
            type="number"
            step="0.1"
            value={data.hba1c || ""}
            onChange={(e) =>
              update("medicalData", { ...data, hba1c: e.target.value })
            }
            placeholder="e.g., 5.8"
          />
        </div>

        <div className="form-group">
          <label>FBS (mg/dL) <small>(optional)</small></label>
          <input
            type="number"
            value={data.fbs || ""}
            onChange={(e) =>
              update("medicalData", { ...data, fbs: e.target.value })
            }
            placeholder="e.g., 95"
          />
        </div>
      </div>

      <div className="navigation">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/form/medical-history")}
        >
          ← Back
        </button>

        <button
          className="btn btn-success"
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
