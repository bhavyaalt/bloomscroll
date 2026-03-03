"use client";

import { motion } from "framer-motion";

interface ProUpsellModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  points: string[];
  ctaLabel?: string;
  onClose: () => void;
  onUpgrade: () => void;
}

export default function ProUpsellModal({
  isOpen,
  title,
  description,
  points,
  ctaLabel = "Upgrade to Pro",
  onClose,
  onUpgrade,
}: ProUpsellModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[95] bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.18 }}
        onClick={(event) => event.stopPropagation()}
        className="mx-auto mt-10 w-full max-w-md rounded-[28px] border border-[#007A5E]/20 bg-[#EACCD4] p-6 text-[#007A5E] shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#007A5E]/60">BloomScroll Pro</p>
            <h2 className="mt-2 text-3xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-[#007A5E]/20 px-3 py-1 text-sm text-[#007A5E]/70 hover:bg-white/40"
          >
            Close
          </button>
        </div>

        <p className="text-sm leading-relaxed text-[#007A5E]/75">{description}</p>

        <div className="mt-5 space-y-2 rounded-3xl bg-white/45 p-4">
          {points.map((point) => (
            <div key={point} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 text-[#007A5E]">✓</span>
              <span>{point}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-[#007A5E]/20 px-4 py-3 text-sm font-semibold text-[#007A5E]/70 hover:bg-white/40"
          >
            Maybe later
          </button>
          <button
            onClick={onUpgrade}
            className="flex-1 rounded-full bg-[#007A5E] px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white hover:bg-[#005843]"
          >
            {ctaLabel}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
