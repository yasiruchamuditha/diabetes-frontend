
//src/pages/RiskTrends.jsx
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { getRiskTrends } from "../services/api";

const RiskTrends = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await getRiskTrends();
        if (response.success) {
          setData(response.data);
        }
      } catch (err) {
        console.error("Error fetching trend data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrends();
  }, []);

  if (loading) return <div className="page-card">Loading risk trends...</div>;

  return (
    <div className="page-card">
      <h2>📈 Diabetes Risk Trend Analysis</h2>
      <p className="subtitle">
        Average predicted risk across all assessments over time.
      </p>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avg_risk" stroke="#667eea" strokeWidth={3} name="Average Risk" />
        </LineChart>
      </ResponsiveContainer>

      <p className="note">
        Each point represents the average diabetes risk score predicted by the model for that day.
      </p>
    </div>
  );
};

export default RiskTrends;
