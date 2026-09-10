import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { GameEngine } from '../components/games/GameEngine';

export const GamePlayPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await api.get(`/games/${slug}`);
        if (res.success) {
          setGameData(res);
        }
      } catch (err) {
        console.error('Error loading game gameplay:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center space-y-4 font-mono text-cyber-muted">
        <div className="w-12 h-12 rounded-xl border-2 border-cyber-primary border-t-transparent animate-spin" />
        <span>INITIALIZING ESCAPE ROOM ENVIRONMENT...</span>
      </div>
    );
  }

  if (!gameData || !gameData.game) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center space-y-4 font-mono">
        <h2 className="text-xl text-rose-400 font-bold">Game Sector Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="text-cyber-primary underline text-sm"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const initialLevel = gameData.progress ? Math.min(gameData.progress.highestLevel || 1, (gameData.levels || []).length || 1) : 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <GameEngine
        game={gameData.game}
        levels={gameData.levels}
        initialLevel={initialLevel}
        onGameComplete={() => {
          // Callback after final level completed
        }}
      />
    </div>
  );
};
