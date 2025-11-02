import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DemographicsPage = ({ data, update }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    update("demographics", { ...data, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error when user changes value
  };

  const validateForm = () => {
    let newErrors = {};

    // ✅ Age validation (16–35)
    if (!data.age) {
      newErrors.age = "Age is required.";
    } else if (isNaN(data.age)) {
      newErrors.age = "Please enter a valid number.";
    } else if (data.age < 16 || data.age > 35) {
      newErrors.age = "Age must be between 16 and 35 years.";
    }

    // ✅ Gender validation
    if (!data.gender) newErrors.gender = "Please select your gender.";

    // ✅ Education validation
    if (!data.education) newErrors.education = "Please select your education level.";

    // ✅ Income validation
    if (!data.income) newErrors.income = "Please select your income category.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate("/form/stress");
    }
  };

  return (
    <div className="page-card fade-in">
      <h2>👤 Demographic Information</h2>
      <p className="subtitle">
        Please provide your basic demographic details. This helps personalize your risk analysis.
      </p>

      <form className="form-vertical">
        {/* Age */}
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            placeholder="Enter your age"
            type="number"
            min="16"
            max="35"
            value={data.age || ""}
            onChange={(e) => handleChange("age", e.target.value)}
            className={errors.age ? "error-input" : ""}
          />
          {errors.age && <p className="error-text">{errors.age}</p>}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={data.gender || ""}
            onChange={(e) => handleChange("gender", e.target.value)}
            className={errors.gender ? "error-input" : ""}
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="error-text">{errors.gender}</p>}
        </div>

        {/* Education */}
        <div className="form-group">
          <label htmlFor="education">Education Level</label>
          <select
            id="education"
            value={data.education || ""}
            onChange={(e) => handleChange("education", e.target.value)}
            className={errors.education ? "error-input" : ""}
          >
            <option value="">Select education level</option>
            <option>O/L</option>
            <option>A/L</option>
            <option>Undergraduate</option>
            <option>Graduate</option>
          </select>
          {errors.education && <p className="error-text">{errors.education}</p>}
        </div>

        {/* Income */}
        <div className="form-group">
          <label htmlFor="income">Income Category</label>
          <select
            id="income"
            value={data.income || ""}
            onChange={(e) => handleChange("income", e.target.value)}
            className={errors.income ? "error-input" : ""}
          >
            <option value="">Select income level</option>
            <option>Less than Rs. 25,000</option>
            <option>Rs. 25,000 – Rs. 50,000</option>
            <option>Rs. 50,000 – Rs. 100,000</option>
            <option>More than Rs. 100,000</option>
          </select>
          {errors.income && <p className="error-text">{errors.income}</p>}
        </div>
      </form>

      <div className="navigation">
        <button className="btn btn-primary" onClick={handleNext}>
          Next →
        </button>
      </div>

      {/* ✅ Inline CSS for better error visuals (optional) */}
      <style>
        {`
          .error-input {
            border-color: #dc3545;
            background-color: #fff5f5;
          }
          .error-text {
            color: #dc3545;
            font-size: 0.85rem;
            margin-top: 4px;
          }
        `}
      </style>
    </div>
  );
};

export default DemographicsPage;
