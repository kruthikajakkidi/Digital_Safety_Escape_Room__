import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const ThemeContext = createContext();

export const THEMES = [
  { id: 'neon-purple', name: 'Neon Purple', type: 'dark', color: '#a855f7', desc: 'Futuristic / AI / Digital' },
  { id: 'cyber-red', name: 'Cyber Red', type: 'dark', color: '#ef4444', desc: 'Alert / Security / High Risk' },
  { id: 'matrix-green', name: 'Matrix Green', type: 'dark', color: '#22c55e', desc: 'Hacker / Terminal / Defense' },
  { id: 'clean-cyber', name: 'Clean Cyber', type: 'light', color: '#6366f1', desc: 'Light base with royal blue/purple accents' },
  { id: 'soft-digital', name: 'Soft Digital', type: 'light', color: '#0d9488', desc: 'Light base with teal & mint accents' }
];

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('cyber_theme') || 'neon-purple';
  });

  useEffect(() => {
    // Remove all previous theme classes
    THEMES.forEach(t => {
      document.documentElement.classList.remove(`theme-${t.id}`);
    });
    // Add current theme class
    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem('cyber_theme', theme);
  }, [theme]);

  const setTheme = async (newTheme) => {
    setThemeState(newTheme);
    const token = localStorage.getItem('cyber_token');
    if (token) {
      try {
        await api.put('/auth/theme', { theme: newTheme });
      } catch (err) {
        // Silently keep local state
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
