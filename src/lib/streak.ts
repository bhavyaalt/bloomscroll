// Streak tracking — thin facade over reading-stats.ts (single source of truth)

import { getReadingStats, updateReadingStreak } from "./reading-stats";

interface StreakData {
  currentStreak: number;
  lastVisitDate: string;
  longestStreak: number;
  totalDays: number;
}

export function getStreakData(): StreakData {
  const stats = getReadingStats();
  return {
    currentStreak: stats.currentStreak,
    lastVisitDate: stats.lastReadDate,
    longestStreak: stats.longestStreak,
    totalDays: stats.totalDaysActive,
  };
}

export function updateStreak(): StreakData {
  const stats = updateReadingStreak();
  return {
    currentStreak: stats.currentStreak,
    lastVisitDate: stats.lastReadDate,
    longestStreak: stats.longestStreak,
    totalDays: stats.totalDaysActive,
  };
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 30) return "👑";
  if (streak >= 14) return "💎";
  if (streak >= 7) return "🔥";
  if (streak >= 3) return "⚡";
  return "🌱";
}

export function getStreakMessage(streak: number): string {
  if (streak >= 30) return "Legendary wisdom seeker!";
  if (streak >= 14) return "Two weeks of growth!";
  if (streak >= 7) return "One week strong!";
  if (streak >= 3) return "Building momentum!";
  if (streak === 1) return "Day one! Let's go!";
  return "Keep the streak alive!";
}
