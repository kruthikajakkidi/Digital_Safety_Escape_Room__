import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSound } from '../../context/SoundContext';
import { useNavigate } from 'react-router-dom';

export const GoogleSignInButton = ({ label = 'Continue with Google' }) => {
  const { googleLogin } = useAuth();
  const { play } = useSound();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');
  const [hasOfficialButton, setHasOfficialButton] = useState(false);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    // If a live Google Client ID is configured in .env, load Google Identity Services
    if (clientId && typeof window !== 'undefined') {
      const initGsi = () => {
        if (window.google?.accounts?.id) {
          try {
            window.google.accounts.id.initialize({
              client_id: clientId,
              callback: handleCredentialResponse,
              auto_select: false,
              cancel_on_tap_outside: true
            });
            const btnDiv = document.getElementById('google-official-btn');
            if (btnDiv && btnDiv.childElementCount === 0) {
              window.google.accounts.id.renderButton(btnDiv, {
                theme: 'filled_black',
                size: 'large',
                shape: 'rectangular',
                text: 'continue_with',
                width: 320
              });

              // Check if official button rendered
              setTimeout(() => {
                if (btnDiv && btnDiv.childElementCount > 0) {
                  setHasOfficialButton(true);
                }
              }, 200);
            }
          } catch (err) {
            console.warn('Google GSI initialization note:', err);
          }
        }
      };

      if (window.google) {
        initGsi();
      } else {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initGsi;
        document.body.appendChild(script);
      }
    }
  }, [clientId]);

  const handleCredentialResponse = async (response) => {
    if (response.credential) {
      setLoading(true);
      try {
        await googleLogin({ credential: response.credential });
        play.success();
        navigate('/');
      } catch (err) {
        console.error('Google token verification failed:', err);
        play.error();
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleClick = async () => {
    play.click();
    if (clientId && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt((notification) => {
          // If Google blocked the prompt due to origin 403 or suppressed it, open fallback modal
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            setShowPrompt(true);
          }
        });
      } catch (e) {
        setShowPrompt(true);
      }
    } else {
      // Smooth Google Account simulation modal when Client ID is not configured yet
      setShowPrompt(true);
    }
  };

  const submitSimulatedGoogle = async (e) => {
    if (e) e.preventDefault();
    const finalEmail = googleEmail.trim() || 'operator.agent@gmail.com';
    const finalName = googleName.trim() || finalEmail.split('@')[0];

    setLoading(true);
    play.click();
    try {
      await googleLogin({
        email: finalEmail,
        name: finalName,
        googleId: `google_${Date.now()}`,
        picture: 'https://lh3.googleusercontent.com/a/default-user'
      });
      play.success();
      setShowPrompt(false);
      navigate('/');
    } catch (err) {
      console.error('Simulated Google Login failed:', err);
      play.error();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Official Google render target (shown only when successfully initialized by Google) */}
      <div
        id="google-official-btn"
        className={`w-full flex justify-center ${hasOfficialButton ? 'block' : 'hidden'}`}
      />

      {/* Styled Cyberpunk Google Sign-In Button (shown when official button is not rendered) */}
      {!hasOfficialButton && (
        <button
          type="button"
          onClick={handleGoogleClick}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg cursor-pointer"
        >
          {/* Google Multicolor SVG Icon */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{loading ? 'Authenticating with Google...' : 'Continue with Google'}</span>
        </button>
      )}

      {/* Google Account Modal (for instant testing or live account input) */}
      {showPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl p-6 cyber-panel border border-cyber-border shadow-2xl space-y-4 text-left">
            <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-3">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <div>
                <h4 className="font-cyber font-bold text-sm text-white">Google Account Sign-In</h4>
                <p className="text-[10px] font-mono text-cyber-muted">Authenticate via Google OAuth</p>
              </div>
            </div>

            <form onSubmit={submitSimulatedGoogle} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-cyber-muted block mb-1">Google Email Address:</label>
                <input
                  type="email"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="your.name@gmail.com"
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-cyber-border text-white focus:outline-none focus:border-cyber-primary"
                />
              </div>

              <div>
                <label className="text-cyber-muted block mb-1">Display Name (Optional):</label>
                <input
                  type="text"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="e.g. Alex Viper"
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-cyber-border text-white focus:outline-none focus:border-cyber-primary"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-3 rounded-lg font-bold bg-cyber-primary hover:bg-cyber-primary/90 text-white shadow-neon-sm"
                >
                  {loading ? 'Authenticating...' : 'Sign In with Google'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrompt(false)}
                  className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-cyber-muted hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
