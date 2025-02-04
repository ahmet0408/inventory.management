import { api } from "../../env";


export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const response = await fetch(`${api}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    credentials: 'include' // refresh token cookie üçin
  });

  // Token refresh logic
  if (response.status === 401) {
    try {
      const refreshResponse = await fetch(`${api}/user/refresh-token`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (refreshResponse.ok) {
        const newToken = await refreshResponse.json();
        localStorage.setItem('token', newToken.token);
        
        // Original request-i gaýtadan ýerine ýetirmek
        return fetchWithAuth(endpoint, options);
      } else {
        // Refresh token ýalňyş bolsa, logout etmeli
        window.dispatchEvent(new CustomEvent('logout'));
      }
    } catch (error) {
      console.error('Token refresh error:', error);
    }
  }

  return response;
};