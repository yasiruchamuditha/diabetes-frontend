import React from "react";
import { useNavigate } from "react-router-dom";

const StressPage = ({ data, update }) => {
  const navigate = useNavigate();

  const questions = [
    "Upset because of unexpected events?",
    "Unable to control important things?",
    "Felt nervous or stressed?",
    "Confident about handling personal problems?",
    "Things going your way?",
    "Unable to cope with life irritations?",
    "Felt on top of things?",
    "Angry because of things outside your control?",
    "Felt difficulties piling up?",
    "Could not overcome challenges?",
  ];

  return (
    <div className="page-card">
      <h2>🧠 Stress Assessment (PSS-10)</h2>
      <p className="subtitle">
        Rate how often you’ve experienced each feeling in the last month.
      </p>

      {questions.map((q, i) => (
        <div key={i} className="form-group">
          <label>{q}</label>
          <input
            type="range"
            min="0"
            max="4"
            value={data[i] || 0}
            onChange={(e) => {
              const newStress = [...data];
              newStress[i] = Number(e.target.value);
              update("stress", newStress);
            }}
          />
          <div className="range-labels">
            <span>Never</span>
            <span>Always</span>
          </div>
        </div>
      ))}

      <div className="navigation">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/form/demographics")}
        >
          ← Back
        </button>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/form/lifestyle")}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StressPage;
