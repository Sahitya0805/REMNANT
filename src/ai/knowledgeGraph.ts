import type { OrderMemory, MemoryNode, MemoryEdge } from '../types/memory';

export class KnowledgeGraphEngine {
  public static buildGraph(memories: OrderMemory[]): { nodes: MemoryNode[]; edges: MemoryEdge[] } {
    const nodeMap = new Map<string, MemoryNode>();
    const edges: MemoryEdge[] = [];

    const userNode: MemoryNode = {
      id: 'user-main',
      label: 'Sahitya (User)',
      type: 'user',
      color: '#8b5cf6',
      icon: '👤',
      orderCount: memories.length
    };
    nodeMap.set(userNode.id, userNode);

    memories.forEach(mem => {
      const restId = `rest-${mem.restaurantOrStore.toLowerCase().replace(/\s+/g, '-')}`;
      if (!nodeMap.has(restId)) {
        nodeMap.set(restId, {
          id: restId,
          label: mem.restaurantOrStore,
          type: 'restaurant',
          color: '#ec4899',
          icon: mem.category === 'Instamart' ? '🛒' : mem.category === 'Dineout' ? '🍽️' : '🏪',
          orderCount: 1
        });
      } else {
        const existing = nodeMap.get(restId)!;
        existing.orderCount = (existing.orderCount || 1) + 1;
      }

      edges.push({
        id: `edge-${userNode.id}-${restId}`,
        source: userNode.id,
        target: restId,
        label: 'ORDERED_FROM',
        strength: 0.8
      });

      if (mem.festivalOrEvent) {
        const eventId = `event-${mem.festivalOrEvent.toLowerCase().replace(/\s+/g, '-')}`;
        if (!nodeMap.has(eventId)) {
          nodeMap.set(eventId, {
            id: eventId,
            label: mem.festivalOrEvent,
            type: 'event',
            color: '#f59e0b',
            icon: '🎉',
            orderCount: 1
          });
        }
        edges.push({
          id: `edge-${restId}-${eventId}`,
          source: restId,
          target: eventId,
          label: 'ENJOYED_DURING',
          strength: 0.9
        });
      }

      const weatherClean = mem.weather.replace(/[^a-zA-Z\s]/g, '').trim();
      const weatherId = `weather-${weatherClean.toLowerCase().replace(/\s+/g, '-')}`;
      if (!nodeMap.has(weatherId)) {
        nodeMap.set(weatherId, {
          id: weatherId,
          label: mem.weather,
          type: 'weather',
          color: '#3b82f6',
          icon: mem.weather.includes('Rain') ? '🌧️' : '☀️',
          orderCount: 1
        });
      }
      edges.push({
        id: `edge-${restId}-${weatherId}`,
        source: restId,
        target: weatherId,
        label: 'WEATHER_CONTEXT',
        strength: 0.7
      });

      const moodClean = mem.mood.replace(/[^a-zA-Z\s]/g, '').trim();
      const moodId = `mood-${moodClean.toLowerCase().replace(/\s+/g, '-')}`;
      if (!nodeMap.has(moodId)) {
        nodeMap.set(moodId, {
          id: moodId,
          label: mem.mood,
          type: 'mood',
          color: '#10b981',
          icon: '✨',
          orderCount: 1
        });
      }
      edges.push({
        id: `edge-${restId}-${moodId}`,
        source: restId,
        target: moodId,
        label: 'EVOKED_MOOD',
        strength: 0.75
      });

      mem.items.forEach(item => {
        const dishId = `dish-${item.name.toLowerCase().replace(/\s+/g, '-')}`;
        if (!nodeMap.has(dishId)) {
          nodeMap.set(dishId, {
            id: dishId,
            label: item.name,
            type: 'dish',
            color: '#ef4444',
            icon: '🍲',
            orderCount: 1
          });
        }
        edges.push({
          id: `edge-${restId}-${dishId}`,
          source: restId,
          target: dishId,
          label: 'INCLUDES_DISH',
          strength: 0.95
        });
      });
    });

    const nodes = Array.from(nodeMap.values());
    return { nodes, edges };
  }

  public static traverseForMemories(nodeIdOrLabel: string, memories: OrderMemory[]): OrderMemory[] {
    const term = nodeIdOrLabel.toLowerCase();
    return memories.filter(m => {
      const restMatch = m.restaurantOrStore.toLowerCase().includes(term);
      const eventMatch = m.festivalOrEvent?.toLowerCase().includes(term);
      const weatherMatch = m.weather.toLowerCase().includes(term);
      const moodMatch = m.mood.toLowerCase().includes(term);
      const itemMatch = m.items.some(i => i.name.toLowerCase().includes(term));
      const companionMatch = m.companions.some(c => c.toLowerCase().includes(term));

      return restMatch || eventMatch || weatherMatch || moodMatch || itemMatch || companionMatch;
    });
  }
}
