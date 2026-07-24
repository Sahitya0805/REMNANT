import React from 'react';
import type { OrderMemory } from '../types/memory';
import { PatternDiscoveryEngine } from '../ai/patternDiscovery';
import { Dna, Flame, Cookie, Coffee, Utensils, Heart, Sparkles, Share2 } from 'lucide-react';

interface MemoryDnaViewProps {
  memories: OrderMemory[];
}

export const MemoryDnaView: React.FC<MemoryDnaViewProps> = ({ memories }) => {
  const tasteDna = PatternDiscoveryEngine.generateTasteDna(memories);

  const dnaTraits = [
    { label: 'Caffeine Affinity', value: tasteDna.coffee, icon: Coffee, color: 'from-amber-600 to-amber-400' },
    { label: 'Comfort Food Ratio', value: tasteDna.comfortFood, icon: Utensils, color: 'from-purple-600 to-pink-500' },
    { label: 'Spicy Craving Index', value: tasteDna.spicy, icon: Flame, color: 'from-red-600 to-orange-500' },
    { label: 'Street Food Explorer', value: tasteDna.streetFood, icon: Utensils, color: 'from-cyan-600 to-blue-500' },
    { label: 'Healthy & Wellness', value: tasteDna.healthy, icon: Heart, color: 'from-emerald-600 to-teal-400' },
    { label: 'Dessert & Sweet Tooth', value: tasteDna.sweet, icon: Cookie, color: 'from-pink-500 to-rose-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      
      <div className="glass-panel rounded-3xl p-6 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Dna className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              Commerce Taste DNA Profile <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">AI Personality</span>
            </h2>
            <p className="text-xs text-slate-300">Instead of raw stats, AI derives your personal commerce & taste profile signature.</p>
          </div>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl text-xs font-bold shadow-md transition-all">
          <Share2 className="w-4 h-4" /> Share Taste DNA Card
        </button>
      </div>

      <div className="glass-panel rounded-3xl p-8 border border-purple-500/30 relative overflow-hidden bg-slate-950">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400">AI Personality Assessment</span>
            <h3 className="text-3xl font-extrabold text-white">"High-Octane Focus & Festive Comfort Seeker"</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your memory graph indicates an 88% affinity for late-night cold brews during work sprints, balanced with celebratory biryani feasts during victory moments.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                ☕ Cold Brew Scholar (91%)
              </span>
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">
                🔥 Spicy Victory Biryani (82%)
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                🌧️ Monsoon Tonkotsu Ramen (88%)
              </span>
            </div>
          </div>

          <div className="space-y-4 bg-slate-900/80 p-6 rounded-2xl border border-white/10">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Taste DNA Breakdown</span>
            </h4>

            {dnaTraits.map((trait, idx) => {
              const Icon = trait.icon;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-purple-400" /> {trait.label}
                    </span>
                    <span className="text-white font-mono">{trait.value}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full bg-gradient-to-r ${trait.color} rounded-full transition-all duration-700`}
                      style={{ width: `${trait.value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
};
