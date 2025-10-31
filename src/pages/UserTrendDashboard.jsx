// src/pages/UserTrendDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from "recharts";
import { getUserTrends } from "../services/api";

const UserTrendDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserTrends(token);
        console.log("Trend API response:", res);

        if (res && res.success && Array.isArray(res.data)) {
          // Map fields if backend names differ
          const formatted = res.data.map(d => ({
            date: d.date || d.created_at,
            avg_risk: d.avg_risk || d.risk
          }));
          setData(formatted);
        } else {
          console.warn("Invalid response format:", res);
        }
      } catch (err) {
        console.error("Error fetching user trends:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return <div className="page-card">Loading your trend...</div>;

  if (!data.length) return <div className="page-card">No trend data available yet.</div>;

  return (
    <div className="page-card">
      <h2>📈 Your Diabetes Risk Progress</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 1]} label={{ value: "Risk", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="avg_risk"
            stroke="#48bb78"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserTrendDashboard;
