import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGamifiedGoals } from "../services/api";
import { Award, Activity, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const GamifiedGoalsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await getGamifiedGoals();
        if (res.success) setData(res.data);
      } catch (err) {
        console.error("Gamified goals fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600 text-lg animate-pulse">
        Loading your gamified health insights...
      </div>
    );

  if (!data)
    return (
      <div className="page-card text-center py-16 text-gray-600 text-lg">
        No gamified data found. Complete your risk prediction first.
      </div>
    );

  const { badges = [], total_points, level, motivation, risk_category } = data;

  // Group badges by theme keywords
  const grouped = {
    lifestyle: badges.filter((b) =>
      /(sleep|stress|fitness|bmi)/i.test(b.name)
    ),
    diet: badges.filter((b) =>
      /(fast|sugar|drink|food|hydration)/i.test(b.name)
    ),
    selfcontrol: badges.filter((b) =>
      /(smok|alcohol|drink|control)/i.test(b.name)
    ),
    activity: badges.filter((b) =>
      /(exercise|sitting|active|move)/i.test(b.name)
    ),
  };

  const progressPercent = Math.min((total_points / 150) * 100, 100);

  const gradientColor =
    level.includes("Legend") ? "from-yellow-400 via-orange-500 to-red-500"
      : level.includes("Rising") ? "from-purple-500 via-pink-500 to-indigo-500"
      : "from-green-400 via-teal-400 to-blue-400";

  const riskColor =
    risk_category === "Low" ? "text-green-600"
      : risk_category === "Moderate" ? "text-yellow-600"
      : "text-red-600";

  // 🔸 BadgeCard component (reusable)
  const BadgeCard = ({ badge }) => {
    const tier =
      badge.points >= 100
        ? "from-yellow-400 via-orange-400 to-red-500"
        : badge.points >= 60
        ? "from-purple-400 via-pink-400 to-indigo-400"
        : "from-green-400 via-teal-400 to-blue-400";

    return (
      <motion.div
        whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
        transition={{ duration: 0.4 }}
        className={`relative flex flex-col items-center text-center rounded-2xl border border-gray-200 bg-gradient-to-br ${tier} p-[2px] shadow-lg hover:shadow-2xl transition-all`}
      >
        <div className="w-full h-full bg-white rounded-2xl flex flex-col items-center justify-between py-5 px-4">
          <motion.div
            className="text-5xl mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1.05 }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3 + Math.random() * 2,
            }}
          >
            {badge.name.split(" ")[0]}
          </motion.div>
          <div className="font-semibold text-gray-800 text-base mb-1">
            {badge.name.replace(/^[^\w\s]+/, "")}
          </div>
          <div className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full mb-2">
            +{badge.points} XP
          </div>
          <motion.div
            className="absolute opacity-0 hover:opacity-100 transition bg-black/80 text-white text-xs px-3 py-2 rounded-xl -bottom-12 w-48 z-20"
            whileHover={{ y: -4 }}
          >
            {badge.criteria}
          </motion.div>
        </div>
        <div className="absolute -top-2 right-2 bg-yellow-400 text-[10px] font-bold px-2 py-[2px] rounded-full text-white shadow-md animate-pulse">
          ⭐
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto py-10 px-6 space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🏆 HEADER */}
      <motion.div
        className={`relative text-center p-10 rounded-3xl shadow-xl bg-gradient-to-r ${gradientColor} overflow-hidden`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Sparkles
          className="absolute top-5 right-5 text-white/60 animate-pulse"
          size={28}
        />
        <h2 className="text-4xl font-bold text-white drop-shadow mb-3">
          🏆 Gamified Health Goals
        </h2>
        <p className="text-white/90 text-sm mb-6 max-w-md mx-auto">
          AI-driven motivation to keep your wellness journey fun and rewarding
        </p>
        <div className="relative w-40 h-40 rounded-full bg-white/20 flex items-center justify-center mx-auto">
          <svg
            className="absolute top-0 left-0 transform -rotate-90"
            width="160"
            height="160"
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="white"
              strokeWidth="10"
              fill="transparent"
              opacity="0.2"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="white"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray="440"
              strokeDashoffset={440 - (440 * progressPercent) / 100}
              strokeLinecap="round"
              className="transition-all duration-700 ease-in-out"
            />
          </svg>
          <div className="text-center text-white">
            <div className="text-3xl font-bold">{total_points} XP</div>
            <div className="text-xs">Progress</div>
          </div>
        </div>
        <p className="mt-5 text-2xl font-semibold text-white">{level}</p>
        <p className="text-xs text-white/80 mt-2">Keep pushing toward the next level!</p>
      </motion.div>

      {/* ❤️ HEALTH INSIGHT */}
      <motion.div
        className="page-card bg-white p-8 rounded-2xl shadow-md text-center border border-gray-100"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-3 flex justify-center items-center gap-2">
          <Heart className="text-pink-500" size={22} /> Your Health Insight
        </h3>
        <p className={`text-base font-medium ${riskColor}`}>
          Risk Category: {risk_category}
        </p>
        <p className="text-gray-700 text-sm mt-2 italic">{motivation}</p>
      </motion.div>

      {/* 🎯 SEPARATED BADGE CATEGORIES */}
      <motion.div
        className="page-card bg-white p-8 rounded-2xl shadow-lg"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-semibold mb-5 flex items-center gap-2 text-indigo-700">
          <Award size={22} /> Earned Badges
        </h3>

        {Object.values(grouped).every((arr) => arr.length === 0) ? (
          <p className="text-gray-600 text-sm text-center">
            No badges yet — complete more assessments to unlock rewards!
          </p>
        ) : (
          <>
            {/* LIFESTYLE */}
            {grouped.lifestyle.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-green-600 mb-3">
                  🧘 Lifestyle Badges
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {grouped.lifestyle.map((b, i) => (
                    <BadgeCard badge={b} key={`life-${i}`} />
                  ))}
                </div>
              </div>
            )}

            {/* DIET */}
            {grouped.diet.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-pink-600 mb-3">
                  🥗 Diet & Habits Badges
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {grouped.diet.map((b, i) => (
                    <BadgeCard badge={b} key={`diet-${i}`} />
                  ))}
                </div>
              </div>
            )}

            {/* SELF CONTROL */}
            {grouped.selfcontrol.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-red-500 mb-3">
                  🚭 Self-Control Badges
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {grouped.selfcontrol.map((b, i) => (
                    <BadgeCard badge={b} key={`sc-${i}`} />
                  ))}
                </div>
              </div>
            )}

            {/* ACTIVITY */}
            {grouped.activity.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">
                  🪑 Activity Badges
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {grouped.activity.map((b, i) => (
                    <BadgeCard badge={b} key={`act-${i}`} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* XP Breakdown */}
      <motion.div
        className="page-card bg-gray-50 p-6 rounded-2xl border border-gray-200"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Activity size={18} className="text-indigo-500" /> XP Breakdown
        </h3>
        <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
          <li>💤 Sleep Master — Maintain 7–8 hours of sleep</li>
          <li>🏃 Fitness Hero — Healthy BMI</li>
          <li>🧘 Stress Reducer — Low stress level</li>
          <li>🍷 Controlled Drinker — Moderate alcohol intake</li>
          <li>🚭 Smoke-Free Champ — Avoid smoking</li>
          <li>🪑 Active Mover — Reduce sitting hours</li>
          <li>🥤 Low-Sugar Champion — Cut sugary drinks</li>
          <li>🍔 Fast Food Fighter — Limit fast food</li>
        </ul>
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg shadow-md transition-all hover:scale-105"
        >
          ← Back to Results
        </button>
      </motion.div>
    </motion.div>
  );
};

export default GamifiedGoalsPage;
