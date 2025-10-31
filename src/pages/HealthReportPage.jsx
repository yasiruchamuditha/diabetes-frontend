// src/pages/HealthReportPage.jsx
import React, { useState } from "react";
import {
  downloadLatestReport,
  downloadReportById,
  generateReportPreview,
} from "../services/api";

const HealthReportPage = ({ latestResult }) => {
  const [status, setStatus] = useState("");

  const downloadBlob = (blobOrArrayBuffer, filename) => {
    // Accept either Blob or ArrayBuffer
    const blob = blobOrArrayBuffer instanceof Blob
      ? blobOrArrayBuffer
      : new Blob([blobOrArrayBuffer], { type: "application/pdf" });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadLatest = async () => {
    try {
      setStatus("Downloading latest report...");
      const blob = await downloadLatestReport();
      if (!blob) {
        alert("No report available.");
        setStatus("");
        return;
      }
      downloadBlob(blob, "health_report_latest.pdf");
    } catch (err) {
      console.error(err);
      alert(
        "Failed to download latest report. Make sure you are logged in and have generated a result."
      );
    } finally {
      setStatus("");
    }
  };

  const handleDownloadById = async (predictionId) => {
    try {
      if (!predictionId) {
        alert("No prediction id provided.");
        return;
      }
      setStatus("Downloading report by ID...");
      const blob = await downloadReportById(predictionId);
      if (!blob) {
        alert("Report not found for that ID.");
        setStatus("");
        return;
      }
      downloadBlob(blob, `health_report_${predictionId}.pdf`);
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
      // Pass the prediction object or ID depending on your API design.
      // This implementation sends the whole latestResult object to the preview endpoint.
      const blob = await generateReportPreview(latestResult);
      if (!blob) {
        alert("Preview generation failed or returned no data.");
        setStatus("");
        return;
      }
      downloadBlob(blob, "health_report_preview.pdf");
    } catch (err) {
      console.error(err);
      alert("Preview generation failed.");
    } finally {
      setStatus("");
    }
  };

  // backend returns _id; accept either _id or prediction_id_str or id
  const predictionId =
    latestResult?.prediction_id_str || latestResult?._id || latestResult?.id || null;

  return (
    <div className="page-card">
      <h2>🩺 Health Report</h2>
      {!latestResult && <p>No report yet — run an assessment first.</p>}

      <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
        <button
          className="btn btn-primary"
          onClick={handlePreview}
          disabled={!latestResult || !!status}
        >
          Preview Report (from current result)
        </button>

        <button
          className="btn btn-success"
          onClick={handleDownloadLatest}
          disabled={!!status}
        >
          Download Latest (My Report)
        </button>

        <button
          className="btn btn-outline"
          onClick={() => handleDownloadById(predictionId)}
          disabled={!predictionId || !!status}
          title={!predictionId ? "No prediction id available" : ""}
        >
          Download By ID
        </button>
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
