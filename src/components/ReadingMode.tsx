"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/lib/content-library";

type Theme = 'dark' | 'light' | 'sepia';

interface ReadingModeProps {
  card: Card;
  isOpen: boolean;
  onClose: () => void;
  isSubscribed: boolean;
  onUpgrade: () => void;
}

const THEME_STYLES: Record<Theme, { bg: string; text: string; accent: string }> = {
  dark: { bg: 'bg-slate-900', text: 'text-white', accent: 'text-brand' },
  light: { bg: 'bg-white', text: 'text-slate-900', accent: 'text-brand' },
  sepia: { bg: 'bg-[#f4ecd8]', text: 'text-[#5c4b37]', accent: 'text-[#8b6914]' },
};

const FONT_SIZES = [14, 16, 18, 20, 22, 24];

export default function ReadingMode({ card, isOpen, onClose, isSubscribed, onUpgrade }: ReadingModeProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [fontSizeIndex, setFontSizeIndex] = useState(2); // 18px default
  const [progress, setProgress] = useState(0);

  const fontSize = FONT_SIZES[fontSizeIndex];
  const styles = THEME_STYLES[theme];

  // Track reading progress
  useEffect(() => {
    if (!isOpen) return;
    
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const scrollPercent = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    const container = document.getElementById('reading-content');
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  if (!isOpen) return null;

  const hasChapter = !!card.chapter;
  const needsUpgrade = card.isPremium && !isSubscribed;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 ${styles.bg} ${styles.text}`}
      >
        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
          <motion.div
            className="h-full bg-brand"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/20">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100"
            >
              ← Back
            </button>
            
            <div className="flex items-center gap-3">
              {/* Font size controls */}
              <button
                onClick={() => setFontSizeIndex(Math.max(0, fontSizeIndex - 1))}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm"
                disabled={fontSizeIndex === 0}
              >
                A-
              </button>
              <button
                onClick={() => setFontSizeIndex(Math.min(FONT_SIZES.length - 1, fontSizeIndex + 1))}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm"
                disabled={fontSizeIndex === FONT_SIZES.length - 1}
              >
                A+
              </button>
              
              {/* Theme toggle */}
              <div className="flex rounded-full bg-white/10 p-1">
                {(['dark', 'light', 'sepia'] as Theme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`w-6 h-6 rounded-full ${
                      theme === t ? 'bg-brand' : ''
                    } ${
                      t === 'dark' ? 'bg-gray-800' : t === 'light' ? 'bg-white' : 'bg-[#d4c4a8]'
                    }`}
                    title={t}
                  />
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div
          id="reading-content"
          className="h-full overflow-y-auto pt-20 pb-32 px-4"
        >
          <div className="max-w-2xl mx-auto">
            {/* Book info */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-medium mb-2">{card.book}</h1>
              <p className={`${styles.accent} text-lg`}>{card.author}</p>
              {card.chapter && (
                <p className="text-sm opacity-50 mt-2">
                  {card.chapter.readingTimeMinutes} min read
                </p>
              )}
            </div>

            {/* The quote */}
            <blockquote
              className={`text-xl italic border-l-4 border-brand pl-4 mb-8 ${styles.accent}`}
              style={{ fontSize: fontSize + 4 }}
            >
              "{card.quote}"
            </blockquote>

            {/* Insight */}
            <div className="mb-8 p-4 rounded-xl bg-white/5">
              <h3 className="font-medium mb-2 text-sm opacity-50">Key Insight</h3>
              <p style={{ fontSize }}>{card.insight}</p>
            </div>

            {/* Chapter content or upgrade prompt */}
            {needsUpgrade ? (
              <div className="text-center py-12">
                <div className="mb-4 flex justify-center">
                  <svg className="size-12 text-white/40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Premium Content</h3>
                <p className="opacity-60 mb-6">
                  Unlock full chapters, {card.genre} genre, and more with Pro
                </p>
                <button
                  onClick={onUpgrade}
                  className="px-8 py-3 bg-brand rounded-full font-medium text-white hover:bg-brand-dark transition-colors"
                >
                  Upgrade to Pro
                </button>
              </div>
            ) : hasChapter ? (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-xl font-medium mb-4">{card.chapter!.title}</h2>
                <div
                  className="leading-relaxed whitespace-pre-wrap"
                  style={{ fontSize, lineHeight: 1.8 }}
                >
                  {card.chapter!.content}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 opacity-50">
                <p>Full chapter coming soon...</p>
              </div>
            )}

            {/* Amazon affiliate link */}
            {card.chapter?.amazonLink && (
              <div className="mt-12 p-6 rounded-2xl bg-white/5 text-center">
                <p className="text-sm opacity-60 mb-3">Want the full book?</p>
                <a
                  href={card.chapter.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand-dark transition-colors"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  Get it on Amazon
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
