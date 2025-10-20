import React from "react";
import { useNavigate } from "react-router-dom";

const MedicalHistoryPage = ({ data, update }) => {
  const navigate = useNavigate();

  return (
    <div className="page-card">
      <h2>🧾 Medical History</h2>
      <p className="subtitle">Provide your personal and family medical background.</p>

      <div className="form-group">
        <label>Family History of Diabetes</label>
        <select
          value={data.familyHistory || ""}
          onChange={(e) =>
            update("medicalHistory", { ...data, familyHistory: e.target.value })
          }
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label>Diagnosed with Type 1 or Type 2 Diabetes?</label>
        <select
          value={data.diabetesType || ""}
          onChange={(e) =>
            update("medicalHistory", { ...data, diabetesType: e.target.value })
          }
        >
          <option value="">No Diagnosis</option>
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
        </select>
      </div>

      <div className="form-group">
        <label>Hypertension (High Blood Pressure)?</label>
        <select
          value={data.hypertension || ""}
          onChange={(e) =>
            update("medicalHistory", { ...data, hypertension: e.target.value })
          }
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="navigation">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/form/symptoms")}
        >
          ← Back
        </button>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/form/medical-data")}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default MedicalHistoryPage;
