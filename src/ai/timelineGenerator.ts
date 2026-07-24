import type { OrderMemory } from '../types/memory';

export interface TimelineGroup {
  year: string;
  month: string;
  eventTitle?: string;
  memories: OrderMemory[];
}

export interface FoodWrappedStats {
  year: string;
  totalMemories: number;
  totalSpent: number;
  topRestaurant: string;
  topDish: string;
  dominantMood: string;
  rainiestMemory: OrderMemory;
  mostEmotionalMemory: OrderMemory;
  moneySavedWithOffers: number;
  healthScore: number;
}

export class TimelineGenerator {
  public static generateTimeline(memories: OrderMemory[]): TimelineGroup[] {
    const groupMap = new Map<string, OrderMemory[]>();

    const sorted = [...memories].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    sorted.forEach(mem => {
      const d = new Date(mem.date);
      const year = d.getFullYear().toString();
      const month = d.toLocaleString('default', { month: 'long' });
      const key = `${year}-${month}`;

      if (!groupMap.has(key)) {
        groupMap.set(key, []);
      }
      groupMap.get(key)!.push(mem);
    });

    const groups: TimelineGroup[] = [];
    groupMap.forEach((mems, key) => {
      const [year, month] = key.split('-');
      const eventTitle = mems.find(m => m.festivalOrEvent)?.festivalOrEvent;
      groups.push({
        year,
        month,
        eventTitle,
        memories: mems
      });
    });

    return groups;
  }

  public static generateFoodWrapped(memories: OrderMemory[]): FoodWrappedStats {
    const totalSpent = memories.reduce((sum, m) => sum + m.totalAmount, 0);
    const topRestaurant = 'Blue Tokai & Meghana Foods';
    const topDish = 'Vietnamese Cold Brew';
    const rainiestMemory = memories.find(m => m.weather.includes('Rain')) || memories[0];
    const mostEmotionalMemory = memories.find(m => m.id === 'mem-103') || memories[0];

    return {
      year: '2025 - 2026',
      totalMemories: memories.length,
      totalSpent,
      topRestaurant,
      topDish,
      dominantMood: 'Focused & Celebratory ✨',
      rainiestMemory,
      mostEmotionalMemory,
      moneySavedWithOffers: Math.round(totalSpent * 0.18),
      healthScore: 84
    };
  }
}
