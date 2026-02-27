// Streak tracking utilities

const STREAK_KEY = "bloomscroll_streak";

interface StreakData {
  currentStreak: number;
  lastVisitDate: string; // YYYY-MM-DD
  longestStreak: number;
  totalDays: number;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function getStreakData(): StreakData {
  if (typeof window === "undefined") {
    return { currentStreak: 0, lastVisitDate: "", longestStreak: 0, totalDays: 0 };
  }
  
  const stored = localStorage.getItem(STREAK_KEY);
  if (!stored) {
    return { currentStreak: 0, lastVisitDate: "", longestStreak: 0, totalDays: 0 };
  }
  
  return JSON.parse(stored);
}

export function updateStreak(): StreakData {
  const today = getToday();
  const yesterday = getYesterday();
  const data = getStreakData();
  
  // Already visited today
  if (data.lastVisitDate === today) {
    return data;
  }
  
  let newStreak: number;
  
  if (data.lastVisitDate === yesterday) {
    // Consecutive day - increment streak
    newStreak = data.currentStreak + 1;
  } else if (data.lastVisitDate === "") {
    // First visit ever
    newStreak = 1;
  } else {
    // Streak broken - start over
    newStreak = 1;
  }
  
  const newData: StreakData = {
    currentStreak: newStreak,
    lastVisitDate: today,
    longestStreak: Math.max(newStreak, data.longestStreak),
    totalDays: data.totalDays + 1,
  };
  
  localStorage.setItem(STREAK_KEY, JSON.stringify(newData));
  return newData;
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
