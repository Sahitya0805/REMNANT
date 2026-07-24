import React, { useState } from 'react';
import type { OrderMemory, MemoryCapsule, SmartCollection } from '../types/memory';
import { Bookmark, Pin, RotateCcw } from 'lucide-react';

interface SmartCollectionsViewProps {
  memories: OrderMemory[];
  onSelectMemory: (mem: OrderMemory) => void;
  onReorder: (mem: OrderMemory) => void;
}

export const SmartCollectionsView: React.FC<SmartCollectionsViewProps> = ({
  memories,
  onSelectMemory,
  onReorder
}) => {
  const [capsules] = useState<MemoryCapsule[]>([
    {
      id: 'cap-1',
      memoryId: 'mem-101',
      title: 'First Late Night Cold Brew Sprint',
      emoji: '☕',
      pinnedDate: '2026-01-17',
      reminderNote: 'Remember how hard you worked for finals!',
      isAnniversary: false
    },
    {
      id: 'cap-2',
      memoryId: 'mem-103',
      title: 'Mom\'s 50th Birthday Celebration',
      emoji: '🎂',
      pinnedDate: '2025-11-14',
      reminderNote: 'Annual anniversary reminder to order Smoor cake!',
      isAnniversary: true
    }
  ]);

  const smartCollections: SmartCollection[] = [
    {
      id: 'col-1',
      title: 'Rainy Days Comfort',
      description: 'Hot soups, tonkotsu ramen, and warm teas during monsoons.',
      emoji: '🌧️',
      filterTag: 'rain',
      memoryIds: ['mem-105']
    },
    {
      id: 'col-2',
      title: 'Late-Night Coding Fuel',
      description: 'Cold brews, dark chocolate croissants, and tacos after 11 PM.',
      emoji: '💻',
      filterTag: 'late night',
      memoryIds: ['mem-101', 'mem-107']
    },
    {
      id: 'col-3',
      title: 'Victory & Milestone Feasts',
      description: 'Meghana Biryani and Benne Dosa after matches & interviews.',
      emoji: '🏆',
      filterTag: 'ipl',
      memoryIds: ['mem-102', 'mem-106']
    },
    {
      id: 'col-4',
      title: 'Family & Festival Moments',
      description: 'Smoor Belgian cake and Instamart Diwali sweets & diyas.',
      emoji: '❤️',
      filterTag: 'family',
      memoryIds: ['mem-103', 'mem-104']
    }
  ];

  const [activeCollectionId, setActiveCollectionId] = useState<string>('col-1');
  const activeCol = smartCollections.find(c => c.id === activeCollectionId) || smartCollections[0];

  const activeMemories = memories.filter(m => activeCol.memoryIds.includes(m.id) || m.vectorTags.includes(activeCol.filterTag));

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-8">
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Pin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Memory Capsules (Pinned Milestones)</h2>
              <p className="text-xs text-slate-400">Lifelong pinned purchases with automated anniversary reminders.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capsules.map((cap) => {
            const mem = memories.find(m => m.id === cap.memoryId);
            return (
              <div key={cap.id} className="glass-panel rounded-2xl p-5 border border-pink-500/30 space-y-3 bg-slate-950/80 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <span className="text-lg">{cap.emoji}</span>
                    <span>{cap.title}</span>
                  </div>
                  {cap.isAnniversary && (
                    <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-bold uppercase">
                      Anniversary Alert
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 italic">"{cap.reminderNote}"</p>

                {mem && (
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{mem.restaurantOrStore}</div>
                      <div className="text-slate-400 text-[10px]">{mem.date} • ₹{mem.totalAmount}</div>
                    </div>
                    <button
                      onClick={() => onReorder(mem)}
                      className="px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reorder
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">AI Smart Collections</h2>
            <p className="text-xs text-slate-400">Automatically curated memory lists generated by context reasoning.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {smartCollections.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveCollectionId(col.id)}
              className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
                activeCollectionId === col.id
                  ? 'bg-purple-600/30 border-purple-400 shadow-lg shadow-purple-600/20'
                  : 'bg-slate-900/80 border-white/10 hover:border-purple-500/30'
              }`}
            >
              <div className="text-2xl">{col.emoji}</div>
              <div className="font-bold text-sm text-white">{col.title}</div>
              <div className="text-[11px] text-slate-400 line-clamp-1">{col.description}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {activeMemories.map((mem) => (
            <div
              key={mem.id}
              onClick={() => onSelectMemory(mem)}
              className="glass-panel-interactive rounded-2xl p-4 space-y-3 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-purple-300 font-semibold">
                  <span>{mem.category}</span>
                  <span>₹{mem.totalAmount}</span>
                </div>
                <h4 className="font-bold text-white text-base pt-1">{mem.title}</h4>
                <p className="text-xs text-slate-400">{mem.restaurantOrStore}</p>
                <p className="text-xs text-slate-300 italic pt-2 line-clamp-2">"{mem.storyNarrative}"</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                <span className="text-slate-400">{mem.date} • {mem.mood}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReorder(mem);
                  }}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
