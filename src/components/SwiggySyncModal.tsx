import React, { useState } from 'react';
import type { OrderMemory, OrderCategory } from '../types/memory';
import { MemoryExtractor } from '../ai/memoryExtractor';
import { ShoppingBag, X, CheckCircle2, Sparkles } from 'lucide-react';

interface SwiggySyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMemory: (mem: OrderMemory) => void;
}

export const SwiggySyncModal: React.FC<SwiggySyncModalProps> = ({
  isOpen,
  onClose,
  onAddMemory
}) => {
  const [activeMode, setActiveMode] = useState<'sync' | 'manual'>('sync');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const [title, setTitle] = useState('');
  const [store, setStore] = useState('');
  const [category, setCategory] = useState<OrderCategory>('Food');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('350');
  const [userMood, setUserMood] = useState('Focused & Happy');
  const [userWeather, setUserWeather] = useState('Late Night 🌙');

  if (!isOpen) return null;

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);

      const mockSyncMemory = MemoryExtractor.extractMemory({
        title: 'Midnight Brownie Sundae Craving',
        restaurantOrStore: 'Corner House Ice Cream',
        category: 'Food',
        items: [{ name: 'DBS - Death By Chocolate Sundae', price: 340, quantity: 1 }],
        userMood: 'Nostalgic & Sweet 🍨',
        userWeather: 'Clear Night ✨',
        userEvent: 'Late Night Treat'
      });

      onAddMemory(mockSyncMemory);

      setTimeout(() => {
        setSyncSuccess(false);
        onClose();
      }, 1200);
    }, 1500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !store || !itemName) return;

    const newMemory = MemoryExtractor.extractMemory({
      title,
      restaurantOrStore: store,
      category,
      items: [{ name: itemName, price: parseFloat(itemPrice) || 300, quantity: 1 }],
      userMood,
      userWeather
    });

    onAddMemory(newMemory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-md animate-fade-in font-mono">
      <div className="glass-panel-remnant rounded-3xl max-w-lg w-full p-6 border border-white/10 space-y-6 relative bg-[#0D0D0D] shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#8E8E8E] hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6A00]/20 border border-[#FF6A00]/40 flex items-center justify-center text-[#FF6A00]">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-white uppercase font-mono">IMPORT REMNANTS</h3>
            <p className="text-xs text-[#8E8E8E]">Sync purchase history from Swiggy Food, Instamart & Dineout.</p>
          </div>
        </div>

        <div className="flex bg-[#050505] p-1 rounded-xl border border-white/10 text-xs font-semibold">
          <button
            onClick={() => setActiveMode('sync')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeMode === 'sync' ? 'bg-[#FF6A00] text-black font-extrabold shadow-sm' : 'text-[#8E8E8E] hover:text-white'
            }`}
          >
            ⚡ AUTO SYNC SWIGGY
          </button>
          <button
            onClick={() => setActiveMode('manual')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeMode === 'manual' ? 'bg-[#FF6A00] text-black font-extrabold shadow-sm' : 'text-[#8E8E8E] hover:text-white'
            }`}
          >
            ✍️ CUSTOM REMNANT
          </button>
        </div>

        {activeMode === 'sync' ? (
          <div className="space-y-4 text-center py-4">
            <div className="p-4 rounded-2xl bg-[#FF6A00]/10 border border-[#FF6A00]/30 space-y-2">
              <div className="text-sm font-bold text-white uppercase">SWIGGY MCP CONNECTED</div>
              <div className="text-xs text-[#8E8E8E]">Extracting purchases & inferring mood, weather, companion context...</div>
            </div>

            {syncSuccess ? (
              <div className="flex items-center justify-center gap-2 text-[#FF6A00] font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>SUCCESSFULLY INGESTED 1 REMNANT!</span>
              </div>
            ) : (
              <button
                onClick={handleSimulateSync}
                disabled={isSyncing}
                className="w-full py-3.5 bg-[#FF6A00] hover:bg-[#FF8A00] text-black font-extrabold text-sm rounded-xl shadow-[0_0_20px_rgba(255,106,0,0.4)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSyncing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-black" />
                    <span>EXTRACTING REMNANT METADATA...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>SYNC SWIGGY ORDER HISTORY NOW</span>
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleManualSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">REMNANT TITLE</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cold Coffee during late night exam prep"
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#FF6A00]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">STORE / RESTAURANT</label>
                <input
                  type="text"
                  required
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                  placeholder="Blue Tokai"
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#FF6A00]"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">CATEGORY</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as OrderCategory)}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#FF6A00]"
                >
                  <option value="Food">Food</option>
                  <option value="Instamart">Instamart Grocery</option>
                  <option value="Dineout">Dineout Booking</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">ITEM NAME</label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Vietnamese Cold Brew"
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#FF6A00]"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">TOTAL (₹)</label>
                <input
                  type="number"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#FF6A00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">MOOD</label>
                <input
                  type="text"
                  value={userMood}
                  onChange={(e) => setUserMood(e.target.value)}
                  placeholder="Exhausted & Focused"
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#FF6A00]"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">WEATHER</label>
                <input
                  type="text"
                  value={userWeather}
                  onChange={(e) => setUserWeather(e.target.value)}
                  placeholder="Rainy ⛈️ / Late Night 🌙"
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#FF6A00]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FF6A00] hover:bg-[#FF8A00] text-black font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(255,106,0,0.4)] transition-all mt-2"
            >
              INGEST REMNANT
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
