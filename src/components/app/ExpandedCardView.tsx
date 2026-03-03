"use client";

import { motion } from "framer-motion";
import { Card } from "@/lib/content-library";

interface ExpandedCardViewProps {
  card: Card;
  isSaved: boolean;
  isPinned: boolean;
  onToggleSave: () => void;
  onPin: (cardId: string) => void;
  onUnpin: (cardId: string) => void;
  onClose: () => void;
}

export default function ExpandedCardView({ card, isSaved, isPinned, onToggleSave, onPin, onUnpin, onClose }: ExpandedCardViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#102219]/95 overflow-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-lg mx-auto p-6 pt-16"
      >
        {/* Close hint */}
        <div className="text-center mb-8">
          <span className="text-white/30 text-sm">Tap outside or swipe down to close</span>
        </div>

        {/* Full Quote */}
        <blockquote className="text-2xl sm:text-3xl font-serif text-white leading-relaxed mb-8">
          &ldquo;{card.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="mb-8 pb-8 border-b border-white/10">
          <p className="font-bold text-lg text-primary">{card.author}</p>
          <p className="text-white/50 italic">{card.book}</p>
        </div>

        {/* Key Insight */}
        <div className="mb-8">
          <h3 className="font-bold text-sm uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
            <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
            Key Insight
          </h3>
          <p className="text-white/80 leading-relaxed">{card.insight}</p>
        </div>

        {/* Related Topics */}
        <div className="mb-8">
          <h3 className="font-bold text-sm uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
            <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {card.topic.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm capitalize">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Reflection Prompt */}
        <div className="mb-8 p-4 rounded-xl bg-primary/10 border border-primary/20">
          <h3 className="font-bold text-sm text-primary mb-2">Reflect</h3>
          <p className="text-white/60 text-sm italic">How might you apply this wisdom today?</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onToggleSave}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isSaved
                ? "bg-primary text-[#102219]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            title={isSaved ? "Saved" : "Save"}
          >
            <svg className="size-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
          <button
            onClick={() => isPinned ? onUnpin(card.id) : onPin(card.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isPinned
                ? "bg-primary text-[#102219]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            title={isPinned ? "Unpin from garden" : "Pin to garden"}
          >
            <svg className="size-5" fill={isPinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C9.243 2 7 4.243 7 7c0 2.475 2.5 6.225 4.35 8.75a.812.812 0 001.3 0C14.5 13.225 17 9.475 17 7c0-2.757-2.243-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center text-lg"
            title="Close"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
