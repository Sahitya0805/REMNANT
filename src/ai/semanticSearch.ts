import type { OrderMemory } from '../types/memory';
import { EmbeddingService } from './embeddingService';

export interface SearchResult {
  memory: OrderMemory;
  similarityScore: number;
  matchReason: string;
}

export class SemanticSearchEngine {
  public static search(query: string, memories: OrderMemory[]): SearchResult[] {
    if (!query.trim()) {
      return memories.map(m => ({
        memory: m,
        similarityScore: 1.0,
        matchReason: 'Recent order history'
      }));
    }

    const queryVec = EmbeddingService.generateEmbedding(query);
    const queryLower = query.toLowerCase();

    const results: SearchResult[] = memories.map(mem => {
      const memVec = EmbeddingService.generateEmbedding(mem);
      const vectorScore = EmbeddingService.cosineSimilarity(queryVec, memVec);

      let keywordBoost = 0;
      const reasons: string[] = [];

      if (mem.festivalOrEvent && queryLower.includes(mem.festivalOrEvent.toLowerCase())) {
        keywordBoost += 0.35;
        reasons.push(`Matched event: "${mem.festivalOrEvent}"`);
      }

      if (queryLower.includes('cold coffee') && mem.vectorTags.includes('cold brew')) {
        keywordBoost += 0.4;
        reasons.push('Matched cold coffee memory context');
      }

      if (queryLower.includes('rain') || queryLower.includes('rainy')) {
        if (mem.weather.toLowerCase().includes('rain') || mem.vectorTags.includes('ramen')) {
          keywordBoost += 0.4;
          reasons.push('Matched monsoon/rainy weather memory');
        }
      }

      if (queryLower.includes('late night') || queryLower.includes('exam') || queryLower.includes('finals')) {
        if (mem.mood.toLowerCase().includes('focused') || mem.vectorTags.includes('late night')) {
          keywordBoost += 0.35;
          reasons.push('Matched late night exam prep context');
        }
      }

      if (queryLower.includes('mom') || queryLower.includes('birthday') || queryLower.includes('cake')) {
        if (mem.vectorTags.includes('cake') || mem.vectorTags.includes('birthday')) {
          keywordBoost += 0.45;
          reasons.push('Matched family birthday celebration context');
        }
      }

      if (queryLower.includes('ipl') || queryLower.includes('match') || queryLower.includes('biryani')) {
        if (mem.vectorTags.includes('ipl finals') || mem.vectorTags.includes('biryani')) {
          keywordBoost += 0.4;
          reasons.push('Matched IPL finals victory feast');
        }
      }

      if (queryLower.includes('dosa') || queryLower.includes('interview')) {
        if (mem.vectorTags.includes('dosa') || mem.vectorTags.includes('interview')) {
          keywordBoost += 0.4;
          reasons.push('Matched post-interview dosa celebration');
        }
      }

      if (queryLower.includes('groceries') || queryLower.includes('diwali') || queryLower.includes('monthly')) {
        if (mem.category === 'Instamart' || mem.vectorTags.includes('groceries')) {
          keywordBoost += 0.35;
          reasons.push('Matched Instamart grocery memory');
        }
      }

      const finalScore = Math.min(0.99, Number((vectorScore * 0.6 + keywordBoost).toFixed(2)));
      const reasonText = reasons.length > 0 ? reasons.join(' • ') : `Semantic similarity (${Math.round(finalScore * 100)}%)`;

      return {
        memory: mem,
        similarityScore: finalScore,
        matchReason: reasonText
      };
    });

    return results
      .filter(r => r.similarityScore > 0.15)
      .sort((a, b) => b.similarityScore - a.similarityScore);
  }
}
