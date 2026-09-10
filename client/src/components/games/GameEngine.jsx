import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, Clock, Zap, Lightbulb, CheckCircle2, AlertTriangle, 
  RotateCcw, ArrowRight, Award, ShieldCheck, Trophy, Sparkles 
} from 'lucide-react';
import { LivesDisplay } from '../common/LivesDisplay';
import { ProgressBar } from '../common/ProgressBar';
import { CyberCharacter } from '../companion/CyberCharacter';
import { PhishingInspector } from './mechanics/PhishingInspector';
import { FakeLoginAudit } from './mechanics/FakeLoginAudit';
import { ChatSimulator } from './mechanics/ChatSimulator';
import { LinkInspector } from './mechanics/LinkInspector';
import { PasswordFortress } from './mechanics/PasswordFortress';
import { QRScanner } from './mechanics/QRScanner';
import { EmergencyTriage } from './mechanics/EmergencyTriage';
import { GenericInteractive } from './mechanics/GenericInteractive';
import { useSound } from '../../context/SoundContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

export const GameEngine = ({ game, levels = [], initialLevel = 1, onGameComplete }) => {
  const navigate = useNavigate();
  const { play } = useSound();
  const { refreshUser } = useAuth();

  const [currentLevelIdx, setCurrentLevelIdx] = useState(initialLevel - 1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(1);
  const [mistakesList, setMistakesList] = useState([]);
  const [showHint, setShowHint] = useState(false);

  // Decision & Explanation state
  const [selectedAction, setSelectedAction] = useState(null);
  const [explanationState, setExplanationState] = useState(null); // { isCorrect, explanation, scoreDelta, costLife }
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [companionMood, setCompanionMood] = useState('idle');
  const [companionMessage, setCompanionMessage] = useState('Inspect all elements before deciding.');

  // Timer state
  const currentLevel = levels[currentLevelIdx] || levels[0] || {};
  const [timeLeft, setTimeLeft] = useState(currentLevel.timeLimit || 0);

  // Reset timer on level change
  useEffect(() => {
    if (currentLevel.timeLimit && currentLevel.timeLimit > 0) {
      setTimeLeft(currentLevel.timeLimit);
    } else {
      setTimeLeft(0);
    }
    setSelectedAction(null);
    setExplanationState(null);
    setShowHint(false);
    setCompanionMood('idle');
    setCompanionMessage('Examine the parameters carefully, Agent.');
  }, [currentLevelIdx, currentLevel]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || explanationState !== null || isGameOver || isGameFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, explanationState, isGameOver, isGameFinished]);

  const handleTimeOut = () => {
    play.error();
    const newLives = lives - 1;
    setLives(newLives);
    setCombo(1);
    setCompanionMood('warning');
    setCompanionMessage('Time ran out! Fast response is crucial in cyber defense.');

    setExplanationState({
      isCorrect: false,
      explanation: 'Time expired! In an emergency, delays give adversaries more time to compromise systems.',
      scoreDelta: -20,
      costLife: true
    });

    if (newLives <= 0) {
      setIsGameOver(true);
    }
  };

  const handleActionClick = async (action) => {
    if (explanationState !== null || isGameOver || isGameFinished) return;

    play.click();
    setSelectedAction(action.id);

    const isCorrect = action.isCorrect;
    const scoreDelta = action.scoreDelta || (isCorrect ? 100 : -30);
    const costLife = action.costLife || !isCorrect;

    if (isCorrect) {
      play.success();
      if (combo > 1) play.combo();

      const speedBonus = timeLeft > 0 ? Math.round(timeLeft * 2) : 10;
      const comboMultiplier = combo;
      const pointsEarned = Math.round((scoreDelta + speedBonus) * comboMultiplier);

      setScore((prev) => prev + pointsEarned);
      setCombo((prev) => Math.min(prev + 1, 4));
      setCompanionMood('cheering');
      setCompanionMessage('Brilliant work! Threat neutralized.');

      setExplanationState({
        isCorrect: true,
        explanation: action.explanation,
        scoreDelta: pointsEarned,
        speedBonus,
        comboMultiplier,
        costLife: false
      });
    } else {
      play.error();
      const nextLives = lives - (costLife ? 1 : 0);
      setLives(nextLives);
      setCombo(1);
      setMistakesList((prev) => [...prev, { level: currentLevel.levelNumber, reason: action.explanation }]);
      setCompanionMood('warning');
      setCompanionMessage('Vulnerability triggered! Review the threat breakdown.');

      setExplanationState({
        isCorrect: false,
        explanation: action.explanation,
        scoreDelta,
        costLife
      });

      if (nextLives <= 0) {
        setIsGameOver(true);
      }
    }
  };

  const handleProceedNext = async () => {
    play.click();

    // Check if this was the final level
    if (currentLevelIdx >= levels.length - 1) {
      // Complete Game!
      play.badge();
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      setIsGameFinished(true);

      // Submit level result to API
      try {
        await api.post('/progress/submit-level', {
          gameId: game._id,
          levelNumber: currentLevel.levelNumber,
          scoreEarned: score,
          livesRemaining: lives,
          passed: true,
          mistakes: mistakesList
        });
        refreshUser();
      } catch (err) {
        console.error('Error submitting final game result:', err);
      }

      if (onGameComplete) onGameComplete(score);
    } else {
      // Submit individual level result in background
      try {
        api.post('/progress/submit-level', {
          gameId: game._id,
          levelNumber: currentLevel.levelNumber,
          scoreEarned: explanationState?.scoreDelta || 100,
          livesRemaining: lives,
          passed: true
        });
        refreshUser();
      } catch (e) {}

      setCurrentLevelIdx((prev) => prev + 1);
    }
  };

  const handleRetry = () => {
    play.click();
    setLives(3);
    setScore((prev) => Math.max(0, prev - 100));
    setCombo(1);
    setIsGameOver(false);
    setSelectedAction(null);
    setExplanationState(null);
    setCompanionMood('idle');
    setCompanionMessage('Ready for another attempt? You got this!');
  };

  const progressPercent = Math.round(((currentLevelIdx + 1) / (levels.length || 10)) * 100);

  // Render sub-mechanic based on game.mechanicType
  const renderGameMechanic = () => {
    switch (game.mechanicType) {
      case 'phishing-inspector':
        return <PhishingInspector scenario={currentLevel.scenario || {}} redFlags={currentLevel.redFlags || []} />;
      case 'fake-login':
        return <FakeLoginAudit scenario={currentLevel.scenario || {}} />;
      case 'chat-simulator':
        return <ChatSimulator scenario={currentLevel.scenario || {}} />;
      case 'link-inspector':
        return <LinkInspector scenario={currentLevel.scenario || {}} />;
      case 'password-vault':
        return <PasswordFortress scenario={currentLevel.scenario || {}} />;
      case 'qr-scanner':
      case 'speed-rush':
        return <QRScanner scenario={currentLevel.scenario || {}} />;
      case 'emergency-triage':
      case 'final-escape-room':
        return <EmergencyTriage scenario={currentLevel.scenario || {}} timeRemaining={timeLeft} />;
      default:
        return <GenericInteractive gameTitle={game.title} scenario={currentLevel.scenario || {}} />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 select-none animate-fade-in">
      {/* 1. TOP STATUS BAR */}
      <div className="p-4 rounded-2xl cyber-panel border-cyber-border/60 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        {/* Game Title & Level */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl text-cyber-muted hover:text-cyber-text hover:bg-white/10 transition-colors"
            title="Exit Game"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-[11px] font-mono text-cyber-secondary font-bold uppercase tracking-wider">
              {game.topic?.districtName || 'CYBER WORLD'} • {game.title}
            </div>
            <div className="font-cyber font-black text-lg sm:text-xl text-cyber-text">
              STAGE {currentLevel.levelNumber || currentLevelIdx + 1} / {levels.length || 10}
            </div>
          </div>
        </div>

        {/* Lives, Score, Timer, Combo */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Combo Multiplier */}
          {combo > 1 && (
            <div className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/60 text-amber-300 font-mono font-bold text-xs flex items-center gap-1 animate-pulse">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{combo}x COMBO</span>
            </div>
          )}

          {/* Countdown Timer (if timed) */}
          {currentLevel.timeLimit > 0 && (
            <div className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 border ${
              timeLeft <= 10 ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 animate-bounce' : 'bg-black/40 text-cyber-text border-cyber-border/40'
            }`}>
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{timeLeft}s</span>
            </div>
          )}

          {/* Score Counter */}
          <div className="px-3.5 py-1.5 rounded-xl bg-black/50 border border-cyber-border/50 text-xs font-mono">
            <span className="text-cyber-muted mr-1.5">SCORE</span>
            <strong className="text-cyber-primary text-sm font-bold">{score}</strong>
          </div>

          {/* Lives Display */}
          <LivesDisplay lives={lives} maxLives={3} />
        </div>
      </div>

      {/* 2. STAGE QUESTION & INSTRUCTIONS BAR */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyber-primary/15 via-cyber-card to-cyber-bg border border-cyber-border shadow-lg space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-cyber font-bold text-sm sm:text-base text-white">
            <Sparkles className="w-4 h-4 text-cyber-primary animate-pulse" />
            <span>{currentLevel.title || `Stage ${currentLevelIdx + 1} Assessment`}</span>
          </div>

          {currentLevel.hints && currentLevel.hints.length > 0 && (
            <button
              onClick={() => {
                setShowHint(!showHint);
                play.click();
              }}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold transition-colors shrink-0"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>{showHint ? 'Hide Intel' : 'Tactical Intel'}</span>
            </button>
          )}
        </div>

        <p className="text-xs sm:text-sm font-mono text-cyan-200 leading-relaxed pl-6">
          {currentLevel.instructions || 'Inspect the threat vectors and select the safest security response.'}
        </p>
      </div>

      {/* Expandable Hint Box */}
      {showHint && currentLevel.hints && (
        <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/40 text-xs font-mono text-amber-200 animate-fade-in space-y-1">
          <span className="font-bold flex items-center gap-1.5 text-amber-400">
            <Lightbulb className="w-4 h-4" /> Tactical Defense Intel:
          </span>
          {currentLevel.hints.map((hint, idx) => (
            <p key={idx} className="pl-5 text-amber-100/90">• {hint}</p>
          ))}
        </div>
      )}

      {/* 3. CENTER GAMEPLAY AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3 space-y-6">
          <div key={currentLevelIdx} className="animate-fade-in">
            {renderGameMechanic()}
          </div>

          {/* Action Decision Buttons */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyber-muted uppercase tracking-wider font-bold">
                Select Defensive Action for Stage {currentLevelIdx + 1}:
              </span>
              <span className="text-cyber-secondary font-bold">
                {currentLevel.actions?.length || 3} Distinct Choices Available
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(currentLevel.actions || []).map((action, idx) => {
                const isChosen = selectedAction === action.id;
                const optionLetter = String.fromCharCode(65 + idx); // 'A', 'B', 'C'
                let btnStyle = 'bg-white/5 hover:bg-white/10 text-cyber-text border-cyber-border/50 hover:border-cyber-primary hover:shadow-neon-sm';

                if (explanationState !== null) {
                  if (action.isCorrect) {
                    btnStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]';
                  } else if (isChosen && !action.isCorrect) {
                    btnStyle = 'bg-rose-500/20 text-rose-300 border-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]';
                  } else {
                    btnStyle = 'opacity-40 bg-black/40 text-cyber-muted border-transparent';
                  }
                }

                return (
                  <button
                    key={action.id || idx}
                    onClick={() => handleActionClick(action)}
                    disabled={explanationState !== null || isGameOver}
                    className={`p-4 rounded-xl font-mono text-xs text-left font-bold border transition-all duration-200 flex flex-col justify-between min-h-[90px] group ${btnStyle}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-5 h-5 rounded-full bg-cyber-primary/20 border border-cyber-primary/50 flex items-center justify-center text-[10px] text-cyan-300 font-black">
                          {optionLetter}
                        </span>
                        {explanationState !== null && action.isCorrect && (
                          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Correct
                          </span>
                        )}
                      </div>
                      <span className="leading-snug block">{action.label}</span>
                    </div>

                    {explanationState !== null && isChosen && !action.isCorrect && (
                      <span className="text-[10px] text-rose-400 font-bold flex items-center gap-1 mt-2">
                        <AlertTriangle className="w-3 h-3" /> Risky Selection
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cyber Guide Companion Widget in Sidebar */}
        <div className="hidden lg:flex flex-col items-center justify-center p-4 rounded-2xl cyber-panel border-cyber-border/40 text-center sticky top-24">
          <CyberCharacter
            mood={companionMood}
            message={companionMessage}
            size="md"
            showBubble={true}
          />
          <div className="mt-4 pt-3 border-t border-cyber-border/30 w-full text-center">
            <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block">GUIDE STATUS</span>
            <span className="text-xs font-mono font-bold text-cyber-primary capitalize">{companionMood} Mode</span>
          </div>
        </div>
      </div>

      {/* 4. INSTANT EXPLANATION DRAWER */}
      {explanationState && (
        <div className={`p-5 rounded-2xl cyber-panel border-2 transition-all duration-300 animate-fade-in ${
          explanationState.isCorrect ? 'border-emerald-500/70 bg-emerald-950/20' : 'border-rose-500/70 bg-rose-950/20'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {explanationState.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="font-cyber font-bold text-base text-emerald-400">✓ GOOD DECISION</span>
                    <span className="text-xs font-mono text-emerald-300 font-bold ml-2">
                      +{explanationState.scoreDelta} PTS {explanationState.comboMultiplier > 1 && `(${explanationState.comboMultiplier}x)`}
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <span className="font-cyber font-bold text-base text-rose-400">✕ RISKY DECISION</span>
                    {explanationState.costLife && (
                      <span className="text-xs font-mono text-rose-300 font-bold ml-2">-1 HEART PENALTY</span>
                    )}
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm font-mono text-cyber-text leading-relaxed">
                {explanationState.explanation}
              </p>
            </div>

            {!isGameOver && (
              <button
                onClick={handleProceedNext}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-cyber-primary hover:bg-cyber-primary/90 text-white shadow-neon-sm flex items-center justify-center gap-2 shrink-0 transition-all hover:scale-105"
              >
                <span>{currentLevelIdx >= levels.length - 1 ? 'Finish Challenge' : 'Next Stage'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 5. GAME OVER MODAL */}
      {isGameOver && (
        <div className="p-6 rounded-2xl cyber-panel border-2 border-rose-500 text-center space-y-4 shadow-[0_0_40px_rgba(239,68,68,0.3)] animate-fade-in">
          <div className="text-4xl">💔</div>
          <h3 className="font-cyber font-black text-2xl text-rose-400">BREACH DETECTED — GAME OVER</h3>
          <p className="text-xs font-mono text-cyber-muted max-w-md mx-auto">
            You lost all lives on this attempt. Don't worry! Security is mastered through analysis and iterative practice.
          </p>
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 max-w-md mx-auto text-left text-xs font-mono space-y-1">
            <span className="text-cyber-muted block font-bold">Incident Log:</span>
            <p className="text-rose-300">• Score Accumulated: {score} pts</p>
            <p className="text-rose-300">• Stage Reached: Stage {currentLevel.levelNumber}</p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleRetry}
              className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_15px_#ef4444] flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Retry Level
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-white/10 hover:bg-white/20 text-cyber-text"
            >
              Exit to District
            </button>
          </div>
        </div>
      )}

      {/* 6. GAME COMPLETE CELEBRATION MODAL */}
      {isGameFinished && (
        <div className="p-8 rounded-2xl cyber-panel border-2 border-emerald-400 text-center space-y-5 shadow-[0_0_40px_rgba(16,185,129,0.3)] animate-holo animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-3xl">
            🏆
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              CHALLENGE CLEARED
            </span>
            <h2 className="font-cyber font-black text-2xl sm:text-3xl text-white">
              {game.title} Completed!
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto font-mono text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-cyber-muted block text-[10px]">FINAL SCORE</span>
              <strong className="text-base text-amber-400">{score}</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-cyber-muted block text-[10px]">LIVES SAVED</span>
              <strong className="text-base text-rose-400">{lives} / 3</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
              <span className="text-cyber-muted block text-[10px]">XP EARNED</span>
              <strong className="text-base text-cyber-primary">+{game.xpReward || 500} XP</strong>
            </div>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-cyber-primary hover:bg-cyber-primary/80 text-white shadow-neon flex items-center gap-2 transition-all hover:scale-105"
            >
              <Award className="w-4 h-4" /> Return to District Hub
            </button>
          </div>
        </div>
      )}

      {/* 7. BOTTOM PROGRESS BAR */}
      <div className="p-4 rounded-xl cyber-panel border-cyber-border/40">
        <ProgressBar progress={progressPercent} label={`Challenge Progress: Stage ${currentLevelIdx + 1} of ${levels.length || 10}`} showText={true} />
      </div>
    </div>
  );
};
