// API Configuration
// Hardcoded production URL to avoid any environment variable issues
export const API_URL = 'https://api.codereader.app';

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

