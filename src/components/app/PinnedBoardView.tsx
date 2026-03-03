"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, getCardById } from "@/lib/content-library";
import { PinnedCard } from "@/lib/pinned-cards";

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
      className="break-inside-avoid mb-3 bg-white border border-botsage/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group"
    >
      {/* Topic badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {card.topic.slice(0, 2).map((t) => (
          <span
            key={t}
            className="px-2.5 py-0.5 rounded-full bg-botsage/15 text-botgreen text-[10px] font-bold uppercase tracking-wider"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Quote */}
      <blockquote
        className="text-sm text-darkteal leading-relaxed mb-3 italic"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        &ldquo;{card.quote}&rdquo;
      </blockquote>

      {/* Author + Book */}
      <div className="mb-2">
        <p className="text-xs font-bold text-botgreen uppercase tracking-wider">
          {card.author}
        </p>
        <p className="text-[11px] text-botsagedark italic">{card.book}</p>
      </div>

      {/* Personal note */}
      {pin.note && !editing && (
        <>
          <div className="w-full h-px bg-botsage/15 my-3" />
          <p className="text-xs text-botsagedark leading-relaxed">
            {pin.note}
          </p>
        </>
      )}

      {/* Edit note inline */}
      {editing && (
        <>
          <div className="w-full h-px bg-botsage/15 my-3" />
          <textarea
            value={noteText}
            onChange={(e) => {
              if (e.target.value.length <= 280) setNoteText(e.target.value);
            }}
            placeholder="Add a personal note..."
            className="w-full bg-cream border border-botsage/20 rounded-lg p-2 text-xs text-darkteal placeholder:text-botsagedark/40 focus:outline-none focus:border-botgreen resize-none"
            rows={2}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] text-botsagedark/50">
              {noteText.length}/280
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setEditing(false)}
                className="text-[10px] text-botsagedark px-2 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="text-[10px] text-white bg-botgreen px-2 py-1 rounded font-bold"
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
            className="text-[10px] text-botsagedark hover:text-botgreen px-2 py-1 rounded bg-botsage/10 hover:bg-botsage/20 transition-all"
          >
            {pin.note ? "Edit note" : "Add note"}
          </button>
          <button
            onClick={() => onUnpin?.(pin.card_id)}
            className="text-[10px] text-softclay hover:text-red-500 px-2 py-1 rounded bg-softclay/10 hover:bg-softclay/20 transition-all"
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

  const handleShareGarden = () => {
    const url = `${window.location.origin}/garden/${username}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (pins.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🌱</div>
        <h3
          className="text-xl font-bold text-darkteal mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Your garden is empty
        </h3>
        <p className="text-sm text-botsagedark max-w-sm mx-auto">
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
            className="text-2xl font-bold text-darkteal"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            My Garden
          </h3>
          <p className="text-sm text-botsagedark">
            {pins.length} quote{pins.length !== 1 ? "s" : ""} planted
          </p>
        </div>
        <button
          onClick={handleShareGarden}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-botgreen text-cream text-sm font-medium hover:bg-botgreen/90 transition-all"
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
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 gap-3">
        {pins.map((pin) => {
          const card = getCardById(pin.card_id);
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
