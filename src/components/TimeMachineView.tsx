import React, { useState } from 'react';
import type { OrderMemory } from '../types/memory';
import { TimelineGenerator } from '../ai/timelineGenerator';
import { History, RotateCcw, Volume2 } from 'lucide-react';

interface TimeMachineViewProps {
  memories: OrderMemory[];
  onSelectMemory: (mem: OrderMemory) => void;
  onReorder: (mem: OrderMemory) => void;
}

export const TimeMachineView: React.FC<TimeMachineViewProps> = ({
  memories,
  onSelectMemory,
  onReorder
}) => {
  const timelineGroups = TimelineGenerator.generateTimeline(memories);
  const [selectedGroupIdx, setSelectedGroupIdx] = useState<number>(0);
  const [audioAmbientPlaying, setAudioAmbientPlaying] = useState(false);

  const activeGroup = timelineGroups[selectedGroupIdx] || timelineGroups[0];
  const groupTotalSpent = activeGroup.memories.reduce((sum, m) => sum + m.totalAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      
      <div className="glass-panel rounded-3xl p-6 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <History className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              Time Machine — "Take Me Back" <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">Memory Revisit</span>
            </h2>
            <p className="text-xs text-slate-300">Revisit past chapters of your life through food, music, weather, and commerce timeline.</p>
          </div>
        </div>

        <button
          onClick={() => setAudioAmbientPlaying(!audioAmbientPlaying)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
            audioAmbientPlaying
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
              : 'bg-white/5 text-slate-300 border-white/10 hover:border-purple-500/40'
          }`}
        >
          <Volume2 className="w-4 h-4 text-emerald-400" />
          <span>{audioAmbientPlaying ? '🔊 Rain Ambience Playing' : '🔇 Play Weather Ambience'}</span>
        </button>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {timelineGroups.map((group, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedGroupIdx(idx)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all border whitespace-nowrap text-left ${
              selectedGroupIdx === idx
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
                : 'bg-slate-900/80 text-slate-400 border-white/10 hover:border-purple-500/30'
            }`}
          >
            <div className="text-[10px] text-purple-200/80 uppercase">{group.year}</div>
            <div className="text-sm font-extrabold">{group.month}</div>
            {group.eventTitle && (
              <div className="text-[10px] text-amber-300 font-mono pt-0.5">🎉 {group.eventTitle}</div>
            )}
          </button>
        ))}
      </div>

      <div className="glass-panel rounded-3xl p-8 border border-purple-500/30 relative overflow-hidden bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-950">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">Chapter Flashback</span>
            <h3 className="text-3xl font-extrabold text-white">{activeGroup.month} {activeGroup.year}</h3>
            {activeGroup.eventTitle && (
              <p className="text-sm text-purple-300 font-medium">Highlight Event: {activeGroup.eventTitle}</p>
            )}
            <p className="text-xs text-slate-300">Total chapter commerce expenses: <span className="font-extrabold text-white">₹{groupTotalSpent}</span> across {activeGroup.memories.length} memories.</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-1 text-xs">
            <div className="text-slate-400">Chapter Mood Theme:</div>
            <div className="text-amber-300 font-bold text-sm">Focused Late Night & Monsoons 🌧️</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Timeline River ({activeGroup.memories.length} Memories)</h3>

        <div className="space-y-4 relative border-l-2 border-purple-500/30 ml-4 pl-6">
          {activeGroup.memories.map((mem) => (
            <div
              key={mem.id}
              onClick={() => onSelectMemory(mem)}
              className="glass-panel-interactive rounded-2xl p-5 border border-white/10 space-y-3 cursor-pointer relative"
            >
              <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-purple-500 border-2 border-slate-950 shadow-md" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 text-xs text-purple-300 font-bold">
                    <span>{mem.date}</span> • <span>{mem.time}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">{mem.weather}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white pt-1">{mem.title}</h4>
                  <p className="text-xs text-slate-400">{mem.restaurantOrStore}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-base font-extrabold text-white">₹{mem.totalAmount}</div>
                    <div className="text-[10px] text-amber-400 font-semibold">{mem.mood}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReorder(mem);
                    }}
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-1 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reorder
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 text-xs text-slate-300 italic">
                "{mem.storyNarrative}"
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
