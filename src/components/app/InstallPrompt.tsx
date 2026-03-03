"use client";

import { motion } from "framer-motion";
import { isIOS, dismissInstallPrompt } from "@/lib/pwa";

interface InstallPromptProps {
  installEvent: Event | null;
  onClose: () => void;
}

export default function InstallPrompt({ installEvent, onClose }: InstallPromptProps) {
  const handleDismiss = () => {
    dismissInstallPrompt();
    onClose();
  };

  const handleInstall = async () => {
    if (installEvent && "prompt" in installEvent) {
      (installEvent as unknown as { prompt: () => Promise<void> }).prompt();
    }
    handleDismiss();
  };

  const ios = isIOS();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 flex items-end sm:items-center justify-center p-4"
      onClick={handleDismiss}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1f1f1f] rounded-2xl p-6 max-w-sm w-full border border-white/10 shadow-2xl"
      >
        <div className="text-center mb-5">
          <div className="text-4xl mb-3">🌱</div>
          <h3 className="font-impact text-xl text-[#007A5E] uppercase tracking-tight mb-1">
            Add to Home Screen
          </h3>
          <p className="text-white/60 text-sm">
            Get the full app experience with quick access from your home screen.
          </p>
        </div>

        {ios ? (
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
              <span className="text-xl w-8 text-center">1</span>
              <span className="text-sm text-white/80">
                Tap the <strong className="text-white">Share</strong> button <span className="text-lg">↑</span> in Safari
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
              <span className="text-xl w-8 text-center">2</span>
              <span className="text-sm text-white/80">
                Scroll down and tap <strong className="text-white">Add to Home Screen</strong>
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
              <span className="text-xl w-8 text-center">3</span>
              <span className="text-sm text-white/80">
                Tap <strong className="text-white">Add</strong> to confirm
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-5">
            <button
              onClick={handleInstall}
              className="w-full py-3 rounded-xl bg-[#007A5E] text-white font-bold text-lg hover:bg-[#005a46] transition-all"
            >
              Install App
            </button>
          </div>
        )}

        <button
          onClick={handleDismiss}
          className="w-full py-2.5 rounded-xl bg-white/5 text-white/50 text-sm hover:bg-white/10 transition-all"
        >
          Not now
        </button>
      </motion.div>
    </motion.div>
  );
}
