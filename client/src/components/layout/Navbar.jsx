import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Award, Trophy, User, LogOut, Volume2, VolumeX, Palette, Menu, X, Flame, ShieldAlert, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/SoundContext';

export const Navbar = () => {
  const { user, logout, guestLogin } = useAuth();
  const { theme, setTheme, themes } = useTheme();
  const { soundEnabled, toggleSound, play } = useSound();
  const [themeDropdown, setThemeDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    play.click();
    logout();
    navigate('/login');
  };

  const navLinks = user
    ? [
        { name: 'Dashboard', path: '/' },
        { name: 'Cyber World', path: '/topics' },
        { name: 'Badges', path: '/badges' },
        { name: 'Leaderboard', path: '/leaderboard' },
        { name: 'Profile', path: '/profile' },
        ...(user.role === 'admin' ? [{ name: 'Admin', path: '/admin' }] : [])
      ]
    : [
        { name: 'Overview', path: '/' },
        { name: 'Features', path: '/about' },
        { name: 'Badges Showcase', path: '/badges' },
        { name: 'Leaderboard', path: '/leaderboard' }
      ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname === path) return true;
    if (path !== '/' && location.pathname.startsWith(path) && path !== '/about') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyber-border/40 bg-cyber-bg/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={() => play.click()}
          className="flex items-center gap-2.5 group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-cyber-primary/20 border border-cyber-primary/60 flex items-center justify-center group-hover:shadow-neon transition-all duration-300">
            <Shield className="w-5 h-5 text-cyber-primary group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-cyber font-black tracking-wider text-base sm:text-lg text-cyber-text leading-tight group-hover:text-cyber-primary transition-colors">
              DIGITAL SAFETY
            </span>
            <span className="text-[10px] font-mono tracking-widest text-cyber-secondary font-bold -mt-0.5">
              ESCAPE ROOM
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => play.click()}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                isActive(link.path)
                  ? 'text-white bg-cyber-primary shadow-neon-sm'
                  : 'text-cyber-muted hover:text-cyber-text hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Tools & User Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak Indicator */}
          {user && (
            <div 
              title={`${user.streakDays || 1} Day Active Cyber Streak!`}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/40 text-orange-400 font-mono text-xs font-bold"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>{user.streakDays || 1}d</span>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleSound();
              play.click();
            }}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            className="p-2 rounded-lg text-cyber-muted hover:text-cyber-text hover:bg-white/5 border border-transparent hover:border-cyber-border/40 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyber-secondary" /> : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>

          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setThemeDropdown(!themeDropdown);
                play.click();
              }}
              title="Change Theme (5 Themes)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-cyber-muted hover:text-cyber-text hover:bg-white/5 border border-cyber-border/40 transition-colors"
            >
              <Palette className="w-3.5 h-3.5 text-cyber-primary" />
              <span className="hidden lg:inline capitalize">{theme.replace('-', ' ')}</span>
            </button>

            {themeDropdown && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-xl cyber-panel border-cyber-border shadow-2xl p-2 z-50 animate-fade-in"
                onMouseLeave={() => setThemeDropdown(false)}
              >
                <div className="px-2 py-1 text-[11px] font-mono text-cyber-muted uppercase tracking-wider font-bold">
                  Select Theme
                </div>
                <div className="space-y-1 mt-1">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeDropdown(false);
                        play.click();
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-mono transition-colors text-left ${
                        theme === t.id ? 'bg-cyber-primary text-white font-bold' : 'hover:bg-white/10 text-cyber-text'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                        <span>{t.name}</span>
                      </div>
                      <span className="text-[10px] opacity-70 uppercase">{t.type}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-cyber-border/40">
              <Link
                to="/profile"
                onClick={() => play.click()}
                className="flex items-center gap-2 group p-1 pr-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-cyber-primary/20 border border-cyber-primary/60 flex items-center justify-center font-cyber font-bold text-xs text-cyber-primary">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-mono font-bold text-cyber-text leading-tight group-hover:text-cyber-primary transition-colors">
                    {user.username}
                  </span>
                  <span className="text-[10px] font-mono text-cyber-secondary">
                    LVL {user.level || 1} • {user.xp || 0} XP
                  </span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-1.5 rounded-lg text-cyber-muted hover:text-cyber-danger hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={async () => {
                  play.click();
                  try {
                    await guestLogin();
                    play.success();
                    navigate('/');
                  } catch (e) {
                    navigate('/login');
                  }
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Guest Play</span>
              </button>
              <Link
                to="/login"
                onClick={() => play.click()}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyber-primary hover:bg-cyber-primary/80 text-white shadow-neon-sm transition-all"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-cyber-muted hover:text-cyber-text hover:bg-white/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cyber-border/40 cyber-panel px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => {
                setMobileMenuOpen(false);
                play.click();
              }}
              className={`block px-3 py-2 rounded-lg text-sm font-mono font-bold ${
                isActive(link.path)
                  ? 'bg-cyber-primary text-white shadow-neon-sm'
                  : 'text-cyber-muted hover:text-cyber-text hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-mono font-bold text-cyber-danger hover:bg-rose-500/10"
            >
              Log Out ({user.username})
            </button>
          )}
        </div>
      )}
    </header>
  );
};
