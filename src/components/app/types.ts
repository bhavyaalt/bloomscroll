export interface Preferences {
  topics: string[];
  goals: string[];
  completedAt: string;
}

export interface StreakState {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  lastVisitDate: string;
}
