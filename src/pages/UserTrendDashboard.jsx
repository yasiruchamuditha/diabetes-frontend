//src/pages/UserTrendDashboard.jsx
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
        if (res.success) setData(res.data);
      } catch (err) {
        console.error("Error fetching user trends:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return <div className="page-card">Loading your trend...</div>;

  return (
    <div className="page-card">
      <h2>📈 Your Diabetes Risk Progress</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Line type="monotone" dataKey="avg_risk" stroke="#48bb78" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserTrendDashboard;
