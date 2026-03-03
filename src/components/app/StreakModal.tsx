"use client";

import { motion } from "framer-motion";
import { getStreakEmoji, getStreakMessage } from "@/lib/streak";
import { StreakState } from "./types";

interface StreakModalProps {
  streak: StreakState;
  savedCount: number;
  onClose: () => void;
}

export default function StreakModal({ streak, savedCount, onClose }: StreakModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl max-w-sm w-full p-6 text-center text-white"
      >
        <div className="text-6xl mb-4">{getStreakEmoji(streak.currentStreak)}</div>
        <h2 className="font-impact text-4xl uppercase mb-2">
          {streak.currentStreak} Day{streak.currentStreak !== 1 ? "s" : ""}!
        </h2>
        <p className="text-lg opacity-90 mb-6">{getStreakMessage(streak.currentStreak)}</p>
        <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
          <div className="bg-white/20 rounded-xl p-3">
            <div className="text-2xl font-bold">{streak.longestStreak}</div>
            <div className="text-xs opacity-80">Best</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3">
            <div className="text-2xl font-bold">{savedCount}</div>
            <div className="text-xs opacity-80">Saved</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 bg-white text-orange-600 rounded-full font-bold uppercase"
        >
          Keep Growing 🌱
        </button>
      </motion.div>
    </div>
  );
}
