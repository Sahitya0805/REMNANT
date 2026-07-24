import React, { useState } from 'react';
import type { OrderMemory, PredictionAlert } from '../types/memory';
import { SemanticSearchEngine } from '../ai/semanticSearch';
import type { SearchResult } from '../ai/semanticSearch';
import { 
  Search, 
  Sparkles, 
  CloudRain, 
  Smile, 
  RotateCcw, 
  Zap, 
  Clock, 
  ArrowRight,
  Tag
} from 'lucide-react';

interface DashboardProps {
  memories: OrderMemory[];
  predictions: PredictionAlert[];
  onSelectMemory: (mem: OrderMemory) => void;
  onAskAgent: (query: string) => void;
  onReorder: (mem: OrderMemory) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  memories,
  predictions,
  onSelectMemory,
  onAskAgent,
  onReorder
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'All' | 'Food' | 'Instamart' | 'Dineout'>('All');

  const filteredCategoryMemories = activeCategoryFilter === 'All' 
    ? memories 
    : memories.filter(m => m.category === activeCategoryFilter);

  const searchResults: SearchResult[] = SemanticSearchEngine.search(searchQuery, filteredCategoryMemories);

  const quickPrompts = [
    'The cold coffee I drank while working late',
    'Groceries before Diwali',
    'Ramen I ordered on the rainy day',
    'Dosa after my internship interview',
    'Cake for mom\'s birthday',
    'Victory biryani after IPL finals'
  ];

  const flashbackMemory = memories.find(m => m.id === 'mem-102') || memories[0];

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 lg:px-8">
      
      <div className="relative glass-panel rounded-3xl p-6 lg:p-10 overflow-hidden border border-purple-500/20">
        <div className="gradient-glow -top-20 -left-20 w-80 h-80 bg-purple-600/30" />
        <div className="gradient-glow -bottom-20 -right-20 w-80 h-80 bg-pink-600/30" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contextual Commerce Memory Engine</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white">
            Search by <span className="gradient-text">memories</span>, not menus.
          </h2>
          <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
            Search your lifelong commerce history by mood, weather, exam sessions, festivals, rainy days, or companion moments.
          </p>

          <div className="relative pt-2">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-purple-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. 'Find the cold coffee I ordered while working late'..."
                className="w-full bg-slate-950/80 border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 text-white rounded-2xl pl-12 pr-28 py-4 text-sm md:text-base placeholder-slate-500 shadow-xl transition-all outline-none"
              />
              <button
                onClick={() => searchQuery && onAskAgent(searchQuery)}
                className="absolute right-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>Ask AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-medium text-slate-400 mr-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> Try asking:
            </span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(prompt);
                  onAskAgent(prompt);
                }}
                className="text-xs bg-white/5 hover:bg-purple-500/20 text-slate-300 hover:text-purple-200 px-3 py-1.5 rounded-full border border-white/10 hover:border-purple-500/40 transition-all text-left"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {predictions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {predictions.map((pred) => (
            <div key={pred.id} className="glass-panel-interactive rounded-2xl p-4 border-l-4 border-l-amber-500 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {pred.type}
                </span>
                <span className="text-xs text-slate-400 font-medium">In {pred.daysRemaining} days</span>
              </div>
              <h4 className="font-bold text-sm text-white">{pred.title}</h4>
              <p className="text-xs text-slate-300 line-clamp-2">{pred.description}</p>
              <button 
                onClick={() => onAskAgent(pred.title)}
                className="w-full mt-2 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold rounded-xl border border-amber-500/40 transition-all flex items-center justify-center gap-1"
              >
                <span>{pred.actionText}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {flashbackMemory && (
        <div className="glass-panel rounded-2xl p-6 border border-amber-500/30 relative overflow-hidden bg-gradient-to-r from-amber-950/20 via-slate-900/40 to-slate-950/80">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>On This Day Flashback</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">{flashbackMemory.title}</h3>
              <p className="text-xs text-slate-300 italic">"{flashbackMemory.storyNarrative}"</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-bold text-white">₹{flashbackMemory.totalAmount}</div>
                <div className="text-xs text-slate-400">{flashbackMemory.date}</div>
              </div>
              <button
                onClick={() => onReorder(flashbackMemory)}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>1-Click Reorder</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white">Search Memory Graph</h3>
            <span className="text-xs font-medium text-slate-400">({searchResults.length} memories)</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10">
            {(['All', 'Food', 'Instamart', 'Dineout'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeCategoryFilter === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {searchResults.map(({ memory, similarityScore, matchReason }) => (
            <div
              key={memory.id}
              onClick={() => onSelectMemory(memory)}
              className="glass-panel-interactive rounded-2xl p-5 space-y-4 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border ${
                    memory.category === 'Food' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' :
                    memory.category === 'Instamart' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                    'bg-purple-500/10 text-purple-400 border-purple-500/30'
                  }`}>
                    {memory.category}
                  </span>

                  <div className="flex items-center gap-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>{Math.round(similarityScore * 100)}% match</span>
                  </div>
                </div>

                <h4 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                  {memory.title}
                </h4>
                <p className="text-xs text-purple-200/90 font-medium">
                  {memory.restaurantOrStore}
                </p>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-3 border border-white/5 space-y-1">
                <p className="text-xs text-slate-300 line-clamp-3 italic">
                  "{memory.storyNarrative}"
                </p>
                <div className="text-[10px] text-amber-300/80 pt-1 font-mono">
                  💡 {matchReason}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  <CloudRain className="w-3 h-3" /> {memory.weather}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  <Smile className="w-3 h-3" /> {memory.mood}
                </span>
                {memory.festivalOrEvent && (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    <Tag className="w-3 h-3" /> {memory.festivalOrEvent}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                <div>
                  <div className="font-extrabold text-white text-sm">₹{memory.totalAmount}</div>
                  <div className="text-[10px] text-slate-400">{memory.date} • {memory.time}</div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReorder(memory);
                  }}
                  className="px-3 py-1.5 bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white rounded-xl border border-purple-500/40 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
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
