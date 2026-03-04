"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Card } from "@/lib/content-library";
import { DailyProgress } from "@/lib/reading-stats";

interface CardFeedProps {
  currentCard: Card | undefined;
  direction: number;
  savedCards: Set<string>;
  pinnedCards: Set<string>;
  savedCount: number;
  pinnedCount: number;
  saveLimit: number;
  pinLimit: number;
  justSaved: boolean;
  showCopied: boolean;
  isSharing: boolean;
  audioMode: boolean;
  isSpeaking: boolean;
  autoScroll: boolean;
  dailyProgress: DailyProgress;
  feedLength: number;
  hasChapter: boolean;
  isSubscribed: boolean;
  viewsRemaining: number;
  freeDailyLimit: number;
  reviewDueCount: number;
  activeModeLabel?: string | null;
  dailyCard?: Card | null;
  onDismissDailyCard?: () => void;
  onShareDailyCard?: (e: React.MouseEvent) => void;
  onDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDoubleTap: () => void;
  onToggleSave: (cardId: string) => void;
  onPin: (cardId: string) => void;
  onUnpin: (cardId: string) => void;
  onShare: (e: React.MouseEvent) => void;
  onCopy: () => void;
  onExpand: () => void;
  onReadingMode: () => void;
  onToggleAudio: () => void;
  onToggleAutoScroll: () => void;
  onClearFilters: () => void;
  onShowSubscribe?: () => void;
}

/* ── SVG Icon Components ── */
const InfoIcon = () => (
  <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </svg>
);

const VolumeIcon = ({ active }: { active: boolean }) => (
  <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    {active ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    )}
  </svg>
);

const PlayIcon = ({ active }: { active: boolean }) => (
  <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    {active ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    )}
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className="size-4 sm:size-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
  </svg>
);

const CopyIcon = () => (
  <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25H10.5a2.25 2.25 0 00-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);

const PinIcon = ({ filled }: { filled: boolean }) => (
  <svg className="size-4 sm:size-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C9.243 2 7 4.243 7 7c0 2.475 2.5 6.225 4.35 8.75a.812.812 0 001.3 0C14.5 13.225 17 9.475 17 7c0-2.757-2.243-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

export default function CardFeed({
  currentCard,
  direction,
  savedCards,
  pinnedCards,
  savedCount,
  pinnedCount,
  saveLimit,
  pinLimit,
  justSaved,
  showCopied,
  isSharing,
  audioMode,
  isSpeaking,
  autoScroll,
  dailyProgress,
  feedLength,
  hasChapter,
  isSubscribed,
  viewsRemaining,
  freeDailyLimit,
  reviewDueCount,
  activeModeLabel,
  onDragEnd,
  onDoubleTap,
  onToggleSave,
  onPin,
  onUnpin,
  onShare,
  onCopy,
  onExpand,
  onReadingMode,
  onToggleAudio,
  onToggleAutoScroll,
  dailyCard,
  onDismissDailyCard,
  onShareDailyCard,
  onClearFilters,
  onShowSubscribe,
}: CardFeedProps) {
  const freeReadsUsed = Math.max(0, freeDailyLimit - viewsRemaining);
  const progressPercent = isSubscribed
    ? Math.min((dailyProgress.read / dailyProgress.goal) * 100, 100)
    : Math.min((freeReadsUsed / freeDailyLimit) * 100, 100);
  const savedProgressPercent = isSubscribed ? 100 : Math.min((savedCount / saveLimit) * 100, 100);
  const pinnedProgressPercent = isSubscribed ? 100 : Math.min((pinnedCount / pinLimit) * 100, 100);
  const progressLabel = isSubscribed
    ? (dailyProgress.read > 0 ? `${dailyProgress.read}/${dailyProgress.goal} cards today` : "Start your session")
    : `${freeReadsUsed}/${freeDailyLimit} free reads used`;

  return (
    <div className="fixed inset-0 pt-12 sm:pt-14 pb-0 px-3 sm:px-4 touch-pan-y flex flex-col">
      {/* Daily Card Banner */}
      <AnimatePresence>
        {dailyCard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-2xl mx-auto w-full mb-1.5 sm:mb-2 overflow-hidden flex-shrink-0"
          >
            <div className="bg-primary/10 border border-primary/20 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">
                  Card of the Day
                </span>
                <p className="text-xs sm:text-sm text-white/70 truncate mt-0.5">
                  &ldquo;{dailyCard.quote.slice(0, 50)}{dailyCard.quote.length > 50 ? "..." : ""}&rdquo;
                </p>
                <p className="text-[10px] sm:text-xs text-white/40 mt-0.5">— {dailyCard.author}</p>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                <button
                  onClick={onShareDailyCard}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-sm hover:bg-white/20 transition-all"
                >
                  <ShareIcon />
                </button>
                <button
                  onClick={onDismissDailyCard}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 text-sm hover:bg-white/10 transition-all"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Area */}
      <div className="flex-1 max-w-2xl mx-auto w-full relative">
        <AnimatePresence mode="wait" initial={false}>
          {currentCard && (
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, y: direction > 0 ? 80 : -80, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: direction > 0 ? -80 : 80, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.1}
              onDragEnd={onDragEnd}
              onDoubleClick={onDoubleTap}
              className="absolute inset-0 flex flex-col cursor-grab active:cursor-grabbing"
            >
              {/* The Card */}
              <div className="flex-1 bg-gradient-to-b from-[#EACCD4] to-[#e0bfc8] rounded-2xl overflow-hidden flex flex-col relative shadow-2xl shadow-black/30 min-h-0">
                <div className="relative flex-1 p-4 sm:p-6 md:p-8 flex flex-col overflow-y-auto min-h-0">
                  {/* Saved badge */}
                  <div className="flex items-center justify-between gap-2 mb-1 sm:mb-2 min-h-[28px] sm:min-h-[32px] flex-shrink-0">
                    <div className="min-w-0">
                      {activeModeLabel && (
                        <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-[#007A5E]/15 bg-white/45 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#007A5E]">
                          <span className="truncate">{activeModeLabel}</span>
                        </span>
                      )}
                    </div>
                    <AnimatePresence>
                      {savedCards.has(currentCard.id) && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#007A5E]/20 bg-white/50 text-[#007A5E] text-[10px] sm:text-xs font-bold"
                        >
                          <StarIcon filled /> SAVED
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Quotation marks */}
                  <div className="text-center mb-1 flex-shrink-0">
                    <span className="text-3xl sm:text-5xl text-[#007A5E]/25 leading-none select-none" style={{ fontFamily: "Georgia, serif" }}>&ldquo;&rdquo;</span>
                  </div>

                  {/* Quote */}
                  <div className="flex-1 flex items-center justify-center px-1 sm:px-2 min-h-0">
                    <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-[#007A5E]" style={{ fontFamily: "Georgia, serif" }}>
                      &ldquo;{currentCard.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Author + Book */}
                  <div className="text-center mt-3 sm:mt-6 mb-1 sm:mb-2 flex-shrink-0">
                    <p className="font-bold text-xs sm:text-sm md:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#007A5E]">
                      {currentCard.author}
                    </p>
                    <p className="text-xs sm:text-sm text-[#007A5E]/60 italic mt-0.5 sm:mt-1" style={{ fontFamily: "Georgia, serif" }}>
                      {currentCard.book}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-16 sm:w-24 h-px bg-[#007A5E]/15 mx-auto my-2 sm:my-4 flex-shrink-0" />

                  {/* Insight */}
                  <p className="text-xs sm:text-sm text-[#007A5E]/60 leading-relaxed text-center max-w-md mx-auto line-clamp-2 sm:line-clamp-none flex-shrink-0">
                    Insight: {currentCard.insight}
                  </p>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between mt-3 sm:mt-6 pt-2 sm:pt-4 flex-shrink-0">
                    {/* Left actions */}
                    <div className="flex gap-1 sm:gap-1.5">
                      <button
                        onClick={onExpand}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#007A5E]/8 text-[#007A5E]/70 hover:bg-[#007A5E]/15 hover:text-[#007A5E] transition-all flex items-center justify-center"
                        title="Deep dive"
                      >
                        <InfoIcon />
                      </button>
                      <button
                        onClick={onReadingMode}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                          hasChapter
                            ? "bg-[#007A5E]/8 text-[#007A5E]/70 hover:bg-[#007A5E]/15 hover:text-[#007A5E]"
                            : "bg-[#007A5E]/5 text-[#007A5E]/30"
                        }`}
                        title={hasChapter ? "Read chapter" : "Chapter coming soon"}
                      >
                        <BookmarkIcon />
                      </button>
                      <button
                        onClick={isSubscribed ? onToggleAudio : onShowSubscribe}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all relative ${
                          audioMode
                            ? "bg-[#007A5E] text-white"
                            : isSubscribed
                              ? "bg-[#007A5E]/8 text-[#007A5E]/70 hover:bg-[#007A5E]/15 hover:text-[#007A5E]"
                              : "bg-[#007A5E]/5 text-[#007A5E]/40"
                        }`}
                        title={isSubscribed ? (audioMode ? "Stop audio" : "Read aloud") : "Pro feature"}
                      >
                        <VolumeIcon active={audioMode || isSpeaking} />
                        {!isSubscribed && <span className="absolute -top-1 -right-1 text-[8px] bg-[#007A5E] text-white px-1 rounded">PRO</span>}
                      </button>
                      <button
                        onClick={isSubscribed ? onToggleAutoScroll : onShowSubscribe}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all relative ${
                          autoScroll
                            ? "bg-[#007A5E] text-white"
                            : isSubscribed
                              ? "bg-[#007A5E]/8 text-[#007A5E]/70 hover:bg-[#007A5E]/15 hover:text-[#007A5E]"
                              : "bg-[#007A5E]/5 text-[#007A5E]/40"
                        }`}
                        title={isSubscribed ? (autoScroll ? "Stop auto-scroll" : "Auto-scroll") : "Pro feature"}
                      >
                        <PlayIcon active={autoScroll} />
                        {!isSubscribed && <span className="absolute -top-1 -right-1 text-[8px] bg-[#007A5E] text-white px-1 rounded">PRO</span>}
                      </button>
                    </div>

                    {/* Right actions */}
                    <div className="flex gap-1 sm:gap-1.5">
                      <motion.button
                        onClick={() => onToggleSave(currentCard.id)}
                        whileTap={{ scale: 0.9 }}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                          savedCards.has(currentCard.id)
                            ? "bg-[#007A5E] text-white"
                            : "bg-[#007A5E]/8 text-[#007A5E]/70 hover:bg-[#007A5E]/15 hover:text-[#007A5E]"
                        }`}
                        title={savedCards.has(currentCard.id) ? "Unsave" : "Save"}
                      >
                        <StarIcon filled={savedCards.has(currentCard.id)} />
                      </motion.button>
                      <motion.button
                        onClick={() =>
                          pinnedCards.has(currentCard.id)
                            ? onUnpin(currentCard.id)
                            : onPin(currentCard.id)
                        }
                        whileTap={{ scale: 0.9 }}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                          pinnedCards.has(currentCard.id)
                            ? "bg-[#007A5E] text-white"
                            : "bg-[#007A5E]/8 text-[#007A5E]/70 hover:bg-[#007A5E]/15 hover:text-[#007A5E]"
                        }`}
                        title={pinnedCards.has(currentCard.id) ? "Unpin from garden" : "Pin to garden"}
                      >
                        <PinIcon filled={pinnedCards.has(currentCard.id)} />
                      </motion.button>
                      <button
                        onClick={onShare}
                        disabled={isSharing}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#007A5E]/8 text-[#007A5E]/70 hover:bg-[#007A5E]/15 hover:text-[#007A5E] transition-all flex items-center justify-center disabled:opacity-50"
                        title="Share"
                      >
                        <ShareIcon />
                      </button>
                      <button
                        onClick={onCopy}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#007A5E]/8 text-[#007A5E]/70 hover:bg-[#007A5E]/15 hover:text-[#007A5E] transition-all flex items-center justify-center relative"
                        title="Copy quote"
                      >
                        <CopyIcon />
                        <AnimatePresence>
                          {showCopied && (
                            <motion.span
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#102219] text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                            >
                              Copied!
                            </motion.span>
                          )}
                        </AnimatePresence>
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
                      className="absolute inset-0 flex items-center justify-center bg-[#007A5E]/10 pointer-events-none"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        className="text-[#007A5E]"
                      >
                        <svg className="size-16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Daily Progress Bar */}
              <div className="mt-2 sm:mt-4 px-1 flex-shrink-0">
                <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1 sm:mb-2">
                  <span className="text-primary font-medium flex items-center gap-1">
                    Daily Progress
                    {dailyProgress.completed && <span title="Goal reached!">✓</span>}
                  </span>
                  <span className="text-primary/70">
                    {progressLabel}
                  </span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {!isSubscribed && (
                <div className="mt-3 rounded-2xl border border-[#007A5E]/12 bg-[#f4e7eb] px-3 py-2.5 text-[#007A5E] flex-shrink-0">
                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                    <span className="shrink-0 rounded-full bg-[#007A5E] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                      Pro
                    </span>
                    <div className="shrink-0 rounded-full bg-white/70 px-3 py-1.5 text-[11px]">
                      <span className="font-semibold">Library</span> {savedCount}/{saveLimit}
                      <span className="ml-2 inline-block h-1.5 w-10 overflow-hidden rounded-full bg-[#007A5E]/10 align-middle">
                        <span className="block h-full rounded-full bg-[#007A5E]" style={{ width: `${savedProgressPercent}%` }} />
                      </span>
                    </div>
                    <div className="shrink-0 rounded-full bg-white/70 px-3 py-1.5 text-[11px]">
                      <span className="font-semibold">Garden</span> {pinnedCount}/{pinLimit}
                      <span className="ml-2 inline-block h-1.5 w-10 overflow-hidden rounded-full bg-[#007A5E]/10 align-middle">
                        <span className="block h-full rounded-full bg-[#007A5E]" style={{ width: `${pinnedProgressPercent}%` }} />
                      </span>
                    </div>
                    <div className="shrink-0 rounded-full bg-white/70 px-3 py-1.5 text-[11px]">
                      <span className="font-semibold">Review</span>{" "}
                      <span className="text-[#007A5E]/65">
                        {reviewDueCount > 0 ? `${reviewDueCount} ready` : "unlock memory mode"}
                      </span>
                    </div>
                    <div className="shrink-0 rounded-full bg-white/70 px-3 py-1.5 text-[11px]">
                      <span className="font-semibold">Learn</span>{" "}
                      <span className="text-[#007A5E]/65">finance, crypto, AI</span>
                    </div>
                    <button
                      onClick={onShowSubscribe}
                      className="shrink-0 rounded-full border border-[#007A5E]/18 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#007A5E]"
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              )}

              {/* Swipe hint */}
              <div className="mt-2 sm:mt-4 flex flex-col items-center text-white/30 flex-shrink-0">
                <ChevronUpIcon />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold mt-0.5">Swipe up for next</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {feedLength === 0 && (
          <div className="h-full flex items-center justify-center text-white/40 text-center">
            <div>
              <p className="text-lg mb-2">No cards in this selection</p>
              <button onClick={onClearFilters} className="text-primary underline">
                View all cards
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-2 sm:py-4 text-white/20 text-[8px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest flex-shrink-0">
        &copy; 2025 BloomScroll &middot; Cultivating Mindfulness One Quote at a Time
      </div>
    </div>
  );
}
