import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useTheme } from './ThemeContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setTheme } = useTheme();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('cyber_token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.success && res.user) {
            setUser(res.user);
            if (res.user.themePreference) {
              setTheme(res.user.themePreference);
            }
          }
        } catch (error) {
          console.error('Session expired or invalid token:', error);
          localStorage.removeItem('cyber_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  const login = async (identifier, password) => {
    const res = await api.post('/auth/login', { identifier, password });
    if (res.success && res.token) {
      localStorage.setItem('cyber_token', res.token);
      setUser(res.user);
      if (res.user.themePreference) {
        setTheme(res.user.themePreference);
      }
      return res.user;
    }
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    if (res.success && res.token) {
      localStorage.setItem('cyber_token', res.token);
      setUser(res.user);
      if (res.user.themePreference) {
        setTheme(res.user.themePreference);
      }
      return res.user;
    }
  };

  const guestLogin = async () => {
    const res = await api.post('/auth/guest', {});
    if (res.success && res.token) {
      localStorage.setItem('cyber_token', res.token);
      setUser(res.user);
      return res.user;
    }
  };

  const googleLogin = async (googleData) => {
    const res = await api.post('/auth/google', googleData);
    if (res.success && res.token) {
      localStorage.setItem('cyber_token', res.token);
      setUser(res.user);
      if (res.user.themePreference) {
        setTheme(res.user.themePreference);
      }
      return res.user;
    }
  };

  const logout = () => {
    localStorage.removeItem('cyber_token');
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.success && res.user) {
        setUser(res.user);
      }
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, guestLogin, googleLogin, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
