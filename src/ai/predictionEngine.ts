import type { OrderMemory, PredictionAlert } from '../types/memory';

export class PredictionEngine {
  public static generatePredictions(_memories: OrderMemory[]): PredictionAlert[] {
    return [
      {
        id: 'pred-1',
        type: 'Pantry Replenishment',
        title: 'Monthly Groceries & Milk Running Out',
        description: 'Based on your Instamart order cycle (last purchased March 1), your milk, sourdough bread, and oats will deplete in ~4 days.',
        recommendedItems: ['Full Cream Milk 500ml', 'Artisanal Sourdough Bread', 'Greek Yogurt Blueberry', 'Hass Avocados'],
        confidence: 94,
        daysRemaining: 4,
        actionText: '1-Click Instamart Restock 🛒'
      },
      {
        id: 'pred-2',
        type: 'Event Prep',
        title: 'Exam Season Approaching Next Week',
        description: 'Historical memory log indicates high caffeine consumption during late March finals. Prepare your cold brew supply.',
        recommendedItems: ['Blue Tokai Vietnamese Cold Brew (Pack of 3)', 'Almond Croissant', 'Dark Chocolate Almonds'],
        confidence: 88,
        daysRemaining: 7,
        actionText: 'Pre-order Cold Brew Stash ☕'
      },
      {
        id: 'pred-3',
        type: 'Craving Forecast',
        title: 'Monsoon Rain Forecasted for Tomorrow',
        description: 'Weather API predicts rain tomorrow afternoon in Koramangala. High likelihood of hot Ramen or Spicy Soups craving.',
        recommendedItems: ['Spicy Chashu Tonkotsu Ramen', 'Edamame with Sea Salt'],
        confidence: 91,
        daysRemaining: 1,
        actionText: 'Pre-schedule Ramen Delivery 🍜'
      }
    ];
  }
}
