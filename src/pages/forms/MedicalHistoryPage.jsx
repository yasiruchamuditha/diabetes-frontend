//src/pages/forms/MedicalHistoryPage.jsx
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const MedicalHistoryPage = ({ data, update }) => {
  const navigate = useNavigate();

  const handleChange = useCallback(
    (field, value) => {
      update("medicalHistory", { ...data, [field]: value });
    },
    [data, update]
  );

  return (
    <div className="page-card fade-in">
      <h2>🧾 Medical History</h2>
      <p className="subtitle">
        Please provide details about your personal and family medical history.
      </p>

      {/* 1️⃣ Family History */}
      <div className="question-box">
        <p className="question">1️⃣ Do you have a family history of diabetes?</p>
        <div className="button-group">
          {["Yes", "No"].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.familyHistory === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("familyHistory", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 2️⃣ Family history by diabetes type */}
      <div className="question-box">
        <p className="question">
          2️⃣ Family history by diabetes type (if known):
        </p>
        <div className="button-group">
          {[
            "Type 1 diabetes",
            "Type 2 diabetes",
            "Unknown type",
            "No family history",
          ].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.familyHistoryType === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("familyHistoryType", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 3️⃣ Diagnosed with diabetes */}
      <div className="question-box">
        <p className="question">3️⃣ Have you ever been diagnosed with diabetes?</p>
        <div className="button-group">
          {[
            "Not applicable (no diabetes)",
            "Yes - Unknown type",
            "Type 1 diabetes",
            "Type 2 diabetes",
          ].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.diabetesDiagnosis === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("diabetesDiagnosis", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 4️⃣ Age of Diagnosis */}
      <div className="question-box">
        <p className="question">4️⃣ If you have diabetes, at what age were you first diagnosed?</p>
        <div className="button-group">
          {[
            "Not applicable (no diabetes)",
            "Under 18 years",
            "18-25 years",
            "26-30 years",
          ].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.diagAge === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("diagAge", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 5️⃣ Management Type */}
      <div className="question-box">
        <p className="question">5️⃣ If you have diabetes, how was it initially managed?</p>
        <div className="button-group">
          {[
            "Not applicable (no diabetes)",
            "Required insulin immediately",
            "Started with diet and exercise",
            "Started with oral medications",
          ].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.diagManagement === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("diagManagement", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 6️⃣ Hypertension */}
      <div className="question-box">
        <p className="question">
          6️⃣ Do you currently have hypertension or take anti-hypertensive medication?
        </p>
        <div className="button-group">
          {["Yes", "No", "Unsure"].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.hypertension === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("hypertension", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
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
