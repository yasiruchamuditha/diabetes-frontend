//src/pages/forms/LifestylePage.jsx
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const LifestylePage = ({ data, update }) => {
  const navigate = useNavigate();

  const handleChange = useCallback(
    (field, value) => {
      update("lifestyle", { ...data, [field]: value });
    },
    [data, update]
  );

  return (
    <div className="page-card fade-in">
      <h2>🏃 Lifestyle & Habits</h2>
      <p className="subtitle">
        Answer the following questions based on your weekly habits and routines.
      </p>

      {/* 1. Fast Food */}
      <div className="question-box">
        <p className="question">
          1️⃣ How often do you eat fast food or fried snacks in a week?
        </p>
        <div className="button-group">
          {["Never", "Rarely", "Sometimes", "Often", "Always"].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.fastFood === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("fastFood", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Sweetened Beverages */}
      <div className="question-box">
        <p className="question">
          2️⃣ How often do you drink sweetened beverages (soda, fruit juice, etc.)?
        </p>
        <div className="button-group">
          {["Never", "Rarely", "Sometimes", "Often", "Always"].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.sugaryDrink === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("sugaryDrink", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Skip Breakfast */}
      <div className="question-box">
        <p className="question">3️⃣ How often do you skip breakfast?</p>
        <div className="button-group">
          {["Never", "Rarely", "Sometimes", "Often", "Always"].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.skipBreakfast === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("skipBreakfast", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Exercise Days */}
      <div className="question-box">
        <p className="question">
          4️⃣ How many days per week do you engage in at least 30 minutes of exercise?
        </p>
        <div className="button-group">
          {["0 days", "1-2 days", "3-4 days", "5-6 days", "7 days"].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.exercise === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("exercise", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Sleep Duration */}
      <div className="question-box">
        <p className="question">5️⃣ How many hours do you sleep per night on average?</p>
        <div className="button-group">
          {[
            "Less than 5 hours",
            "5-6 hours",
            "7-8 hours",
            "9-10 hours",
            "More than 10 hours",
          ].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.sleep === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("sleep", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Feel Rested */}
      <div className="question-box">
        <p className="question">6️⃣ Do you feel rested after sleep?</p>
        <div className="button-group">
          {["Yes", "No"].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.rested === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("rested", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 7. Sitting Hours */}
      <div className="question-box">
        <p className="question">
          7️⃣ How many hours do you spend sitting per day (work/study/screen time)?
        </p>
        <div className="button-group">
          {[
            "Less than 5 hours",
            "5-6 hours",
            "7-8 hours",
            "9-10 hours",
            "More than 10 hours",
          ].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.sittingHours === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("sittingHours", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 8. Late Dinners */}
      <div className="question-box">
        <p className="question">8️⃣ How often do you eat late dinner (after 9 PM)?</p>
        <div className="button-group">
          {["Never", "Rarely", "Sometimes", "Often", "Always"].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.lateDinner === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("lateDinner", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 9. Smoking */}
      <div className="question-box">
        <p className="question">
          9️⃣ Do you currently smoke cigarettes or use tobacco products?
        </p>
        <div className="button-group">
          {[
            "Never smoked / never used tobacco",
            "Yes — Current smoker",
            "Former smoker — quit",
          ].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.smoking === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("smoking", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 10. Alcohol */}
      <div className="question-box">
        <p className="question">🔟 Do you consume alcohol?</p>
        <div className="button-group">
          {[
            "Never",
            "Rarely (special occasions only)",
            "1–2 drinks per week",
            "3–7 drinks per week",
          ].map((opt) => (
            <button
              key={opt}
              className={`btn btn-rating ${
                data.alcohol === opt ? "btn-selected" : "btn-outline"
              }`}
              onClick={() => handleChange("alcohol", opt)}
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
          onClick={() => navigate("/form/stress")}
        >
          ← Back
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/form/symptoms")}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default LifestylePage;
