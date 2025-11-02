import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LifestylePage = ({ data, update }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = useCallback(
    (field, value) => {
      update("lifestyle", { ...data, [field]: value });
      setError(""); // clear validation error
    },
    [data, update]
  );

  // List of lifestyle questions
  const questions = [
    {
      key: "fastFood",
      label: "1️⃣ How often do you eat fast food or fried snacks in a week?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      key: "sugaryDrink",
      label: "2️⃣ How often do you drink sweetened beverages (soda, fruit juice, etc.)?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      key: "skipBreakfast",
      label: "3️⃣ How often do you skip breakfast?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      key: "exercise",
      label: "4️⃣ How many days per week do you engage in at least 30 minutes of exercise?",
      options: ["0 days", "1-2 days", "3-4 days", "5-6 days", "7 days"],
    },
    {
      key: "sleep",
      label: "5️⃣ How many hours do you sleep per night on average?",
      options: [
        "Less than 5 hours",
        "5-6 hours",
        "7-8 hours",
        "9-10 hours",
        "More than 10 hours",
      ],
    },
    {
      key: "rested",
      label: "6️⃣ Do you feel rested after sleep?",
      options: ["Yes", "No"],
    },
    {
      key: "sittingHours",
      label:
        "7️⃣ How many hours do you spend sitting per day (work/study/screen time)?",
      options: [
        "Less than 5 hours",
        "5-6 hours",
        "7-8 hours",
        "9-10 hours",
        "More than 10 hours",
      ],
    },
    {
      key: "lateDinner",
      label: "8️⃣ How often do you eat late dinner (after 9 PM)?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      key: "smoking",
      label:
        "9️⃣ Do you currently smoke cigarettes or use tobacco products?",
      options: [
        "never smoked / never used tobacco",
        "former smoker — quit",
        "yes — current smoker",
      ],
    },
    {
      key: "alcohol",
      label: "🔟 Do you consume alcohol?",
      options: [
        "Never",
        "Rarely (special occasions only)",
        "1–2 drinks per week",
        "3–7 drinks per week",
      ],
    },
  ];

  // Validation before next
  const handleNext = () => {
    const allAnswered = questions.every((q) => data[q.key]);
    if (!allAnswered) {
      setError("⚠️ Please answer all lifestyle questions before continuing.");
      return;
    }
    navigate("/form/symptoms");
  };

  return (
    <div className="container py-5 mt-5 fade-in">
      <div className="page-card p-4 shadow-sm bg-white rounded-3">
        <h2 className="fw-bold mb-2 text-primary">🏃 Lifestyle & Habits</h2>
        <p className="text-muted mb-4">
          Answer the following questions based on your weekly habits and routines.
        </p>

        {/* Lifestyle Question Cards */}
        {questions.map((q, index) => (
          <div
            key={q.key}
            className="question-box border rounded-3 shadow-sm p-4 bg-light mb-4"
          >
            <p className="fw-semibold text-dark mb-3 fs-6">
              {q.label}
            </p>

            {/* Long Buttons Row */}
            <div className="d-flex justify-content-between flex-wrap gap-2">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  className={`btn flex-fill mx-1 ${
                    data[q.key] === opt ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  style={{
                    minWidth: "120px",
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

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary px-4"
            onClick={() => navigate("/form/stress")}
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

export default LifestylePage;
