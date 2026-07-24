import React from 'react';
import { Plus, LogOut, Sun, Moon } from 'lucide-react';

export type ActiveTab = 'manifesto' | 'archive' | 'recall' | 'rewind' | 'profile';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSyncModal: () => void;
  onOpenWrappedMovie: () => void;
  onOpenOnboarding: () => void;
  memoryCount: number;
  userPhone: string | null;
  onLogout: () => void;
  themeMode: 'parchment' | 'noir';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSyncModal,
  userPhone: _userPhone,
  onLogout,
  themeMode,
  onToggleTheme
}) => {
  const navTabs = [
    { id: 'archive', label: 'Archive' },
    { id: 'recall', label: 'Recall' },
    { id: 'rewind', label: 'Rewind' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-color)] px-6 lg:px-12 py-5 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        {/* Breathing Logo Identity: ◉ REMNANT */}
        <div 
          onClick={() => setActiveTab('manifesto')} 
          className="cursor-pointer group flex items-center gap-3"
          title="REMNANT Manifesto"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent-color)] animate-pulse group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(255,122,26,0.8)]" />
          <h1 className="font-logo font-extrabold text-base tracking-[0.25em] text-[var(--text-primary)]">
            REMNANT
          </h1>
        </div>

        {/* Ultra-Minimal Navbar: Archive | Recall | Rewind */}
        <nav className="flex items-center gap-10">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`relative py-1 text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'text-[var(--text-primary)] font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent-color)] transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions & Minimal Avatar */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[var(--border-color)] text-xs font-mono-meta text-[var(--text-primary)] hover:border-[var(--accent-color)] transition-all bg-[var(--bg-surface)]"
            title="Toggle Parchment / Noir Edition"
          >
            {themeMode === 'parchment' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#C86B1F]" />
                <span>PARCHMENT</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#FF7A1A]" />
                <span>NOIR</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenSyncModal}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-medium bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Connect Swiggy</span>
          </button>

          {/* Minimal Avatar ○ */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-[var(--accent-color)] text-white border-[var(--accent-color)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-color)]'
            }`}
            title="Profile"
          >
            ○
          </button>

          <button
            onClick={onLogout}
            className="p-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-red-500 transition-all"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
};
