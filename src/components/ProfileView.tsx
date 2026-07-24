import React from 'react';
import type { OrderMemory } from '../types/memory';
import { User, ShoppingBag, RotateCcw, ShieldCheck } from 'lucide-react';

interface ProfileViewProps {
  userPhone: string | null;
  memories: OrderMemory[];
  onSelectMemory: (mem: OrderMemory) => void;
  onReorder: (mem: OrderMemory) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userPhone,
  memories,
  onSelectMemory,
  onReorder
}) => {
  const clusters = [
    { name: 'Late Nights 🌙', filterKeyword: 'Late Night', icon: '🌙' },
    { name: 'Exam Weeks 📚', filterKeyword: 'Exam', icon: '📚' },
    { name: 'Family Dinners 🥘', filterKeyword: 'Family', icon: '🥘' },
    { name: 'Birthdays 🎂', filterKeyword: 'Birthday', icon: '🎂' },
    { name: 'Rainy Days 🌧️', filterKeyword: 'Rain', icon: '🌧️' },
    { name: 'Comfort Food 🍜', filterKeyword: 'Comfort', icon: '🍜' },
  ];

  const [activeCluster, setActiveCluster] = React.useState<string | null>(null);

  const filteredMemories = activeCluster
    ? memories.filter(m => 
        m.title.toLowerCase().includes(activeCluster.toLowerCase()) || 
        m.storyNarrative.toLowerCase().includes(activeCluster.toLowerCase()) ||
        (m.festivalOrEvent && m.festivalOrEvent.toLowerCase().includes(activeCluster.toLowerCase()))
      )
    : memories;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-10 font-sans">
      
      {/* Identity Card */}
      <div className="editorial-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 flex items-center justify-center text-[var(--accent-color)]">
            <User className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">REMNANT ARCHIVE PROFILE</h2>
              <span className="text-xs font-mono-meta px-3 py-1 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/30 flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
              </span>
            </div>
            <p className="text-xs font-mono-meta text-[var(--text-secondary)]">+91 {userPhone || '9876543210'} • Swiggy MCP Synced</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl text-center min-w-[100px]">
            <div className="text-xs font-mono-meta text-[var(--text-secondary)]">MEMORIES</div>
            <div className="text-2xl font-extrabold text-[var(--accent-color)]">{memories.length}</div>
          </div>
          <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl text-center min-w-[100px]">
            <div className="text-xs font-mono-meta text-[var(--text-secondary)]">SWIGGY MCP</div>
            <div className="text-xs font-mono-meta font-bold text-emerald-600 flex items-center justify-center gap-1 mt-1">
              <ShoppingBag className="w-3.5 h-3.5" /> ONLINE
            </div>
          </div>
        </div>
      </div>

      {/* Memory Collections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono-meta text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-3 uppercase tracking-wider">
          <h3 className="font-bold text-[var(--text-primary)] text-base font-sans">MEMORY COLLECTIONS</h3>
          <span>AI CURATED</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {clusters.map((c, idx) => {
            const isSelected = activeCluster === c.filterKeyword;
            return (
              <button
                key={idx}
                onClick={() => setActiveCluster(isSelected ? null : c.filterKeyword)}
                className={`p-5 rounded-2xl border text-center space-y-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--accent-color)] text-white border-[var(--accent-color)] font-extrabold shadow-sm'
                    : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--accent-color)]'
                }`}
              >
                <div className="text-2xl">{c.icon}</div>
                <div className="text-xs font-bold font-mono-meta">{c.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Remnants Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono-meta text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-3 uppercase tracking-wider">
          <h4 className="font-bold text-[var(--text-primary)] text-base font-sans flex items-center gap-2">
            <span>ARCHIVED ITEMS</span>
            {activeCluster && (
              <span className="text-xs px-3 py-0.5 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/30 font-bold">
                CLUSTER: "{activeCluster}"
              </span>
            )}
          </h4>
          <span>({filteredMemories.length} ITEMS)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((mem) => (
            <div
              key={mem.id}
              onClick={() => onSelectMemory(mem)}
              className="editorial-card p-6 space-y-4 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-meta text-[var(--text-secondary)]">
                  <span>{mem.category}</span>
                  <span className="text-[var(--accent-color)] font-bold">₹{mem.totalAmount}</span>
                </div>
                <h5 className="font-extrabold text-[var(--text-primary)] text-lg leading-snug">{mem.title}</h5>
                <p className="text-xs font-mono-meta text-[var(--text-secondary)]">{mem.restaurantOrStore}</p>
                <p className="text-sm text-[var(--text-secondary)] italic pt-2 leading-relaxed">"{mem.storyNarrative}"</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)] text-xs font-mono-meta">
                <span className="text-[var(--text-secondary)]">{mem.date.toUpperCase()}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReorder(mem);
                  }}
                  className="px-3 py-1.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl text-xs flex items-center gap-1 transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reorder</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
