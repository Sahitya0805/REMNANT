import React, { useState } from 'react';
import type { OrderMemory } from '../types/memory';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface Living3DGalaxyProps {
  memories: OrderMemory[];
  onSelectMemory: (mem: OrderMemory) => void;
  onReorder: (mem: OrderMemory) => void;
  onAskAgent: (query: string) => void;
}

export const Living3DGalaxy: React.FC<Living3DGalaxyProps> = ({
  memories,
  onSelectMemory,
  onReorder,
  onAskAgent
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [inkRipples, setInkRipples] = useState<{ id: number; x: number }[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    
    // Create ink ripple effect on typing
    const newRipple = { id: Date.now(), x: Math.random() * 80 + 10 };
    setInkRipples(prev => [...prev.slice(-4), newRipple]);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 space-y-16">
      
      {/* Ink Ripple Underline Search */}
      <div className="space-y-4 text-center max-w-2xl mx-auto pt-4">
        <p className="text-[var(--text-secondary)] text-sm font-mono-meta tracking-wide italic">
          The memories behind every order.
        </p>

        <div className="pt-4 max-w-xl mx-auto relative">
          <div className="underline-search relative flex items-center py-3">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && searchQuery && onAskAgent(searchQuery)}
              placeholder="What are you trying to remember?"
              className="w-full bg-transparent text-[var(--text-primary)] font-sans text-xl md:text-2xl placeholder-[var(--text-secondary)] outline-none"
            />
            <button
              onClick={() => searchQuery && onAskAgent(searchQuery)}
              className="p-2 text-[var(--accent-color)] hover:text-[var(--accent-hover)] transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>

            {/* Ink Ripple Ring Animations */}
            {inkRipples.map((r) => (
              <span
                key={r.id}
                style={{ left: `${r.x}%` }}
                className="absolute bottom-0 w-3 h-3 rounded-full border border-[var(--accent-color)] animate-ping pointer-events-none opacity-60"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Archival Index Cards Grid (Physical Index Cards Styling) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono-meta text-[var(--text-secondary)] uppercase tracking-widest border-b border-[var(--border-color)] pb-3">
          <span>ARCHIVAL INDEX CARDS</span>
          <span>{memories.length} ITEMS</span>
        </div>

        {memories.length === 0 ? (
          <div className="text-center py-16 space-y-3 font-mono-meta">
            <p className="text-base text-[var(--text-primary)] font-medium">Nothing remembered yet.</p>
            <p className="text-xs text-[var(--text-secondary)]">Connect Swiggy to begin building your archive.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((mem) => (
              <div
                key={mem.id}
                onClick={() => onSelectMemory(mem)}
                className="editorial-card p-6 space-y-4 cursor-pointer flex flex-col justify-between"
              >
                {/* Index Card Typography */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-meta text-[var(--accent-color)] font-bold">
                    <span>{mem.date.toUpperCase()}</span>
                    <span>₹{mem.totalAmount}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight font-sans">
                    {mem.restaurantOrStore}
                  </h3>

                  <div className="text-xs font-mono-meta text-[var(--text-secondary)] space-y-0.5">
                    <p>{mem.weather}</p>
                    <p>{mem.time}</p>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] pt-1 line-clamp-3 leading-relaxed">
                    "{mem.storyNarrative}"
                  </p>
                </div>

                {/* Footer & Action */}
                <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono-meta">
                  <span className="text-[var(--text-secondary)]">{mem.location}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReorder(mem);
                    }}
                    className="px-3.5 py-1.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl flex items-center gap-1 transition-all shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reorder</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
