"use client";

import { motion } from "framer-motion";
import { isIOS, dismissInstallPrompt } from "@/lib/pwa";
import Logo from "@/components/Logo";

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
        className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl text-slate-900"
      >
        <div className="text-center mb-5">
          <div className="mb-3 flex justify-center">
            <Logo size="lg" />
          </div>
          <h3 className="text-xl font-instrument-serif font-medium text-brand tracking-tight mb-1">
            Add to Home Screen
          </h3>
          <p className="text-slate-500 text-sm">
            Get the full app experience with quick access from your home screen.
          </p>
        </div>

        {ios ? (
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
              <span className="text-xl w-8 text-center text-slate-700">1</span>
              <span className="text-sm text-slate-600">
                Tap the <strong className="text-slate-900 font-medium">Share</strong> button <span className="text-lg">↑</span> in Safari
              </span>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
              <span className="text-xl w-8 text-center text-slate-700">2</span>
              <span className="text-sm text-slate-600">
                Scroll down and tap <strong className="text-slate-900 font-medium">Add to Home Screen</strong>
              </span>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
              <span className="text-xl w-8 text-center text-slate-700">3</span>
              <span className="text-sm text-slate-600">
                Tap <strong className="text-slate-900 font-medium">Add</strong> to confirm
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-5">
            <button
              onClick={handleInstall}
              className="w-full py-3 rounded-xl bg-brand text-white font-medium text-lg hover:bg-brand-dark transition-all"
            >
              Install App
            </button>
          </div>
        )}

        <button
          onClick={handleDismiss}
          className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 text-sm hover:bg-slate-200 transition-all"
        >
          Not now
        </button>
      </motion.div>
    </motion.div>
  );
}
