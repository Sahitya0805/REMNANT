import React, { useState } from 'react';
import type { OrderMemory } from '../types/memory';
import { TimelineGenerator } from '../ai/timelineGenerator';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface HorizontalTimeRiverProps {
  memories: OrderMemory[];
  onSelectMemory: (mem: OrderMemory) => void;
  onReorder: (mem: OrderMemory) => void;
}

export const HorizontalTimeRiver: React.FC<HorizontalTimeRiverProps> = ({
  memories,
  onSelectMemory,
  onReorder
}) => {
  const timelineGroups = TimelineGenerator.generateTimeline(memories);
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)] uppercase tracking-wide">
            Rewind
          </h2>
          <p className="text-xs font-mono-meta text-[var(--text-secondary)] mt-1">
            Printed Book Timeline
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono-meta text-xs">
          <button
            onClick={() => setZoomLevel(Math.max(0.75, zoomLevel - 0.25))}
            className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-color)] transition-all"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[var(--text-secondary)] px-2">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel(Math.min(1.75, zoomLevel + 0.25))}
            className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-color)] transition-all"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Printed Book Timeline Stream */}
      <div className="overflow-x-auto scrollbar-none py-4">
        <div 
          className="flex items-start gap-12 min-w-max transition-all duration-300"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
        >
          {timelineGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-6 flex-shrink-0 w-80">
              
              {/* Year & Month Printed Pillar */}
              <div className="border-b-2 border-[var(--accent-color)] pb-3 font-mono-meta">
                <div className="text-xs font-bold text-[var(--accent-color)]">{group.year}</div>
                <h3 className="text-3xl font-extrabold text-[var(--text-primary)] font-sans mt-0.5">{group.month}</h3>
                {group.eventTitle && (
                  <div className="text-xs text-[var(--text-secondary)] mt-1 italic">
                    "{group.eventTitle}"
                  </div>
                )}
              </div>

              {/* Memory Cards */}
              <div className="space-y-6">
                {group.memories.map((mem) => (
                  <div
                    key={mem.id}
                    onClick={() => onSelectMemory(mem)}
                    className="editorial-card p-6 space-y-3 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs font-mono-meta text-[var(--text-secondary)]">
                      <span className="font-bold text-[var(--text-primary)] text-sm font-sans">{mem.restaurantOrStore}</span>
                      <span className="text-[var(--accent-color)] font-bold">₹{mem.totalAmount}</span>
                    </div>

                    <div className="text-xs font-mono-meta text-[var(--accent-color)] space-y-0.5">
                      <p>{mem.date.toUpperCase()}</p>
                      <p>{mem.time} • {mem.weather}</p>
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] italic line-clamp-3 leading-relaxed">
                      "{mem.storyNarrative}"
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                      <span className="text-xs font-mono-meta text-[var(--text-secondary)]">{mem.category}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onReorder(mem);
                        }}
                        className="px-3 py-1 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium text-xs rounded-xl flex items-center gap-1 transition-all"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
