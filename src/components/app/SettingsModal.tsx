"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { sounds, getSoundEnabled, setSoundEnabled } from "@/lib/sounds";
import { StreakState } from "./types";

const GOAL_OPTIONS = [5, 10, 15, 20];

interface SettingsModalProps {
  user: { email?: string } | null;
  profile: { fc_username?: string } | null;
  isSubscribed: boolean;
  streak: StreakState;
  viewedCount: number;
  savedCount: number;
  dailyGoal: number;
  onSetDailyGoal: (goal: number) => void;
  onSetStreakFreeze: (active: boolean) => void;
  onSaveWallet: (address: string) => Promise<boolean>;
  onClose: () => void;
}

export default function SettingsModal({
  user,
  profile,
  isSubscribed,
  streak,
  viewedCount,
  savedCount,
  dailyGoal,
  onSetDailyGoal,
  onSetStreakFreeze,
  onSaveWallet,
  onClose,
}: SettingsModalProps) {
  const [walletInput, setWalletInput] = useState("");
  const [walletSaving, setWalletSaving] = useState(false);
  const [walletSaved, setWalletSaved] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(getSoundEnabled());

  const handleSaveWallet = async () => {
    if (!walletInput.trim()) return;
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletInput.trim())) {
      alert("Please enter a valid Ethereum address (0x...)");
      return;
    }
    setWalletSaving(true);
    const success = await onSaveWallet(walletInput.trim());
    setWalletSaving(false);
    if (success) {
      setWalletSaved(true);
      setTimeout(() => setWalletSaved(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1a2e23] border border-white/10 rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl">Settings</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl">&times;</button>
        </div>

        {/* Account */}
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Account</h3>
          <div className="bg-white/5 rounded-xl p-4 space-y-2">
            {user?.email && <p className="text-sm"><span className="text-white/40">Email:</span> {user.email}</p>}
            {profile?.fc_username && <p className="text-sm"><span className="text-white/40">Farcaster:</span> @{profile.fc_username}</p>}
            <p className="text-sm">
              <span className="text-white/40">Status:</span>{" "}
              <span className={isSubscribed ? "text-[#007A5E] font-bold" : ""}>{isSubscribed ? "Pro" : "Free"}</span>
            </p>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Daily Goal</h3>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/60 mb-3">Cards to read per day</p>
            <div className="grid grid-cols-4 gap-2">
              {GOAL_OPTIONS.map(g => (
                <button
                  key={g}
                  onClick={() => onSetDailyGoal(g)}
                  className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                    dailyGoal === g
                      ? "bg-[#007A5E] text-white"
                      : "bg-white/10 text-white/60 hover:bg-white/15"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Streak Shield */}
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Streak Shield</h3>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium flex items-center gap-1.5">
                  Protect your streak
                </p>
                <p className="text-xs text-white/40 mt-0.5">Saves your streak if you miss 1 day</p>
              </div>
              {isSubscribed ? (
                <button
                  onClick={() => onSetStreakFreeze(!streak.streakFreezeActive)}
                  className={`w-12 h-7 rounded-full transition-all relative ${
                    streak.streakFreezeActive ? "bg-[#007A5E]" : "bg-white/20"
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
                    streak.streakFreezeActive ? "right-1" : "left-1"
                  }`} />
                </button>
              ) : (
                <Link
                  href="/subscribe"
                  onClick={onClose}
                  className="text-xs font-bold text-[#007A5E] bg-[#007A5E]/15 px-3 py-1.5 rounded-full"
                >
                  Pro Only
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Sound Effects */}
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Preferences</h3>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sound Effects</p>
                <p className="text-xs text-white/40">Swipe, save, and milestone sounds</p>
              </div>
              <button
                onClick={() => {
                  const newValue = !soundEnabled;
                  setSoundEnabledState(newValue);
                  setSoundEnabled(newValue);
                  if (newValue) sounds.save();
                }}
                className={`w-12 h-7 rounded-full transition-all relative ${
                  soundEnabled ? "bg-[#007A5E]" : "bg-white/20"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
                  soundEnabled ? "right-1" : "left-1"
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Wallet */}
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Wallet Address</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={walletInput}
              onChange={(e) => setWalletInput(e.target.value)}
              placeholder="0x..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 text-white placeholder-white/30 text-sm font-mono border border-white/10 focus:border-[#007A5E]/50 outline-none"
            />
            <button
              onClick={handleSaveWallet}
              disabled={walletSaving}
              className="px-4 py-3 bg-[#007A5E] rounded-xl font-bold text-sm disabled:opacity-50"
            >
              {walletSaving ? "..." : walletSaved ? "&#10003;" : "Save"}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Your Stats</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-[#007A5E]">{streak.currentStreak}</div>
              <div className="text-xs text-white/40">Streak</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-[#007A5E]">{viewedCount}</div>
              <div className="text-xs text-white/40">Read</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-[#007A5E]">{savedCount}</div>
              <div className="text-xs text-white/40">Saved</div>
            </div>
          </div>
          <Link
            href="/profile"
            className="mt-3 block text-center text-sm text-[#007A5E] hover:underline"
            onClick={onClose}
          >
            View full stats &rarr;
          </Link>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-white/10 rounded-full font-medium"
        >
          Done
        </button>
      </motion.div>
    </div>
  );
}
