import React, { useState, useCallback, memo } from 'react';
import { 
    User, Brain, Activity, AlertTriangle, 
    FileText, BarChart3, Target, ChevronLeft, ChevronRight,
    CheckCircle, AlertCircle 
} from 'lucide-react';
import { submitAssessment } from './services/api';
import './App.css';

const App = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [allData, setAllData] = useState({
        demographics: {},
        stress: Array(10).fill(null),
        lifestyle: {},
        symptoms: {},
        medicalHistory: {},
        medicalData: {}
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const pages = [
        { id: 0, name: 'Demographics', icon: User },
        { id: 1, name: 'Stress (PSS-10)', icon: Brain },
        { id: 2, name: 'Lifestyle', icon: Activity },
        { id: 3, name: 'Symptoms', icon: AlertTriangle },
        { id: 4, name: 'Medical History', icon: FileText },
        { id: 5, name: 'Medical Data', icon: BarChart3 },
        { id: 6, name: 'Results', icon: Target }
    ];

    // Use useCallback to prevent unnecessary re-renders
    const updateData = useCallback((section, data) => {
        setAllData(prev => ({ ...prev, [section]: data }));
    }, []);

    const nextPage = useCallback(() => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    }, [currentPage, pages.length]);

    const prevPage = useCallback(() => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    }, [currentPage]);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        
        try {
            console.log('📤 Submitting assessment...');
            const response = await submitAssessment(allData);
            
            if (response.success) {
                console.log('✅ Assessment successful!');
                setResult(response.data);
                setCurrentPage(6);
            } else {
                setError(response.error || 'Assessment failed');
            }
        } catch (err) {
            console.error('❌ Submission error:', err);
            setError(err.message || 'Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    const PageContent = () => {
        switch(currentPage) {
            case 0: return <DemographicsPage data={allData.demographics} onChange={(d) => updateData('demographics', d)} />;
            case 1: return <StressPage data={allData.stress} onChange={(d) => updateData('stress', d)} />;
            case 2: return <LifestylePage data={allData.lifestyle} onChange={(d) => updateData('lifestyle', d)} />;
            case 3: return <SymptomsPage data={allData.symptoms} onChange={(d) => updateData('symptoms', d)} />;
            case 4: return <MedicalHistoryPage data={allData.medicalHistory} onChange={(d) => updateData('medicalHistory', d)} />;
            case 5: return <MedicalDataPage data={allData.medicalData} onChange={(d) => updateData('medicalData', d)} />;
            case 6: return <ResultsPage result={result} allData={allData} />;
            default: return null;
        }
    };

    return (
        <div className="app">
            {/* Header */}
            <div className="app-header">
                <div className="container">
                    <h1>🏥 Diabetes Risk Assessment</h1>
                    <p>AI-Powered Health Screening for Sri Lankan Youth</p>
                    
                    {/* Progress Indicator */}
                    <div className="progress-bar">
                        {pages.map((page, idx) => {
                            const Icon = page.icon;
                            return (
                                <div key={page.id} className="progress-step-wrapper">
                                    <div className={`progress-step ${idx === currentPage ? 'active' : idx < currentPage ? 'completed' : ''}`}>
                                        <Icon size={20} />
                                        <span className="step-name">{page.name}</span>
                                    </div>
                                    {idx < pages.length - 1 && <div className={`progress-line ${idx < currentPage ? 'completed' : ''}`} />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container main-content">
                <PageContent />
                
                {/* Error Message */}
                {error && (
                    <div className="error-box">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}
                
                {/* Navigation */}
                {currentPage < 6 && (
                    <div className="navigation">
                        {currentPage > 0 && (
                            <button onClick={prevPage} className="btn btn-secondary">
                                <ChevronLeft size={20} />
                                Previous
                            </button>
                        )}
                        {currentPage < 5 ? (
                            <button onClick={nextPage} className="btn btn-primary">
                                Next
                                <ChevronRight size={20} />
                            </button>
                        ) : (
                            <button onClick={handleSubmit} disabled={loading} className="btn btn-success">
                                {loading ? '⏳ Analyzing...' : '🔍 Get Risk Assessment'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// ============================================
// MEMOIZED PAGE COMPONENTS (Prevents re-renders)
// ============================================

const DemographicsPage = memo(({ data, onChange }) => {
    const handleChange = useCallback((field, value) => {
        onChange({ ...data, [field]: value });
    }, [data, onChange]);

    return (
        <div className="page-card">
            <h2>📋 Personal Information</h2>
            <p className="subtitle">Tell us about yourself</p>
            
            <div className="form-group">
                <label>Age *</label>
                <input
                    type="number"
                    min="16"
                    max="30"
                    value={data.age || ''}
                    onChange={(e) => handleChange('age', e.target.value)}
                    placeholder="Enter your age (16-30)"
                />
            </div>

            <div className="form-group">
                <label>Gender *</label>
                <div className="button-group">
                    {['male', 'female', 'other'].map(g => (
                        <button
                            key={g}
                            type="button"
                            className={`btn ${data.gender === g ? 'btn-selected' : 'btn-outline'}`}
                            onClick={() => handleChange('gender', g)}
                        >
                            {g.charAt(0).toUpperCase() + g.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Employment Status *</label>
                <select value={data.employment || ''} onChange={(e) => handleChange('employment', e.target.value)}>
                    <option value="">Select status</option>
                    <option value="student">Student</option>
                    <option value="employed">Employed</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="vocational">Vocational Training</option>
                </select>
            </div>

            <div className="form-group">
                <label>Education Level *</label>
                <select value={data.education || ''} onChange={(e) => handleChange('education', e.target.value)}>
                    <option value="">Select level</option>
                    <option value="ol">G.C.E. O/L</option>
                    <option value="al">G.C.E. A/L</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate or Above</option>
                </select>
            </div>
        </div>
    );
});

const StressPage = memo(({ data, onChange }) => {
    const questions = [
        "Been upset because of something unexpected?",
        "Unable to control important things?",
        "Felt nervous and stressed?",
        "Confident handling problems?",
        "Things going your way?",
        "Could not cope with everything?",
        "Control irritations?",
        "Felt on top of things?",
        "Angered by things outside control?",
        "Difficulties piling up?"
    ];

    const handleResponse = useCallback((questionId, value) => {
        const newData = [...data];
        newData[questionId] = value;
        onChange(newData);
    }, [data, onChange]);

    const calculateScore = () => {
        const reverseItems = [3, 4, 6, 7];
        let total = 0;
        data.forEach((val, idx) => {
            if (val !== null) {
                total += reverseItems.includes(idx) ? (4 - val) : val;
            }
        });
        return total;
    };

    const score = calculateScore();
    const isComplete = data.every(r => r !== null);

    return (
        <div className="page-card">
            <h2>🧠 Stress Assessment (PSS-10)</h2>
            <p className="subtitle">In the last month, how often have you:</p>
            
            <div className="scale-legend">
                <span>0 = Never</span>
                <span>1 = Almost Never</span>
                <span>2 = Sometimes</span>
                <span>3 = Fairly Often</span>
                <span>4 = Very Often</span>
            </div>

            {questions.map((q, idx) => (
                <div key={idx} className="question-box">
                    <p className="question">{idx + 1}. {q}</p>
                    <div className="button-group">
                        {[0, 1, 2, 3, 4].map(val => (
                            <button
                                key={val}
                                className={`btn btn-rating ${data[idx] === val ? 'btn-selected' : 'btn-outline'}`}
                                onClick={() => handleResponse(idx, val)}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {isComplete && (
                <div className="score-box">
                    <h3>Your PSS Score: {score}/40</h3>
                    <p>{score <= 13 ? '🟢 Low Stress' : score <= 26 ? '🟡 Moderate Stress' : '🔴 High Stress'}</p>
                </div>
            )}
        </div>
    );
});

const LifestylePage = memo(({ data, onChange }) => {
    const handleChange = useCallback((field, value) => {
        onChange({ ...data, [field]: value });
    }, [data, onChange]);

    return (
        <div className="page-card">
            <h2>🏃 Lifestyle Habits</h2>
            <p className="subtitle">Tell us about your daily routines</p>

            <div className="form-group">
                <label>Fast food meals per week</label>
                <input
                    type="range"
                    min="0"
                    max="7"
                    value={data.fastFood || 0}
                    onChange={(e) => handleChange('fastFood', e.target.value)}
                />
                <div className="range-labels">
                    <span>Never</span>
                    <span>{data.fastFood || 0} times</span>
                    <span>Daily</span>
                </div>
            </div>

            <div className="form-group">
                <label>Exercise days per week</label>
                <input
                    type="number"
                    min="0"
                    max="7"
                    value={data.exercise || ''}
                    onChange={(e) => handleChange('exercise', e.target.value)}
                    placeholder="0-7 days"
                />
            </div>

            <div className="form-group">
                <label>Sleep hours per night</label>
                <input
                    type="number"
                    min="3"
                    max="12"
                    step="0.5"
                    value={data.sleep || ''}
                    onChange={(e) => handleChange('sleep', e.target.value)}
                    placeholder="Hours"
                />
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label>Smoking</label>
                    <select value={data.smoking || ''} onChange={(e) => handleChange('smoking', e.target.value)}>
                        <option value="">Select</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Alcohol</label>
                    <select value={data.alcohol || ''} onChange={(e) => handleChange('alcohol', e.target.value)}>
                        <option value="">Select</option>
                        <option value="no">No</option>
                        <option value="occasionally">Occasionally</option>
                        <option value="regularly">Regularly</option>
                    </select>
                </div>
            </div>
        </div>
    );
});

const SymptomsPage = memo(({ data, onChange }) => {
    const symptoms = [
        "Frequent urination",
        "Extreme thirst",
        "Unexplained weight loss",
        "Fatigue even after rest",
        "Blurry vision",
        "Slow healing wounds",
        "Numbness in hands/feet",
        "Recurring infections"
    ];

    const handleChange = useCallback((key, value) => {
        onChange({ ...data, [key]: value });
    }, [data, onChange]);

    return (
        <div className="page-card">
            <h2>⚠️ Diabetes Risk Symptoms</h2>
            <p className="subtitle">Check any symptoms you've experienced recently</p>

            <div className="symptoms-grid">
                {symptoms.map((symptom, idx) => (
                    <label key={idx} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={data[`symptom_${idx}`] || false}
                            onChange={(e) => handleChange(`symptom_${idx}`, e.target.checked)}
                        />
                        <span>{symptom}</span>
                    </label>
                ))}
            </div>
        </div>
    );
});

const MedicalHistoryPage = memo(({ data, onChange }) => {
    const handleChange = useCallback((field, value) => {
        onChange({ ...data, [field]: value });
    }, [data, onChange]);

    return (
        <div className="page-card">
            <h2>📋 Medical History</h2>
            <p className="subtitle">Information about your health background</p>

            <div className="form-group">
                <label>Family history of diabetes?</label>
                <div className="button-group">
                    {['yes', 'no'].map(opt => (
                        <button
                            key={opt}
                            className={`btn ${data.familyHistory === opt ? 'btn-selected' : 'btn-outline'}`}
                            onClick={() => handleChange('familyHistory', opt)}
                        >
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Previous diabetes diagnosis?</label>
                <select value={data.diagnosis || ''} onChange={(e) => handleChange('diagnosis', e.target.value)}>
                    <option value="">Select</option>
                    <option value="no">No</option>
                    <option value="prediabetes">Prediabetes</option>
                    <option value="type2">Type 2 Diabetes</option>
                </select>
            </div>

            <div className="form-group">
                <label>Hypertension (high blood pressure)?</label>
                <div className="button-group">
                    {['yes', 'no', 'unsure'].map(opt => (
                        <button
                            key={opt}
                            className={`btn ${data.hypertension === opt ? 'btn-selected' : 'btn-outline'}`}
                            onClick={() => handleChange('hypertension', opt)}
                        >
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});

const MedicalDataPage = memo(({ data, onChange }) => {
    const handleChange = useCallback((field, value) => {
        onChange({ ...data, [field]: value });
    }, [data, onChange]);

    return (
        <div className="page-card">
            <h2>🩺 Medical Measurements</h2>
            <p className="subtitle">Enter recent lab results if available (optional)</p>

            <div className="form-grid">
                <div className="form-group">
                    <label>HbA1c (%)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={data.hba1c || ''}
                        onChange={(e) => handleChange('hba1c', e.target.value)}
                        placeholder="e.g., 5.7"
                    />
                    <small>Normal: &lt;5.7%</small>
                </div>

                <div className="form-group">
                    <label>Fasting Blood Sugar (mg/dL)</label>
                    <input
                        type="number"
                        value={data.fbs || ''}
                        onChange={(e) => handleChange('fbs', e.target.value)}
                        placeholder="e.g., 95"
                    />
                    <small>Normal: &lt;100</small>
                </div>

                <div className="form-group">
                    <label>Weight (kg)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={data.weight || ''}
                        onChange={(e) => handleChange('weight', e.target.value)}
                        placeholder="e.g., 65"
                    />
                </div>

                <div className="form-group">
                    <label>Height (cm)</label>
                    <input
                        type="number"
                        value={data.height || ''}
                        onChange={(e) => handleChange('height', e.target.value)}
                        placeholder="e.g., 170"
                    />
                </div>
            </div>
        </div>
    );
});

const ResultsPage = memo(({ result }) => {
    if (!result) return <div className="page-card">Loading results...</div>;

    const { risk_score, risk_category, shap_values, recommendations } = result;
    const riskColor = risk_category === 'Low' ? 'success' : risk_category === 'Moderate' ? 'warning' : 'danger';

    return (
        <div className="results-container">
            <div className={`risk-card risk-${riskColor}`}>
                <h2>Your Risk Assessment</h2>
                <div className="risk-score">{(risk_score * 100).toFixed(0)}%</div>
                <div className="risk-category">{risk_category} Risk</div>
            </div>

            <div className="page-card">
                <h3>🧠 Top Risk Factors</h3>
                {Object.entries(shap_values || {})
                    .sort(([,a], [,b]) => Math.abs(b) - Math.abs(a))
                    .slice(0, 4)
                    .map(([feature, value]) => (
                        <div key={feature} className="factor-item">
                            <div className="factor-header">
                                <span>{feature.replace(/_/g, ' ')}</span>
                                <span className={value > 0 ? 'text-danger' : 'text-success'}>
                                    {value > 0 ? '↑ Increases' : '↓ Decreases'} risk
                                </span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className={`progress-bar-fill ${value > 0 ? 'danger' : 'success'}`}
                                    style={{ width: `${Math.abs(value) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
            </div>

            <div className="page-card">
                <h3>💡 Personalized Recommendations</h3>
                {recommendations?.map((rec, idx) => (
                    <div key={idx} className="recommendation-box">
                        <h4>{rec.title}</h4>
                        <p>{rec.description}</p>
                        <ul>
                            {rec.actions?.map((action, i) => (
                                <li key={i}>
                                    <CheckCircle size={16} />
                                    {action}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="disclaimer">
                <AlertCircle size={20} />
                <div>
                    <strong>Medical Disclaimer:</strong> This assessment is for informational purposes only. 
                    Consult a healthcare professional for proper diagnosis and treatment.
                </div>
            </div>
        </div>
    );
});

export default App;