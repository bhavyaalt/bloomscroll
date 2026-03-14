"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import ShareMenu from "./ShareMenu";

interface ShareStreakCardProps {
  streak: number;
  totalCards: number;
  level: number;
  levelTitle: string;
  username: string;
  displayName: string;
  pfpUrl?: string;
  onClose: () => void;
  onNotify?: (message: string) => void;
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
  onNotify,
}: ShareStreakCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const gardenUrl = `https://bloomscroll.club/garden/${username}`;

  const generateImage = async (): Promise<Blob> => {
    const canvas = await html2canvas(cardRef.current!, {
      backgroundColor: "#FFF5FE",
      scale: 2,
    });
    return new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), "image/png");
    });
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
          className="bg-[#FFF5FE] rounded-3xl p-6 mb-4"
          style={{ aspectRatio: "1/1.2" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            {pfpUrl ? (
              <img src={pfpUrl} alt={displayName} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white text-xl font-medium">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-medium text-brand">{displayName}</div>
              <div className="text-sm text-brand/60">@{username}</div>
            </div>
          </div>

          {/* Main Stats */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-2">🔥</div>
            <div className="font-instrument-serif text-6xl text-brand">{streak}</div>
            <div className="text-lg text-brand/80 font-medium">Day Streak</div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/40 rounded-xl p-3 text-center">
              <div className="font-medium text-2xl text-brand">{totalCards}</div>
              <div className="text-xs text-brand/60">Cards Read</div>
            </div>
            <div className="bg-white/40 rounded-xl p-3 text-center">
              <div className="font-medium text-2xl text-brand">Lv.{level}</div>
              <div className="text-xs text-brand/60">{levelTitle}</div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-full text-sm font-medium">
              <span>🌱</span>
              <span>bloomscroll.club</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowShareMenu(true)}
          className="w-full bg-brand text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          Share Streak
        </button>
      </motion.div>

      {/* Share Menu */}
      <ShareMenu
        open={showShareMenu}
        onClose={() => setShowShareMenu(false)}
        data={{
          twitterText: `🔥 ${streak} day streak on @bloomscroll!\n\n📚 ${totalCards} cards read\n🏆 Level ${level} — ${levelTitle}\n\nReplace doomscrolling with wisdom:`,
          url: gardenUrl,
          copyText: `🔥 ${streak} day streak on Bloomscroll!\n\n📚 ${totalCards} cards read\n🏆 Level ${level} — ${levelTitle}\n\n${gardenUrl}`,
          generateImage,
          imageFilename: "bloomscroll-streak.png",
        }}
        onNotify={onNotify}
      />
    </motion.div>
  );
}
