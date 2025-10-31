// // src/pages/ResultsPage.jsx
// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import { AlertCircle, Activity, Stethoscope, Target } from "lucide-react";

// const ResultsPage = ({ result }) => {
//   if (!result)
//     return (
//       <div className="page-card text-center py-20 text-gray-600 text-lg">
//         Please complete your assessment first.
//       </div>
//     );

//   const { risk_score, risk_category, shap_values, recommendations } = result;

//   // Prepare SHAP data
//   const data = Object.entries(shap_values || {})
//     .map(([feature, value]) => ({
//       name: feature.replace(/_/g, " "),
//       contribution: Math.abs(value),
//     }))
//     .sort((a, b) => b.contribution - a.contribution)
//     .slice(0, 8);

//   // Risk category color
//   const riskColor =
//     risk_category === "Low"
//       ? "success"
//       : risk_category === "Moderate"
//       ? "warning"
//       : "danger";

//   // Extract sections safely
//   const lifestyleRecs = recommendations?.Lifestyle || [];
//   const clinicalRecs = recommendations?.Clinical || [];
//   const goalRecs = recommendations?.Goals || [];

//   return (
//     <div className="results-container max-w-5xl mx-auto py-8 px-6 space-y-8">
//       {/* === RISK OVERVIEW === */}
//       <div className={`risk-card risk-${riskColor}`}>
//         <h2 className="text-2xl font-semibold mb-2">Your Diabetes Risk</h2>
//         <div className="risk-score text-4xl font-bold">
//           {(risk_score * 100).toFixed(1)}%
//         </div>
//         <div className="risk-category text-lg mt-1">{risk_category} Risk</div>
//       </div>

//       {/* === SHAP CHART === */}
//       <div className="page-card">
//         <h3 className="text-xl font-semibold mb-4">🧩 Top Contributing Factors</h3>
//         {data.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="contribution" fill="#667eea" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-gray-600 text-sm">
//             No explainability data available for this prediction.
//           </p>
//         )}
//       </div>

//       {/* === RECOMMENDATIONS === */}
//       <div className="page-card">
//         <h3 className="text-xl font-semibold mb-4">💡 Personalized Recommendations</h3>

//         {/* LIFESTYLE RECOMMENDATIONS */}
//         {lifestyleRecs.length > 0 && (
//           <div className="recommendation-section mb-6">
//             <h4 className="flex items-center text-blue-600 font-medium mb-2">
//               <Activity size={20} className="mr-2" />
//               Lifestyle Recommendations
//             </h4>
//             {lifestyleRecs.map((rec, i) => (
//               <div key={i} className="recommendation-box bg-blue-50 p-3 rounded mb-2">
//                 <h5 className="font-semibold">{rec.title}</h5>
//                 <p className="text-gray-700 text-sm">{rec.description}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* CLINICAL RECOMMENDATIONS */}
//         {clinicalRecs.length > 0 && (
//           <div className="recommendation-section mb-6">
//             <h4 className="flex items-center text-red-600 font-medium mb-2">
//               <Stethoscope size={20} className="mr-2" />
//               Clinical Recommendations
//             </h4>
//             {clinicalRecs.map((rec, i) => (
//               <div key={i} className="recommendation-box bg-red-50 p-3 rounded mb-2">
//                 <h5 className="font-semibold">{rec.title}</h5>
//                 <p className="text-gray-700 text-sm">{rec.description}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* GOALS */}
//         {goalRecs.length > 0 && (
//           <div className="recommendation-section">
//             <h4 className="flex items-center text-green-600 font-medium mb-2">
//               <Target size={20} className="mr-2" />
//               SMART Health Goals
//             </h4>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               {goalRecs.map((goal, i) => (
//                 <li key={i}>{goal}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Fallback */}
//         {!lifestyleRecs.length && !clinicalRecs.length && !goalRecs.length && (
//           <p className="text-gray-600 text-sm">No personalized recommendations available.</p>
//         )}
//       </div>

//       {/* === DISCLAIMER === */}
//       <div className="disclaimer flex items-center gap-2 text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
//         <AlertCircle size={18} className="text-yellow-600" />
//         <div>
//           <strong>Note:</strong> These insights are for educational awareness only — not a medical diagnosis.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsPage;


// // ===============================================
// // ResultsPage.jsx — Adaptive Hybrid Expert System UI - working code
// // ===============================================

// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import { AlertCircle, Activity, Stethoscope, Target, ThumbsUp, ThumbsDown } from "lucide-react";

// const ResultsPage = ({ result }) => {
//   const [feedbackSent, setFeedbackSent] = useState(false);
//   const [feedbackState, setFeedbackState] = useState({ helpful: [], notHelpful: [] });

//   if (!result)
//     return (
//       <div className="page-card text-center py-20 text-gray-600 text-lg">
//         Please complete your assessment first.
//       </div>
//     );

//   const { risk_score, risk_category, shap_values, recommendations } = result;

//   // === Prepare SHAP Data ===
//   const data = Object.entries(shap_values || {})
//     .map(([feature, value]) => ({
//       name: feature.replace(/_/g, " "),
//       contribution: Math.abs(value),
//     }))
//     .sort((a, b) => b.contribution - a.contribution)
//     .slice(0, 8);

//   // === Extract Recommendation Sections ===
//   const lifestyleRecs = recommendations?.Lifestyle || [];
//   const clinicalRecs = recommendations?.Clinical || [];
//   const goalRecs = recommendations?.Goals || [];

//   // === Risk color mapping ===
//   const riskColor =
//     risk_category === "Low"
//       ? "success"
//       : risk_category === "Moderate"
//       ? "warning"
//       : "danger";

//   // === FEEDBACK HANDLER ===
//   const handleFeedback = async (title, isHelpful) => {
//     try {
//       setFeedbackState((prev) => ({
//         helpful: isHelpful
//           ? [...new Set([...prev.helpful, title])]
//           : prev.helpful.filter((t) => t !== title),
//         notHelpful: !isHelpful
//           ? [...new Set([...prev.notHelpful, title])]
//           : prev.notHelpful.filter((t) => t !== title),
//       }));
//     } catch (error) {
//       console.error("Error updating local feedback state:", error);
//     }
//   };

//   // === SUBMIT FEEDBACK ===
//   const submitFeedback = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const payload = {
//         risk_score,
//         risk_category,
//         feedback: feedbackState,
//         recommendations,
//         features: result.features || {},
//       };

//       const res = await fetch("http://127.0.0.1:5001/api/feedback", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setFeedbackSent(true);
//       } else {
//         console.error("Feedback failed:", data.error);
//       }
//     } catch (err) {
//       console.error("Feedback submission error:", err);
//     }
//   };

//   return (
//     <div className="results-container max-w-5xl mx-auto py-8 px-6 space-y-8">
//       {/* === RISK OVERVIEW === */}
//       <div className={`risk-card risk-${riskColor}`}>
//         <h2 className="text-2xl font-semibold mb-2">Your Diabetes Risk</h2>
//         <div className="risk-score text-4xl font-bold">
//           {(risk_score * 100).toFixed(1)}%
//         </div>
//         <div className="risk-category text-lg mt-1">{risk_category} Risk</div>
//       </div>
//   {/* === EXPLAINABILITY SECTION === */}
// <div className="page-card">
//   <h3 className="text-xl font-semibold mb-4">🧩 Explainable AI — SHAP Insights</h3>

//   {Object.keys(shap_values || {}).length > 0 ? (
//     <div className="space-y-10">
//       <p className="text-gray-600 text-sm">
//         These charts explain how your data influenced the diabetes risk prediction. <br />
//         The first chart shows **overall importance** of features, while the second shows
//         whether each factor increased (<span className="text-red-600 font-medium">red</span>) or
//         reduced (<span className="text-green-600 font-medium">green</span>) your risk.
//       </p>

//       {/* === 1️⃣ Feature Importance Histogram === */}
//       <div>
//         <h4 className="text-lg font-semibold mb-3">📊 Feature Importance (Overall Impact)</h4>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={Object.entries(shap_values || {})
//               .map(([feature, value]) => ({
//                 name: feature
//                   .replace(/_/g, " ")
//                   .replace(/\b\w/g, (l) => l.toUpperCase()),
//                 contribution: Math.abs(value),
//               }))
//               .sort((a, b) => b.contribution - a.contribution)
//               .slice(0, 10)}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" interval={0} angle={-35} textAnchor="end" height={70} />
//             <YAxis />
//             <Tooltip
//               formatter={(val) => `${val.toFixed(4)} (absolute impact)`}
//               labelStyle={{ color: "#111" }}
//             />
//             <Bar
//               dataKey="contribution"
//               radius={[6, 6, 0, 0]}
//               fill="url(#blueGradient)"
//               barSize={24}
//             />
//             <defs>
//               <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
//                 <stop offset="0%" stopColor="#60a5fa" />
//                 <stop offset="100%" stopColor="#2563eb" />
//               </linearGradient>
//             </defs>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* === 2️⃣ Directional SHAP Contribution Chart === */}
//       <div>
//         <h4 className="text-lg font-semibold mb-3">⚖️ SHAP Impact (Increase vs Decrease)</h4>
//         <ResponsiveContainer width="100%" height={350}>
//           <BarChart
//             layout="vertical"
//             data={Object.entries(shap_values || {})
//               .map(([feature, value]) => ({
//                 name: feature
//                   .replace(/_/g, " ")
//                   .replace(/\b\w/g, (l) => l.toUpperCase()),
//                 contribution: parseFloat(value),
//               }))
//               .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
//               .slice(0, 10)}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis
//               type="number"
//               domain={[
//                 (dataMin) => Math.floor(dataMin * 1.1),
//                 (dataMax) => Math.ceil(dataMax * 1.1),
//               ]}
//               tickFormatter={(v) => v.toFixed(2)}
//             />
//             <YAxis
//               type="category"
//               dataKey="name"
//               width={180}
//               tick={{ fontSize: 12, fill: "#374151" }}
//             />
//             <Tooltip
//               formatter={(value) =>
//                 `${value > 0 ? "+" : ""}${value.toFixed(4)} ${
//                   value > 0 ? "↑ Increases risk" : "↓ Reduces risk"
//                 }`
//               }
//             />
//             <defs>
//               <linearGradient id="redGradient" x1="0" x2="1">
//                 <stop offset="0%" stopColor="#f87171" />
//                 <stop offset="100%" stopColor="#ef4444" />
//               </linearGradient>
//               <linearGradient id="greenGradient" x1="0" x2="1">
//                 <stop offset="0%" stopColor="#6ee7b7" />
//                 <stop offset="100%" stopColor="#10b981" />
//               </linearGradient>
//             </defs>
//             <Bar dataKey="contribution" barSize={18} radius={[4, 4, 4, 4]}>
//               {Object.entries(shap_values || {})
//                 .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
//                 .slice(0, 10)
//                 .map(([feature, value], index) => (
//                   <cell
//                     key={`cell-${index}`}
//                     fill={value >= 0 ? "url(#redGradient)" : "url(#greenGradient)"}
//                   />
//                 ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* === TOP FACTORS SUMMARY === */}
//       <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
//         <h4 className="text-lg font-medium mb-2 text-gray-800">🔥 Top 3 Risk Drivers</h4>
//         <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
//           {Object.entries(shap_values || {})
//             .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
//             .slice(0, 3)
//             .map(([feature, value], i) => (
//               <li key={i}>
//                 <strong>
//                   {feature.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                 </strong>{" "}
//                 {value > 0
//                   ? "is contributing to a higher diabetes risk."
//                   : "is helping reduce your overall risk."}
//               </li>
//             ))}
//         </ul>
//       </div>
//     </div>
//   ) : (
//     <p className="text-gray-600 text-sm">
//       No explainability data available for this prediction.
//     </p>
//   )}
// </div>



//       {/* === RECOMMENDATIONS === */}
//       <div className="page-card">
//         <h3 className="text-xl font-semibold mb-4">💡 Personalized Recommendations</h3>

//         {/* LIFESTYLE RECOMMENDATIONS */}
//         {lifestyleRecs.length > 0 && (
//           <div className="recommendation-section mb-6">
//             <h4 className="flex items-center text-blue-600 font-medium mb-2">
//               <Activity size={20} className="mr-2" />
//               Lifestyle Recommendations
//             </h4>
//             {lifestyleRecs.map((rec, i) => (
//               <div key={i} className="recommendation-box bg-blue-50 p-3 rounded mb-3 shadow-sm">
//                 <h5 className="font-semibold">{rec.title}</h5>
//                 <p className="text-gray-700 text-sm mb-2">{rec.description}</p>
//                 {/* FEEDBACK BUTTONS */}
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleFeedback(rec.title, true)}
//                     className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                       feedbackState.helpful.includes(rec.title)
//                         ? "bg-green-500 text-white"
//                         : "bg-green-100 hover:bg-green-200 text-green-800"
//                     }`}
//                   >
//                     <ThumbsUp size={16} /> Helpful
//                   </button>
//                   <button
//                     onClick={() => handleFeedback(rec.title, false)}
//                     className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                       feedbackState.notHelpful.includes(rec.title)
//                         ? "bg-red-500 text-white"
//                         : "bg-red-100 hover:bg-red-200 text-red-800"
//                     }`}
//                   >
//                     <ThumbsDown size={16} /> Not Helpful
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* CLINICAL RECOMMENDATIONS */}
//         {clinicalRecs.length > 0 && (
//           <div className="recommendation-section mb-6">
//             <h4 className="flex items-center text-red-600 font-medium mb-2">
//               <Stethoscope size={20} className="mr-2" />
//               Clinical Recommendations
//             </h4>
//             {clinicalRecs.map((rec, i) => (
//               <div key={i} className="recommendation-box bg-red-50 p-3 rounded mb-3 shadow-sm">
//                 <h5 className="font-semibold">{rec.title}</h5>
//                 <p className="text-gray-700 text-sm mb-2">{rec.description}</p>
//                 {/* FEEDBACK BUTTONS */}
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleFeedback(rec.title, true)}
//                     className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                       feedbackState.helpful.includes(rec.title)
//                         ? "bg-green-500 text-white"
//                         : "bg-green-100 hover:bg-green-200 text-green-800"
//                     }`}
//                   >
//                     <ThumbsUp size={16} /> Helpful
//                   </button>
//                   <button
//                     onClick={() => handleFeedback(rec.title, false)}
//                     className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                       feedbackState.notHelpful.includes(rec.title)
//                         ? "bg-red-500 text-white"
//                         : "bg-red-100 hover:bg-red-200 text-red-800"
//                     }`}
//                   >
//                     <ThumbsDown size={16} /> Not Helpful
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* GOALS */}
//         {goalRecs.length > 0 && (
//           <div className="recommendation-section">
//             <h4 className="flex items-center text-green-600 font-medium mb-2">
//               <Target size={20} className="mr-2" />
//               SMART Health Goals
//             </h4>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               {goalRecs.map((goal, i) => (
//                 <li key={i}>{goal}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* FEEDBACK SUBMISSION */}
//         {(lifestyleRecs.length > 0 || clinicalRecs.length > 0) && !feedbackSent && (
//           <div className="mt-6 text-right">
//             <button
//               onClick={submitFeedback}
//               disabled={feedbackSent}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
//             >
//               Submit Feedback
//             </button>
//           </div>
//         )}

//         {feedbackSent && (
//           <p className="text-green-600 mt-3 font-medium">
//             ✅ Feedback recorded successfully — thank you!
//           </p>
//         )}

//         {/* FALLBACK */}
//         {!lifestyleRecs.length && !clinicalRecs.length && !goalRecs.length && (
//           <p className="text-gray-600 text-sm mt-2">
//             No personalized recommendations available.
//           </p>
//         )}
//       </div>

//       {/* === DISCLAIMER === */}
//       <div className="disclaimer flex items-center gap-2 text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
//         <AlertCircle size={18} className="text-yellow-600" />
//         <div>
//           <strong>Note:</strong> These insights are for educational awareness only — not a
//           medical diagnosis.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsPage;



// // src/pages/ResultsPage.jsx 
// //working code
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";
// import {
//   AlertCircle,
//   Activity,
//   Stethoscope,
//   Target,
//   ThumbsUp,
//   ThumbsDown,
//   FileText,
// } from "lucide-react";

// /**
//  * ResultsPage
//  * Props:
//  *  - result: object returned from /api/predict or user's latest prediction document
//  */
// const ResultsPage = ({ result }) => {
//   const navigate = useNavigate();
//   const [feedbackSent, setFeedbackSent] = useState(false);
//   const [feedbackState, setFeedbackState] = useState({ helpful: [], notHelpful: [] });

//   if (!result) {
//     return (
//       <div className="page-card text-center py-20 text-gray-600 text-lg">
//         Please complete your assessment first.
//       </div>
//     );
//   }

//   // safe accessors
//   const risk_score = Number(result.risk_score ?? 0);
//   const risk_category = result.risk_category ?? "Unknown";
//   const shap_values = result.shap_values ?? {};
//   const recommendations = result.recommendations ?? {};
//   const lifestyleRecs = recommendations.Lifestyle ?? [];
//   const clinicalRecs = recommendations.Clinical ?? [];
//   const goalRecs = recommendations.Goals ?? [];

//   // Prepare data for charts
//   const importanceData = Object.entries(shap_values)
//     .map(([feature, value]) => ({ name: feature.replace(/_/g, " "), contribution: Math.abs(Number(value)) }))
//     .sort((a, b) => b.contribution - a.contribution)
//     .slice(0, 10);

//   const directionalData = Object.entries(shap_values)
//     .map(([feature, value]) => ({ name: feature.replace(/_/g, " "), contribution: Number(value) }))
//     .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
//     .slice(0, 10);

//   const riskColor =
//     risk_category === "Low" ? "success" : risk_category === "Moderate" ? "warning" : "danger";

//   // local feedback toggles
//   const handleFeedback = (title, isHelpful) => {
//     setFeedbackState((prev) => {
//       const helpful = new Set(prev.helpful);
//       const notHelpful = new Set(prev.notHelpful);

//       if (isHelpful) {
//         helpful.add(title);
//         notHelpful.delete(title);
//       } else {
//         notHelpful.add(title);
//         helpful.delete(title);
//       }
//       return { helpful: Array.from(helpful), notHelpful: Array.from(notHelpful) };
//     });
//   };

//   const submitFeedback = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const payload = {
//         risk_score,
//         risk_category,
//         feedback: feedbackState,
//         recommendations,
//         features: result.features || {},
//       };

//       const res = await fetch(`${process.env.REACT_APP_API_URL || "http://127.0.0.1:5001"}/api/feedback`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setFeedbackSent(true);
//       } else {
//         console.error("Feedback failed:", data.error);
//         alert("Failed to submit feedback.");
//       }
//     } catch (err) {
//       console.error("Feedback submission error:", err);
//       alert("Feedback submission error. See console.");
//     }
//   };

//   return (
//     <div className="results-container max-w-6xl mx-auto py-8 px-6 space-y-8">
//       {/* RISK OVERVIEW */}
//       <div className={`risk-card risk-${riskColor}`}>
//         <h2 className="text-2xl font-semibold mb-2">Your Diabetes Risk</h2>
//         <div className="risk-score text-5xl font-bold">{(risk_score * 100).toFixed(1)}%</div>
//         <div className="risk-category text-lg mt-1">{risk_category} Risk</div>

//         {/* View Full Health Report (navigates to /health-report and passes result in state) */}
//         <div className="mt-6">
//           <button
//             onClick={() => navigate("/report", { state: { latestResult: result } })}
//             className="inline-flex items-center gap-2 bg-white text-indigo-700 border border-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
//           >
//             <FileText size={18} /> View Full Health Report (PDF)
//           </button>
//         </div>
//       </div>

//       {/* EXPLAINABILITY */}
//       <div className="page-card">
//         <h3 className="text-xl font-semibold mb-4">🧩 Explainable AI — SHAP Insights</h3>

//         {Object.keys(shap_values).length === 0 ? (
//           <p className="text-gray-600">No explainability data available for this prediction.</p>
//         ) : (
//           <>
//             <p className="text-gray-600 text-sm mb-4">
//               These charts show which features influenced the prediction. Importance = absolute impact;
//               Directional chart shows whether the feature increased (positive) or decreased (negative) risk.
//             </p>

//             {/* Feature importance (top absolute SHAP) */}
//             <div className="mb-8">
//               <h4 className="text-lg font-semibold mb-3">📊 Feature Importance (Overall Impact)</h4>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={importanceData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" interval={0} angle={-35} textAnchor="end" height={70} />
//                   <YAxis />
//                   <Tooltip formatter={(val) => `${val.toFixed(4)} (abs. SHAP)`} />
//                   <defs>
//                     <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
//                       <stop offset="0%" stopColor="#60a5fa" />
//                       <stop offset="100%" stopColor="#2563eb" />
//                     </linearGradient>
//                   </defs>
//                   <Bar dataKey="contribution" barSize={24} radius={[6, 6, 0, 0]} fill="url(#blueGradient)" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Directional SHAP chart */}
//             <div className="mb-6">
//               <h4 className="text-lg font-semibold mb-3">⚖️ SHAP Impact (Increase vs Decrease)</h4>
//               <ResponsiveContainer width="100%" height={350}>
//                 <BarChart layout="vertical" data={directionalData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis type="number" tickFormatter={(v) => v.toFixed(2)} />
//                   <YAxis type="category" dataKey="name" width={240} />
//                   <Tooltip
//                     formatter={(value) =>
//                       `${value > 0 ? "+" : ""}${value.toFixed(4)} ${value > 0 ? "↑ Increases risk" : "↓ Reduces risk"}`
//                     }
//                   />
//                   <defs>
//                     <linearGradient id="redGradient" x1="0" x2="1">
//                       <stop offset="0%" stopColor="#f87171" />
//                       <stop offset="100%" stopColor="#ef4444" />
//                     </linearGradient>
//                     <linearGradient id="greenGradient" x1="0" x2="1">
//                       <stop offset="0%" stopColor="#6ee7b7" />
//                       <stop offset="100%" stopColor="#10b981" />
//                     </linearGradient>
//                   </defs>

//                   <Bar dataKey="contribution" barSize={18} radius={[4, 4, 4, 4]}>
//                     {directionalData.map((d, idx) => (
//                       <Cell key={`cell-${idx}`} fill={d.contribution >= 0 ? "url(#redGradient)" : "url(#greenGradient)"} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Top factors */}
//             <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
//               <h4 className="text-lg font-medium mb-2 text-gray-800">🔥 Top 3 Risk Drivers</h4>
//               <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
//                 {Object.entries(shap_values)
//                   .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
//                   .slice(0, 3)
//                   .map(([feature, value], i) => (
//                     <li key={i}>
//                       <strong>{feature.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</strong>{" "}
//                       {Number(value) > 0 ? "is contributing to a higher diabetes risk." : "is helping reduce your overall risk."}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           </>
//         )}
//       </div>

//       {/* RECOMMENDATIONS */}
//       <div className="page-card">
//         <h3 className="text-xl font-semibold mb-4">💡 Personalized Recommendations</h3>

//         {lifestyleRecs.length > 0 && (
//           <div className="recommendation-section mb-6">
//             <h4 className="flex items-center text-blue-600 font-medium mb-2">
//               <Activity size={20} className="mr-2" />
//               Lifestyle Recommendations
//             </h4>
//             {lifestyleRecs.map((rec, i) => (
//               <div key={i} className="recommendation-box bg-blue-50 p-3 rounded mb-3 shadow-sm">
//                 <h5 className="font-semibold">{rec.title}</h5>
//                 <p className="text-gray-700 text-sm mb-2">{rec.description}</p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleFeedback(rec.title, true)}
//                     className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                       feedbackState.helpful.includes(rec.title) ? "bg-green-500 text-white" : "bg-green-100 hover:bg-green-200 text-green-800"
//                     }`}
//                   >
//                     <ThumbsUp size={16} /> Helpful
//                   </button>
//                   <button
//                     onClick={() => handleFeedback(rec.title, false)}
//                     className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                       feedbackState.notHelpful.includes(rec.title) ? "bg-red-500 text-white" : "bg-red-100 hover:bg-red-200 text-red-800"
//                     }`}
//                   >
//                     <ThumbsDown size={16} /> Not Helpful
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {clinicalRecs.length > 0 && (
//           <div className="recommendation-section mb-6">
//             <h4 className="flex items-center text-red-600 font-medium mb-2">
//               <Stethoscope size={20} className="mr-2" />
//               Clinical Recommendations
//             </h4>
//             {clinicalRecs.map((rec, i) => (
//               <div key={i} className="recommendation-box bg-red-50 p-3 rounded mb-3 shadow-sm">
//                 <h5 className="font-semibold">{rec.title}</h5>
//                 <p className="text-gray-700 text-sm mb-2">{rec.description}</p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleFeedback(rec.title, true)}
//                     className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                       feedbackState.helpful.includes(rec.title) ? "bg-green-500 text-white" : "bg-green-100 hover:bg-green-200 text-green-800"
//                     }`}
//                   >
//                     <ThumbsUp size={16} /> Helpful
//                   </button>
//                   <button
//                     onClick={() => handleFeedback(rec.title, false)}
//                     className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                       feedbackState.notHelpful.includes(rec.title) ? "bg-red-500 text-white" : "bg-red-100 hover:bg-red-200 text-red-800"
//                     }`}
//                   >
//                     <ThumbsDown size={16} /> Not Helpful
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {goalRecs.length > 0 && (
//           <div className="recommendation-section">
//             <h4 className="flex items-center text-green-600 font-medium mb-2">
//               <Target size={20} className="mr-2" />
//               SMART Health Goals
//             </h4>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               {goalRecs.map((goal, i) => (
//                 <li key={i}>{goal}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {(lifestyleRecs.length > 0 || clinicalRecs.length > 0) && !feedbackSent && (
//           <div className="mt-6 text-right">
//             <button
//               onClick={submitFeedback}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
//             >
//               Submit Feedback
//             </button>
//           </div>
//         )}

//         {feedbackSent && <p className="text-green-600 mt-3 font-medium">✅ Feedback recorded — thank you!</p>}

//         {!lifestyleRecs.length && !clinicalRecs.length && !goalRecs.length && (
//           <p className="text-gray-600 text-sm mt-2">No personalized recommendations available.</p>
//         )}
//       </div>

//       {/* DISCLAIMER */}
//       <div className="disclaimer flex items-center gap-2 text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
//         <AlertCircle size={18} className="text-yellow-600" />
//         <div>
//           <strong>Note:</strong> These insights are educational only — not a medical diagnosis.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsPage;

// // src/pages/ResultsPage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Cell,
//   LineChart,
//   Line,
//   Legend,
// } from "recharts";
// import {
//   AlertCircle,
//   Activity,
//   Stethoscope,
//   Target,
//   ThumbsUp,
//   ThumbsDown,
//   FileText,
//   TrendingUp,
// } from "lucide-react";
// import { getUserProgress } from "../services/api";

// /**
//  * ResultsPage
//  * Shows prediction result, SHAP insights, personalized progress, and recommendations.
//  */
// const ResultsPage = ({ result }) => {
//   const navigate = useNavigate();
//   const [feedbackSent, setFeedbackSent] = useState(false);
//   const [feedbackState, setFeedbackState] = useState({ helpful: [], notHelpful: [] });
//   const [progressData, setProgressData] = useState([]);

//   // Fetch progress tracker data
//   useEffect(() => {
//     const fetchProgress = async () => {
//       try {
//         const res = await getUserProgress();
//         if (res.success) setProgressData(res.data);
//       } catch (err) {
//         console.error("Error fetching progress:", err);
//       }
//     };
//     fetchProgress();
//   }, []);

//   if (!result) {
//     return (
//       <div className="page-card text-center py-20 text-gray-600 text-lg">
//         Please complete your assessment first.
//       </div>
//     );
//   }

//   // Safe accessors
//   const risk_score = Number(result.risk_score ?? 0);
//   const risk_category = result.risk_category ?? "Unknown";
//   const shap_values = result.shap_values ?? {};
//   const recommendations = result.recommendations ?? {};
//   const lifestyleRecs = recommendations.Lifestyle ?? [];
//   const clinicalRecs = recommendations.Clinical ?? [];
//   const goalRecs = recommendations.Goals ?? [];

//   // Prepare SHAP data
//   const importanceData = Object.entries(shap_values)
//     .map(([feature, value]) => ({ name: feature.replace(/_/g, " "), contribution: Math.abs(Number(value)) }))
//     .sort((a, b) => b.contribution - a.contribution)
//     .slice(0, 10);

//   const directionalData = Object.entries(shap_values)
//     .map(([feature, value]) => ({ name: feature.replace(/_/g, " "), contribution: Number(value) }))
//     .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
//     .slice(0, 10);

//   const riskColor =
//     risk_category === "Low" ? "success" : risk_category === "Moderate" ? "warning" : "danger";

//   // Handle feedback buttons
//   const handleFeedback = (title, isHelpful) => {
//     setFeedbackState((prev) => {
//       const helpful = new Set(prev.helpful);
//       const notHelpful = new Set(prev.notHelpful);

//       if (isHelpful) {
//         helpful.add(title);
//         notHelpful.delete(title);
//       } else {
//         notHelpful.add(title);
//         helpful.delete(title);
//       }
//       return { helpful: Array.from(helpful), notHelpful: Array.from(notHelpful) };
//     });
//   };

//   // Submit feedback
//   const submitFeedback = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const payload = {
//         risk_score,
//         risk_category,
//         feedback: feedbackState,
//         recommendations,
//         features: result.features || {},
//       };

//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL || "http://127.0.0.1:5001"}/api/feedback`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//           body: JSON.stringify(payload),
//         }
//       );
//       const data = await res.json();
//       if (data.success) {
//         setFeedbackSent(true);
//       } else {
//         console.error("Feedback failed:", data.error);
//         alert("Failed to submit feedback.");
//       }
//     } catch (err) {
//       console.error("Feedback submission error:", err);
//       alert("Feedback submission error. See console.");
//     }
//   };

//   return (
//     <div className="results-container max-w-6xl mx-auto py-8 px-6 space-y-8">
//       {/* =========================
//           🩺 RISK OVERVIEW
//       ========================== */}
//       <div className={`risk-card risk-${riskColor}`}>
//         <h2 className="text-2xl font-semibold mb-2">Your Diabetes Risk</h2>
//         <div className="risk-score text-5xl font-bold">{(risk_score * 100).toFixed(1)}%</div>
//         <div className="risk-category text-lg mt-1">{risk_category} Risk</div>

//         <div className="mt-6">
//           <button
//             onClick={() => navigate("/report", { state: { latestResult: result } })}
//             className="inline-flex items-center gap-2 bg-white text-indigo-700 border border-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
//           >
//             <FileText size={18} /> View Full Health Report (PDF)
//           </button>
//         </div>
//       </div>

//       {/* =========================
//           🧩 SHAP EXPLAINABILITY
//       ========================== */}
//       <div className="page-card">
//         <h3 className="text-xl font-semibold mb-4">🧩 Explainable AI — SHAP Insights</h3>

//         {Object.keys(shap_values).length === 0 ? (
//           <p className="text-gray-600">No explainability data available for this prediction.</p>
//         ) : (
//           <>
//             <p className="text-gray-600 text-sm mb-4">
//               These charts show which features influenced the prediction. Importance = absolute impact;
//               Directional chart shows whether the feature increased (positive) or decreased (negative) risk.
//             </p>

//             {/* Feature importance chart */}
//             <div className="mb-8">
//               <h4 className="text-lg font-semibold mb-3">📊 Feature Importance (Overall Impact)</h4>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={importanceData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" interval={0} angle={-35} textAnchor="end" height={70} />
//                   <YAxis />
//                   <Tooltip formatter={(val) => `${val.toFixed(4)} (abs. SHAP)`} />
//                   <defs>
//                     <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
//                       <stop offset="0%" stopColor="#60a5fa" />
//                       <stop offset="100%" stopColor="#2563eb" />
//                     </linearGradient>
//                   </defs>
//                   <Bar dataKey="contribution" barSize={24} radius={[6, 6, 0, 0]} fill="url(#blueGradient)" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Directional SHAP chart */}
//             <div className="mb-6">
//               <h4 className="text-lg font-semibold mb-3">⚖️ SHAP Impact (Increase vs Decrease)</h4>
//               <ResponsiveContainer width="100%" height={350}>
//                 <BarChart layout="vertical" data={directionalData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis type="number" tickFormatter={(v) => v.toFixed(2)} />
//                   <YAxis type="category" dataKey="name" width={240} />
//                   <Tooltip
//                     formatter={(value) =>
//                       `${value > 0 ? "+" : ""}${value.toFixed(4)} ${
//                         value > 0 ? "↑ Increases risk" : "↓ Reduces risk"
//                       }`
//                     }
//                   />
//                   <defs>
//                     <linearGradient id="redGradient" x1="0" x2="1">
//                       <stop offset="0%" stopColor="#f87171" />
//                       <stop offset="100%" stopColor="#ef4444" />
//                     </linearGradient>
//                     <linearGradient id="greenGradient" x1="0" x2="1">
//                       <stop offset="0%" stopColor="#6ee7b7" />
//                       <stop offset="100%" stopColor="#10b981" />
//                     </linearGradient>
//                   </defs>

//                   <Bar dataKey="contribution" barSize={18} radius={[4, 4, 4, 4]}>
//                     {directionalData.map((d, idx) => (
//                       <Cell
//                         key={`cell-${idx}`}
//                         fill={d.contribution >= 0 ? "url(#redGradient)" : "url(#greenGradient)"}
//                       />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Top SHAP features */}
//             <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
//               <h4 className="text-lg font-medium mb-2 text-gray-800">🔥 Top 3 Risk Drivers</h4>
//               <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
//                 {Object.entries(shap_values)
//                   .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
//                   .slice(0, 3)
//                   .map(([feature, value], i) => (
//                     <li key={i}>
//                       <strong>{feature.replace(/_/g, " ")}</strong>{" "}
//                       {Number(value) > 0
//                         ? "is contributing to a higher diabetes risk."
//                         : "is helping reduce your overall risk."}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           </>
//         )}
//       </div>

//       {/* =========================
//           📈 PERSONALIZED PROGRESS TRACKER
//       ========================== */}
//       <div className="page-card">
//         <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//           <TrendingUp size={22} className="text-indigo-600" /> Your Health Progress Over Time
//         </h3>
//         {progressData.length === 0 ? (
//           <p className="text-gray-600 text-sm">
//             No progress data available yet — complete more assessments to see trends.
//           </p>
//         ) : (
//           <>
//             <p className="text-gray-600 text-sm mb-3">
//               Tracks how your BMI, stress level, and predicted risk changed across your past assessments.
//             </p>
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart data={progressData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis
//                   yAxisId="left"
//                   orientation="left"
//                   tickFormatter={(v) => v.toFixed(1)}
//                 />
//                 <YAxis
//                   yAxisId="right"
//                   orientation="right"
//                   tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
//                 />
//                 <Tooltip />
//                 <Legend />
//                 <Line yAxisId="left" type="monotone" dataKey="BMI" stroke="#60a5fa" strokeWidth={2} name="BMI" />
//                 <Line yAxisId="left" type="monotone" dataKey="PSS_Score" stroke="#f59e0b" strokeWidth={2} name="Stress Score" />
//                 <Line yAxisId="left" type="monotone" dataKey="Sleep_Hours" stroke="#10b981" strokeWidth={2} name="Sleep (hrs)" />
//                 <Line yAxisId="right" type="monotone" dataKey="risk_score" stroke="#ef4444" strokeWidth={3} name="Predicted Risk" dot />
//               </LineChart>
//             </ResponsiveContainer>
//           </>
//         )}
//       </div>

//       {/* =========================
//           💡 PERSONALIZED RECOMMENDATIONS + FEEDBACK
//       ========================== */}
//       <div className="page-card">
//         <h3 className="text-xl font-semibold mb-4">💡 Personalized Recommendations</h3>

//         {lifestyleRecs.length > 0 && (
//           <div className="recommendation-section mb-6">
//             <h4 className="flex items-center text-blue-600 font-medium mb-2">
//               <Activity size={20} className="mr-2" />
//               Lifestyle Recommendations
//             </h4>
//             {lifestyleRecs.map((rec, i) => (
//               <div key={i} className="recommendation-box bg-blue-50 p-3 rounded mb-3 shadow-sm">
//                 <h5 className="font-semibold">{rec.title}</h5>
//                 <p className="text-gray-700 text-sm mb-2">{rec.description}</p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleFeedback(rec.title, true)}
//                     className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                       feedbackState.helpful.includes(rec.title)
//                         ? "bg-green-500 text-white"
//                         : "bg-green-100 hover:bg-green-200 text-green-800"
//                     }`}
//                   >
//                     <ThumbsUp size={16} /> Helpful
//                   </button>
//                   <button
//                     onClick={() => handleFeedback(rec.title, false)}
//                     className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                       feedbackState.notHelpful.includes(rec.title)
//                         ? "bg-red-500 text-white"
//                         : "bg-red-100 hover:bg-red-200 text-red-800"
//                     }`}
//                   >
//                     <ThumbsDown size={16} /> Not Helpful
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {clinicalRecs.length > 0 && (
//           <div className="recommendation-section mb-6">
//             <h4 className="flex items-center text-red-600 font-medium mb-2">
//               <Stethoscope size={20} className="mr-2" />
//               Clinical Recommendations
//             </h4>
//             {clinicalRecs.map((rec, i) => (
//               <div key={i} className="recommendation-box bg-red-50 p-3 rounded mb-3 shadow-sm">
//                 <h5 className="font-semibold">{rec.title}</h5>
//                 <p className="text-gray-700 text-sm mb-2">{rec.description}</p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleFeedback(rec.title, true)}
//                     className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                       feedbackState.helpful.includes(rec.title)
//                         ? "bg-green-500 text-white"
//                         : "bg-green-100 hover:bg-green-200 text-green-800"
//                     }`}
//                   >
//                     <ThumbsUp size={16} /> Helpful
//                   </button>
//                   <button
//                     onClick={() => handleFeedback(rec.title, false)}
//                     className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                       feedbackState.notHelpful.includes(rec.title)
//                         ? "bg-red-500 text-white"
//                         : "bg-red-100 hover:bg-red-200 text-red-800"
//                     }`}
//                   >
//                     <ThumbsDown size={16} /> Not Helpful
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {goalRecs.length > 0 && (
//           <div className="recommendation-section">
//             <h4 className="flex items-center text-green-600 font-medium mb-2">
//               <Target size={20} className="mr-2" />
//               SMART Health Goals
//             </h4>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               {goalRecs.map((goal, i) => (
//                 <li key={i}>{goal}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {(lifestyleRecs.length > 0 || clinicalRecs.length > 0) && !feedbackSent && (
//           <div className="mt-6 text-right">
//             <button
//               onClick={submitFeedback}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
//             >
//               Submit Feedback
//             </button>
//           </div>
//         )}

//         {feedbackSent && (
//           <p className="text-green-600 mt-3 font-medium">✅ Feedback recorded — thank you!</p>
//         )}

//         {!lifestyleRecs.length && !clinicalRecs.length && !goalRecs.length && (
//           <p className="text-gray-600 text-sm mt-2">
//             No personalized recommendations available.
//           </p>
//         )}
//       </div>

//       {/* =========================
//           ⚠️ DISCLAIMER
//       ========================== */}
//       <div className="disclaimer flex items-center gap-2 text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
//         <AlertCircle size={18} className="text-yellow-600" />
//         <div>
//           <strong>Note:</strong> These insights are educational only — not a medical diagnosis.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsPage;



// src/pages/ResultsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  AlertCircle,
  Activity,
  Stethoscope,
  Target,
  ThumbsUp,
  ThumbsDown,
  FileText,
  TrendingUp,
} from "lucide-react";
import { getUserProgress } from "../services/api";

/**
 * ResultsPage
 * Shows prediction result, SHAP insights, personalized progress, and recommendations.
 */
const ResultsPage = ({ result }) => {
  const navigate = useNavigate();
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackState, setFeedbackState] = useState({ helpful: [], notHelpful: [] });
  const [progressData, setProgressData] = useState([]);

  // Fetch personalized progress data
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await getUserProgress();
        if (res.success) setProgressData(res.data);
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };
    fetchProgress();
  }, []);

  if (!result) {
    return (
      <div className="page-card text-center py-20 text-gray-600 text-lg">
        Please complete your assessment first.
      </div>
    );
  }

  // Safe accessors
  const risk_score = Number(result.risk_score ?? 0);
  const risk_category = result.risk_category ?? "Unknown";
  const shap_values = result.shap_values ?? {};
  const recommendations = result.recommendations ?? {};
  const lifestyleRecs = recommendations.Lifestyle ?? [];
  const clinicalRecs = recommendations.Clinical ?? [];
  const goalRecs = recommendations.Goals ?? [];

  // SHAP data preparation
  const importanceData = Object.entries(shap_values)
    .map(([feature, value]) => ({ name: feature.replace(/_/g, " "), contribution: Math.abs(Number(value)) }))
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 10);

  const directionalData = Object.entries(shap_values)
    .map(([feature, value]) => ({ name: feature.replace(/_/g, " "), contribution: Number(value) }))
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
    .slice(0, 10);

  const riskColor =
    risk_category === "Low" ? "success" : risk_category === "Moderate" ? "warning" : "danger";

  // Feedback button logic
  const handleFeedback = (title, isHelpful) => {
    setFeedbackState((prev) => {
      const helpful = new Set(prev.helpful);
      const notHelpful = new Set(prev.notHelpful);

      if (isHelpful) {
        helpful.add(title);
        notHelpful.delete(title);
      } else {
        notHelpful.add(title);
        helpful.delete(title);
      }
      return { helpful: Array.from(helpful), notHelpful: Array.from(notHelpful) };
    });
  };

  // Feedback submission
  const submitFeedback = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        risk_score,
        risk_category,
        feedback: feedbackState,
        recommendations,
        features: result.features || {},
      };

      const res = await fetch(
        `${process.env.REACT_APP_API_URL || "http://127.0.0.1:5001"}/api/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (data.success) {
        setFeedbackSent(true);
      } else {
        console.error("Feedback failed:", data.error);
        alert("Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Feedback submission error:", err);
      alert("Feedback submission error. See console.");
    }
  };

  return (
    <div className="results-container max-w-6xl mx-auto py-8 px-6 space-y-8">
      {/* =========================
          🩺 RISK OVERVIEW
      ========================== */}
      <div className={`risk-card risk-${riskColor}`}>
        <h2 className="text-2xl font-semibold mb-2">Your Diabetes Risk</h2>
        <div className="risk-score text-5xl font-bold">{(risk_score * 100).toFixed(1)}%</div>
        <div className="risk-category text-lg mt-1">{risk_category} Risk</div>

        <div className="mt-6">
          <button
            onClick={() => navigate("/report", { state: { latestResult: result } })}
            className="inline-flex items-center gap-2 bg-white text-indigo-700 border border-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
          >
            <FileText size={18} /> View Full Health Report (PDF)
          </button>
        </div>
      </div>

      {/* =========================
          🧩 SHAP EXPLAINABILITY
      ========================== */}
      <div className="page-card">
        <h3 className="text-xl font-semibold mb-4">🧩 Explainable AI — SHAP Insights</h3>

        {Object.keys(shap_values).length === 0 ? (
          <p className="text-gray-600">No explainability data available for this prediction.</p>
        ) : (
          <>
            <p className="text-gray-600 text-sm mb-4">
              These charts show which features influenced the prediction. Importance = absolute impact;
              Directional chart shows whether the feature increased (positive) or decreased (negative) risk.
            </p>

            {/* Feature importance chart */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3">📊 Feature Importance (Overall Impact)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={importanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" interval={0} angle={-35} textAnchor="end" height={70} />
                  <YAxis />
                  <Tooltip formatter={(val) => `${val.toFixed(4)} (abs. SHAP)`} />
                  <defs>
                    <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                  <Bar dataKey="contribution" barSize={24} radius={[6, 6, 0, 0]} fill="url(#blueGradient)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Directional SHAP chart */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">⚖️ SHAP Impact (Increase vs Decrease)</h4>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart layout="vertical" data={directionalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(v) => v.toFixed(2)} />
                  <YAxis type="category" dataKey="name" width={240} />
                  <Tooltip
                    formatter={(value) =>
                      `${value > 0 ? "+" : ""}${value.toFixed(4)} ${
                        value > 0 ? "↑ Increases risk" : "↓ Reduces risk"
                      }`
                    }
                  />
                  <defs>
                    <linearGradient id="redGradient" x1="0" x2="1">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                    <linearGradient id="greenGradient" x1="0" x2="1">
                      <stop offset="0%" stopColor="#6ee7b7" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>

                  <Bar dataKey="contribution" barSize={18} radius={[4, 4, 4, 4]}>
                    {directionalData.map((d, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={d.contribution >= 0 ? "url(#redGradient)" : "url(#greenGradient)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top SHAP features */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-lg font-medium mb-2 text-gray-800">🔥 Top 3 Risk Drivers</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {Object.entries(shap_values)
                  .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
                  .slice(0, 3)
                  .map(([feature, value], i) => (
                    <li key={i}>
                      <strong>{feature.replace(/_/g, " ")}</strong>{" "}
                      {Number(value) > 0
                        ? "is contributing to a higher diabetes risk."
                        : "is helping reduce your overall risk."}
                    </li>
                  ))}
              </ul>
            </div>
          </>
        )}
      </div>
          {/* =========================
        🎯 FEATURE IMPACT GAUGES (3 in One Row - Horizontal)
    ========================= */}
    {Object.keys(shap_values).length > 0 && (
      <div className="page-card">
        <h3 className="text-xl font-semibold mb-4">🎯 Feature Impact Gauges</h3>
        <p className="text-gray-600 text-sm mb-6">
          These gauges show how strongly each top feature influenced your predicted diabetes risk.
        </p>

        {/* 👇 Horizontal Flex Layout for 3 Gauges */}
        <div className="flex justify-center items-center gap-10 flex-wrap">
          {Object.entries(shap_values)
            .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
            .slice(0, 3)
            .map(([feature, value], idx) => {
              const gaugeVal = Math.min(Math.abs(value) * 200, 100); // convert SHAP to %
              const color = value > 0 ? "#ef4444" : "#10b981";
              const textColor = value > 0 ? "text-red-600" : "text-green-600";

              return (
                <div
                  key={idx}
                  className="relative flex flex-col items-center bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
                  style={{
                    width: "230px",
                    height: "260px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Radial Gauge */}
                  <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
                    <RadialBarChart
                      width={180}
                      height={180}
                      cx="50%"
                      cy="50%"
                      innerRadius="65%"
                      outerRadius="100%"
                      barSize={14}
                      data={[{ name: "impact", value: gaugeVal, fill: color }]}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <RadialBar
                        minAngle={15}
                        clockWise
                        dataKey="value"
                        cornerRadius={10}
                        background
                      />
                    </RadialBarChart>

                    {/* Centered Value */}
                    <div
                      className="absolute flex flex-col items-center justify-center"
                      style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                    >
                      <div className={`font-bold text-lg ${textColor}`}>{gaugeVal.toFixed(0)}%</div>
                      <div className="text-xs text-gray-600">Impact</div>
                    </div>
                  </div>

                  {/* Label Below Gauge */}
                  <div className="text-center mt-3">
                    <h5 className="font-semibold text-gray-800 text-sm">
                      {feature.replace(/_/g, " ")}
                    </h5>
                    <p className={`text-xs mt-1 ${value > 0 ? "text-red-500" : "text-green-500"}`}>
                      {value > 0 ? "↑ Increases Risk" : "↓ Reduces Risk"}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    )}

      {/* =========================
          📈 PERSONALIZED PROGRESS TRACKER
      ========================== */}
      <div className="page-card">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={22} className="text-indigo-600" /> Your Health Progress Over Time
        </h3>
        {progressData.length === 0 ? (
          <p className="text-gray-600 text-sm">
            No progress data available yet — complete more assessments to see trends.
          </p>
        ) : (
          <>
            <p className="text-gray-600 text-sm mb-3">
              Tracks how your BMI, stress level, and predicted risk changed across your past assessments.
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickFormatter={(v) => v.toFixed(1)}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="BMI" stroke="#60a5fa" strokeWidth={2} name="BMI" />
                <Line yAxisId="left" type="monotone" dataKey="PSS_Score" stroke="#f59e0b" strokeWidth={2} name="Stress Score" />
                <Line yAxisId="left" type="monotone" dataKey="Sleep_Hours" stroke="#10b981" strokeWidth={2} name="Sleep (hrs)" />
                <Line yAxisId="right" type="monotone" dataKey="risk_score" stroke="#ef4444" strokeWidth={3} name="Predicted Risk" dot />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </div>

      {/* =========================
          💡 PERSONALIZED RECOMMENDATIONS + FEEDBACK
      ========================== */}
      <div className="page-card">
        <h3 className="text-xl font-semibold mb-4">💡 Personalized Recommendations</h3>

        {lifestyleRecs.length > 0 && (
          <div className="recommendation-section mb-6">
            <h4 className="flex items-center text-blue-600 font-medium mb-2">
              <Activity size={20} className="mr-2" />
              Lifestyle Recommendations
            </h4>
            {lifestyleRecs.map((rec, i) => (
              <div key={i} className="recommendation-box bg-blue-50 p-3 rounded mb-3 shadow-sm">
                <h5 className="font-semibold">{rec.title}</h5>
                <p className="text-gray-700 text-sm mb-2">{rec.description}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleFeedback(rec.title, true)}
                    className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
                      feedbackState.helpful.includes(rec.title)
                        ? "bg-green-500 text-white"
                        : "bg-green-100 hover:bg-green-200 text-green-800"
                    }`}
                  >
                    <ThumbsUp size={16} /> Helpful
                  </button>
                  <button
                    onClick={() => handleFeedback(rec.title, false)}
                    className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
                      feedbackState.notHelpful.includes(rec.title)
                        ? "bg-red-500 text-white"
                        : "bg-red-100 hover:bg-red-200 text-red-800"
                    }`}
                  >
                    <ThumbsDown size={16} /> Not Helpful
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {clinicalRecs.length > 0 && (
          <div className="recommendation-section mb-6">
            <h4 className="flex items-center text-red-600 font-medium mb-2">
              <Stethoscope size={20} className="mr-2" />
              Clinical Recommendations
            </h4>
            {clinicalRecs.map((rec, i) => (
              <div key={i} className="recommendation-box bg-red-50 p-3 rounded mb-3 shadow-sm">
                <h5 className="font-semibold">{rec.title}</h5>
                <p className="text-gray-700 text-sm mb-2">{rec.description}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleFeedback(rec.title, true)}
                    className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
                      feedbackState.helpful.includes(rec.title)
                        ? "bg-green-500 text-white"
                        : "bg-green-100 hover:bg-green-200 text-green-800"
                    }`}
                  >
                    <ThumbsUp size={16} /> Helpful
                  </button>
                  <button
                    onClick={() => handleFeedback(rec.title, false)}
                    className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
                      feedbackState.notHelpful.includes(rec.title)
                        ? "bg-red-500 text-white"
                        : "bg-red-100 hover:bg-red-200 text-red-800"
                    }`}
                  >
                    <ThumbsDown size={16} /> Not Helpful
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {goalRecs.length > 0 && (
          <div className="recommendation-section">
            <h4 className="flex items-center text-green-600 font-medium mb-2">
              <Target size={20} className="mr-2" />
              SMART Health Goals
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {goalRecs.map((goal, i) => (
                <li key={i}>{goal}</li>
              ))}
            </ul>
          </div>
        )}

        {(lifestyleRecs.length > 0 || clinicalRecs.length > 0) && !feedbackSent && (
          <div className="mt-6 text-right">
            <button
              onClick={submitFeedback}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
            >
              Submit Feedback
            </button>
          </div>
        )}

        {feedbackSent && (
          <p className="text-green-600 mt-3 font-medium">✅ Feedback recorded — thank you!</p>
        )}

        {!lifestyleRecs.length && !clinicalRecs.length && !goalRecs.length && (
          <p className="text-gray-600 text-sm mt-2">
            No personalized recommendations available.
          </p>
        )}
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer flex items-center gap-2 text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
        <AlertCircle size={18} className="text-yellow-600" />
        <div>
          <strong>Note:</strong> These insights are educational only — not a medical diagnosis.
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
