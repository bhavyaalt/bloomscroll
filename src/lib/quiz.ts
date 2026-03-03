// Quiz mode - "Who said this?"

import { Card, contentLibrary } from "./content-library";

export interface QuizQuestion {
  quote: string;
  correctAuthor: string;
  options: string[];
  book: string;
}

const QUIZ_STORAGE_KEY = "bloomscroll_quiz_stats";

interface QuizStats {
  totalAnswered: number;
  correctAnswers: number;
  streak: number;
  bestStreak: number;
}

export function getQuizStats(): QuizStats {
  if (typeof window === "undefined") {
    return { totalAnswered: 0, correctAnswers: 0, streak: 0, bestStreak: 0 };
  }
  
  const stored = localStorage.getItem(QUIZ_STORAGE_KEY);
  if (!stored) {
    return { totalAnswered: 0, correctAnswers: 0, streak: 0, bestStreak: 0 };
  }
  
  return JSON.parse(stored);
}

export function updateQuizStats(correct: boolean): QuizStats {
  const stats = getQuizStats();
  
  const newStats: QuizStats = {
    totalAnswered: stats.totalAnswered + 1,
    correctAnswers: stats.correctAnswers + (correct ? 1 : 0),
    streak: correct ? stats.streak + 1 : 0,
    bestStreak: correct ? Math.max(stats.streak + 1, stats.bestStreak) : stats.bestStreak,
  };
  
  localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(newStats));
  return newStats;
}

export function generateQuizQuestion(excludeCards: Card[] = []): QuizQuestion {
  // Get a random card for the question
  const availableCards = contentLibrary.filter(
    c => !excludeCards.some(ec => ec.id === c.id)
  );
  
  const questionCard = availableCards[Math.floor(Math.random() * availableCards.length)];
  
  // Get 3 random wrong authors
  const allAuthors = [...new Set(contentLibrary.map(c => c.author))];
  const wrongAuthors = allAuthors
    .filter(a => a !== questionCard.author)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  // Shuffle options
  const options = [questionCard.author, ...wrongAuthors].sort(() => Math.random() - 0.5);
  
  return {
    quote: questionCard.quote,
    correctAuthor: questionCard.author,
    options,
    book: questionCard.book,
  };
}

export function getAccuracyPercentage(stats: QuizStats): number {
  if (stats.totalAnswered === 0) return 0;
  return Math.round((stats.correctAnswers / stats.totalAnswered) * 100);
}

export function getQuizRank(stats: QuizStats): { title: string; emoji: string } {
  const accuracy = getAccuracyPercentage(stats);
  
  if (stats.totalAnswered < 5) return { title: "Novice", emoji: "🌱" };
  if (accuracy >= 90) return { title: "Sage", emoji: "🧙" };
  if (accuracy >= 75) return { title: "Scholar", emoji: "📚" };
  if (accuracy >= 60) return { title: "Student", emoji: "✏️" };
  return { title: "Learner", emoji: "🔍" };
}
