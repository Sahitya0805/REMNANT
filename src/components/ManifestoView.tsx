import React from 'react';
import { ArrowRight } from 'lucide-react';
import { IntegrationOverview } from './IntegrationOverview';

interface ManifestoViewProps {
  onEnterArchive: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ManifestoView: React.FC<ManifestoViewProps> = ({
  onEnterArchive,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-between max-w-5xl mx-auto px-6 lg:px-12 py-16 space-y-36 relative z-10 font-sans">
      
      {/* Unbroken Hero Section */}
      <div className="space-y-10 text-center max-w-3xl mx-auto pt-8">
        
        {/* Emblem & Unbroken Title */}
        <div className="space-y-4">
          <div className="w-3 h-3 rounded-full bg-[var(--accent-color)] animate-ping mx-auto shadow-[0_0_20px_rgba(255,122,26,0.8)]" />
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight font-logo uppercase text-[var(--text-primary)] leading-none">
            REMNANT
          </h1>
        </div>

        {/* Single Tagline Line */}
        <p className="text-xl md:text-2xl font-normal text-[var(--accent-color)] italic font-mono-meta">
          The memories behind every order.
        </p>

        {/* Interactive Hero Search Field */}
        <div className="pt-4 max-w-xl mx-auto">
          <div className="underline-search relative flex items-center py-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onEnterArchive()}
              placeholder="What are you trying to remember?"
              className="w-full bg-transparent text-[var(--text-primary)] font-sans text-xl md:text-2xl placeholder-[var(--text-secondary)] outline-none text-center"
            />
          </div>
        </div>

        {/* Confident Short CTA */}
        <div className="pt-4">
          <button
            onClick={onEnterArchive}
            className="inline-flex items-center gap-3 font-medium text-base text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: '#C96A1A',
              borderRadius: '18px',
              padding: '18px 40px',
            }}
          >
            <span>Remember</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Apple-Style Narrative Fold (One screen, one message per stage) */}
      <div className="max-w-2xl mx-auto space-y-24 py-16 text-center">
        
        <div className="space-y-2 border-b border-[var(--border-color)] pb-12">
          <h2 className="text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">Remember.</h2>
          <p className="text-sm font-mono-meta text-[var(--text-secondary)]">Every purchase leaves a permanent subconscious memory.</p>
        </div>

        <div className="space-y-2 border-b border-[var(--border-color)] pb-12">
          <h2 className="text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">Connect.</h2>
          <p className="text-sm font-mono-meta text-[var(--text-secondary)]">Weather, moods, exam sprints, and late nights linked together.</p>
        </div>

        <div className="space-y-2 border-b border-[var(--border-color)] pb-12">
          <h2 className="text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">Rediscover.</h2>
          <p className="text-sm font-mono-meta text-[var(--text-secondary)]">Search by natural life context instead of restaurant menus.</p>
        </div>

        <div className="space-y-2 pb-6">
          <h2 className="text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">Relive.</h2>
          <p className="text-sm font-mono-meta text-[var(--text-secondary)]">1-click Swiggy MCP reorders directly from past moments.</p>
        </div>

      </div>

      {/* Integration Overview Section */}
      <IntegrationOverview />

    </div>
  );
};
