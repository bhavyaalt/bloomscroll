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
        className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl max-w-sm w-full p-5 sm:p-8 text-center text-slate-900 mx-2"
      >
        <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">
          {getStreakEmoji(streak.currentStreak)}
        </div>
        <h2 className="text-4xl sm:text-5xl font-instrument-serif font-medium mb-2 text-brand flex items-center justify-center gap-2">
          {streak.currentStreak}
          {streak.streakFreezeActive && (
            <span className="text-xl sm:text-2xl" title="Streak Shield active">&#x1F6E1;&#xFE0F;</span>
          )}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4 font-medium">
          Day Streak
        </p>

        {freezeSavedStreak && (
          <div className="mb-4 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 text-sm">
            Shield saved your streak!
          </div>
        )}

        <p className="text-slate-500 mb-6 leading-relaxed">{getStreakMessage(streak.currentStreak)}</p>

        {/* Daily Goal Progress */}
        <div className="mb-6 px-2">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium">Today&apos;s Goal</span>
            <span className="text-brand font-medium">
              {dailyProgress.read}/{dailyProgress.goal}
              {dailyProgress.completed && " &#10003;"}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${goalPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 py-3 sm:py-4 border-t border-b border-slate-200">
          <div>
            <div className="text-xl sm:text-2xl font-medium text-brand">{streak.currentStreak}</div>
            <div className="text-[9px] sm:text-[10px] text-slate-400 mt-1">Current</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-medium text-slate-700">{streak.longestStreak}</div>
            <div className="text-[9px] sm:text-[10px] text-slate-400 mt-1">Best</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-medium text-slate-700">{streak.totalDays}</div>
            <div className="text-[9px] sm:text-[10px] text-slate-400 mt-1">Total Days</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 sm:py-3.5 bg-brand text-white rounded-xl font-medium text-sm hover:bg-brand-dark transition-colors"
        >
          Keep Growing
        </button>
      </motion.div>
    </div>
  );
}
