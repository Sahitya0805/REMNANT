import React, { useEffect, useState } from 'react';

interface CinematicFoldTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

export const CinematicFoldTransition: React.FC<CinematicFoldTransitionProps> = ({
  isActive,
  onComplete
}) => {
  const [phase, setPhase] = useState<'converge' | 'fold' | 'sync'>('converge');

  useEffect(() => {
    if (!isActive) return;

    setPhase('converge');

    const timer1 = setTimeout(() => {
      setPhase('fold');
    }, 600);

    const timer2 = setTimeout(() => {
      setPhase('sync');
    }, 1200);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090909] text-[#F5F2ED] font-mono-meta overflow-hidden">
      
      {/* Converging Memory Lines Overlay */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${phase === 'converge' ? 'opacity-100' : 'opacity-40'}`}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="50%" y2="50%" stroke="#FF7A1A" strokeWidth="1.5" strokeDasharray="6 6" className="animate-pulse" />
          <line x1="100%" y1="0" x2="50%" y2="50%" stroke="#FF7A1A" strokeWidth="1.5" strokeDasharray="6 6" className="animate-pulse" />
          <line x1="0" y1="100%" x2="50%" y2="50%" stroke="#FF7A1A" strokeWidth="1.5" strokeDasharray="6 6" className="animate-pulse" />
          <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="#FF7A1A" strokeWidth="1.5" strokeDasharray="6 6" className="animate-pulse" />
        </svg>
      </div>

      {/* Screen Inward Fold Effect */}
      <div className={`text-center space-y-4 transition-all duration-700 transform ${
        phase === 'fold' ? 'scale-95 opacity-80' : phase === 'sync' ? 'scale-100 opacity-100' : 'scale-100 opacity-90'
      }`}>
        <div className="w-4 h-4 rounded-full bg-[#FF7A1A] animate-ping mx-auto" />
        
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-widest text-[#F5F2ED] uppercase">
            {phase === 'sync' ? 'SYNCING MEMORIES...' : 'CONVERGING MEMORY PATHS...'}
          </h2>
          <p className="text-xs text-[#A7A29A] italic">
            Accessing subconscious purchase archive
          </p>
        </div>
      </div>

    </div>
  );
};
