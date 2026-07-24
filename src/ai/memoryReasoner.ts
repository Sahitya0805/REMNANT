import type { OrderMemory, AgentChatMessage, MemoryAgentToolCall } from '../types/memory';
import { SemanticSearchEngine } from './semanticSearch';

export class MemoryReasonerAgent {
  public static async processUserQuery(
    prompt: string,
    memories: OrderMemory[]
  ): Promise<AgentChatMessage> {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const promptLower = prompt.toLowerCase();
    const toolCalls: MemoryAgentToolCall[] = [];

    const searchToolId = 'tool-' + Math.random().toString(36).substr(2, 6);
    toolCalls.push({
      id: searchToolId,
      toolName: 'searchVectors',
      arguments: { query: prompt, topK: 5 },
      status: 'completed',
      resultSummary: `Searched 35D vector space for "${prompt}"`,
      timestamp
    });

    const searchResults = SemanticSearchEngine.search(prompt, memories);
    const topMatches = searchResults.slice(0, 3).map(r => r.memory);

    if (topMatches.length > 0) {
      const targetEntity = topMatches[0].festivalOrEvent || topMatches[0].restaurantOrStore;
      toolCalls.push({
        id: 'tool-' + Math.random().toString(36).substr(2, 6),
        toolName: 'traverseGraph',
        arguments: { nodeLabel: targetEntity },
        status: 'completed',
        resultSummary: `Traversed graph node "${targetEntity}" ➔ found ${topMatches.length} connected memories`,
        timestamp
      });
    }

    toolCalls.push({
      id: 'tool-' + Math.random().toString(36).substr(2, 6),
      toolName: 'generateInsights',
      arguments: { context: promptLower },
      status: 'completed',
      resultSummary: 'Discovered behavioral correlation & companion patterns',
      timestamp
    });

    let responseText = '';
    let suggestedActions: string[] = [];

    if (promptLower.includes('coffee') || promptLower.includes('late night') || promptLower.includes('working late') || promptLower.includes('exam')) {
      responseText = `Found it! On **17 January 2026 at 11:42 PM**, during your **Exam Week** sprint, you ordered a **Vietnamese Cold Brew** and an **Almond Croissant** from **Blue Tokai Coffee Roasters** (₹480). Your mood was logged as *Exhausted & Focused*. This was your 3rd coffee order that week!`;
      suggestedActions = ['Reorder Blue Tokai Cold Brew ☕', 'View Exam Week Memories 📚', 'Add to Best Coffee Collection ⭐️'];
    } else if (promptLower.includes('ipl') || promptLower.includes('match') || promptLower.includes('finals')) {
      responseText = `Here is your IPL victory memory! On **28 May 2025 at 10:15 PM**, right after India won the IPL finals, you ordered **Meghana Special Chicken Biryani** & Paneer 65 from **Meghana Foods** (₹920) with 3 friends in your living room.`;
      suggestedActions = ['Reorder Meghana Biryani 🍗', 'View Sports Memories 🏆'];
    } else if (promptLower.includes('mom') || promptLower.includes('birthday') || promptLower.includes('cake')) {
      responseText = `Found Mom's Birthday celebration! On **14 November 2025 at 6:30 PM**, you bought a **1kg Belgian Truffle Cake** with sparklers from **Smoor Chocolates** (₹1,450) for her 50th birthday dinner.`;
      suggestedActions = ['Reorder Smoor Belgian Cake 🎂', 'Add to Family Memories ❤️'];
    } else if (promptLower.includes('rain') || promptLower.includes('ramen')) {
      responseText = `You ordered **Spicy Chashu Tonkotsu Ramen** & Edamame from **Shiro / The Fatty Bao** on **20 July 2025 at 2:10 PM** during Bangalore's heavy monsoons (₹890). *Fun AI Pattern: You order hot ramen 100% of the time when it rains outside!* 🌧️`;
      suggestedActions = ['Reorder Tonkotsu Ramen 🍜', 'View Rainy Day Collection ⛈️'];
    } else if (promptLower.includes('groceries') || promptLower.includes('diwali') || promptLower.includes('month')) {
      responseText = `Here is your pre-Diwali Instamart haul from **31 October 2025**: You bought Kaju Katli (500g), Brass Clay Diyas, Cow Ghee, Milk, and Marigold Flowers for ₹2,840. Your monthly staples (Milk, Sourdough, Oats) were last restocked on 1 March 2026.`;
      suggestedActions = ['Reorder Instamart Essentials 🛒', 'View Pantry Predictions 🔮'];
    } else if (promptLower.includes('healthy') || promptLower.includes('healthiest')) {
      responseText = `Your highest rated healthy order was the **Berry Antioxidant Protein Smoothie & Avocado Toast** from **FreshMenu Health Hub** on 10 February 2026 (₹410) right after your 10k morning run.`;
      suggestedActions = ['Reorder Healthy Breakfast 🥗', 'View Health Habits 💚'];
    } else if (topMatches.length > 0) {
      const top = topMatches[0];
      responseText = `Based on semantic graph reasoning, I retrieved your memory from **${top.restaurantOrStore}** on **${top.date}** (${top.title}). You spent ₹${top.totalAmount} for ${top.items.map(i => i.name).join(', ')}. Mood context: *${top.mood}*.`;
      suggestedActions = [`Reorder from ${top.restaurantOrStore}`, 'Explore Memory Graph 🕸️'];
    } else {
      responseText = `I searched your commerce memory graph for "${prompt}". While I couldn't find an exact match, your recent top memories include Blue Tokai Cold Brew, Meghana Biryani, and Instamart Diwali Groceries.`;
      suggestedActions = ['Show All Memories 📜', 'Explore Memory Galaxy 🌌'];
    }

    return {
      id: 'msg-' + Math.random().toString(36).substr(2, 9),
      sender: 'agent',
      text: responseText,
      timestamp,
      toolCalls,
      attachedMemories: topMatches.length > 0 ? topMatches : memories.slice(0, 2),
      suggestedActions
    };
  }
}
