import type { OrderMemory, InsightCard, TasteDna } from '../types/memory';

export class PatternDiscoveryEngine {
  public static generateInsights(memories: OrderMemory[]): InsightCard[] {
    const totalSpent = memories.reduce((sum, m) => sum + m.totalAmount, 0);
    const weekendOrders = memories.filter(m => {
      const day = new Date(m.date).getDay();
      return day === 0 || day === 6;
    });

    const weekendSpendRatio = Math.round((weekendOrders.reduce((sum, m) => sum + m.totalAmount, 0) / (totalSpent || 1)) * 100);

    return [
      {
        id: 'ins-1',
        category: 'Emotional',
        title: 'Weather-Craving Correlation',
        description: 'You order hot Tonkotsu Ramen or Soup 100% of the time when heavy rain hits Bangalore.',
        badge: '🌧️ Monsoon Trigger',
        impactMetric: '+100% Rain Match'
      },
      {
        id: 'ins-2',
        category: 'Financial',
        title: 'Weekend Spend Elevation',
        description: `You spend ${weekendSpendRatio}% more on food & dining on weekends compared to weekdays.`,
        badge: '📈 Weekend Spike',
        impactMetric: `+${weekendSpendRatio}% Spend`
      },
      {
        id: 'ins-3',
        category: 'Behavioral',
        title: 'Exam Season Caffeine Ritual',
        description: 'Cold brew orders from Blue Tokai increase by 3.4x during late-night exam prep weeks.',
        badge: '☕ Focus Mode',
        impactMetric: '3.4x Caffeine'
      },
      {
        id: 'ins-4',
        category: 'Emotional',
        title: 'Victory & Milestone Feasts',
        description: 'Celebratory sports wins (IPL Finals) & interview completions always trigger spicy Biryani or Dosa.',
        badge: '🏆 Reward Habit',
        impactMetric: '5★ Happiness'
      }
    ];
  }

  public static generateTasteDna(memories: OrderMemory[]): TasteDna {
    let spicyCount = 0;
    let sweetCount = 0;
    let coffeeCount = 0;
    let streetCount = 0;
    let comfortCount = 0;
    let healthyCount = 0;

    memories.forEach(m => {
      const text = (m.title + ' ' + m.items.map(i => i.name).join(' ')).toLowerCase();
      if (text.includes('spicy') || text.includes('biryani') || text.includes('65') || text.includes('ramen')) spicyCount++;
      if (text.includes('cake') || text.includes('kaju') || text.includes('churros') || text.includes('sweet')) sweetCount++;
      if (text.includes('coffee') || text.includes('brew')) coffeeCount++;
      if (text.includes('dosa') || text.includes('tacos') || text.includes('churros')) streetCount++;
      if (text.includes('ramen') || text.includes('pasta') || text.includes('biryani') || text.includes('croissant')) comfortCount++;
      if (m.nutritionInfo?.isHealthy || text.includes('smoothie') || text.includes('avocado')) healthyCount++;
    });

    const total = memories.length || 1;

    return {
      spicy: Math.min(100, Math.round((spicyCount / total) * 100) + 40),
      sweet: Math.min(100, Math.round((sweetCount / total) * 100) + 15),
      coffee: Math.min(100, Math.round((coffeeCount / total) * 100) + 50),
      streetFood: Math.min(100, Math.round((streetCount / total) * 100) + 35),
      comfortFood: Math.min(100, Math.round((comfortCount / total) * 100) + 60),
      healthy: Math.min(100, Math.round((healthyCount / total) * 100) + 20),
      topCuisine: 'South Indian & Asian Comfort',
      dominantMood: 'Focused & Celebratory'
    };
  }
}
