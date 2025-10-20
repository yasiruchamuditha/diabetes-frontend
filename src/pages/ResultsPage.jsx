import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from "recharts";
import { AlertCircle } from "lucide-react";

const ResultsPage = ({ result }) => {
  if (!result) return <div className="page-card">Please complete your assessment.</div>;

  const { risk_score, risk_category, shap_values, recommendations } = result;

  const data = Object.entries(shap_values || {})
    .map(([feature, value]) => ({
      name: feature.replace(/_/g, " "),
      contribution: Math.abs(value),
    }))
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 8);

  const riskColor =
    risk_category === "Low"
      ? "success"
      : risk_category === "Moderate"
      ? "warning"
      : "danger";

  return (
    <div className="results-container">
      <div className={`risk-card risk-${riskColor}`}>
        <h2>Your Diabetes Risk</h2>
        <div className="risk-score">{(risk_score * 100).toFixed(1)}%</div>
        <div className="risk-category">{risk_category} Risk</div>
      </div>

      <div className="page-card">
        <h3>🧩 SHAP Feature Contributions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="contribution" fill="#667eea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="page-card">
        <h3>💡 Personalized Recommendations</h3>
        {recommendations?.length ? (
          recommendations.map((rec, i) => (
            <div key={i} className="recommendation-box">
              <h4>{rec.title}</h4>
              <p>{rec.description}</p>
            </div>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>

      <div className="disclaimer">
        <AlertCircle size={20} />
        <div>
          <strong>Note:</strong> For awareness only — not a medical diagnosis.
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
