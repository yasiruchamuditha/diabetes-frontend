//src/pages/forms/DemographicsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const DemographicsPage = ({ data, update }) => {
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    update("demographics", { ...data, [field]: value });
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
            value={data.age || ""}
            onChange={(e) => handleChange("age", e.target.value)}
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={data.gender || ""}
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Education */}
        <div className="form-group">
          <label htmlFor="education">Education Level</label>
          <select
            id="education"
            value={data.education || ""}
            onChange={(e) => handleChange("education", e.target.value)}
          >
            <option value="">Select education level</option>
            <option>O/L</option>
            <option>A/L</option>
            <option>Undergraduate</option>
            <option>Graduate</option>
          </select>
        </div>

        {/* Income */}
        <div className="form-group">
          <label htmlFor="income">Income Category</label>
          <select
            id="income"
            value={data.income || ""}
            onChange={(e) => handleChange("income", e.target.value)}
          >
            <option value="">Select income level</option>
            <option>Less than Rs. 25,000</option>
            <option>Rs. 25,000 – Rs. 50,000</option>
            <option>Rs. 50,000 – Rs. 100,000</option>
            <option>More than Rs. 100,000</option>
          </select>
        </div>
      </form>

      <div className="navigation">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/form/stress")}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default DemographicsPage;
