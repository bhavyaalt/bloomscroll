"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/lib/content-library";

interface PinModalProps {
  card: Card;
  onConfirm: (note: string) => void;
  onClose: () => void;
}

const MAX_NOTE_LENGTH = 280;

export default function PinModal({ card, onConfirm, onClose }: PinModalProps) {
  const [note, setNote] = useState("");

  const displayQuote =
    card.quote.length > 120 ? card.quote.slice(0, 120) + "..." : card.quote;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl max-h-[90dvh] overflow-y-auto"
      >
        {/* Handle bar (mobile) */}
        <div className="flex justify-center mb-4 sm:hidden">
          <div className="w-10 h-1 bg-brand/20 rounded-full" />
        </div>

        {/* Header */}
        <h3
          className="text-lg font-medium text-brand mb-4"
          style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
        >
          Plant in Your Garden
        </h3>

        {/* Quote preview */}
        <div className="bg-[#FFF5FE] rounded-xl p-4 mb-4 border border-brand/10">
          <p
            className="text-sm text-brand/80 italic leading-relaxed"
            style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
          >
            &ldquo;{displayQuote}&rdquo;
          </p>
          <p className="text-xs text-brand/50 mt-2 font-medium">
            {card.author}
          </p>
        </div>

        {/* Note textarea */}
        <div className="mb-4">
          <textarea
            value={note}
            onChange={(e) => {
              if (e.target.value.length <= MAX_NOTE_LENGTH) {
                setNote(e.target.value);
              }
            }}
            placeholder="Add a personal note... (optional)"
            className="w-full bg-[#FFF5FE] border border-brand/15 rounded-xl p-3 text-sm text-brand-dark placeholder:text-brand/40 focus:outline-none focus:border-brand/30 resize-none"
            rows={3}
          />
          <div className="flex justify-end mt-1">
            <span
              className={`text-xs ${
                note.length > MAX_NOTE_LENGTH * 0.9
                  ? "text-red-500"
                  : "text-brand/40"
              }`}
            >
              {note.length}/{MAX_NOTE_LENGTH}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-medium text-brand/70 bg-brand-light hover:bg-brand-light/80 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(note)}
            className="flex-1 py-3 rounded-xl text-sm font-medium text-white bg-brand hover:bg-brand-dark transition-all"
          >
            Plant in Garden
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
