import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CyberBackground } from './components/layout/CyberBackground';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TopicsOverviewPage } from './pages/TopicsOverviewPage';
import { TopicDetailsPage } from './pages/TopicDetailsPage';
import { GamePlayPage } from './pages/GamePlayPage';
import { BadgesPage } from './pages/BadgesPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Home Route: Shows Landing Page if unauthenticated, Dashboard if logged in
const HomeRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-cyber-primary">
        <div className="w-10 h-10 rounded-xl border-2 border-cyber-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return user ? <DashboardPage /> : <LandingPage />;
};

// Protected Route Guard
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-cyber-primary">
        <div className="w-10 h-10 rounded-xl border-2 border-cyber-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const App = () => {
  return (
    <ThemeProvider>
      <SoundProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen flex flex-col relative bg-cyber-bg text-cyber-text selection:bg-cyber-primary selection:text-white transition-colors duration-300">
              <CyberBackground />
              <Navbar />

              <main className="flex-1 z-10">
                <Routes>
                  {/* Home: Landing Page (Pre-login) or Dashboard (Post-login) */}
                  <Route path="/" element={<HomeRoute />} />

                  {/* Public Landing & Authentication Routes */}
                  <Route path="/about" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/badges" element={<BadgesPage />} />

                  {/* Protected Operational Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/topics"
                    element={
                      <ProtectedRoute>
                        <TopicsOverviewPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/topics/:slug"
                    element={
                      <ProtectedRoute>
                        <TopicDetailsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/play/:slug"
                    element={
                      <ProtectedRoute>
                        <GamePlayPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </SoundProvider>
    </ThemeProvider>
  );
};

export default App;
