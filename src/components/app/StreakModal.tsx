"use client";

import { motion } from "framer-motion";
import { getStreakEmoji, getStreakMessage } from "@/lib/streak";
import { StreakState } from "./types";

interface StreakModalProps {
  streak: StreakState;
  onClose: () => void;
}

export default function StreakModal({ streak, onClose }: StreakModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1a2e23] border border-primary/20 rounded-3xl max-w-sm w-full p-8 text-center text-white"
      >
        <div className="text-6xl mb-4">{getStreakEmoji(streak.currentStreak)}</div>
        <h2 className="text-5xl font-black mb-2 text-primary">
          {streak.currentStreak}
        </h2>
        <p className="text-sm uppercase tracking-widest text-white/50 mb-4 font-bold">
          Day Streak
        </p>
        <p className="text-white/70 mb-8 leading-relaxed">{getStreakMessage(streak.currentStreak)}</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-t border-b border-white/10">
          <div>
            <div className="text-2xl font-bold text-primary">{streak.currentStreak}</div>
            <div className="text-[10px] uppercase tracking-wider text-white/40 mt-1">Current</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white/80">{streak.longestStreak}</div>
            <div className="text-[10px] uppercase tracking-wider text-white/40 mt-1">Best</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white/80">{streak.totalDays}</div>
            <div className="text-[10px] uppercase tracking-wider text-white/40 mt-1">Total Days</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-primary text-[#102219] rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
        >
          Keep Growing
        </button>
      </motion.div>
    </div>
  );
}
