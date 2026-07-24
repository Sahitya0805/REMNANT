import type { OrderMemory, OrderCategory } from '../types/memory';

export interface RawOrderInput {
  title: string;
  restaurantOrStore: string;
  category: OrderCategory;
  items: { name: string; price: number; quantity: number }[];
  date?: string;
  time?: string;
  userNotes?: string;
  userMood?: string;
  userWeather?: string;
  userEvent?: string;
  companions?: string[];
}

export class MemoryExtractor {
  public static extractMemory(raw: RawOrderInput): OrderMemory {
    const totalAmount = raw.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const date = raw.date || new Date().toISOString().split('T')[0];
    const time = raw.time || new Date().toTimeString().slice(0, 5);

    const mood = raw.userMood || this.inferMood(raw.title, raw.items, time);
    const weather = raw.userWeather || this.inferWeather(raw.title, raw.items, time);
    const festivalOrEvent = raw.userEvent || this.inferEvent(date, raw.title, raw.items);
    const companions = raw.companions && raw.companions.length > 0 ? raw.companions : this.inferCompanions(totalAmount, raw.items.length);
    const budgetTier = totalAmount < 350 ? 'Budget' : totalAmount < 1000 ? 'Moderate' : 'Premium';
    
    const storyNarrative = this.generateStory(raw.restaurantOrStore, time, mood, weather, festivalOrEvent, raw.items);
    const vectorTags = this.generateVectorTags(raw.title, raw.restaurantOrStore, raw.items, mood, weather, festivalOrEvent, companions);

    return {
      id: 'mem-' + Math.random().toString(36).substr(2, 9),
      title: raw.title,
      restaurantOrStore: raw.restaurantOrStore,
      category: raw.category,
      date,
      time,
      totalAmount,
      items: raw.items,
      mood,
      weather,
      festivalOrEvent,
      location: 'Koramangala, Bangalore',
      companions,
      budgetTier,
      rating: 5,
      notes: raw.userNotes || `Order of ${raw.items.map(i => i.name).join(', ')}`,
      storyNarrative,
      vectorTags
    };
  }

  private static inferMood(title: string, items: { name: string }[], time: string): string {
    const text = (title + ' ' + items.map(i => i.name).join(' ')).toLowerCase();
    const hour = parseInt(time.split(':')[0], 10);

    if (hour >= 23 || hour < 4) return 'Exhausted & Focused 🌙';
    if (text.includes('cake') || text.includes('party') || text.includes('biryani') || text.includes('beer')) return 'Celebratory 🎉';
    if (text.includes('coffee') || text.includes('brew')) return 'Focused ☕';
    if (text.includes('ramen') || text.includes('soup') || text.includes('pasta')) return 'Cozy & Nostalgic 🌧️';
    if (text.includes('salad') || text.includes('smoothie') || text.includes('avocado')) return 'Healthy & Rejuvenated 🥗';
    return 'Comfort & Joy 💛';
  }

  private static inferWeather(title: string, items: { name: string }[], time: string): string {
    const text = (title + ' ' + items.map(i => i.name).join(' ')).toLowerCase();
    const hour = parseInt(time.split(':')[0], 10);

    if (hour >= 22 || hour < 5) return 'Late Night 🌙';
    if (text.includes('ramen') || text.includes('hot') || text.includes('tea') || text.includes('soup')) return 'Rainy ⛈️';
    if (text.includes('cold brew') || text.includes('ice cream') || text.includes('shake')) return 'Sunny ☀️';
    return 'Pleasant Evening 🌆';
  }

  private static inferEvent(date: string, title: string, items: { name: string }[]): string | undefined {
    const text = (title + ' ' + items.map(i => i.name).join(' ')).toLowerCase();
    const month = date.split('-')[1];

    if (text.includes('diwali') || text.includes('diya') || text.includes('kaju katli')) return 'Diwali';
    if (text.includes('cake') || text.includes('candle') || text.includes('birthday')) return 'Mom\'s Birthday';
    if (text.includes('exam') || text.includes('study') || text.includes('finals')) return 'Exam Week';
    if (text.includes('hackathon') || text.includes('tacos')) return 'Hackathon';
    if (text.includes('interview') || text.includes('dosa')) return 'Job Interview';
    if (text.includes('ipl') || text.includes('match')) return 'IPL Finals';
    if (month === '10' || month === '11') return 'Festive Season';
    return 'Weekend Escape';
  }

  private static inferCompanions(totalAmount: number, itemCount: number): string[] {
    if (totalAmount > 1500 || itemCount >= 4) return ['Friends', 'Family'];
    if (totalAmount > 600 || itemCount >= 2) return ['Friends'];
    return ['Solo'];
  }

  private static generateStory(
    store: string,
    time: string,
    mood: string,
    weather: string,
    event: string | undefined,
    items: { name: string }[]
  ): string {
    const mainItem = items[0]?.name || 'food';
    const eventContext = event ? ` during ${event}` : '';
    return `Memory recorded. You ordered ${mainItem} from ${store} at ${time}${eventContext}. Mood was tagged as ${mood} under ${weather} context.`;
  }

  private static generateVectorTags(
    title: string,
    store: string,
    items: { name: string }[],
    mood: string,
    weather: string,
    event?: string,
    companions?: string[]
  ): string[] {
    const tags = new Set<string>();
    tags.add(store.toLowerCase());
    tags.add(mood.toLowerCase());
    tags.add(weather.toLowerCase());
    if (event) tags.add(event.toLowerCase());
    
    title.toLowerCase().split(' ').forEach(w => { if (w.length > 2) tags.add(w); });
    items.forEach(i => {
      i.name.toLowerCase().split(' ').forEach(w => { if (w.length > 2) tags.add(w); });
    });
    companions?.forEach(c => tags.add(c.toLowerCase()));
    return Array.from(tags);
  }
}
