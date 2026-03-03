const SR_STORAGE_KEY = "bloomscroll_spaced_repetition";

const INTERVALS = [1, 3, 7, 14, 30]; // days

export interface ReviewCard {
  cardId: string;
  nextReviewDate: string; // YYYY-MM-DD
  interval: number; // days
  reviewCount: number;
  lastReviewDate: string; // YYYY-MM-DD
}

export interface ReviewStats {
  totalCards: number;
  dueToday: number;
  mastered: number; // interval >= 30
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function loadReviewCards(): ReviewCard[] {
  if (typeof window === "undefined") return [];
  const json = localStorage.getItem(SR_STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

function saveReviewCards(cards: ReviewCard[]): void {
  localStorage.setItem(SR_STORAGE_KEY, JSON.stringify(cards));
}

export function addToReview(cardId: string): void {
  const cards = loadReviewCards();
  if (cards.find(c => c.cardId === cardId)) return;
  const today = getToday();
  cards.push({
    cardId,
    nextReviewDate: addDays(today, 1),
    interval: 1,
    reviewCount: 0,
    lastReviewDate: today,
  });
  saveReviewCards(cards);
}

export function removeFromReview(cardId: string): void {
  const cards = loadReviewCards().filter(c => c.cardId !== cardId);
  saveReviewCards(cards);
}

export function getCardsForReview(): ReviewCard[] {
  const today = getToday();
  return loadReviewCards().filter(c => c.nextReviewDate <= today);
}

export function recordReview(cardId: string, gotIt: boolean): void {
  const cards = loadReviewCards();
  const card = cards.find(c => c.cardId === cardId);
  if (!card) return;

  const today = getToday();
  card.lastReviewDate = today;
  card.reviewCount += 1;

  if (gotIt) {
    const currentIdx = INTERVALS.indexOf(card.interval);
    const nextIdx = Math.min(currentIdx + 1, INTERVALS.length - 1);
    card.interval = INTERVALS[nextIdx] ?? card.interval;
  } else {
    card.interval = INTERVALS[0];
  }

  card.nextReviewDate = addDays(today, card.interval);
  saveReviewCards(cards);
}

export function getReviewStats(): ReviewStats {
  const cards = loadReviewCards();
  const today = getToday();
  return {
    totalCards: cards.length,
    dueToday: cards.filter(c => c.nextReviewDate <= today).length,
    mastered: cards.filter(c => c.interval >= 30).length,
  };
}
