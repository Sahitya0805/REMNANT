import React, { useEffect, useState } from 'react';
import type { OrderMemory } from '../types/memory';
import { TimelineGenerator } from '../ai/timelineGenerator';
import confetti from 'canvas-confetti';
import { Gift, X, Sparkles, Trophy, Heart, Flame, ArrowRight, ArrowLeft } from 'lucide-react';

interface FoodWrappedModalProps {
  isOpen: boolean;
  onClose: () => void;
  memories: OrderMemory[];
}

export const FoodWrappedModal: React.FC<FoodWrappedModalProps> = ({
  isOpen,
  onClose,
  memories
}) => {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const wrappedStats = TimelineGenerator.generateFoodWrapped(memories);

  const slides = [
    {
      title: 'Your Year in Commerce Memories',
      subtitle: `${wrappedStats.year} Recap`,
      value: `${wrappedStats.totalMemories} Memories Saved`,
      desc: `You transformed ${wrappedStats.totalMemories} raw Swiggy purchases into searchable lifelong context memories!`,
      icon: Gift,
      color: 'from-purple-600 via-pink-600 to-amber-500'
    },
    {
      title: 'Top Go-To Sanctuary',
      subtitle: 'Most Frequency & Memory Score',
      value: wrappedStats.topRestaurant,
      desc: 'Your top sanctuary for focus coffee & victory biryani celebrations!',
      icon: Trophy,
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Dominant Mood Signature',
      subtitle: 'AI Emotion Classification',
      value: wrappedStats.dominantMood,
      desc: 'High-octane exam focus + victory celebrations with college roommates.',
      icon: Flame,
      color: 'from-red-500 to-pink-600'
    },
    {
      title: 'Most Emotional Memory',
      subtitle: 'Milestone Highlight',
      value: wrappedStats.mostEmotionalMemory.title,
      desc: wrappedStats.mostEmotionalMemory.storyNarrative,
      icon: Heart,
      color: 'from-pink-600 to-rose-500'
    },
    {
      title: 'Pantry & Savings Score',
      subtitle: 'Instamart & Swiggy One Impact',
      value: `₹${wrappedStats.moneySavedWithOffers} Saved`,
      desc: `Maintained an ${wrappedStats.healthScore}% health score with clean breakfast smoothie bowls and organic staples!`,
      icon: Sparkles,
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const currentSlide = slides[slideIdx];
  const Icon = currentSlide.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
      <div className="relative glass-panel rounded-3xl max-w-md w-full p-8 border border-purple-500/40 text-center space-y-6 bg-slate-900 shadow-2xl overflow-hidden min-h-[480px] flex flex-col justify-between">
        
        <div className={`absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-r ${currentSlide.color} opacity-20 blur-3xl`} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex gap-1.5 z-10">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                idx === slideIdx ? 'bg-purple-400' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        <div className="space-y-4 z-10 py-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 mx-auto flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Icon className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-1">
            <div className="text-xs uppercase font-extrabold tracking-widest text-amber-400">{currentSlide.subtitle}</div>
            <h3 className="text-2xl font-extrabold text-white">{currentSlide.title}</h3>
          </div>

          <div className="text-3xl font-extrabold gradient-text py-2">
            {currentSlide.value}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed px-4">
            {currentSlide.desc}
          </p>
        </div>

        <div className="flex items-center justify-between z-10 pt-2 border-t border-white/10">
          <button
            onClick={() => setSlideIdx(Math.max(0, slideIdx - 1))}
            disabled={slideIdx === 0}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="text-xs text-slate-400 font-semibold">{slideIdx + 1} / {slides.length}</span>

          <button
            onClick={() => {
              if (slideIdx < slides.length - 1) {
                setSlideIdx(slideIdx + 1);
              } else {
                onClose();
              }
            }}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1 transition-all"
          >
            <span>{slideIdx === slides.length - 1 ? 'Done' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
