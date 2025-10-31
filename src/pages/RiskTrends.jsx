import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getRiskTrends } from "../services/api";
import { AlertCircle, TrendingUp } from "lucide-react";

const RiskTrends = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasPersonal, setHasPersonal] = useState(false);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await getRiskTrends();

        // ✅ FIX — Correctly extract nested data
        const res = response?.success ? response : response?.data;
        const globalData = res?.data?.global || [];
        const personalData = res?.data?.personal || [];

        console.log("✅ API returned:", res);

        // Build merged chart data
        if (globalData.length > 0 || personalData.length > 0) {
          const allDates = Array.from(
            new Set([
              ...globalData.map((g) => g.date),
              ...personalData.map((p) => p.date),
            ])
          ).sort();

          const merged = allDates.map((date) => ({
            date,
            global_avg: globalData.find((g) => g.date === date)?.avg_risk ?? null,
            personal_avg:
              personalData.find((p) => p.date === date)?.avg_risk ?? null,
          }));

          setData(merged);
          setHasPersonal(personalData.length > 0);
          console.log("📈 Merged Chart Data:", merged);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("❌ Error fetching trend data:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  // === Loading State ===
  if (loading)
    return (
      <div className="page-card text-center text-gray-600 py-10">
        Loading risk trends...
      </div>
    );

  // === No Data State ===
  if (!data || data.length === 0)
    return (
      <div className="page-card text-center py-10 text-gray-600">
        <AlertCircle className="inline-block mb-2 text-yellow-500" size={24} />
        <p className="text-lg font-medium">
          No trend data available yet — please complete some assessments first.
        </p>
      </div>
    );

  // === Chart Section ===
  return (
    <div className="page-card">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp size={28} className="text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Diabetes Risk Trend Analysis
        </h2>
      </div>
      <p className="text-gray-600 mb-6 text-sm md:text-base">
        Visualizing average predicted diabetes risk over time.
      </p>

      <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-200">
        <ResponsiveContainer width="100%" height={420}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(v) => `${(v * 100).toFixed(1)}%`}
              labelFormatter={(label) => `📅 Date: ${label}`}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend />

            {/* Blue Line — Global Average */}
            <Line
              type="monotone"
              dataKey="global_avg"
              stroke="#4F46E5"
              strokeWidth={3}
              name="Global Average Risk"
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />

            {/* Green Line — Personal Trend */}
            {hasPersonal && (
              <Line
                type="monotone"
                dataKey="personal_avg"
                stroke="#10B981"
                strokeWidth={3}
                name="My Risk Trend"
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
        <p>
          • <span className="text-indigo-600 font-semibold">Blue line</span>{" "}
          shows the global average diabetes risk trend (all youth users).
        </p>
        <p>
          •{" "}
          <span className="text-green-600 font-semibold">Green line</span>{" "}
          shows your own average diabetes risk trend.
        </p>
        {!hasPersonal && (
          <p className="mt-2 text-yellow-600 font-medium">
            ⚠ You haven’t built a personal trend yet — complete 2 or more
            assessments to view your progress.
          </p>
        )}
      </div>
    </div>
  );
};

export default RiskTrends;
