import { useState, useEffect } from 'react';
import type { OrderMemory } from './types/memory';
import { StorageUtils } from './utils/storage';
import { PhoneAuthGate } from './components/PhoneAuthGate';
import { Header } from './components/Header';
import type { ActiveTab } from './components/Header';
import { VisionOnboarding } from './components/VisionOnboarding';
import { ManifestoView } from './components/ManifestoView';
import { Living3DGalaxy } from './components/Living3DGalaxy';
import { AgentCopilotView } from './components/AgentCopilotView';
import { MemoryReplayTheater } from './components/MemoryReplayTheater';
import { HorizontalTimeRiver } from './components/HorizontalTimeRiver';
import { ProfileView } from './components/ProfileView';
import { SwiggySyncModal } from './components/SwiggySyncModal';
import { CinematicWrappedMovie } from './components/CinematicWrappedMovie';
import { CustomParticleCursor } from './components/CustomParticleCursor';
import { FloatingBackground } from './components/FloatingBackground';
import { MemoryThreadCursor } from './components/MemoryThreadCursor';
import { CinematicFoldTransition } from './components/CinematicFoldTransition';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [memories, setMemories] = useState<OrderMemory[]>(() => StorageUtils.getMemories());
  const [activeTab, setActiveTab] = useState<ActiveTab>('manifesto');
  const [initialCopilotQuery, setInitialCopilotQuery] = useState('');
  const [heroSearchQuery, setHeroSearchQuery] = useState('');
  const [themeMode, setThemeMode] = useState<'parchment' | 'noir'>('noir');
  
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isWrappedMovieOpen, setIsWrappedMovieOpen] = useState(false);
  const [replayTheaterMemory, setReplayTheaterMemory] = useState<OrderMemory | null>(null);
  const [reorderSuccessMemory, setReorderSuccessMemory] = useState<OrderMemory | null>(null);
  
  // Cinematic Fold Transition state
  const [isFoldTransitionActive, setIsFoldTransitionActive] = useState(false);
  const [targetTab, setTargetTab] = useState<ActiveTab | null>(null);

  useEffect(() => {
    StorageUtils.saveMemories(memories);
  }, [memories]);

  // Toggle Theme mode class on document.body
  useEffect(() => {
    if (themeMode === 'parchment') {
      document.body.classList.add('theme-parchment');
    } else {
      document.body.classList.remove('theme-parchment');
    }
  }, [themeMode]);

  const handleAuthenticate = (phone: string) => {
    StorageUtils.setUserPhone(phone);
    setUserPhone(phone);
  };

  const handleLogout = () => {
    StorageUtils.clearUserPhone();
    setUserPhone(null);
  };

  const handleAskAgent = (query: string) => {
    setInitialCopilotQuery(query);
    triggerFoldTransition('recall');
  };

  const triggerFoldTransition = (tab: ActiveTab) => {
    setTargetTab(tab);
    setIsFoldTransitionActive(true);
  };

  const handleFoldTransitionComplete = () => {
    setIsFoldTransitionActive(false);
    if (targetTab) {
      setActiveTab(targetTab);
      setTargetTab(null);
    }
  };

  const handleAddMemory = (newMemory: OrderMemory) => {
    const updated = StorageUtils.addMemory(newMemory);
    setMemories(updated);
  };

  const handleReorder = (mem: OrderMemory) => {
    setReorderSuccessMemory(mem);
    setTimeout(() => {
      setReorderSuccessMemory(null);
    }, 3000);
  };

  const handleToggleTheme = () => {
    setThemeMode(prev => (prev === 'noir' ? 'parchment' : 'noir'));
  };

  if (!userPhone) {
    return <PhoneAuthGate onAuthenticate={handleAuthenticate} />;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-sans relative selection:bg-[var(--accent-color)] selection:text-white transition-colors duration-400">
      
      {/* 3D Clean Ambient Particle Background & Signature Memory Thread */}
      <FloatingBackground />
      <MemoryThreadCursor />
      <CustomParticleCursor />

      {/* Cinematic Fold Screen Transition */}
      <CinematicFoldTransition
        isActive={isFoldTransitionActive}
        onComplete={handleFoldTransitionComplete}
      />

      {showOnboarding && (
        <VisionOnboarding onComplete={() => setShowOnboarding(false)} />
      )}

      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'archive' || tab === 'recall') {
            triggerFoldTransition(tab);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        onOpenWrappedMovie={() => setIsWrappedMovieOpen(true)}
        onOpenOnboarding={() => setShowOnboarding(true)}
        memoryCount={memories.length}
        userPhone={userPhone}
        onLogout={handleLogout}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 pb-16 relative z-10">
        {activeTab === 'manifesto' && (
          <ManifestoView
            onEnterArchive={() => {
              if (heroSearchQuery) {
                handleAskAgent(heroSearchQuery);
              } else {
                triggerFoldTransition('archive');
              }
            }}
            searchQuery={heroSearchQuery}
            onSearchChange={setHeroSearchQuery}
          />
        )}

        {activeTab === 'archive' && (
          <Living3DGalaxy
            memories={memories}
            onSelectMemory={(mem) => setReplayTheaterMemory(mem)}
            onReorder={handleReorder}
            onAskAgent={handleAskAgent}
          />
        )}

        {activeTab === 'recall' && (
          <AgentCopilotView
            memories={memories}
            onReorder={handleReorder}
            initialQuery={initialCopilotQuery}
          />
        )}

        {activeTab === 'rewind' && (
          <HorizontalTimeRiver
            memories={memories}
            onSelectMemory={(mem) => setReplayTheaterMemory(mem)}
            onReorder={handleReorder}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            userPhone={userPhone}
            memories={memories}
            onSelectMemory={(mem) => setReplayTheaterMemory(mem)}
            onReorder={handleReorder}
          />
        )}
      </main>

      <MemoryReplayTheater
        memory={replayTheaterMemory}
        onClose={() => setReplayTheaterMemory(null)}
        onReorder={handleReorder}
      />

      <SwiggySyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onAddMemory={handleAddMemory}
      />

      <CinematicWrappedMovie
        isOpen={isWrappedMovieOpen}
        onClose={() => setIsWrappedMovieOpen(false)}
        memories={memories}
      />

      {reorderSuccessMemory && (
        <div className="fixed bottom-8 right-8 z-50 editorial-card p-4 text-[var(--text-primary)] shadow-2xl flex items-center gap-3 animate-bounce font-mono-meta">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-color)]/20 text-[var(--accent-color)] border border-[var(--accent-color)]/40 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-[var(--accent-color)] uppercase tracking-wider">SWIGGY REORDER TRIGGERED</div>
            <div className="text-sm font-bold text-[var(--text-primary)]">{reorderSuccessMemory.restaurantOrStore}</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Reordering {reorderSuccessMemory.items.map(i => i.name).join(', ')} (₹{reorderSuccessMemory.totalAmount})</div>
          </div>
        </div>
      )}

      <footer className="border-t border-[var(--border-color)] py-8 text-center text-xs font-mono-meta text-[var(--text-secondary)] bg-[var(--bg-primary)] transition-colors duration-400 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('manifesto')}>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-color)]" />
            <span className="font-extrabold text-[var(--text-primary)] tracking-widest font-logo">REMNANT</span>
          </div>
          <div>
            The memories behind every order.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
