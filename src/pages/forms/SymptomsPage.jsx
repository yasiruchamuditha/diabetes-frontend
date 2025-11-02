import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SymptomsPage = ({ data, update }) => {
  const navigate = useNavigate();

  const symptoms = [
    "Frequent urination in the past 3 months",
    "Extreme thirst during the past 3 months",
    "Unexplained weight loss in the past 3 months",
    "Tiredness or fatigue even after resting in the past 3 months",
    "Blurry vision in the past 3 months",
    "Slow healing of cuts or wounds in the past 3 months",
    "Numbness or tingling in hands or feet in the past 3 months",
    "Recurring infections (skin, gum, or bladder) in the past 3 months",
    "Frequent hunger even after eating in the past 3 months",
    "Persistent dry mouth in the past 3 months",
  ];

  const toggleSymptom = (symptom) => {
    const newData = { ...data };
    newData[symptom] = !newData[symptom];
    update("symptoms", newData);
  };

  // Count total selected symptoms
  const selectedCount = Object.values(data).filter(Boolean).length;

  // Dynamic summary message
  const getSummary = () => {
    if (selectedCount === 0)
      return "✅ No symptoms reported — low immediate risk.";
    if (selectedCount < 4)
      return "🟡 Mild symptoms — monitor lifestyle and recheck regularly.";
    return "🔴 Multiple symptoms — consider a medical evaluation.";
  };

  return (
    <div className="container py-5 mt-5 fade-in">
      <div className="page-card p-4 shadow-sm bg-white rounded-3">
        {/* Header */}
        <h2 className="fw-bold text-primary mb-2">⚠️ Diabetes Risk Symptoms</h2>
        <p className="text-muted mb-4">
          Please select any symptoms you’ve experienced in the past 3 months.
        </p>

        {/* Symptoms Grid */}
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {symptoms.map((sym, index) => (
            <div key={index} className="col">
              <div
                className={`card h-100 border-0 shadow-sm p-3 ${
                  data[sym] ? "bg-light border-primary" : "bg-white"
                }`}
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => toggleSymptom(sym)}
              >
                <div className="form-check">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    checked={!!data[sym]}
                    onChange={() => toggleSymptom(sym)}
                    id={`symptom-${index}`}
                  />
                  <label
                    className="form-check-label fw-medium"
                    htmlFor={`symptom-${index}`}
                    style={{ cursor: "pointer" }}
                  >
                    {index + 1}. {sym}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary / Score Box */}
        <div className="mt-5 text-center">
          <div className="alert alert-light border-0 shadow-sm py-3">
            <h5 className="fw-bold mb-1">
              Total Selected Symptoms:{" "}
              <span className="text-primary">{selectedCount}</span> / 10
            </h5>
            <p className="text-muted mb-0">{getSummary()}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary px-4"
            onClick={() => navigate("/form/lifestyle")}
          >
            ← Back
          </button>
          <button
            className="btn btn-primary px-4"
            onClick={() => navigate("/form/medical-history")}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymptomsPage;
