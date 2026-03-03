"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contentLibrary, Card } from "@/lib/content-library";
import { getCardsForReview, recordReview, ReviewCard } from "@/lib/spaced-repetition";

interface ReviewViewProps {
  isSubscribed: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export default function ReviewView({ isSubscribed, onClose, onUpgrade }: ReviewViewProps) {
  const [dueCards, setDueCards] = useState<{ review: ReviewCard; card: Card }[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const reviews = getCardsForReview();
    const mapped = reviews
      .map(r => {
        const card = contentLibrary.find(c => c.id === r.cardId);
        return card ? { review: r, card } : null;
      })
      .filter(Boolean) as { review: ReviewCard; card: Card }[];
    setDueCards(mapped);
  }, []);

  if (!isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] bg-[#1a1a1a] flex items-center justify-center p-4"
      >
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="font-impact text-2xl text-[#007A5E] uppercase mb-2">
            Spaced Repetition
          </h2>
          <p className="text-white/60 text-sm mb-6">
            Turn saved cards into lasting knowledge. Pro subscribers get flashcard-style reviews
            that help you remember what you read.
          </p>
          <button
            onClick={onUpgrade}
            className="w-full py-3 rounded-xl bg-[#007A5E] text-white font-bold text-lg hover:bg-[#005a46] transition-all mb-3"
          >
            Upgrade to Pro
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white/5 text-white/50 text-sm hover:bg-white/10 transition-all"
          >
            Back to Feed
          </button>
        </div>
      </motion.div>
    );
  }

  if (dueCards.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] bg-[#1a1a1a] flex items-center justify-center p-4"
      >
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="font-impact text-2xl text-[#007A5E] uppercase mb-2">
            All Caught Up!
          </h2>
          <p className="text-white/60 text-sm mb-6">
            No cards due for review right now. Save more cards to build your review queue,
            or check back tomorrow.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#007A5E] text-white font-bold text-lg hover:bg-[#005a46] transition-all"
          >
            Back to Feed
          </button>
        </div>
      </motion.div>
    );
  }

  const current = dueCards[currentIdx];
  const isLast = currentIdx >= dueCards.length - 1;

  const handleAnswer = (gotIt: boolean) => {
    recordReview(current.review.cardId, gotIt);
    setRevealed(false);
    if (isLast) {
      onClose();
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-[#1a1a1a] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
        <button onClick={onClose} className="text-white/50 hover:text-white text-sm">
          ← Back
        </button>
        <span className="text-white/40 text-sm font-bold">
          {currentIdx + 1} / {dueCards.length} due
        </span>
        <div className="w-12" />
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/5">
        <div
          className="h-full bg-[#007A5E] transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / dueCards.length) * 100}%` }}
        />
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.card.id + currentIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md"
          >
            <div className="bg-gradient-to-b from-[#EACCD4] to-[#e0bfc8] text-[#007A5E] rounded-2xl p-6 sm:p-8 shadow-2xl">
              {/* Quote */}
              <blockquote className="text-lg sm:text-xl font-serif leading-relaxed text-center mb-6">
                <span className="text-[#007A5E]/30 text-3xl">&ldquo;</span>
                <span>{current.card.quote}</span>
                <span className="text-[#007A5E]/30 text-3xl">&rdquo;</span>
              </blockquote>

              {/* Hidden/Revealed Author */}
              <AnimatePresence mode="wait">
                {revealed ? (
                  <motion.div
                    key="revealed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <p className="font-bold text-xl">{current.card.author}</p>
                    <p className="text-sm text-[#007A5E]/70 italic">{current.card.book}</p>
                    <p className="text-xs text-[#007A5E]/50 mt-2">
                      Review #{current.review.reviewCount + 1} · Next in {current.review.interval}d if correct
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="inline-block px-6 py-2 rounded-lg bg-[#007A5E]/10 text-[#007A5E]/50 text-sm">
                      Who said this?
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action buttons */}
            <div className="mt-6">
              {!revealed ? (
                <button
                  onClick={() => setRevealed(true)}
                  className="w-full py-3.5 rounded-xl bg-[#007A5E] text-white font-bold text-lg hover:bg-[#005a46] transition-all"
                >
                  Reveal Answer
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAnswer(false)}
                    className="flex-1 py-3.5 rounded-xl bg-red-500/20 text-red-400 font-bold hover:bg-red-500/30 transition-all border border-red-500/30"
                  >
                    Need Review
                  </button>
                  <button
                    onClick={() => handleAnswer(true)}
                    className="flex-1 py-3.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/30 transition-all border border-emerald-500/30"
                  >
                    Got It!
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
