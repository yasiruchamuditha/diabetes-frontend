import React from "react";
import { useNavigate } from "react-router-dom";

const SymptomsPage = ({ data, update }) => {
  const navigate = useNavigate();

  const symptoms = [
    "Increased thirst",
    "Frequent urination",
    "Fatigue",
    "Blurred vision",
    "Unexplained weight loss",
    "Slow-healing wounds",
  ];

  const toggleSymptom = (symptom) => {
    const newData = { ...data };
    newData[symptom] = !newData[symptom];
    update("symptoms", newData);
  };

  return (
    <div className="page-card">
      <h2>⚠️ Symptoms Check</h2>
      <p className="subtitle">Select any symptoms you have experienced recently:</p>

      <div className="symptoms-grid">
        {symptoms.map((sym) => (
          <label key={sym} className="checkbox-label">
            <input
              type="checkbox"
              checked={!!data[sym]}
              onChange={() => toggleSymptom(sym)}
            />
            <span>{sym}</span>
          </label>
        ))}
      </div>

      <div className="navigation">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/form/lifestyle")}
        >
          ← Back
        </button>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/form/medical-history")}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default SymptomsPage;
