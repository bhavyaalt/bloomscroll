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
          <p className="text-4xl mb-4">📚</p>
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
              className="bg-gradient-to-br from-[#EACCD4]/10 to-[#EACCD4]/5 border border-[#007A5E]/20 rounded-xl p-4"
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
