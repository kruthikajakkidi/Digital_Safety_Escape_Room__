import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, User, Mail, ArrowRight, AlertCircle, Palette } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';

export const RegisterPage = () => {
  const { register, guestLogin } = useAuth();
  const { play } = useSound();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [themePreference, setThemePreference] = useState('neon-purple');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) return;

    play.click();
    setSubmitting(true);
    setError('');

    try {
      await register({ username, email, password, themePreference });
      play.success();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
      play.error();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 select-none animate-fade-in">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-cyber-primary/20 border border-cyber-primary mx-auto flex items-center justify-center shadow-neon">
            <Shield className="w-7 h-7 text-cyber-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-cyber font-black tracking-wider text-white">
            OPERATOR ONBOARDING
          </h1>
          <p className="text-xs font-mono text-cyber-muted">
            Register your cybersecurity agent credentials
          </p>
        </div>

        <div className="p-8 rounded-2xl cyber-panel border-cyber-border shadow-2xl space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-xs font-mono text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-cyber-muted block mb-1.5 font-bold">OPERATOR CALLSIGN / USERNAME</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. CyberViper99"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-cyber-border text-cyber-text focus:outline-none focus:border-cyber-primary"
                />
                <User className="w-4 h-4 text-cyber-muted absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="text-cyber-muted block mb-1.5 font-bold">COMMUNICATION EMAIL</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@cyberworld.net"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-cyber-border text-cyber-text focus:outline-none focus:border-cyber-primary"
                />
                <Mail className="w-4 h-4 text-cyber-muted absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="text-cyber-muted block mb-1.5 font-bold">PASSPHRASE</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-cyber-border text-cyber-text focus:outline-none focus:border-cyber-primary"
                />
                <Lock className="w-4 h-4 text-cyber-muted absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="text-cyber-muted block mb-1.5 font-bold">INITIAL THEME PALETTE</label>
              <select
                value={themePreference}
                onChange={(e) => setThemePreference(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-cyber-border text-cyber-text focus:outline-none focus:border-cyber-primary"
              >
                <option value="neon-purple">Neon Purple (Futuristic / AI)</option>
                <option value="cyber-red">Cyber Red (High Risk Alert)</option>
                <option value="matrix-green">Matrix Green (Hacker Defense)</option>
                <option value="clean-cyber">Clean Cyber (Crisp Light)</option>
                <option value="soft-digital">Soft Digital (Mint Light)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl font-bold bg-cyber-primary hover:bg-cyber-primary/90 text-white shadow-neon flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>{submitting ? 'Creating Profile...' : 'Initialize Dossier'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="text-center text-xs font-mono text-cyber-muted">
          Already registered?{' '}
          <Link to="/login" className="text-cyber-primary hover:underline font-bold">
            Sign In to Existing Mainframe
          </Link>
        </div>
      </div>
    </div>
  );
};
