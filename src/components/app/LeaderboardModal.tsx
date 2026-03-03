"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getStreakLeaderboard, getCardsReadLeaderboard, getXpLeaderboard, LeaderboardEntry } from "@/lib/social";
import Link from "next/link";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
}

type LeaderboardType = "streak" | "cards" | "xp";

export default function LeaderboardModal({ isOpen, onClose, currentUserId }: LeaderboardModalProps) {
  const [activeTab, setActiveTab] = useState<LeaderboardType>("streak");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    
    setLoading(true);
    const fetchData = async () => {
      let data: LeaderboardEntry[] = [];
      switch (activeTab) {
        case "streak":
          data = await getStreakLeaderboard(20);
          break;
        case "cards":
          data = await getCardsReadLeaderboard(20);
          break;
        case "xp":
          data = await getXpLeaderboard(20);
          break;
      }
      setEntries(data);
      setLoading(false);
    };
    fetchData();
  }, [isOpen, activeTab]);

  const tabs = [
    { id: "streak" as LeaderboardType, label: "🔥 Streaks", unit: "days" },
    { id: "cards" as LeaderboardType, label: "📚 Cards Read", unit: "cards" },
    { id: "xp" as LeaderboardType, label: "⭐ XP", unit: "XP" },
  ];

  const getMedal = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return null;
    }
  };

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
            className="bg-[#EACCD4] w-full sm:w-[480px] max-h-[85vh] rounded-t-3xl sm:rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#007A5E]/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-impact text-2xl text-[#007A5E] uppercase">Leaderboard</h2>
                <button onClick={onClose} className="text-[#007A5E]/60 hover:text-[#007A5E]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all ${
                      activeTab === tab.id
                        ? "bg-[#007A5E] text-[#EACCD4]"
                        : "bg-white/30 text-[#007A5E]/60 hover:bg-white/50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Leaderboard List */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#007A5E] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : entries.length === 0 ? (
                <div className="text-center py-12 text-[#007A5E]/60">
                  <p>No entries yet. Be the first!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {entries.map((entry, idx) => {
                    const isCurrentUser = entry.user_id === currentUserId;
                    const medal = getMedal(entry.rank);
                    
                    return (
                      <motion.div
                        key={entry.user_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                          href={`/garden/${entry.username}`}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                            isCurrentUser
                              ? "bg-[#007A5E] text-[#EACCD4]"
                              : "bg-white/40 hover:bg-white/60"
                          }`}
                        >
                          <div className={`w-8 text-center font-bold ${isCurrentUser ? "text-[#EACCD4]" : "text-[#007A5E]"}`}>
                            {medal || `#${entry.rank}`}
                          </div>
                          
                          {entry.pfp_url ? (
                            <img
                              src={entry.pfp_url}
                              alt={entry.display_name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                              isCurrentUser ? "bg-[#EACCD4]/20" : "bg-[#007A5E]/20"
                            }`}>
                              {entry.display_name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className={`font-bold truncate ${isCurrentUser ? "text-[#EACCD4]" : "text-[#007A5E]"}`}>
                              {entry.display_name}
                            </div>
                            <div className={`text-xs ${isCurrentUser ? "text-[#EACCD4]/60" : "text-[#007A5E]/60"}`}>
                              @{entry.username}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className={`font-bold ${isCurrentUser ? "text-[#EACCD4]" : "text-[#007A5E]"}`}>
                              {entry.value.toLocaleString()}
                            </div>
                            <div className={`text-xs ${isCurrentUser ? "text-[#EACCD4]/60" : "text-[#007A5E]/60"}`}>
                              {tabs.find(t => t.id === activeTab)?.unit}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
