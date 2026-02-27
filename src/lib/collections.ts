// Curated collections of wisdom cards

import { Card, contentLibrary } from "./content-library";

export interface Collection {
  id: string;
  name: string;
  description: string;
  emoji: string;
  cardIds: string[];
  color: string;
}

// Curated collections
export const collections: Collection[] = [
  {
    id: "morning-motivation",
    name: "Morning Motivation",
    description: "Start your day with powerful insights",
    emoji: "🌅",
    cardIds: contentLibrary
      .filter(c => 
        c.topic.includes("productivity") || 
        c.topic.includes("mindfulness") ||
        c.insight.toLowerCase().includes("morning") ||
        c.insight.toLowerCase().includes("start") ||
        c.insight.toLowerCase().includes("begin")
      )
      .slice(0, 20)
      .map(c => c.id),
    color: "#f59e0b",
  },
  {
    id: "stoic-sundays",
    name: "Stoic Sundays",
    description: "Ancient wisdom for modern challenges",
    emoji: "🗿",
    cardIds: contentLibrary
      .filter(c => c.topic.includes("stoicism") || c.topic.includes("philosophy"))
      .slice(0, 25)
      .map(c => c.id),
    color: "#6366f1",
  },
  {
    id: "leadership-lessons",
    name: "Leadership Lessons",
    description: "Wisdom from great leaders",
    emoji: "👑",
    cardIds: contentLibrary
      .filter(c => c.topic.includes("leadership") || c.topic.includes("business"))
      .slice(0, 20)
      .map(c => c.id),
    color: "#ec4899",
  },
  {
    id: "mental-models",
    name: "Mental Models",
    description: "Frameworks for better thinking",
    emoji: "🧠",
    cardIds: contentLibrary
      .filter(c => 
        c.topic.includes("psychology") || 
        c.author.includes("Taleb") ||
        c.author.includes("Munger") ||
        c.author.includes("Kahneman")
      )
      .slice(0, 20)
      .map(c => c.id),
    color: "#14b8a6",
  },
  {
    id: "creative-spark",
    name: "Creative Spark",
    description: "Unlock your creative potential",
    emoji: "✨",
    cardIds: contentLibrary
      .filter(c => 
        c.topic.includes("creativity") || 
        c.author.includes("Pressfield") ||
        c.author.includes("Godin")
      )
      .slice(0, 15)
      .map(c => c.id),
    color: "#f43f5e",
  },
  {
    id: "calm-mind",
    name: "Calm Mind",
    description: "Find peace in the chaos",
    emoji: "🧘",
    cardIds: contentLibrary
      .filter(c => 
        c.topic.includes("mindfulness") || 
        c.topic.includes("spirituality") ||
        c.author.includes("Thich") ||
        c.author.includes("Pema")
      )
      .slice(0, 15)
      .map(c => c.id),
    color: "#22c55e",
  },
  {
    id: "wealth-wisdom",
    name: "Wealth Wisdom",
    description: "Financial and life prosperity",
    emoji: "💰",
    cardIds: contentLibrary
      .filter(c => 
        c.topic.includes("finance") || 
        c.author.includes("Naval") ||
        c.author.includes("Kiyosaki")
      )
      .slice(0, 15)
      .map(c => c.id),
    color: "#eab308",
  },
  {
    id: "relationship-insights",
    name: "Relationship Insights",
    description: "Connect better with others",
    emoji: "💝",
    cardIds: contentLibrary
      .filter(c => 
        c.topic.includes("relationships") || 
        c.author.includes("Carnegie")
      )
      .slice(0, 15)
      .map(c => c.id),
    color: "#f472b6",
  },
];

export function getCollectionCards(collection: Collection): Card[] {
  return collection.cardIds
    .map(id => contentLibrary.find(c => c.id === id))
    .filter((c): c is Card => c !== undefined);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find(c => c.id === id);
}
