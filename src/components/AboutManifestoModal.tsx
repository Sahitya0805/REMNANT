import React from 'react';
import { X, Sparkles, Database, BrainCircuit, HeartHandshake } from 'lucide-react';

interface AboutManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutManifestoModal: React.FC<AboutManifestoModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="editorial-card max-w-2xl w-full p-8 space-y-6 relative border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-meta text-[var(--accent-color)] font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>PRODUCT MANIFESTO</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight font-logo uppercase">
            ABOUT REMNANT
          </h2>
          <p className="text-sm font-mono-meta text-[var(--accent-color)] italic">
            "The memories behind every order."
          </p>
        </div>

        {/* Manifesto Content */}
        <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed pt-2 border-t border-[var(--border-color)]">
          <p className="text-[var(--text-primary)] text-base font-medium">
            People don't remember restaurant names or receipt numbers — they remember moments.
          </p>

          <p>
            Current commerce apps only answer <em>"What do you want to buy?"</em> REMNANT introduces a new paradigm: <strong>Search by memories instead of menus.</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
              <Database className="w-5 h-5 text-[var(--accent-color)]" />
              <div className="font-bold text-xs font-mono-meta text-[var(--text-primary)]">AI MEMORY GRAPH</div>
              <div className="text-xs text-[var(--text-secondary)]">Every purchase leaves a permanent semantic memory node.</div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
              <BrainCircuit className="w-5 h-5 text-[var(--accent-color)]" />
              <div className="font-bold text-xs font-mono-meta text-[var(--text-primary)]">THE RECALL CURATOR</div>
              <div className="text-xs text-[var(--text-secondary)]">Natural language AI that understands weather, emotions, and life context.</div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
              <HeartHandshake className="w-5 h-5 text-[var(--accent-color)]" />
              <div className="font-bold text-xs font-mono-meta text-[var(--text-primary)]">1-CLICK REORDER</div>
              <div className="text-xs text-[var(--text-secondary)]">Instantly trigger Swiggy MCP reorders directly from past moments.</div>
            </div>
          </div>

          <p className="text-xs font-mono-meta text-[var(--text-secondary)] pt-2">
            Built for Swiggy Builders Club • Version 2.0 Architectural Prototype
          </p>
        </div>

        {/* Action */}
        <div className="pt-4 border-t border-[var(--border-color)] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium text-xs rounded-xl transition-all shadow-sm"
          >
            Explore Archive
          </button>
        </div>

      </div>
    </div>
  );
};
