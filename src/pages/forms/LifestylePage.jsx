import React from "react";
import { useNavigate } from "react-router-dom";

const LifestylePage = ({ data, update }) => {
  const navigate = useNavigate();

  return (
    <div className="page-card">
      <h2>🏃 Lifestyle Factors</h2>
      <p className="subtitle">Please provide your weekly lifestyle habits and routines.</p>

      <div className="form-grid">
        <input
          placeholder="Sleep Hours per Night"
          type="number"
          value={data.sleep || ""}
          onChange={(e) =>
            update("lifestyle", { ...data, sleep: e.target.value })
          }
        />

        <input
          placeholder="Exercise Days per Week"
          type="number"
          value={data.exercise || ""}
          onChange={(e) =>
            update("lifestyle", { ...data, exercise: e.target.value })
          }
        />

        <input
          placeholder="Sugary Drinks per Week"
          type="number"
          value={data.sugaryDrink || ""}
          onChange={(e) =>
            update("lifestyle", { ...data, sugaryDrink: e.target.value })
          }
        />

        <input
          placeholder="Fast Food per Week"
          type="number"
          value={data.fastFood || ""}
          onChange={(e) =>
            update("lifestyle", { ...data, fastFood: e.target.value })
          }
        />

        <input
          placeholder="Skip Breakfasts per Week"
          type="number"
          value={data.skipBreakfast || ""}
          onChange={(e) =>
            update("lifestyle", { ...data, skipBreakfast: e.target.value })
          }
        />

        <input
          placeholder="Late Dinners per Week"
          type="number"
          value={data.lateDinner || ""}
          onChange={(e) =>
            update("lifestyle", { ...data, lateDinner: e.target.value })
          }
        />

        <select
          value={data.sittingHours || ""}
          onChange={(e) =>
            update("lifestyle", { ...data, sittingHours: e.target.value })
          }
        >
          <option value="">Sitting Hours per Day</option>
          <option value="Short">Short (0–4 hrs)</option>
          <option value="Medium">Medium (4–8 hrs)</option>
          <option value="Long">Long (8+ hrs)</option>
        </select>
      </div>

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
