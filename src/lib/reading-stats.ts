// Reading stats tracking - like GitHub contributions

const STATS_KEY = "bloomscroll_reading_stats";
const DAILY_READS_KEY = "bloomscroll_daily_reads";

export interface DailyRead {
  date: string; // YYYY-MM-DD
  count: number;
  cardIds: string[];
}

export interface ReadingStats {
  totalCardsRead: number;
  totalDaysActive: number;
  currentStreak: number;
  longestStreak: number;
  topicsExplored: Record<string, number>;
  quizAccuracy: number;
  quizTotal: number;
  quizCorrect: number;
  dailyReads: DailyRead[];
  joinedDate: string;
  lastReadDate: string;
}

function getDefaultStats(): ReadingStats {
  return {
    totalCardsRead: 0,
    totalDaysActive: 0,
    currentStreak: 0,
    longestStreak: 0,
    topicsExplored: {},
    quizAccuracy: 0,
    quizTotal: 0,
    quizCorrect: 0,
    dailyReads: [],
    joinedDate: new Date().toISOString().split("T")[0],
    lastReadDate: "",
  };
}

export function getReadingStats(): ReadingStats {
  if (typeof window === "undefined") return getDefaultStats();
  
  const stored = localStorage.getItem(STATS_KEY);
  if (!stored) return getDefaultStats();
  
  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultStats();
  }
}

export function saveReadingStats(stats: ReadingStats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function recordCardRead(cardId: string, topics: string[]): ReadingStats {
  const stats = getReadingStats();
  const today = new Date().toISOString().split("T")[0];
  
  // Update total
  stats.totalCardsRead++;
  
  // Update topics
  topics.forEach(topic => {
    stats.topicsExplored[topic] = (stats.topicsExplored[topic] || 0) + 1;
  });
  
  // Update daily reads
  let todayEntry = stats.dailyReads.find(d => d.date === today);
  if (!todayEntry) {
    todayEntry = { date: today, count: 0, cardIds: [] };
    stats.dailyReads.push(todayEntry);
    stats.totalDaysActive++;
  }
  
  if (!todayEntry.cardIds.includes(cardId)) {
    todayEntry.count++;
    todayEntry.cardIds.push(cardId);
  }
  
  // Update streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  
  if (stats.lastReadDate === yesterdayStr || stats.lastReadDate === today) {
    if (stats.lastReadDate !== today) {
      stats.currentStreak++;
    }
  } else if (stats.lastReadDate !== today) {
    stats.currentStreak = 1;
  }
  
  stats.lastReadDate = today;
  stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
  
  // Keep only last 365 days of daily reads
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const oneYearAgoStr = oneYearAgo.toISOString().split("T")[0];
  stats.dailyReads = stats.dailyReads.filter(d => d.date >= oneYearAgoStr);
  
  saveReadingStats(stats);
  return stats;
}

export function recordQuizResult(correct: boolean): ReadingStats {
  const stats = getReadingStats();
  stats.quizTotal++;
  if (correct) stats.quizCorrect++;
  stats.quizAccuracy = Math.round((stats.quizCorrect / stats.quizTotal) * 100);
  saveReadingStats(stats);
  return stats;
}

// Generate contribution grid data (like GitHub)
export function getContributionGrid(days: number = 365): { date: string; count: number; level: number }[] {
  const stats = getReadingStats();
  const grid: { date: string; count: number; level: number }[] = [];
  
  const today = new Date();
  const dailyMap = new Map(stats.dailyReads.map(d => [d.date, d.count]));
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const count = dailyMap.get(dateStr) || 0;
    
    // Level 0-4 based on activity
    let level = 0;
    if (count >= 20) level = 4;
    else if (count >= 10) level = 3;
    else if (count >= 5) level = 2;
    else if (count >= 1) level = 1;
    
    grid.push({ date: dateStr, count, level });
  }
  
  return grid;
}

// Get weekly summary for the grid
export function getWeeklyGrid(weeks: number = 52): { date: string; count: number; level: number }[][] {
  const grid = getContributionGrid(weeks * 7);
  const weekly: { date: string; count: number; level: number }[][] = [];
  
  for (let i = 0; i < grid.length; i += 7) {
    weekly.push(grid.slice(i, i + 7));
  }
  
  return weekly;
}

export function getTopTopics(limit: number = 5): { topic: string; count: number }[] {
  const stats = getReadingStats();
  return Object.entries(stats.topicsExplored)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
