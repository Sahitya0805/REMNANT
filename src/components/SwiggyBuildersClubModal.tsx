import React from 'react';
import { X, Sparkles, Database, BrainCircuit, HeartHandshake, ShieldCheck, Zap } from 'lucide-react';

interface SwiggyBuildersClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSync: () => void;
}

export const SwiggyBuildersClubModal: React.FC<SwiggyBuildersClubModalProps> = ({
  isOpen,
  onClose,
  onOpenSync
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="editorial-card max-w-4xl w-full p-8 md:p-10 space-y-8 relative border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--accent-color)]/30 bg-[var(--accent-color)]/10 text-xs font-mono-meta text-[var(--accent-color)] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SWIGGY BUILDERS CLUB OFFICIAL SUBMISSION '26</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-logo uppercase">
            R E M N A N T
          </h2>

          <p className="text-lg font-mono-meta text-[var(--accent-color)] italic">
            "The memories behind every order." — Search by memories instead of menus.
          </p>
        </div>

        {/* Pitch Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border-color)]">
          
          {/* Problem & Vision */}
          <div className="space-y-4 p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
            <div className="flex items-center gap-2 text-xs font-mono-meta text-[var(--accent-color)] font-bold uppercase">
              <Zap className="w-4 h-4" />
              <span>Problem & Paradigm Shift</span>
            </div>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed font-medium">
              People don't remember restaurant names — they remember moments (*"Coffee during internship"*, *"Biryani after IPL victory"*).
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Current apps only answer <em>"What do you want to buy?"</em> REMNANT builds an AI memory graph of your commerce life, allowing natural language search through life context.
            </p>
          </div>

          {/* Swiggy MCP Architecture */}
          <div className="space-y-4 p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
            <div className="flex items-center gap-2 text-xs font-mono-meta text-[var(--accent-color)] font-bold uppercase">
              <Database className="w-4 h-4" />
              <span>Swiggy MCP Integration Strategy</span>
            </div>
            <div className="space-y-2 text-xs font-mono-meta text-[var(--text-secondary)]">
              <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                <span className="text-[var(--accent-color)] font-bold">Phase 1 (Submission):</span> Decoupled Swiggy MCP Data Adapter (<code className="text-[var(--text-primary)]">SwiggyMcpDataAdapter.ts</code>).
              </div>
              <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                <span className="text-[var(--accent-color)] font-bold">Phase 2 (Post Approval):</span> Direct live endpoints for Swiggy Food, Instamart, and Dineout.
              </div>
            </div>
          </div>

        </div>

        {/* 3 Technical Innovation Pillars */}
        <div className="space-y-4 pt-2">
          <div className="text-xs font-mono-meta text-[var(--text-secondary)] uppercase tracking-wider font-bold">
            TECHNICAL INNOVATION PIPELINE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
              <BrainCircuit className="w-5 h-5 text-[var(--accent-color)]" />
              <h4 className="font-bold text-xs font-mono-meta text-[var(--text-primary)]">35D SEMANTIC SEARCH</h4>
              <p className="text-xs text-[var(--text-secondary)]">Vector embeddings link food orders with weather, time of day, and emotional state.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
              <HeartHandshake className="w-5 h-5 text-[var(--accent-color)]" />
              <h4 className="font-bold text-xs font-mono-meta text-[var(--text-primary)]">1-CLICK MCP REORDER</h4>
              <p className="text-xs text-[var(--text-secondary)]">Instantly trigger Swiggy cart reorders directly from past subconscious memories.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
              <ShieldCheck className="w-5 h-5 text-[var(--accent-color)]" />
              <h4 className="font-bold text-xs font-mono-meta text-[var(--text-primary)]">ZERO-TRUST SECURITY</h4>
              <p className="text-xs text-[var(--text-secondary)]">User verified OTP authentication and encrypted personal order history.</p>
            </div>

          </div>
        </div>

        {/* Action Triggers */}
        <div className="pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-meta text-xs">
          <div className="text-[var(--text-secondary)]">
            Built for Swiggy Builders Club 2026 Submission
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenSync();
              }}
              className="px-5 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl transition-all shadow-sm"
            >
              Test Swiggy MCP Ingestion
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-color)] text-[var(--text-primary)] font-medium rounded-xl transition-all"
            >
              Close Presentation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
