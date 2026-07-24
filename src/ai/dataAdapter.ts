import type { OrderMemory } from '../types/memory';
import { INITIAL_ORDER_MEMORIES } from '../data/initialOrders';

/**
 * REMNANT Swiggy MCP Data Adapter
 * 
 * Phase 1 (Builders Club Application): High-fidelity structured Swiggy MCP Data Adapter
 * Phase 2 (After MCP Grant): Direct live API integration with Swiggy Food, Instamart, and Dineout MCP endpoints
 */
export interface ISwiggyMcpAdapter {
  fetchFoodMemories(phone: string): Promise<OrderMemory[]>;
  fetchInstamartMemories(phone: string): Promise<OrderMemory[]>;
  fetchDineoutMemories(phone: string): Promise<OrderMemory[]>;
  fetchAllMemories(phone: string): Promise<OrderMemory[]>;
}

export class SwiggyMcpDataAdapter implements ISwiggyMcpAdapter {
  private static instance: SwiggyMcpDataAdapter;

  public static getInstance(): SwiggyMcpDataAdapter {
    if (!SwiggyMcpDataAdapter.instance) {
      SwiggyMcpDataAdapter.instance = new SwiggyMcpDataAdapter();
    }
    return SwiggyMcpDataAdapter.instance;
  }

  async fetchFoodMemories(_phone: string): Promise<OrderMemory[]> {
    // Adapter returns food category memories
    return INITIAL_ORDER_MEMORIES.filter(m => m.category === 'Food');
  }

  async fetchInstamartMemories(_phone: string): Promise<OrderMemory[]> {
    // Adapter returns grocery pantry category memories
    return INITIAL_ORDER_MEMORIES.filter(m => m.category === 'Instamart');
  }

  async fetchDineoutMemories(_phone: string): Promise<OrderMemory[]> {
    // Adapter returns dineout booking memories
    return INITIAL_ORDER_MEMORIES.filter(m => m.category === 'Dineout');
  }

  async fetchAllMemories(_phone: string): Promise<OrderMemory[]> {
    return INITIAL_ORDER_MEMORIES;
  }
}
