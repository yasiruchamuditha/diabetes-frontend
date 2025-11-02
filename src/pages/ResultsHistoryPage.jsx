import React, { useEffect, useState } from "react";
import { Clock, BarChart } from "lucide-react";
import { getUserHistory } from "../services/api";

const ResultsHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getUserHistory();
        if (res?.success) {
          setHistory(res.data || []);
        } else {
          console.warn("⚠ No valid data from backend");
        }
      } catch (e) {
        console.error("❌ Fetch history failed:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      <h2 className="text-2xl font-semibold mb-6">📜 Your Past Predictions</h2>

      {loading ? (
        <p>Loading...</p>
      ) : history.length > 0 ? (
        <div className="space-y-4">
          {history.map((item, i) => (
            <div
              key={i}
              className="page-card flex justify-between items-center p-4 hover:shadow-md transition"
            >
              <div>
                <p className="font-medium">
                  <BarChart className="inline mr-2 text-indigo-600" size={18} />
                  Risk:{" "}
                  <span className="text-indigo-700 font-semibold">
                    {isNaN(item.risk_score)
                      ? "N/A"
                      : `${(item.risk_score * 100).toFixed(1)}%`}
                  </span>{" "}
                  ({item.risk_category})
                </p>
                <p className="text-sm text-gray-500">
                  <Clock className="inline mr-1" size={14} />
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString()
                    : "Unknown date"}
                </p>
              </div>
              <button
                onClick={() => console.log(item)}
                className="bg-primary hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No previous records found.</p>
      )}
    </div>
  );
};

export default ResultsHistoryPage;
