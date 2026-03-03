import { contentLibrary, Card } from "./content-library";

// djb2 hash function
function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // ensure unsigned
}

const DAILY_CARD_DISMISSED_KEY = "bloomscroll_daily_card_dismissed";

export function getDailyCard(): Card {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const index = djb2Hash(today) % contentLibrary.length;
  return contentLibrary[index];
}

export function isDailyCardDismissed(): boolean {
  if (typeof window === "undefined") return true;
  const dismissed = localStorage.getItem(DAILY_CARD_DISMISSED_KEY);
  if (!dismissed) return false;
  const today = new Date().toISOString().split("T")[0];
  return dismissed === today;
}

export function dismissDailyCard(): void {
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem(DAILY_CARD_DISMISSED_KEY, today);
}
