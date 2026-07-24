import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const AnimatedChecklist: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const items = [
    'Swiggy MCP APIs',
    'Secure OAuth Authentication',
    'User Verified OTP Login',
    'AI Memory Engine',
    'Semantic Search',
    'Timeline Generator',
    'Knowledge Graph Builder',
    'Personal Memory Collections',
    'Rewind Stories',
    'Local User Preferences'
  ];

  return (
    <div className="p-8 rounded-[32px] bg-[var(--bg-card)] border border-[var(--border-color)] space-y-6 flex flex-col justify-between transition-all duration-300">
      
      <div className="space-y-2 border-b border-[var(--border-color)] pb-4">
        <h3 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
          What REMNANT Uses
        </h3>
        <p className="text-xs font-mono-meta text-[var(--text-secondary)]">
          Core technical modules & Swiggy MCP infrastructure
        </p>
      </div>

      <div className="space-y-2.5">
        {items.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`relative flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer ${
                isHovered
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {/* Left Orange Indicator Line on Hover */}
              <span
                className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-[var(--accent-color)] transition-all duration-300 ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              />

              <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                isHovered ? 'bg-[var(--accent-color)] text-white' : 'bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--accent-color)]'
              }`}>
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>

              <span className="text-sm font-mono-meta font-medium tracking-wide">
                {item}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-xs font-mono-meta text-[var(--accent-color)] italic">
        ● Production ready architecture
      </div>

    </div>
  );
};
