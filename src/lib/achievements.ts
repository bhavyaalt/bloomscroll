// Achievements & Badges System

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "streak" | "reading" | "social" | "quiz" | "explorer" | "seasonal";
  requirement: number;
  xpReward: number;
}

export interface UserAchievement {
  achievementId: string;
  unlockedAt: string;
  progress: number;
}

export const achievements: Achievement[] = [
  // Streak achievements
  { id: "streak_3", name: "Getting Started", description: "3 day streak", icon: "🔥", category: "streak", requirement: 3, xpReward: 50 },
  { id: "streak_7", name: "Week Warrior", description: "7 day streak", icon: "⚡", category: "streak", requirement: 7, xpReward: 100 },
  { id: "streak_14", name: "Fortnight Focus", description: "14 day streak", icon: "🌟", category: "streak", requirement: 14, xpReward: 200 },
  { id: "streak_30", name: "Monthly Master", description: "30 day streak", icon: "💎", category: "streak", requirement: 30, xpReward: 500 },
  { id: "streak_100", name: "Century Club", description: "100 day streak", icon: "👑", category: "streak", requirement: 100, xpReward: 1000 },
  { id: "streak_365", name: "Year of Wisdom", description: "365 day streak", icon: "🏆", category: "streak", requirement: 365, xpReward: 5000 },

  // Reading achievements
  { id: "read_10", name: "First Steps", description: "Read 10 cards", icon: "📚", category: "reading", requirement: 10, xpReward: 25 },
  { id: "read_50", name: "Bookworm", description: "Read 50 cards", icon: "🐛", category: "reading", requirement: 50, xpReward: 75 },
  { id: "read_100", name: "Knowledge Seeker", description: "Read 100 cards", icon: "🔍", category: "reading", requirement: 100, xpReward: 150 },
  { id: "read_500", name: "Scholar", description: "Read 500 cards", icon: "🎓", category: "reading", requirement: 500, xpReward: 500 },
  { id: "read_1000", name: "Sage", description: "Read 1000 cards", icon: "🧙", category: "reading", requirement: 1000, xpReward: 1000 },

  // Quiz achievements
  { id: "quiz_10", name: "Quiz Taker", description: "Complete 10 quizzes", icon: "❓", category: "quiz", requirement: 10, xpReward: 50 },
  { id: "quiz_perfect_5", name: "Sharp Mind", description: "5 perfect quizzes in a row", icon: "🎯", category: "quiz", requirement: 5, xpReward: 200 },
  { id: "quiz_100", name: "Quiz Master", description: "Complete 100 quizzes", icon: "🧠", category: "quiz", requirement: 100, xpReward: 300 },

  // Explorer achievements
  { id: "topics_5", name: "Curious Mind", description: "Explore 5 topics", icon: "🗺️", category: "explorer", requirement: 5, xpReward: 50 },
  { id: "topics_10", name: "Renaissance Soul", description: "Explore 10 topics", icon: "🌈", category: "explorer", requirement: 10, xpReward: 150 },
  { id: "books_5", name: "Library Card", description: "Read from 5 different books", icon: "📖", category: "explorer", requirement: 5, xpReward: 75 },
  { id: "books_20", name: "Bibliophile", description: "Read from 20 different books", icon: "📚", category: "explorer", requirement: 20, xpReward: 300 },

  // Social achievements
  { id: "pins_5", name: "Curator", description: "Pin 5 cards to garden", icon: "📌", category: "social", requirement: 5, xpReward: 50 },
  { id: "pins_25", name: "Garden Keeper", description: "Pin 25 cards to garden", icon: "🌻", category: "social", requirement: 25, xpReward: 150 },
  { id: "followers_10", name: "Influencer", description: "Get 10 followers", icon: "👥", category: "social", requirement: 10, xpReward: 200 },
  { id: "shares_10", name: "Spreader of Wisdom", description: "Share 10 cards", icon: "📤", category: "social", requirement: 10, xpReward: 100 },

  // Seasonal (rotate these)
  { id: "spring_2026", name: "Spring Bloom", description: "Read 50 cards in Spring 2026", icon: "🌸", category: "seasonal", requirement: 50, xpReward: 250 },
];

// XP Level thresholds
export const levels = [
  { level: 1, xpRequired: 0, title: "Seedling" },
  { level: 2, xpRequired: 100, title: "Sprout" },
  { level: 3, xpRequired: 250, title: "Sapling" },
  { level: 4, xpRequired: 500, title: "Bush" },
  { level: 5, xpRequired: 1000, title: "Tree" },
  { level: 6, xpRequired: 2000, title: "Oak" },
  { level: 7, xpRequired: 3500, title: "Redwood" },
  { level: 8, xpRequired: 5500, title: "Ancient" },
  { level: 9, xpRequired: 8000, title: "Elder" },
  { level: 10, xpRequired: 12000, title: "Sage" },
];

const ACHIEVEMENTS_KEY = "bloomscroll_achievements";
const XP_KEY = "bloomscroll_xp";

export interface AchievementState {
  unlocked: UserAchievement[];
  totalXp: number;
  currentLevel: number;
}

export function getAchievementState(): AchievementState {
  if (typeof window === "undefined") return { unlocked: [], totalXp: 0, currentLevel: 1 };
  
  const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
  const xp = parseInt(localStorage.getItem(XP_KEY) || "0", 10);
  const level = levels.findLast(l => xp >= l.xpRequired)?.level || 1;
  
  return {
    unlocked: stored ? JSON.parse(stored) : [],
    totalXp: xp,
    currentLevel: level,
  };
}

export function addXp(amount: number): { newTotal: number; leveledUp: boolean; newLevel: number } {
  const currentXp = parseInt(localStorage.getItem(XP_KEY) || "0", 10);
  const currentLevel = levels.findLast(l => currentXp >= l.xpRequired)?.level || 1;
  
  const newTotal = currentXp + amount;
  localStorage.setItem(XP_KEY, newTotal.toString());
  
  const newLevel = levels.findLast(l => newTotal >= l.xpRequired)?.level || 1;
  
  return {
    newTotal,
    leveledUp: newLevel > currentLevel,
    newLevel,
  };
}

export function unlockAchievement(achievementId: string): Achievement | null {
  const achievement = achievements.find(a => a.id === achievementId);
  if (!achievement) return null;
  
  const state = getAchievementState();
  if (state.unlocked.some(u => u.achievementId === achievementId)) return null;
  
  const newUnlock: UserAchievement = {
    achievementId,
    unlockedAt: new Date().toISOString(),
    progress: achievement.requirement,
  };
  
  const updated = [...state.unlocked, newUnlock];
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updated));
  
  addXp(achievement.xpReward);
  
  return achievement;
}

export function checkAchievements(stats: {
  currentStreak: number;
  totalCardsRead: number;
  quizTotal: number;
  quizCorrect: number;
  topicsExplored: number;
  booksRead: number;
  pins: number;
  followers: number;
  shares: number;
}): Achievement[] {
  const newlyUnlocked: Achievement[] = [];
  
  // Check streak achievements
  if (stats.currentStreak >= 3) { const a = unlockAchievement("streak_3"); if (a) newlyUnlocked.push(a); }
  if (stats.currentStreak >= 7) { const a = unlockAchievement("streak_7"); if (a) newlyUnlocked.push(a); }
  if (stats.currentStreak >= 14) { const a = unlockAchievement("streak_14"); if (a) newlyUnlocked.push(a); }
  if (stats.currentStreak >= 30) { const a = unlockAchievement("streak_30"); if (a) newlyUnlocked.push(a); }
  if (stats.currentStreak >= 100) { const a = unlockAchievement("streak_100"); if (a) newlyUnlocked.push(a); }
  if (stats.currentStreak >= 365) { const a = unlockAchievement("streak_365"); if (a) newlyUnlocked.push(a); }
  
  // Check reading achievements
  if (stats.totalCardsRead >= 10) { const a = unlockAchievement("read_10"); if (a) newlyUnlocked.push(a); }
  if (stats.totalCardsRead >= 50) { const a = unlockAchievement("read_50"); if (a) newlyUnlocked.push(a); }
  if (stats.totalCardsRead >= 100) { const a = unlockAchievement("read_100"); if (a) newlyUnlocked.push(a); }
  if (stats.totalCardsRead >= 500) { const a = unlockAchievement("read_500"); if (a) newlyUnlocked.push(a); }
  if (stats.totalCardsRead >= 1000) { const a = unlockAchievement("read_1000"); if (a) newlyUnlocked.push(a); }
  
  // Check quiz achievements
  if (stats.quizTotal >= 10) { const a = unlockAchievement("quiz_10"); if (a) newlyUnlocked.push(a); }
  if (stats.quizTotal >= 100) { const a = unlockAchievement("quiz_100"); if (a) newlyUnlocked.push(a); }
  
  // Check explorer achievements
  if (stats.topicsExplored >= 5) { const a = unlockAchievement("topics_5"); if (a) newlyUnlocked.push(a); }
  if (stats.topicsExplored >= 10) { const a = unlockAchievement("topics_10"); if (a) newlyUnlocked.push(a); }
  if (stats.booksRead >= 5) { const a = unlockAchievement("books_5"); if (a) newlyUnlocked.push(a); }
  if (stats.booksRead >= 20) { const a = unlockAchievement("books_20"); if (a) newlyUnlocked.push(a); }
  
  // Check social achievements
  if (stats.pins >= 5) { const a = unlockAchievement("pins_5"); if (a) newlyUnlocked.push(a); }
  if (stats.pins >= 25) { const a = unlockAchievement("pins_25"); if (a) newlyUnlocked.push(a); }
  if (stats.followers >= 10) { const a = unlockAchievement("followers_10"); if (a) newlyUnlocked.push(a); }
  if (stats.shares >= 10) { const a = unlockAchievement("shares_10"); if (a) newlyUnlocked.push(a); }
  
  return newlyUnlocked;
}

export function getLevelInfo(xp: number) {
  const currentLevel = levels.findLast(l => xp >= l.xpRequired) || levels[0];
  const nextLevel = levels.find(l => l.xpRequired > xp);
  
  const xpInCurrentLevel = xp - currentLevel.xpRequired;
  const xpForNextLevel = nextLevel ? nextLevel.xpRequired - currentLevel.xpRequired : 0;
  const progress = nextLevel ? (xpInCurrentLevel / xpForNextLevel) * 100 : 100;
  
  return {
    level: currentLevel.level,
    title: currentLevel.title,
    xp,
    xpInCurrentLevel,
    xpForNextLevel,
    progress,
    nextLevel: nextLevel?.level,
    nextTitle: nextLevel?.title,
  };
}
