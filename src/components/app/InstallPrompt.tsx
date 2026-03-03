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
        className="bg-[#1a2e23] rounded-2xl p-6 max-w-sm w-full border border-white/10 shadow-2xl"
      >
        <div className="text-center mb-5">
          <div className="mb-3 flex justify-center">
            <div className="size-10 flex items-center justify-center bg-primary rounded-xl">
              <svg className="size-6 text-[#102219]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9ZM5.6 10.25c0 1.64 1.33 2.97 2.97 2.97h.86c1.97 0 3.56-1.6 3.56-3.57v-5.4C12.99 2.56 11.43 1 9.43 1c-2 0-3.56 1.56-3.56 3.56v5.4c0 .1 0 .2-.27.29ZM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9Z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-primary uppercase tracking-tight mb-1">
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
