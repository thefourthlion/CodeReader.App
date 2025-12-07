// API Configuration
// This handles different environments (web vs mobile/Capacitor)

// Production API URL
const PRODUCTION_API = 'https://api.codereader.app';

// For development/testing with Android emulator, use 10.0.2.2 (host's localhost)
// Set to true to test with local server, false for production
const USE_LOCAL_SERVER = true;

// Android emulator uses 10.0.2.2 to access host's localhost
// iOS simulator uses localhost directly
const LOCAL_API_ANDROID = 'http://10.0.2.2:3011';
const LOCAL_API_IOS = 'http://localhost:3011';

// Detect platform
const getApiUrl = (): string => {
  // Check if we're in a browser/Capacitor environment
  if (typeof window !== 'undefined') {
    try {
      // Dynamic import would be better but for static export we check userAgent
      const userAgent = navigator.userAgent.toLowerCase();
      const isAndroid = userAgent.includes('android');
      const isIOS = userAgent.includes('iphone') || userAgent.includes('ipad');
      
      if (USE_LOCAL_SERVER) {
        if (isAndroid) {
          return LOCAL_API_ANDROID;
        } else if (isIOS) {
          return LOCAL_API_IOS;
        }
      }
      
      // For mobile apps in production, use the production API
      if (isAndroid || isIOS) {
        return PRODUCTION_API;
      }
    } catch (e) {
      // If detection fails, use production
    }
  }
  
  // For web, use environment variable or production
  return process.env.NEXT_PUBLIC_API_URL || PRODUCTION_API;
};

export const API_URL = getApiUrl();

// Helper function to make API calls
export async function apiCall(endpoint: string, options?: RequestInit) {
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export default API_URL;

