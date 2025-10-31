// ===============================================
// RuleDashboard.jsx — Adaptive Expert System Monitor
// ===============================================

import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from "recharts";
import { Brain, RefreshCw } from "lucide-react";

const RuleDashboard = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/rules/track`);
      const data = await res.json();
      if (data.success) {
        const formatted = Object.entries(data.data || {}).map(([name, stats]) => ({
          name,
          helpful: stats.helpful || 0,
          notHelpful: stats.not_helpful || 0,
          weight: stats.weight || 0
        }));
        setRules(formatted);
      }
    } catch (error) {
      console.error("Error fetching rule tracker:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-700">
          <Brain size={28} /> Adaptive Rule Evolution Dashboard
        </h2>
        <button
          onClick={fetchRules}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-6">Loading rule evolution data...</p>
      ) : rules.length === 0 ? (
        <p className="text-gray-600 mt-6">No rule feedback data yet.</p>
      ) : (
        <>
          {/* === Rule Weights Chart === */}
          <div className="page-card">
            <h3 className="text-lg font-medium mb-3 text-blue-600">📈 Rule Strength (Learning Weight)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rules}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="weight" fill="#3b82f6" name="Learning Strength" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* === Feedback Distribution === */}
          <div className="page-card">
            <h3 className="text-lg font-medium mb-3 text-green-600">💬 User Feedback Summary</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rules}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="helpful" stackId="a" fill="#10b981" name="Helpful" />
                <Bar dataKey="notHelpful" stackId="a" fill="#ef4444" name="Not Helpful" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default RuleDashboard;
