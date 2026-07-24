import React from 'react';
import { AnimatedChecklist } from './integration/AnimatedChecklist';
import { TimelineCard } from './integration/TimelineCard';
import { MetricCards } from './integration/MetricCards';
import { ArchitectureFlow } from './integration/ArchitectureFlow';

export const IntegrationOverview: React.FC = () => {
  return (
    <section className="space-y-12 max-w-5xl mx-auto py-16 px-4">
      
      {/* Section Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-mono-meta text-[var(--accent-color)] font-bold uppercase tracking-widest">
          ● TECHNICAL SPECIFICATION
        </div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Integration Overview
        </h2>

        <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-sans">
          Everything required to securely transform your commerce history into a searchable memory archive.
        </p>
      </div>

      {/* Side-by-Side Cards (32px Rounded) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatedChecklist />
        <TimelineCard />
      </div>

      {/* Metric Cards */}
      <MetricCards />

      {/* System Architecture Pipeline Flow */}
      <ArchitectureFlow />

    </section>
  );
};
