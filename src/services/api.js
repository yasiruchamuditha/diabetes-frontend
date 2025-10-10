import axios from 'axios';

// Get API URL from environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 30 second timeout for cold starts
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor
api.interceptors.request.use(
    config => {
        console.log(`🌐 API Request: ${config.method.toUpperCase()} ${config.url}`);
        return config;
    },
    error => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor with retry logic
api.interceptors.response.use(
    response => {
        console.log(`✅ API Response: ${response.status}`);
        return response;
    },
    async error => {
        const originalRequest = error.config;
        
        // Handle timeout or 503 (cold start)
        if ((error.code === 'ECONNABORTED' || error.response?.status === 503) 
            && !originalRequest._retry) {
            originalRequest._retry = true;
            
            console.log('⏳ Backend starting up, retrying in 5 seconds...');
            await new Promise(resolve => setTimeout(resolve, 5000));
            return api.request(originalRequest);
        }
        
        console.error('❌ API Error:', error.message);
        return Promise.reject(error);
    }
);

/**
 * Health Check
 */
export const healthCheck = async () => {
    try {
        const response = await api.get('/api/health');
        return response.data;
    } catch (error) {
        throw new Error('Backend is not responding');
    }
};

/**
 * Submit Assessment
 */
export const submitAssessment = async (assessmentData) => {
    try {
        const response = await api.post('/api/predict', assessmentData);
        return response.data;
    } catch (error) {
        if (error.message.includes('timeout')) {
            throw new Error('Request timeout. Please try again in 10 seconds.');
        }
        throw new Error(error.response?.data?.error || error.message);
    }
};

/**
 * Get Explanation
 */
export const getExplanation = async (predictionId) => {
    const response = await api.get(`/api/explain/${predictionId}`);
    return response.data;
};

/**
 * Get Recommendations
 */
export const getRecommendations = async (predictionId) => {
    const response = await api.get(`/api/recommendations/${predictionId}`);
    return response.data;
};

/**
 * Get Statistics
 */
export const getStats = async () => {
    const response = await api.get('/api/stats');
    return response.data;
};

export default api;