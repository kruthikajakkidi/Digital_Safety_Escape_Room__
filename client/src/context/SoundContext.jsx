 import React, { createContext, useContext, useState } from 'react';
import { sound } from '../utils/sound';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  const play = {
    click: () => sound.playClick(),
    success: () => sound.playSuccess(),
    error: () => sound.playError(),
    badge: () => sound.playBadgeFanfare(),
    combo: () => sound.playCombo()
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, play }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
