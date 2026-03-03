"use client";

import { motion } from "framer-motion";
import { Card } from "@/lib/content-library";
import { topicIcons } from "./constants";

interface ExpandedCardViewProps {
  card: Card;
  isSaved: boolean;
  onToggleSave: () => void;
  onClose: () => void;
}

export default function ExpandedCardView({ card, isSaved, onToggleSave, onClose }: ExpandedCardViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 overflow-auto"
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
          <p className="font-bold text-lg text-[#007A5E]">{card.author}</p>
          <p className="text-white/50 italic">{card.book}</p>
        </div>

        {/* Key Insight */}
        <div className="mb-8">
          <h3 className="font-bold text-sm uppercase tracking-wider text-[#007A5E] mb-3">💡 Key Insight</h3>
          <p className="text-white/80 leading-relaxed">{card.insight}</p>
        </div>

        {/* Related Topics */}
        <div className="mb-8">
          <h3 className="font-bold text-sm uppercase tracking-wider text-[#007A5E] mb-3">🏷️ Topics</h3>
          <div className="flex flex-wrap gap-2">
            {card.topic.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm capitalize">
                {topicIcons[t]} {t}
              </span>
            ))}
          </div>
        </div>

        {/* Reflection Prompt */}
        <div className="mb-8 p-4 rounded-xl bg-[#007A5E]/10 border border-[#007A5E]/20">
          <h3 className="font-bold text-sm text-[#007A5E] mb-2">🤔 Reflect</h3>
          <p className="text-white/60 text-sm italic">How might you apply this wisdom today?</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onToggleSave}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
              isSaved
                ? "bg-[#007A5E] text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            title={isSaved ? "Saved" : "Save"}
          >
            {isSaved ? "★" : "☆"}
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
