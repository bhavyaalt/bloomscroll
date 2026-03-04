import { Card, contentLibrary } from "./content-library";
import { learningCards } from "./learning-cards";

export const allCards: Card[] = [...contentLibrary, ...learningCards];

export function getAnyCardById(id: string): Card | undefined {
  return allCards.find((card) => card.id === id);
}
