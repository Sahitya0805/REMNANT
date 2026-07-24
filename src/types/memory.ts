export type OrderCategory = 'Food' | 'Instamart' | 'Dineout';

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  categoryTag?: string;
}

export interface OrderMemory {
  id: string;
  title: string;
  restaurantOrStore: string;
  category: OrderCategory;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  totalAmount: number;
  items: OrderItem[];
  mood: string; // e.g., 'Exhausted', 'Festive', 'Focused', 'Comfort', 'Celebratory', 'Cozy'
  weather: string; // e.g., 'Rainy ⛈️', 'Chilly 🌧️', 'Sunny ☀️', 'Monsoon 🌧️', 'Late Night 🌙'
  festivalOrEvent?: string; // e.g., 'IPL Finals', 'Diwali', 'Exam Week', 'Mom\'s Birthday', 'Hackathon', 'Job Interview'
  location: string; // e.g., 'Koramangala, Bangalore', 'Indiranagar, Bangalore', 'Home Office'
  companions: string[]; // e.g., ['Solo', 'Friends', 'Family', 'Teammates']
  budgetTier: 'Budget' | 'Moderate' | 'Premium';
  nutritionInfo?: {
    calories?: number;
    protein?: string;
    isHealthy: boolean;
  };
  rating: number; // 1-5
  notes?: string;
  storyNarrative: string; // AI generated memory story
  vectorTags: string[]; // Key semantic terms for vector embedding
  pinnedCapsule?: boolean;
}

export type NodeType = 'user' | 'event' | 'restaurant' | 'dish' | 'weather' | 'mood' | 'location' | 'category';

export interface MemoryNode {
  id: string;
  label: string;
  type: NodeType;
  color: string;
  icon?: string;
  orderCount?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface MemoryEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  strength: number;
}

export interface MemoryAgentToolCall {
  id: string;
  toolName: string;
  arguments: Record<string, any>;
  status: 'executing' | 'completed';
  resultSummary: string;
  timestamp: string;
}

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  toolCalls?: MemoryAgentToolCall[];
  attachedMemories?: OrderMemory[];
  suggestedActions?: string[];
}

export interface TasteDna {
  spicy: number;
  sweet: number;
  coffee: number;
  streetFood: number;
  comfortFood: number;
  healthy: number;
  topCuisine: string;
  dominantMood: string;
}

export interface MemoryCapsule {
  id: string;
  memoryId: string;
  title: string;
  emoji: string;
  pinnedDate: string;
  reminderNote: string;
  isAnniversary: boolean;
}

export interface InsightCard {
  id: string;
  category: 'Emotional' | 'Financial' | 'Health' | 'Behavioral';
  title: string;
  description: string;
  badge: string;
  impactMetric: string;
}

export interface PredictionAlert {
  id: string;
  type: 'Event Prep' | 'Pantry Replenishment' | 'Craving Forecast';
  title: string;
  description: string;
  recommendedItems: string[];
  confidence: number; // 0-100%
  daysRemaining: number;
  actionText: string;
}

export interface SmartCollection {
  id: string;
  title: string;
  description: string;
  emoji: string;
  filterTag: string;
  memoryIds: string[];
}
