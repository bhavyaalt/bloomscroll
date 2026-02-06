"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Link from "next/link";
import { cards, Card, topics, shuffleCards } from "@/lib/cards";

const SWIPE_THRESHOLD = 100;

export default function AppPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCards, setSavedCards] = useState<Set<string>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [direction, setDirection] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);

  useEffect(() => {
    setShuffledCards(shuffleCards(cards));
  }, []);

  const filteredCards = selectedTopic
    ? shuffledCards.filter((card) => card.topic.includes(selectedTopic))
    : shuffledCards;

  const currentCard = filteredCards[currentIndex];

  const goToNext = useCallback(() => {
    if (currentIndex < filteredCards.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, filteredCards.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y < -SWIPE_THRESHOLD) {
      goToNext();
    } else if (info.offset.y > SWIPE_THRESHOLD) {
      goToPrev();
    }
  };

  const toggleSave = (cardId: string) => {
    setSavedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const handleDoubleTap = () => {
    if (currentCard) {
      toggleSave(currentCard.id);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") goToNext();
      if (e.key === "ArrowUp" || e.key === "k") goToPrev();
      if (e.key === "s" && currentCard) toggleSave(currentCard.id);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, currentCard]);

  const savedCardsList = shuffledCards.filter((card) => savedCards.has(card.id));

  if (shuffledCards.length === 0) {
    return (
      <div className="min-h-screen bg-[#EACCD4] flex items-center justify-center">
        <div className="animate-pulse font-impact text-4xl text-[#007A5E]">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-baseline">
            <span className="font-impact text-xl uppercase tracking-tighter text-[#007A5E]">
              Bloom
            </span>
            <span className="font-times italic text-xl text-[#4D9E8A]">
              scroll
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSaved(!showSaved)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                showSaved
                  ? "bg-[#007A5E] text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              Saved ({savedCards.size})
            </button>
          </div>
        </div>
      </header>

      {/* Topic Filter */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => {
              setSelectedTopic(null);
              setCurrentIndex(0);
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all ${
              selectedTopic === null
                ? "bg-[#007A5E] text-white"
                : "bg-white/10 text-white/60 hover:text-white"
            }`}
          >
            All
          </button>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => {
                setSelectedTopic(topic);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all ${
                selectedTopic === topic
                  ? "bg-[#007A5E] text-white"
                  : "bg-white/10 text-white/60 hover:text-white"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      {showSaved ? (
        // Saved Cards View
        <div className="pt-28 pb-20 px-4 max-w-lg mx-auto">
          <h2 className="font-impact text-2xl uppercase mb-6 text-[#007A5E]">
            Your Library
          </h2>
          {savedCardsList.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              <p className="text-lg mb-2">No saved cards yet</p>
              <p className="text-sm">
                Double-tap or press S to save cards you love
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedCardsList.map((card) => (
                <div
                  key={card.id}
                  className="bg-[#EACCD4] text-[#007A5E] rounded-xl p-4 border-l-4 border-[#4D9E8A]"
                >
                  <div className="text-xs font-bold uppercase tracking-wide mb-2 opacity-60">
                    {card.topic[0]}
                  </div>
                  <h3 className="font-impact text-xl uppercase">{card.author}</h3>
                  <p className="font-times italic text-sm mb-2">{card.book}</p>
                  <p className="text-sm opacity-80 line-clamp-2">{card.quote}</p>
                  <button
                    onClick={() => toggleSave(card.id)}
                    className="mt-3 text-xs font-bold uppercase text-[#007A5E]/60 hover:text-[#007A5E]"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Swipe Feed
        <div className="fixed inset-0 pt-28 pb-4">
          <div className="h-full max-w-lg mx-auto px-4 relative">
            <AnimatePresence mode="wait" initial={false}>
              {currentCard && (
                <motion.div
                  key={currentCard.id}
                  initial={{ opacity: 0, y: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: direction > 0 ? -100 : 100 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  onDoubleClick={handleDoubleTap}
                  className="absolute inset-0 flex flex-col cursor-grab active:cursor-grabbing"
                >
                  {/* Card */}
                  <div className="flex-1 bg-[#EACCD4] text-[#007A5E] rounded-2xl overflow-hidden flex flex-col relative">
                    {/* Topic Badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="bg-[#007A5E] text-[#EACCD4] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        ◆ {currentCard.topic[0]}
                      </span>
                      <span className="bg-white/80 text-[#007A5E] px-2 py-1 rounded-full text-xs font-bold">
                        {currentCard.read_time_seconds}s
                      </span>
                    </div>

                    {/* Save Badge */}
                    {savedCards.has(currentCard.id) && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-[#007A5E] text-[#EACCD4] px-3 py-1 rounded-full text-xs font-bold">
                          ★ Saved
                        </span>
                      </div>
                    )}

                    {/* Image */}
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={currentCard.image_url}
                        alt={currentCard.author}
                        className="w-full h-full object-cover grayscale-img"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#EACCD4]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      <h2 className="font-impact text-4xl md:text-5xl uppercase leading-none mb-1">
                        {currentCard.author}
                      </h2>
                      <p className="font-times italic text-xl md:text-2xl mb-6 text-[#007A5E]/80">
                        {currentCard.book}
                      </p>

                      <div className="flex-1 flex flex-col justify-center">
                        <blockquote className="text-lg md:text-xl leading-relaxed mb-4">
                          &ldquo;{currentCard.quote}&rdquo;
                        </blockquote>
                        <p className="text-sm md:text-base leading-relaxed opacity-80">
                          {currentCard.insight}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => toggleSave(currentCard.id)}
                          className={`flex-1 py-3 rounded-full font-bold uppercase text-sm tracking-wide transition-all ${
                            savedCards.has(currentCard.id)
                              ? "bg-[#007A5E] text-[#EACCD4]"
                              : "border-2 border-[#007A5E] text-[#007A5E] hover:bg-[#007A5E] hover:text-[#EACCD4]"
                          }`}
                        >
                          {savedCards.has(currentCard.id) ? "★ Saved" : "◆ Save"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-4 flex items-center justify-between text-white/40 text-xs">
                    <span>
                      {currentIndex + 1} / {filteredCards.length}
                    </span>
                    <span className="font-times italic">Swipe up for more</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {filteredCards.length === 0 && (
              <div className="h-full flex items-center justify-center text-white/40 text-center">
                <div>
                  <p className="text-lg mb-2">No cards in this topic yet</p>
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="text-[#007A5E] underline"
                  >
                    View all cards
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Hints */}
      {!showSaved && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-4 text-white/20 text-xs">
          <span>↑↓ Navigate</span>
          <span>•</span>
          <span>Double-tap to save</span>
        </div>
      )}
    </div>
  );
}
