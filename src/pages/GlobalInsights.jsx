import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from "recharts";
import { getShapSummary } from "../services/api";

const GlobalInsights = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await getShapSummary();
        if (response.success) setData(response.data);
      } catch (err) {
        console.error("Error fetching SHAP summary:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <div className="page-card">Loading insights...</div>;

  return (
    <div className="page-card">
      <h2>🌍 Global Feature Importance</h2>
      <p className="subtitle">Average SHAP contribution of each feature to risk prediction.</p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="feature" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="importance" fill="#667eea" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GlobalInsights;
