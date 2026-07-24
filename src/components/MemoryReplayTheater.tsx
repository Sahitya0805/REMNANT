import React from 'react';
import type { OrderMemory } from '../types/memory';
import { X, ShoppingBag } from 'lucide-react';

interface MemoryReplayTheaterProps {
  memory: OrderMemory | null;
  onClose: () => void;
  onReorder: (mem: OrderMemory) => void;
}

export const MemoryReplayTheater: React.FC<MemoryReplayTheaterProps> = ({
  memory,
  onClose,
  onReorder
}) => {
  if (!memory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="editorial-card max-w-3xl w-full p-8 space-y-8 relative border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs font-mono-meta text-[var(--accent-color)] uppercase tracking-wider font-bold">
            <span>REPLAYING MEMORY #{memory.id.toUpperCase()}</span>
            <span>•</span>
            <span>{memory.date.toUpperCase()}</span>
            <span>•</span>
            <span>{memory.time}</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight font-sans text-[var(--text-primary)]">
            {memory.title}
          </h2>

          <p className="text-sm font-mono-meta text-[var(--text-secondary)] font-medium">
            {memory.restaurantOrStore} — {memory.location}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border-color)]">
          
          {/* Left: Memory Narrative */}
          <div className="space-y-4">
            <p className="text-base text-[var(--text-primary)] leading-relaxed italic">
              "{memory.storyNarrative}"
            </p>

            <div className="space-y-2 font-mono-meta text-xs text-[var(--text-secondary)] pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)]" />
                <span>Weather: {memory.weather}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)]" />
                <span>Mood: {memory.mood || 'Comfort & Nostalgia'}</span>
              </div>
            </div>
          </div>

          {/* Right: Swiggy Receipt Box */}
          <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-4 font-mono-meta">
            <div className="flex items-center justify-between text-xs text-[var(--accent-color)] font-bold">
              <span>SWIGGY MEMORY RECEIPT</span>
              <span>ID: {memory.id}</span>
            </div>

            <div className="space-y-2 border-t border-b border-[var(--border-color)] py-3 text-xs text-[var(--text-primary)]">
              {memory.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-bold">₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm font-bold text-[var(--text-primary)] pt-1">
              <span>Total Memory Cost</span>
              <span className="text-[var(--accent-color)] text-base">₹{memory.totalAmount}</span>
            </div>

            <button
              onClick={() => {
                onReorder(memory);
                onClose();
              }}
              className="w-full py-3 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium text-xs font-sans rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm mt-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Reorder Memory Now</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
