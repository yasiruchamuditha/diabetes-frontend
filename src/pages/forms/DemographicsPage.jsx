import React from "react";
import { useNavigate } from "react-router-dom";

const DemographicsPage = ({ data, update }) => {
  const navigate = useNavigate(); // ✅ for routing between form steps

  return (
    <div className="page-card">
      <h2>👤 Demographics</h2>
      <div className="form-grid">
        <input
          placeholder="Age"
          type="number"
          value={data.age || ""}
          onChange={(e) =>
            update("demographics", { ...data, age: e.target.value })
          }
        />

        <select
          value={data.gender || ""}
          onChange={(e) =>
            update("demographics", { ...data, gender: e.target.value })
          }
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          value={data.education || ""}
          onChange={(e) =>
            update("demographics", { ...data, education: e.target.value })
          }
        >
          <option value="">Education</option>
          <option>O/L</option>
          <option>A/L</option>
          <option>Undergraduate</option>
          <option>Graduate</option>
        </select>

        <select
          value={data.income || ""}
          onChange={(e) =>
            update("demographics", { ...data, income: e.target.value })
          }
        >
          <option value="">Income Category</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

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
