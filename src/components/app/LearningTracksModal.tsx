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
        className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full max-h-[80dvh] overflow-hidden"
      >
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-instrument-serif font-medium text-lg sm:text-xl flex items-center gap-2 text-slate-900">
                <span className="text-xl sm:text-2xl shrink-0">🧠</span>
                Learning Tracks
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Pro-only card decks that turn BloomScroll into a fast, swipeable learning app.
              </p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-2xl leading-none">
              ×
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[55dvh] p-3 sm:p-4">
          {!isSubscribed ? (
            <div className="rounded-3xl border border-brand/15 bg-brand/10 p-5 text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                🔒
              </div>
              <p className="text-lg font-medium text-brand">Learning mode is a Pro feature</p>
              <p className="mt-2 text-sm text-slate-500">
                Unlock curated tracks in finance, crypto, AI, and startup strategy with cards built to teach, not just inspire.
              </p>
              <div className="mt-5 grid gap-3 text-left">
                {learningTracks.map((track) => (
                  <div key={track.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{track.emoji}</span>
                        <div>
                          <p className="font-medium text-slate-800">{track.name}</p>
                          <p className="text-xs text-slate-400">{track.description}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
                        {getLearningCardsByTrack(track.id).length} cards
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={onUpgrade}
                className="mt-5 inline-flex items-center justify-center rounded-full h-11 px-6 bg-brand text-white text-sm font-medium"
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
                    ? "border-brand/50 bg-brand/15"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">All Learning Tracks</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Shuffle every premium lesson deck into one focused learning feed.
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] text-slate-500">
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
                        ? "border-brand/50 bg-brand/15"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 text-2xl">{track.emoji}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-slate-900">{track.name}</p>
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: track.color }} />
                          </div>
                          <p className="mt-1 text-sm text-slate-500">{track.description}</p>
                          <p className="mt-2 text-[11px] text-slate-400">
                            {track.topics.join(" · ")}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] text-slate-500">
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
