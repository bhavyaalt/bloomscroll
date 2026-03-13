"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/lib/content-library";
import { getAnyCardById } from "@/lib/card-resolver";
import { PinnedCard } from "@/lib/pinned-cards";
import { useNotifications } from "@/components/NotificationProvider";

interface PinnedBoardViewProps {
  pins: PinnedCard[];
  isOwner: boolean;
  username: string;
  onUnpin?: (cardId: string) => void;
  onEditNote?: (cardId: string, note: string | null) => void;
}

function PinnedCardTile({
  pin,
  card,
  isOwner,
  onUnpin,
  onEditNote,
}: {
  pin: PinnedCard;
  card: Card;
  isOwner: boolean;
  onUnpin?: (cardId: string) => void;
  onEditNote?: (cardId: string, note: string | null) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [noteText, setNoteText] = useState(pin.note || "");

  const handleSaveNote = () => {
    onEditNote?.(pin.card_id, noteText || null);
    setEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="break-inside-avoid mb-3 bg-[#FFF5FE] border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group"
    >
      {/* Topic badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {card.topic.slice(0, 2).map((t) => (
          <span
            key={t}
            className="px-2.5 py-0.5 rounded-full bg-brand-light text-brand text-[10px] font-medium"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Quote */}
      <blockquote
        className="text-sm text-slate-700 leading-relaxed mb-3 italic"
        style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
      >
        &ldquo;{card.quote}&rdquo;
      </blockquote>

      {/* Author + Book */}
      <div className="mb-2">
        <p className="text-xs font-medium text-brand">
          {card.author}
        </p>
        <p className="text-[11px] text-slate-500 italic">{card.book}</p>
      </div>

      {/* Personal note */}
      {pin.note && !editing && (
        <>
          <div className="w-full h-px bg-slate-200 my-3" />
          <p className="text-xs text-slate-600 leading-relaxed">
            {pin.note}
          </p>
        </>
      )}

      {/* Edit note inline */}
      {editing && (
        <>
          <div className="w-full h-px bg-slate-200 my-3" />
          <textarea
            value={noteText}
            onChange={(e) => {
              if (e.target.value.length <= 280) setNoteText(e.target.value);
            }}
            placeholder="Add a personal note..."
            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand resize-none"
            rows={2}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] text-slate-400">
              {noteText.length}/280
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setEditing(false)}
                className="text-[10px] text-slate-500 px-2 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="text-[10px] text-white bg-brand px-2 py-1 rounded font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}

      {/* Owner actions */}
      {isOwner && !editing && (
        <div className="flex justify-end gap-1 mt-3 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 max-sm:opacity-60 transition-opacity">
          <button
            onClick={() => setEditing(true)}
            className="text-[10px] text-slate-500 hover:text-brand px-2 py-1 rounded bg-slate-100 hover:bg-brand-light transition-all"
          >
            {pin.note ? "Edit note" : "Add note"}
          </button>
          <button
            onClick={() => onUnpin?.(pin.card_id)}
            className="text-[10px] text-red-400 hover:text-red-500 px-2 py-1 rounded bg-red-50 hover:bg-red-100 transition-all"
          >
            Unpin
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default function PinnedBoardView({
  pins,
  isOwner,
  username,
  onUnpin,
  onEditNote,
}: PinnedBoardViewProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { notify } = useNotifications();

  const gardenUrl = typeof window !== "undefined" ? `${window.location.origin}/garden/${username}` : "";

  const handleShareGarden = (platform?: "twitter" | "copy") => {
    const url = gardenUrl;
    const text = `Check out my wisdom garden on BloomScroll 🌱\n\n${pins.length} curated quotes from the best minds.`;
    const twitterText = `Check out my wisdom garden on @bloomscroll 🌱\n\n${pins.length} curated quotes from the best minds.`;

    if (platform === "twitter") {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, "_blank", "width=550,height=420");
      setShowShareMenu(false);
      return;
    }

    // Copy for Instagram or default
    navigator.clipboard.writeText(`${text}\n\n${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowShareMenu(false);
    notify({
      title: "Copied!",
      message: "Garden link ready to paste anywhere.",
      tone: "success",
    });
  };

  if (pins.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🌱</div>
        <h3
          className="text-xl font-medium text-slate-800 mb-2"
          style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
        >
          Your garden is empty
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Pin quotes from the feed to grow your collection. Your garden is your
          curated board of wisdom.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Board header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3
            className="text-2xl font-medium text-slate-800"
            style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
          >
            My Garden
          </h3>
          <p className="text-sm text-slate-500">
            {pins.length} quote{pins.length !== 1 ? "s" : ""} planted
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand-dark transition-all"
          >
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
            {copied ? "Copied!" : "Share Garden"}
          </button>

          {/* Share dropdown */}
          {showShareMenu && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg p-2 min-w-[180px] z-50">
              <button
                onClick={() => handleShareGarden("twitter")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-sm font-medium text-slate-700">Share on X</span>
              </button>
              <button
                onClick={() => handleShareGarden("copy")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <svg className="size-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-sm font-medium text-slate-700">Copy for Instagram</span>
              </button>
              <button
                onClick={() => handleShareGarden("copy")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <svg className="size-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                <span className="text-sm font-medium text-slate-700">Copy Link</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 gap-3">
        {pins.map((pin) => {
          const card = getAnyCardById(pin.card_id);
          if (!card) return null;
          return (
            <PinnedCardTile
              key={pin.id}
              pin={pin}
              card={card}
              isOwner={isOwner}
              onUnpin={onUnpin}
              onEditNote={onEditNote}
            />
          );
        })}
      </div>
    </div>
  );
}
