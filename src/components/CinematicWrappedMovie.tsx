import React, { useState, useEffect } from 'react';
import type { OrderMemory } from '../types/memory';
import { TimelineGenerator } from '../ai/timelineGenerator';
import confetti from 'canvas-confetti';
import { Play, Pause, X, ArrowRight, Radio } from 'lucide-react';

interface CinematicWrappedMovieProps {
  isOpen: boolean;
  onClose: () => void;
  memories: OrderMemory[];
}

export const CinematicWrappedMovie: React.FC<CinematicWrappedMovieProps> = ({
  isOpen,
  onClose,
  memories
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isOpen) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  }, [isOpen]);

  const stats = TimelineGenerator.generateFoodWrapped(memories);

  const scenes = [
    {
      chapter: "01 • CHAPTER OPENING",
      title: "MEMORIES 2026",
      stat: `${stats.totalMemories} MEMORIES RECORDED`,
      desc: "Every transaction transformed into lifelong context.",
      icon: Radio
    },
    {
      chapter: "02 • FOCUS RITUAL",
      title: "FOCUS SANCTUARY",
      stat: stats.topRestaurant.toUpperCase(),
      desc: "Your haven for late-night cold brews and victory celebrations.",
      icon: Radio
    },
    {
      chapter: "03 • EMOTIONAL SIGNATURE",
      title: "DOMINANT MOOD",
      stat: stats.dominantMood.toUpperCase(),
      desc: "High-octane exam focus + victory celebrations with college roommates.",
      icon: Radio
    },
    {
      chapter: "04 • MILESTONE HIGHLIGHT",
      title: "MOST EMOTIONAL MEMORY",
      stat: stats.mostEmotionalMemory.title.toUpperCase(),
      desc: stats.mostEmotionalMemory.storyNarrative,
      icon: Radio
    },
    {
      chapter: "05 • PANTRY SAVINGS",
      title: "SAVINGS IMPACT",
      stat: `₹${stats.moneySavedWithOffers} SAVED`,
      desc: `Maintained an ${stats.healthScore}% health score with clean breakfast smoothie bowls!`,
      icon: Radio
    }
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSceneIdx(prev => {
        if (prev >= scenes.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, scenes.length]);

  if (!isOpen) return null;

  const currentScene = scenes[currentSceneIdx];

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between p-8 md:p-14 text-white overflow-hidden font-mono">
      
      {/* Background Ash Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6A00]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Progress Bars */}
      <div className="relative z-10 space-y-4">
        <div className="flex gap-2">
          {scenes.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                idx === currentSceneIdx ? 'bg-[#FF6A00] shadow-[0_0_15px_rgba(255,106,0,0.8)]' : idx < currentSceneIdx ? 'bg-white/40' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-[#FF6A00] font-bold tracking-widest uppercase">
            {currentScene.chapter}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 transition-all border border-white/10"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 transition-all border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8 my-auto">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase font-mono text-[#F8F8F8]">
            {currentScene.title}
          </h2>
          <div className="text-2xl md:text-4xl font-extrabold text-[#FF6A00] tracking-tight py-2 font-mono">
            {currentScene.stat}
          </div>
          <p className="text-sm text-[#8B8B8B] max-w-lg mx-auto leading-relaxed italic">
            "{currentScene.desc}"
          </p>
        </div>
      </div>

      {/* Bottom Scene Controls */}
      <div className="relative z-10 flex items-center justify-between text-xs text-[#8B8B8B] font-mono">
        <button
          onClick={() => setCurrentSceneIdx(Math.max(0, currentSceneIdx - 1))}
          disabled={currentSceneIdx === 0}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold disabled:opacity-30 transition-all border border-white/10"
        >
          PREVIOUS
        </button>

        <span>SCENE {currentSceneIdx + 1} / {scenes.length}</span>

        <button
          onClick={() => {
            if (currentSceneIdx < scenes.length - 1) {
              setCurrentSceneIdx(currentSceneIdx + 1);
            } else {
              onClose();
            }
          }}
          className="px-4 py-2 bg-[#FF6A00] hover:bg-[#FF9A1F] text-black font-extrabold rounded-xl transition-all flex items-center gap-1 shadow-[0_0_15px_rgba(255,106,0,0.4)]"
        >
          <span>{currentSceneIdx === scenes.length - 1 ? 'FINISH' : 'NEXT'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
