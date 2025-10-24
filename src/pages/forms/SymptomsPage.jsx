//src/pages/forms/SymptomsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="page-card fade-in">
      <h2>⚠️ Diabetes Risk Symptoms</h2>
      <p className="subtitle">
        Please select any symptoms you’ve experienced in the past 3 months.
      </p>

      <div className="symptoms-grid">
        {symptoms.map((sym, index) => (
          <label key={index} className="checkbox-label">
            <input
              type="checkbox"
              checked={!!data[sym]}
              onChange={() => toggleSymptom(sym)}
            />
            <span>{index + 1}. {sym}</span>
          </label>
        ))}
      </div>

      <div className="score-box">
        <h3>Total Selected Symptoms: 
          {Object.values(data).filter(Boolean).length}/10
        </h3>
        <p>
          {Object.values(data).filter(Boolean).length === 0
            ? "✅ No symptoms reported — low immediate risk."
            : Object.values(data).filter(Boolean).length < 4
            ? "🟡 Mild symptoms — monitor lifestyle and recheck regularly."
            : "🔴 Multiple symptoms — consider a medical evaluation."}
        </p>
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
