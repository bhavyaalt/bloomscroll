"use client";

import { motion, AnimatePresence } from "framer-motion";
import { achievements, getAchievementState, getLevelInfo, Achievement } from "@/lib/achievements";

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const state = getAchievementState();
  const levelInfo = getLevelInfo(state.totalXp);
  const unlockedIds = new Set(state.unlocked.map(u => u.achievementId));

  const categories = [
    { id: "streak", name: "Streaks", icon: "🔥" },
    { id: "reading", name: "Reading", icon: "📚" },
    { id: "quiz", name: "Quizzes", icon: "🧠" },
    { id: "explorer", name: "Explorer", icon: "🗺️" },
    { id: "social", name: "Social", icon: "👥" },
    { id: "seasonal", name: "Seasonal", icon: "🌸" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full sm:w-[480px] max-h-[85dvh] rounded-t-3xl sm:rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="font-instrument-serif text-xl sm:text-2xl text-brand">Achievements</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Level Progress */}
              <div className="bg-brand-light rounded-2xl p-3 sm:p-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand flex items-center justify-center text-xl sm:text-2xl shrink-0">
                    {levelInfo.level <= 3 ? "🌱" : levelInfo.level <= 6 ? "🌳" : "🏆"}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-medium text-brand">Level {levelInfo.level}</span>
                      <span className="text-sm text-slate-500">{levelInfo.title}</span>
                    </div>
                    <div className="text-xs text-slate-500 mb-2">{state.totalXp} XP</div>
                    <div className="h-2 bg-brand/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${levelInfo.progress}%` }}
                        className="h-full bg-brand rounded-full"
                      />
                    </div>
                    {levelInfo.nextLevel && (
                      <div className="text-xs text-slate-500 mt-1">
                        {levelInfo.xpForNextLevel - levelInfo.xpInCurrentLevel} XP to {levelInfo.nextTitle}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[45dvh]">
              {categories.map(cat => {
                const catAchievements = achievements.filter(a => a.category === cat.id);
                if (catAchievements.length === 0) return null;

                return (
                  <div key={cat.id} className="mb-6 last:mb-0">
                    <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {catAchievements.map(achievement => {
                        const isUnlocked = unlockedIds.has(achievement.id);
                        return (
                          <motion.div
                            key={achievement.id}
                            whileHover={{ scale: 1.05 }}
                            className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all ${
                              isUnlocked
                                ? "bg-brand text-white"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            <span className={`text-2xl mb-1 ${!isUnlocked && "grayscale opacity-50"}`}>
                              {achievement.icon}
                            </span>
                            <span className="text-[10px] font-medium leading-tight">{achievement.name}</span>
                            <span className="text-[8px] opacity-60">+{achievement.xpReward} XP</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <div className="flex justify-around text-center">
                <div>
                  <div className="font-medium text-brand text-lg">{state.unlocked.length}</div>
                  <div className="text-xs text-slate-500">Unlocked</div>
                </div>
                <div>
                  <div className="font-medium text-brand text-lg">{achievements.length - state.unlocked.length}</div>
                  <div className="text-xs text-slate-500">Remaining</div>
                </div>
                <div>
                  <div className="font-medium text-brand text-lg">{Math.round((state.unlocked.length / achievements.length) * 100)}%</div>
                  <div className="text-xs text-slate-500">Complete</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
