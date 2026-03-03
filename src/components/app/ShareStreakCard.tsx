"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

interface ShareStreakCardProps {
  streak: number;
  totalCards: number;
  level: number;
  levelTitle: string;
  username: string;
  displayName: string;
  pfpUrl?: string;
  onClose: () => void;
}

export default function ShareStreakCard({
  streak,
  totalCards,
  level,
  levelTitle,
  username,
  displayName,
  pfpUrl,
  onClose,
}: ShareStreakCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#EACCD4",
        scale: 2,
      });

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/png");
      });

      if (navigator.share && navigator.canShare({ files: [new File([blob], "streak.png", { type: "image/png" })] })) {
        await navigator.share({
          files: [new File([blob], "bloomscroll-streak.png", { type: "image/png" })],
          title: `My ${streak} day streak on Bloomscroll!`,
          text: `I've been reading wisdom cards for ${streak} days straight! 🔥 Join me on Bloomscroll`,
        });
      } else {
        // Fallback: download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bloomscroll-streak.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://bloomscroll.club/garden/${username}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm"
      >
        {/* Shareable Card */}
        <div
          ref={cardRef}
          className="bg-[#EACCD4] rounded-3xl p-6 mb-4"
          style={{ aspectRatio: "1/1.2" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            {pfpUrl ? (
              <img src={pfpUrl} alt={displayName} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#007A5E] flex items-center justify-center text-[#EACCD4] text-xl font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-bold text-[#007A5E]">{displayName}</div>
              <div className="text-sm text-[#007A5E]/60">@{username}</div>
            </div>
          </div>

          {/* Main Stats */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-2">🔥</div>
            <div className="font-impact text-6xl text-[#007A5E]">{streak}</div>
            <div className="text-lg text-[#007A5E]/80 font-bold uppercase tracking-wider">Day Streak</div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/40 rounded-xl p-3 text-center">
              <div className="font-bold text-2xl text-[#007A5E]">{totalCards}</div>
              <div className="text-xs text-[#007A5E]/60 uppercase">Cards Read</div>
            </div>
            <div className="bg-white/40 rounded-xl p-3 text-center">
              <div className="font-bold text-2xl text-[#007A5E]">Lv.{level}</div>
              <div className="text-xs text-[#007A5E]/60 uppercase">{levelTitle}</div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#007A5E] text-[#EACCD4] px-4 py-2 rounded-full text-sm font-bold">
              <span>🌱</span>
              <span>bloomscroll.club</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 bg-[#007A5E] text-[#EACCD4] py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Share Image
          </button>
          <button
            onClick={handleCopyLink}
            className="flex-1 bg-white/50 text-[#007A5E] py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy Link
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
