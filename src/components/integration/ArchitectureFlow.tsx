import React from 'react';

export const ArchitectureFlow: React.FC = () => {
  const nodes = [
    'User',
    'OTP Login',
    'Swiggy MCP',
    'Backend API',
    'Memory Engine',
    'Vector Search',
    'REMNANT UI'
  ];

  return (
    <div className="p-8 rounded-[32px] bg-[var(--bg-card)] border border-[var(--border-color)] space-y-6">
      
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
        <div>
          <h3 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">
            System Architecture Flow
          </h3>
          <p className="text-xs font-mono-meta text-[var(--text-secondary)] mt-0.5">
            End-to-end data pipeline connected by animated memory threads
          </p>
        </div>
        <span className="text-xs font-mono-meta text-[var(--accent-color)] font-bold">
          LIVE DATA PIPELINE
        </span>
      </div>

      {/* Horizontal Connected Node Pipeline */}
      <div className="overflow-x-auto py-4">
        <div className="flex items-center gap-3 min-w-max">
          {nodes.map((node, idx) => (
            <React.Fragment key={idx}>
              
              {/* Node Pill */}
              <div className="px-5 py-3 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-color)] text-[var(--text-primary)] text-xs font-mono-meta font-extrabold tracking-wider hover:bg-[var(--bg-surface)] transition-all duration-300 shadow-sm cursor-pointer hover:shadow-md hover:scale-105">
                {node}
              </div>

              {/* Animated Orange Connecting Line */}
              {idx < nodes.length - 1 && (
                <div className="flex items-center gap-1">
                  <div className="w-8 h-[2px] bg-gradient-to-r from-[var(--accent-color)] to-[var(--border-color)] animate-pulse" />
                  <span className="text-[var(--accent-color)] text-[10px] font-mono-meta">►</span>
                </div>
              )}

            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
};
