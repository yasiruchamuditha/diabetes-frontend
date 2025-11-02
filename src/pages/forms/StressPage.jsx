import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const StressPage = memo(({ data, update }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

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
    "Difficulties piling up?",
  ];

  // Handle response
  const handleResponse = useCallback(
    (questionId, value) => {
      const newData = [...data];
      newData[questionId] = value;
      update("stress", newData);
      setError(""); // Clear validation error when user answers
    },
    [data, update]
  );

  // Calculate score (reverse scoring for certain items)
  const calculateScore = () => {
    const reverseItems = [3, 4, 6, 7]; // reverse items
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
      ? { label: "🟢 Low Stress", color: "text-success" }
      : score <= 26
      ? { label: "🟡 Moderate Stress", color: "text-warning" }
      : { label: "🔴 High Stress", color: "text-danger" };

  // Validation before next step
  const handleNext = () => {
    if (!isComplete) {
      setError("⚠️ Please answer all questions before continuing.");
      return;
    }
    navigate("/form/lifestyle");
  };

  return (
    <div className="container py-5 mt-5 fade-in">
      <div className="page-card p-4 shadow-sm bg-white rounded-3">
        <h2 className="fw-bold mb-2 text-primary">🧠 Stress Assessment (PSS-10)</h2>
        <p className="text-muted mb-4">
          In the last month, how often have you experienced the following?
        </p>

        {/* Scale Legend */}
        <div className="alert alert-light border text-center small py-2 mb-4">
          <strong>Scale: 0 = Never | 1 = Almost Never | 2 = Sometimes | 3 = Fairly Often | 4 = Very Often </strong>
        </div>

        {/* Questions List */}
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="question-box border rounded-3 shadow-sm bg-light p-4 mb-4"
          >
            <p className="fw-semibold text-dark mb-3 fs-6">
              {idx + 1}. {q}
            </p>

            {/* Long Horizontal Buttons */}
            <div className="d-flex justify-content-between flex-wrap gap-2">
              {[0, 1, 2, 3, 4].map((val) => (
                <button
                  key={val}
                  className={`btn flex-fill mx-1 ${
                    data[idx] === val ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  style={{
                    minWidth: "100px",
                    height: "45px",
                    fontWeight: data[idx] === val ? "600" : "normal",
                    borderWidth: data[idx] === val ? "2px" : "1px",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => handleResponse(idx, val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Score Display */}
        {isComplete && (
          <div className="mt-4 text-center">
            <div className="alert alert-light border-0 shadow-sm">
              <h5 className="fw-bold mb-1">
                Your PSS Score: <span className="text-primary">{score}</span> / 40
              </h5>
              <p className={`fw-semibold ${stressCategory.color}`}>
                {stressCategory.label}
              </p>
            </div>
          </div>
        )}

        {/* Validation Error */}
        {error && (
          <div className="alert alert-danger mt-4 text-center small">
            {error}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary px-4"
            onClick={() => navigate("/form/demographics")}
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
});

export default StressPage;
