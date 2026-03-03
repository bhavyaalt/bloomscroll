"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Card } from "@/lib/content-library";

interface CardFeedProps {
  currentCard: Card | undefined;
  direction: number;
  savedCards: Set<string>;
  justSaved: boolean;
  showCopied: boolean;
  isSharing: boolean;
  audioMode: boolean;
  isSpeaking: boolean;
  autoScroll: boolean;
  sessionCardsViewed: number;
  feedLength: number;
  hasChapter: boolean;
  onDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDoubleTap: () => void;
  onToggleSave: (cardId: string) => void;
  onShare: (e: React.MouseEvent) => void;
  onCopy: () => void;
  onExpand: () => void;
  onReadingMode: () => void;
  onToggleAudio: () => void;
  onToggleAutoScroll: () => void;
  onClearFilters: () => void;
}

export default function CardFeed({
  currentCard,
  direction,
  savedCards,
  justSaved,
  showCopied,
  isSharing,
  audioMode,
  isSpeaking,
  autoScroll,
  sessionCardsViewed,
  feedLength,
  hasChapter,
  onDragEnd,
  onDoubleTap,
  onToggleSave,
  onShare,
  onCopy,
  onExpand,
  onReadingMode,
  onToggleAudio,
  onToggleAutoScroll,
  onClearFilters,
}: CardFeedProps) {
  return (
    <div className="fixed inset-0 pt-16 pb-6 px-4 touch-pan-y">
      <div className="h-full max-w-lg mx-auto relative">
        <AnimatePresence mode="wait" initial={false}>
          {currentCard && (
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, y: direction > 0 ? 100 : -100, scale: 0.95, rotateX: direction > 0 ? -5 : 5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? -100 : 100, scale: 0.95, rotateX: direction > 0 ? 5 : -5 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.3 },
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.1}
              onDragEnd={onDragEnd}
              onDoubleClick={onDoubleTap}
              className="absolute inset-0 flex flex-col cursor-grab active:cursor-grabbing p-1"
              style={{ perspective: 1000 }}
            >
              {/* Card */}
              <div className="flex-1 bg-gradient-to-b from-[#EACCD4] to-[#e0bfc8] text-[#007A5E] rounded-2xl overflow-hidden flex flex-col relative shadow-2xl">
                <div className="relative flex-1 p-6 sm:p-8 flex flex-col">
                  {/* Saved indicator */}
                  <div className="flex justify-end mb-4">
                    <AnimatePresence>
                      {savedCards.has(currentCard.id) && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="px-3 py-1.5 rounded-full bg-[#007A5E] text-white text-xs font-bold"
                        >
                          ★ Saved
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Quote */}
                  <div className="flex-1 flex items-center justify-center">
                    <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif leading-relaxed text-center">
                      <span className="text-[#007A5E]/30 text-4xl">&ldquo;</span>
                      <span>{currentCard.quote}</span>
                      <span className="text-[#007A5E]/30 text-4xl">&rdquo;</span>
                    </blockquote>
                  </div>

                  {/* Author */}
                  <div className="text-center mb-4 mt-4">
                    <p className="font-bold text-2xl tracking-wide">{currentCard.author}</p>
                    <p className="text-lg text-[#007A5E]/70 italic">{currentCard.book}</p>
                  </div>

                  {/* Insight */}
                  <p className="text-sm text-[#007A5E]/70 leading-relaxed text-center mb-4">
                    {currentCard.insight}
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between mt-auto">
                    {/* Left buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={onExpand}
                        className="w-10 h-10 rounded-full bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#007A5E]/20 transition-all flex items-center justify-center text-lg"
                        title="Quick insight"
                      >
                        ℹ️
                      </button>
                      <button
                        onClick={onReadingMode}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                          hasChapter
                            ? "bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#007A5E]/20"
                            : "bg-[#007A5E]/5 text-[#007A5E]/40"
                        }`}
                        title={hasChapter ? "Read chapter" : "Chapter coming soon"}
                      >
                        📖
                      </button>
                      <button
                        onClick={onToggleAudio}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                          audioMode
                            ? "bg-[#007A5E] text-white"
                            : "bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#007A5E]/20"
                        }`}
                        title={audioMode ? "Stop audio" : "Read aloud"}
                      >
                        {isSpeaking ? "🔊" : audioMode ? "🔈" : "🔇"}
                      </button>
                      <button
                        onClick={onToggleAutoScroll}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                          autoScroll
                            ? "bg-[#007A5E] text-white"
                            : "bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#007A5E]/20"
                        }`}
                        title={autoScroll ? "Auto-scroll on" : "Auto-scroll off"}
                      >
                        {autoScroll ? "▶️" : "⏸️"}
                      </button>
                    </div>

                    {/* Right buttons */}
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => onToggleSave(currentCard.id)}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                          savedCards.has(currentCard.id)
                            ? "bg-[#007A5E] text-white"
                            : "bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#007A5E]/20"
                        }`}
                        title={savedCards.has(currentCard.id) ? "Saved" : "Save"}
                      >
                        {savedCards.has(currentCard.id) ? "★" : "☆"}
                      </motion.button>
                      <button
                        onClick={onShare}
                        disabled={isSharing}
                        className="w-10 h-10 rounded-full bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#007A5E]/20 transition-all flex items-center justify-center text-lg disabled:opacity-50"
                        title="Share"
                      >
                        {isSharing ? "⏳" : "↗"}
                      </button>
                      <button
                        onClick={onCopy}
                        className="w-10 h-10 rounded-full bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#007A5E]/20 transition-all flex items-center justify-center text-lg relative"
                        title="Copy"
                      >
                        📋
                        {showCopied && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                          >
                            Copied!
                          </motion.span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Save Animation Overlay */}
                <AnimatePresence>
                  {justSaved && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center bg-[#007A5E]/20 pointer-events-none"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        className="text-6xl"
                      >
                        ★
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Progress */}
              <div className="mt-3 flex items-center justify-between text-white/30 text-xs px-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#007A5E]">●</span>
                  <span>{sessionCardsViewed > 0 ? `${sessionCardsViewed} read today` : "Start your session"}</span>
                </div>
                <span className="text-white/20">Swipe ↑</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {feedLength === 0 && (
          <div className="h-full flex items-center justify-center text-white/40 text-center">
            <div>
              <p className="text-lg mb-2">No cards in this selection</p>
              <button onClick={onClearFilters} className="text-[#007A5E] underline">
                View all cards
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
