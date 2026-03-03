"use client";

import { motion } from "framer-motion";
import { Card } from "@/lib/content-library";

interface SavedCardsViewProps {
  cards: Card[];
  onRemove: (cardId: string) => void;
}

export default function SavedCardsView({ cards, onRemove }: SavedCardsViewProps) {
  return (
    <div className="pt-16 pb-20 px-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-xl">Your Library</h2>
        <span className="text-white/40 text-sm">{cards.length} saved</span>
      </div>
      {cards.length === 0 ? (
        <div className="text-center py-20 text-white/40">
          <div className="mb-4 flex justify-center">
            <svg className="size-10 text-white/40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <p className="text-lg mb-2">No saved cards yet</p>
          <p className="text-sm">Double-tap to save cards you love</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a2e23] border border-white/10 rounded-xl p-4"
            >
              <p className="text-sm text-white/80 italic mb-2 line-clamp-2">&ldquo;{card.quote}&rdquo;</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50">— {card.author}</span>
                <button
                  onClick={() => onRemove(card.id)}
                  className="text-xs text-red-400/70 hover:text-red-400"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
