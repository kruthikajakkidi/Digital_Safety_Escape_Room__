import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight, Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';

export const LoginPage = () => {
  const { login, guestLogin } = useAuth();
  const { play } = useSound();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) return;

    play.click();
    setSubmitting(true);
    setError('');

    try {
      await login(identifier, password);
      play.success();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
      play.error();
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuestPlay = async () => {
    play.click();
    setSubmitting(true);
    setError('');
    try {
      await guestLogin();
      play.success();
      navigate('/');
    } catch (err) {
      setError('Could not initialize guest session');
      play.error();
    } finally {
      setSubmitting(false);
    }
  };

  const fillAdmin = () => {
    setIdentifier('admin@cyberworld.net');
    setPassword('CyberMaster2026!');
    play.click();
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 select-none animate-fade-in">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-cyber-primary/20 border border-cyber-primary mx-auto flex items-center justify-center shadow-neon">
            <Shield className="w-7 h-7 text-cyber-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-cyber font-black tracking-wider text-white">
            MAINFRAME LOGIN
          </h1>
          <p className="text-xs font-mono text-cyber-muted">
            Authenticate to access your Cyber Escape Room dossiers
          </p>
        </div>

        {/* Card Form */}
        <div className="p-8 rounded-2xl cyber-panel border-cyber-border shadow-2xl space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-xs font-mono text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-cyber-muted block mb-1.5 font-bold">USERNAME OR EMAIL</label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="agent@cyberworld.net"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-cyber-border text-cyber-text focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary"
                />
                <User className="w-4 h-4 text-cyber-muted absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="text-cyber-muted block mb-1.5 font-bold">SECURITY PASSPHRASE</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-cyber-border text-cyber-text focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary"
                />
                <Lock className="w-4 h-4 text-cyber-muted absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl font-bold bg-cyber-primary hover:bg-cyber-primary/90 text-white shadow-neon flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>{submitting ? 'Authenticating...' : 'Enter Cyber World'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>


          {/* Quick Demo Fill Pills */}
          <div className="pt-2 border-t border-cyber-border/30 flex items-center justify-between text-[11px] font-mono text-cyber-muted">
            <span>Demo Logins:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  
                  play.click();
                }}
                className="hover:text-cyan-300 underline"
              >
                Player
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={fillAdmin}
                className="hover:text-rose-400 underline"
              >
                Admin
              </button>
            </div>
          </div>

          {/* Instant 1-Click Guest Mode */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleGuestPlay}
              disabled={submitting}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Instant 1-Click Guest Access</span>
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs font-mono text-cyber-muted">
          New Operator?{' '}
          <Link to="/register" className="text-cyber-primary hover:underline font-bold">
            Create Access Credentials
          </Link>
        </div>
      </div>
    </div>
  );
};
