"use client";

import { motion } from "framer-motion";
import {
  ALL_LEARNING_TRACKS_ID,
  getLearningCardsByTrack,
  learningCards,
  learningTracks,
} from "@/lib/learning-cards";

interface LearningTracksModalProps {
  selectedTrack: string | null;
  isSubscribed: boolean;
  onSelect: (trackId: string) => void;
  onClose: () => void;
  onUpgrade: () => void;
}

export default function LearningTracksModal({
  selectedTrack,
  isSubscribed,
  onSelect,
  onClose,
  onUpgrade,
}: LearningTracksModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(event) => event.stopPropagation()}
        className="bg-[#1a2e23] border border-white/10 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-bold text-xl flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                Learning Tracks
              </h2>
              <p className="text-sm text-white/55 mt-2">
                Pro-only card decks that turn BloomScroll into a fast, swipeable learning app.
              </p>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none">
              ×
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[60vh] p-4">
          {!isSubscribed ? (
            <div className="rounded-3xl border border-primary/15 bg-primary/10 p-5 text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                🔒
              </div>
              <p className="text-lg font-semibold text-primary">Learning mode is a Pro feature</p>
              <p className="mt-2 text-sm text-white/60">
                Unlock curated tracks in finance, crypto, AI, and startup strategy with cards built to teach, not just inspire.
              </p>
              <div className="mt-5 grid gap-3 text-left">
                {learningTracks.map((track) => (
                  <div key={track.id} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{track.emoji}</span>
                        <div>
                          <p className="font-semibold text-white/90">{track.name}</p>
                          <p className="text-xs text-white/50">{track.description}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white/55">
                        {getLearningCardsByTrack(track.id).length} cards
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={onUpgrade}
                className="mt-5 inline-flex items-center justify-center rounded-full h-11 px-6 bg-primary text-[#102219] text-sm font-bold uppercase tracking-[0.16em]"
              >
                Upgrade to Pro
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={() => {
                  onSelect(ALL_LEARNING_TRACKS_ID);
                  onClose();
                }}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                  selectedTrack === ALL_LEARNING_TRACKS_ID
                    ? "border-primary/50 bg-primary/15"
                    : "border-white/8 bg-white/5 hover:bg-white/8"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">All Learning Tracks</p>
                    <p className="mt-1 text-sm text-white/55">
                      Shuffle every premium lesson deck into one focused learning feed.
                    </p>
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/60">
                    {learningCards.length} cards
                  </span>
                </div>
              </button>

              {learningTracks.map((track) => {
                const count = getLearningCardsByTrack(track.id).length;

                return (
                  <button
                    key={track.id}
                    onClick={() => {
                      onSelect(track.id);
                      onClose();
                    }}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                      selectedTrack === track.id
                        ? "border-primary/50 bg-primary/15"
                        : "border-white/8 bg-white/5 hover:bg-white/8"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 text-2xl">{track.emoji}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-white">{track.name}</p>
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: track.color }} />
                          </div>
                          <p className="mt-1 text-sm text-white/55">{track.description}</p>
                          <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/35">
                            {track.topics.join(" · ")}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/60">
                        {count} cards
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
