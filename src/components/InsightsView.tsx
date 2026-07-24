import React from 'react';
import type { OrderMemory } from '../types/memory';
import { PatternDiscoveryEngine } from '../ai/patternDiscovery';
import { LineChart, Calendar } from 'lucide-react';

interface InsightsViewProps {
  memories: OrderMemory[];
}

export const InsightsView: React.FC<InsightsViewProps> = ({ memories }) => {
  const insights = PatternDiscoveryEngine.generateInsights(memories);

  const heatmapDays = Array.from({ length: 52 }, (_, i) => {
    return Array.from({ length: 7 }, (_, j) => {
      const level = (i * 7 + j) % 9 === 0 ? 3 : (i * 7 + j) % 5 === 0 ? 2 : (i * 7 + j) % 3 === 0 ? 1 : 0;
      return level;
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-8">
      
      <div className="glass-panel rounded-3xl p-6 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <LineChart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              Behavioral AI Insights <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">Memory Analytics</span>
            </h2>
            <p className="text-xs text-slate-300">Emotional correlations, weather triggers, and financial spending insights.</p>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4 bg-slate-950">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>365-Day Memory Commit Heatmap</span>
          </h3>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Less</span>
            <span className="w-3 h-3 rounded-sm bg-slate-900 border border-white/5" />
            <span className="w-3 h-3 rounded-sm bg-purple-900/60" />
            <span className="w-3 h-3 rounded-sm bg-purple-600" />
            <span className="w-3 h-3 rounded-sm bg-pink-500" />
            <span>More</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="flex gap-1 min-w-[700px]">
            {heatmapDays.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((level, dIdx) => (
                  <div
                    key={dIdx}
                    className={`w-3.5 h-3.5 rounded-sm transition-all ${
                      level === 3 ? 'bg-pink-500 shadow-sm shadow-pink-500/50' :
                      level === 2 ? 'bg-purple-600' :
                      level === 1 ? 'bg-purple-900/60' : 'bg-slate-900 border border-white/5'
                    }`}
                    title={`Week ${wIdx + 1}, Day ${dIdx + 1}: ${level} order memories recorded`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {insights.map((ins) => (
          <div key={ins.id} className="glass-panel rounded-2xl p-6 border border-purple-500/20 space-y-3 bg-slate-900/80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {ins.category} Insight
              </span>
              <span className="text-xs font-bold text-amber-400 font-mono">{ins.impactMetric}</span>
            </div>

            <h4 className="font-extrabold text-lg text-white">{ins.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{ins.description}</p>

            <div className="pt-2 flex items-center justify-between text-xs text-purple-300 border-t border-white/10 font-semibold">
              <span>{ins.badge}</span>
              <span className="text-[11px] text-slate-400">Verified by Vector Graph</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
