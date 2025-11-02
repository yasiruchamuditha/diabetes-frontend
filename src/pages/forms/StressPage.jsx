//src/pages/forms/StressPage.jsx
import { style } from "framer-motion/client";
import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const StressPage = memo(({ data, update }) => {
  const navigate = useNavigate();

  const questions = [
    "Been upset because of something unexpected?",
    "Unable to control important things?",
    "Felt nervous and stressed?",
    "Confident handling problems?",
    "Things going your way?",
    "Could not cope with everything?",
    "Control irritations?",
    "Felt on top of things?",
    "Angered by things outside control?",
    "Difficulties piling up?"
  ];

  // Update stress value for each question
  const handleResponse = useCallback(
    (questionId, value) => {
      const newData = [...data];
      newData[questionId] = value;
      update("stress", newData);
    },
    [data, update]
  );

  // Calculate stress score (reverse specific items)
  const calculateScore = () => {
    const reverseItems = [3, 4, 6, 7]; // PSS reverse-scored items
    let total = 0;
    data.forEach((val, idx) => {
      if (val !== null && val !== undefined) {
        total += reverseItems.includes(idx) ? 4 - val : val;
      }
    });
    return total;
  };

  const score = calculateScore();
  const isComplete = data.every((r) => r !== null && r !== undefined);

  const stressCategory =
    score <= 13
      ? "🟢 Low Stress"
      : score <= 26
      ? "🟡 Moderate Stress"
      : "🔴 High Stress";

  return (
    <div className="page-card fade-in">
      <h2>🧠 Stress Assessment (PSS-10)</h2>
      <p className="subtitle">
        In the last month, how often have you experienced the following?
      </p>

      {/* Legend */}
      <div className="scale-legend">
        <span>0 = Never</span>
        <span>1 = Almost Never</span>
        <span>2 = Sometimes</span>
        <span>3 = Fairly Often</span>
        <span>4 = Very Often</span>
      </div>

      {/* Question Cards */}
      {questions.map((q, idx) => (
        <div key={idx} className="question-box">
          <p className="question">
            {idx + 1}. {q}
          </p>

          <div className="button-group">
            {[0, 1, 2, 3, 4].map((val) => (
              <button
                key={val}
                className={`btn btn-rating ${
                  data[idx] === val ? "btn-selected" : "btn-outline"
                }`} style={{background: data[idx] === val ? "#0d6efd" : "", color: data[idx] === val ? "#fff" : "",border: data[idx] === val ? "2px solid #000" : ""}}
                onClick={() => handleResponse(idx, val)}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Show score only when complete */}
      {isComplete && (
        <div className="score-box">
          <h3>Your PSS Score: {score} / 40</h3>
          <p>{stressCategory}</p>
        </div>
      )}

      {/* Navigation */}
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
});

export default StressPage;
