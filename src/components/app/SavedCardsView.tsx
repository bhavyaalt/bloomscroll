"use client";

import { motion } from "framer-motion";
import { Card } from "@/lib/content-library";

interface SavedCardsViewProps {
  cards: Card[];
  isSubscribed: boolean;
  saveLimit: number;
  onRemove: (cardId: string) => void;
  onUpgrade: () => void;
}

export default function SavedCardsView({ cards, isSubscribed, saveLimit, onRemove, onUpgrade }: SavedCardsViewProps) {
  return (
    <div className="pt-14 sm:pt-16 pb-20 px-3 sm:px-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="font-medium text-lg sm:text-xl">Your Library</h2>
        <span className="text-slate-400 text-xs sm:text-sm">
          {isSubscribed ? `${cards.length} saved` : `${cards.length}/${saveLimit} free saves used`}
        </span>
      </div>
      {!isSubscribed && (
        <div className="mb-4 rounded-2xl border border-brand/20 bg-brand-light p-4 text-sm text-slate-900">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium text-brand">Pro unlock</p>
              <p className="mt-1 font-medium">Keep an unlimited personal library</p>
              <p className="mt-1 text-slate-500">
                Save every quote worth revisiting and turn your library into a review queue.
              </p>
            </div>
            <button
              onClick={onUpgrade}
              className="shrink-0 rounded-full bg-brand px-3 py-1.5 text-[11px] font-medium text-white"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}
      {cards.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <div className="mb-4 flex justify-center">
            <svg className="size-10 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
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
              className="bg-white border border-slate-200 rounded-xl p-4"
            >
              <p className="text-sm text-slate-900 italic mb-2 line-clamp-2">&ldquo;{card.quote}&rdquo;</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">— {card.author}</span>
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
