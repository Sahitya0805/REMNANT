import type { OrderMemory } from '../types/memory';
import { INITIAL_ORDER_MEMORIES } from '../data/initialOrders';

const MEMORIES_STORAGE_KEY = 'remnant_user_memories';
const USER_PHONE_STORAGE_KEY = 'remnant_user_phone';

export const StorageUtils = {
  getUserPhone(): string | null {
    return localStorage.getItem(USER_PHONE_STORAGE_KEY);
  },

  setUserPhone(phone: string): void {
    localStorage.setItem(USER_PHONE_STORAGE_KEY, phone);
  },

  clearUserPhone(): void {
    localStorage.removeItem(USER_PHONE_STORAGE_KEY);
  },

  getMemories(): OrderMemory[] {
    try {
      const stored = localStorage.getItem(MEMORIES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse stored memories:', e);
    }
    // Default seed memories if empty
    return INITIAL_ORDER_MEMORIES;
  },

  saveMemories(memories: OrderMemory[]): void {
    try {
      localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(memories));
    } catch (e) {
      console.error('Failed to save memories to storage:', e);
    }
  },

  addMemory(newMemory: OrderMemory): OrderMemory[] {
    const current = this.getMemories();
    const updated = [newMemory, ...current];
    this.saveMemories(updated);
    return updated;
  }
};
