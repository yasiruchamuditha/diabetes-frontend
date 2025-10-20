import React, { useState } from "react";
import { downloadLatestReport, downloadReportById, generateReportPreview } from "../services/api";

const HealthReportPage = ({ latestResult }) => {
  const [status, setStatus] = useState("");

  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadLatest = async () => {
    try {
      setStatus("Downloading latest report...");
      const res = await downloadLatestReport();
      if (res && res.data) {
        downloadBlob(res.data, "health_report_latest.pdf");
      } else {
        alert("No report available.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to download latest report. Make sure you are logged in and have generated a result.");
    } finally {
      setStatus("");
    }
  };

  const handleDownloadById = async (predictionId) => {
    try {
      setStatus("Downloading report by ID...");
      const res = await downloadReportById(predictionId);
      downloadBlob(res.data, `health_report_${predictionId}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Failed to download report by ID.");
    } finally {
      setStatus("");
    }
  };

  const handlePreview = async () => {
    if (!latestResult) {
      alert("No result object to preview.");
      return;
    }
    try {
      setStatus("Generating preview PDF...");
      const res = await generateReportPreview(latestResult);
      downloadBlob(res.data, "health_report_preview.pdf");
    } catch (err) {
      console.error(err);
      alert("Preview generation failed.");
    } finally {
      setStatus("");
    }
  };

  return (
    <div className="page-card">
      <h2>🩺 Health Report</h2>
      {!latestResult && <p>No report yet — run an assessment first.</p>}

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button className="btn btn-primary" onClick={handlePreview} disabled={!latestResult}>
          Preview Report (from current result)
        </button>
        <button className="btn btn-success" onClick={handleDownloadLatest}>Download Latest (My Report)</button>
        {latestResult?.prediction_id_str && (
          <button className="btn btn-outline" onClick={() => handleDownloadById(latestResult.prediction_id_str)}>
            Download By ID
          </button>
        )}
      </div>

      {status && <p style={{ marginTop: 12 }}>{status}</p>}

      <div style={{ marginTop: 18 }}>
        <h3>Report contents</h3>
        <ul>
          <li>Risk Score & Category</li>
          <li>Key clinical & lifestyle features (Age, BMI, PSS, Sleep, Exercise)</li>
          <li>SHAP feature contributions (top factors)</li>
          <li>Personalized lifestyle & clinical recommendations</li>
        </ul>
      </div>
    </div>
  );
};

export default HealthReportPage;
