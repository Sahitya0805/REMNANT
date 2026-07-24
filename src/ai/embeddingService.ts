import type { OrderMemory } from '../types/memory';

const CONCEPT_DIMENSIONS = [
  'coffee', 'caffeine', 'late_night', 'exam', 'study',
  'biryani', 'spicy', 'ipl', 'sports', 'celebration',
  'cake', 'dessert', 'birthday', 'family', 'sweet',
  'diwali', 'festival', 'groceries', 'instamart', 'pantry',
  'ramen', 'rain', 'monsoon', 'cozy', 'soup',
  'dosa', 'south_indian', 'interview', 'breakfast', 'healthy',
  'tacos', 'hackathon', 'dineout', 'brewery', 'pizza'
];

export class EmbeddingService {
  public static generateEmbedding(textOrMemory: string | OrderMemory): number[] {
    const vector = new Array(CONCEPT_DIMENSIONS.length).fill(0.01);
    
    let text = '';
    if (typeof textOrMemory === 'string') {
      text = textOrMemory.toLowerCase();
    } else {
      text = [
        textOrMemory.title,
        textOrMemory.restaurantOrStore,
        textOrMemory.mood,
        textOrMemory.weather,
        textOrMemory.festivalOrEvent || '',
        textOrMemory.storyNarrative,
        ...textOrMemory.vectorTags,
        ...textOrMemory.items.map(i => i.name)
      ].join(' ').toLowerCase();
    }

    CONCEPT_DIMENSIONS.forEach((dim, idx) => {
      const keywords = dim.split('_');
      keywords.forEach(kw => {
        if (text.includes(kw)) {
          vector[idx] += 0.45;
        }
      });
    });

    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return vector.map(val => Number((val / (magnitude || 1)).toFixed(4)));
  }

  public static cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) return 0;
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;
    return Math.min(1.0, dotProduct / (Math.sqrt(normA) * Math.sqrt(normB)));
  }
}
