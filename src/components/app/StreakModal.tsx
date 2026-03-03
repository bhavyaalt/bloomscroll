"use client";

import { motion } from "framer-motion";
import { getStreakEmoji, getStreakMessage } from "@/lib/streak";
import { StreakState } from "./types";
import { DailyProgress } from "@/lib/reading-stats";

interface StreakModalProps {
  streak: StreakState;
  dailyProgress: DailyProgress;
  onClose: () => void;
}

export default function StreakModal({ streak, dailyProgress, onClose }: StreakModalProps) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const freezeSavedStreak = streak.streakFreezeUsedDate === yesterdayStr;
  const goalPercent = Math.min((dailyProgress.read / dailyProgress.goal) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1a2e23] border border-primary/20 rounded-2xl sm:rounded-3xl max-w-sm w-full p-5 sm:p-8 text-center text-white mx-2"
      >
        <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">
          {getStreakEmoji(streak.currentStreak)}
        </div>
        <h2 className="text-4xl sm:text-5xl font-black mb-2 text-primary flex items-center justify-center gap-2">
          {streak.currentStreak}
          {streak.streakFreezeActive && (
            <span className="text-xl sm:text-2xl" title="Streak Shield active">&#x1F6E1;&#xFE0F;</span>
          )}
        </h2>
        <p className="text-xs sm:text-sm uppercase tracking-widest text-white/50 mb-3 sm:mb-4 font-bold">
          Day Streak
        </p>

        {freezeSavedStreak && (
          <div className="mb-4 px-4 py-2 rounded-xl bg-blue-500/15 border border-blue-400/20 text-blue-300 text-sm">
            Shield saved your streak!
          </div>
        )}

        <p className="text-white/70 mb-6 leading-relaxed">{getStreakMessage(streak.currentStreak)}</p>

        {/* Daily Goal Progress */}
        <div className="mb-6 px-2">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-white/50 font-medium">Today&apos;s Goal</span>
            <span className="text-primary font-bold">
              {dailyProgress.read}/{dailyProgress.goal}
              {dailyProgress.completed && " &#10003;"}
            </span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${goalPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 py-3 sm:py-4 border-t border-b border-white/10">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-primary">{streak.currentStreak}</div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/40 mt-1">Current</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white/80">{streak.longestStreak}</div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/40 mt-1">Best</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white/80">{streak.totalDays}</div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/40 mt-1">Total Days</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 sm:py-3.5 bg-primary text-[#102219] rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
        >
          Keep Growing
        </button>
      </motion.div>
    </div>
  );
}
