// API utility module
// Uses VITE_API_URL if defined (e.g. Render backend URL 'https://digital-safety-escape-room.onrender.com/api')
// Otherwise defaults to '/api' for Vite local dev proxy
const rawBase = import.meta.env.VITE_API_URL || '/api';
const API_BASE = rawBase.replace(/\/+$/, '');

export const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('cyber_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    };

    try {
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const response = await fetch(`${API_BASE}${cleanEndpoint}`, {
        ...options,
        headers
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } catch (error) {
      console.error(`[API Error: ${endpoint}]`, error.message);
      throw error;
    }
  },

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  },

  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
};
