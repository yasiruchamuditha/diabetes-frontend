import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const MedicalHistoryPage = ({ data, update }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = useCallback(
    (field, value) => {
      update("medicalHistory", { ...data, [field]: value });
      setError("");
    },
    [data, update]
  );

  const questions = [
    {
      key: "familyHistory",
      label: "1️⃣ Do you have a family history of diabetes?",
      options: ["Yes", "No"],
    },
    {
      key: "familyHistoryType",
      label: "2️⃣ Family history by diabetes type (if known):",
      options: [
        "Type 1 diabetes",
        "Type 2 diabetes",
        "Unknown type",
        "No family history",
      ],
    },
    {
      key: "diabetesDiagnosis",
      label: "3️⃣ Have you ever been diagnosed with diabetes?",
      options: [
        "Not applicable (no diabetes)",
        "Yes - Unknown type",
        "Type 1 diabetes",
        "Type 2 diabetes",
      ],
    },
    {
      key: "diagAge",
      label:
        "4️⃣ If you have diabetes, at what age were you first diagnosed?",
      options: [
        "Not applicable (no diabetes)",
        "Under 18 years",
        "18-25 years",
        "26-30 years",
      ],
    },
    {
      key: "diagManagement",
      label: "5️⃣ If you have diabetes, how was it initially managed?",
      options: [
        "Not applicable (no diabetes)",
        "Required insulin immediately",
        "Started with diet and exercise",
        "Started with oral medications",
      ],
    },
    {
      key: "hypertension",
      label:
        "6️⃣ Do you currently have hypertension or take anti-hypertensive medication?",
      options: ["Yes", "No", "Unsure"],
    },
  ];

  const handleNext = () => {
    const allAnswered = questions.every((q) => data[q.key]);
    if (!allAnswered) {
      setError("⚠️ Please complete all medical history questions before continuing.");
      return;
    }
    navigate("/form/medical-data");
  };

  return (
    <div className="container py-5 mt-5 fade-in">
      <div className="page-card p-4 shadow-sm bg-white rounded-3">
        {/* Header */}
        <h2 className="fw-bold mb-2 text-primary">🧾 Medical History</h2>
        <p className="text-muted mb-4">
          Please provide details about your personal and family medical history.
        </p>

        {/* Questions */}
        {questions.map((q, idx) => (
          <div
            key={q.key}
            className="question-box border rounded-3 shadow-sm p-4 bg-light mb-4"
          >
            <p className="fw-semibold text-dark mb-3 fs-6">{q.label}</p>
            <div className="d-flex justify-content-between flex-wrap gap-2">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  className={`btn flex-fill mx-1 ${
                    data[q.key] === opt ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  style={{
                    minWidth: "150px",
                    height: "45px",
                    fontWeight: data[q.key] === opt ? "600" : "normal",
                    borderWidth: data[q.key] === opt ? "2px" : "1px",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => handleChange(q.key, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Validation Error */}
        {error && (
          <div className="alert alert-danger mt-3 text-center small">
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary px-4"
            onClick={() => navigate("/form/symptoms")}
          >
            ← Back
          </button>
          <button className="btn btn-primary px-4" onClick={handleNext}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryPage;
