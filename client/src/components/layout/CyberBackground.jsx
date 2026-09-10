import React from 'react';

export const CyberBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-pattern opacity-40" />

      {/* Radial Ambient Glows */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[140px] opacity-25"
        style={{ background: 'var(--cyber-primary)' }}
      />
      <div 
        className="absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-[160px] opacity-20"
        style={{ background: 'var(--cyber-secondary)' }}
      />
      <div 
        className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full blur-[150px] opacity-20"
        style={{ background: 'var(--cyber-accent)' }}
      />
    </div>
  );
};
