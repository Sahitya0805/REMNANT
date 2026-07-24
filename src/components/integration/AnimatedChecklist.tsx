import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-8 rounded-[32px] bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-color)]/50 space-y-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl"
    >
      <div className="space-y-2 border-b border-[var(--border-color)] pb-4">
        <h3 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
          What REMNANT Uses
        </h3>
        <p className="text-xs font-mono-meta text-[var(--text-secondary)]">
          Core technical modules & Swiggy MCP infrastructure
        </p>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`relative flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer ${
                isHovered
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {/* Orange Animated Left Line on Hover */}
              <motion.span
                animate={{ opacity: isHovered ? 1 : 0, scaleY: isHovered ? 1 : 0.4 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-[var(--accent-color)]"
              />

              <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                isHovered ? 'bg-[var(--accent-color)] text-white' : 'bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--accent-color)]'
              }`}>
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>

              <span className="text-sm font-mono-meta font-medium tracking-wide">
                {item}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="pt-2 text-xs font-mono-meta text-[var(--accent-color)] italic flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
        <span>Production ready architecture</span>
      </div>

    </motion.div>
  );
};
