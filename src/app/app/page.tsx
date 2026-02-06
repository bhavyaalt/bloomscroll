"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Link from "next/link";
import { 
  contentLibrary, 
  Card, 
  topics, 
  shuffleCards,
  getCardsByTopic,
  getTopicCounts 
} from "@/lib/content-library";

const SWIPE_THRESHOLD = 100;
const VIEW_STORAGE_KEY = "bloomscroll_viewed_cards";
const SAVE_STORAGE_KEY = "bloomscroll_saved_cards";

export default function AppPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCards, setSavedCards] = useState<Set<string>>(new Set());
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [direction, setDirection] = useState(0);
  const [feed, setFeed] = useState<Card[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved and viewed cards from localStorage
  useEffect(() => {
    const savedJson = localStorage.getItem(SAVE_STORAGE_KEY);
    const viewedJson = localStorage.getItem(VIEW_STORAGE_KEY);
    
    if (savedJson) {
      setSavedCards(new Set(JSON.parse(savedJson)));
    }
    if (viewedJson) {
      setViewedCards(new Set(JSON.parse(viewedJson)));
    }
    setIsLoaded(true);
  }, []);

  // Generate smart feed: unseen cards first, then seen cards
  useEffect(() => {
    if (!isLoaded) return;

    let availableCards = selectedTopic 
      ? getCardsByTopic(selectedTopic)
      : [...contentLibrary];

    // Separate unseen and seen cards
    const unseenCards = availableCards.filter(card => !viewedCards.has(card.id));
    const seenCards = availableCards.filter(card => viewedCards.has(card.id));

    // Shuffle both groups
    const shuffledUnseen = shuffleCards(unseenCards);
    const shuffledSeen = shuffleCards(seenCards);

    // Prioritize unseen, then fill with seen
    const smartFeed = [...shuffledUnseen, ...shuffledSeen];
    
    setFeed(smartFeed);
    setCurrentIndex(0);
  }, [selectedTopic, isLoaded, viewedCards]);

  // Save to localStorage when savedCards changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify([...savedCards]));
    }
  }, [savedCards, isLoaded]);

  // Mark card as viewed when it's displayed
  useEffect(() => {
    if (feed[currentIndex] && isLoaded) {
      const cardId = feed[currentIndex].id;
      if (!viewedCards.has(cardId)) {
        const newViewed = new Set(viewedCards);
        newViewed.add(cardId);
        setViewedCards(newViewed);
        localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify([...newViewed]));
      }
    }
  }, [currentIndex, feed, isLoaded]);

  const currentCard = feed[currentIndex];

  const goToNext = useCallback(() => {
    if (currentIndex < feed.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, feed.length]);

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

  // Clear view history
  const clearViewHistory = () => {
    setViewedCards(new Set());
    localStorage.removeItem(VIEW_STORAGE_KEY);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") goToNext();
      if (e.key === "ArrowUp" || e.key === "k") goToPrev();
      if (e.key === "s" && currentCard) toggleSave(currentCard.id);
      if (e.key === "Escape") {
        setShowSaved(false);
        setShowTopicSelector(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, currentCard]);

  const savedCardsList = contentLibrary.filter((card) => savedCards.has(card.id));
  const topicCounts = getTopicCounts();
  const unseenCount = feed.filter(card => !viewedCards.has(card.id)).length;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTopicSelector(!showTopicSelector)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                showTopicSelector
                  ? "bg-[#007A5E] text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              Topics
            </button>
            <button
              onClick={() => setShowSaved(!showSaved)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                showSaved
                  ? "bg-[#007A5E] text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              ★ {savedCards.size}
            </button>
          </div>
        </div>
      </header>

      {/* Topic Filter Bar */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setSelectedTopic(null)}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all ${
              selectedTopic === null
                ? "bg-[#007A5E] text-white"
                : "bg-white/10 text-white/60 hover:text-white"
            }`}
          >
            All ({contentLibrary.length})
          </button>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all ${
                selectedTopic === topic
                  ? "bg-[#007A5E] text-white"
                  : "bg-white/10 text-white/60 hover:text-white"
              }`}
            >
              {topic} ({topicCounts[topic]})
            </button>
          ))}
        </div>
      </div>

      {/* Topic Selector Modal */}
      {showTopicSelector && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-md w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-impact text-2xl uppercase text-[#007A5E]">
                  Choose Topics
                </h2>
                <button
                  onClick={() => setShowTopicSelector(false)}
                  className="text-white/40 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setSelectedTopic(null);
                    setShowTopicSelector(false);
                  }}
                  className={`p-4 rounded-xl text-left transition-all ${
                    selectedTopic === null
                      ? "bg-[#007A5E] text-white"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <span className="text-2xl mb-2 block">🌟</span>
                  <span className="font-bold block">All Topics</span>
                  <span className="text-xs opacity-60">{contentLibrary.length} cards</span>
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      setSelectedTopic(topic);
                      setShowTopicSelector(false);
                    }}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedTopic === topic
                        ? "bg-[#007A5E] text-white"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-2xl mb-2 block">
                      {topic === "philosophy" && "🏛️"}
                      {topic === "stoicism" && "🗿"}
                      {topic === "psychology" && "🧠"}
                      {topic === "business" && "💼"}
                      {topic === "science" && "🔬"}
                      {topic === "history" && "📜"}
                      {topic === "productivity" && "⚡"}
                      {topic === "creativity" && "🎨"}
                      {topic === "mindfulness" && "🧘"}
                      {topic === "leadership" && "👑"}
                      {topic === "relationships" && "💝"}
                    </span>
                    <span className="font-bold block capitalize">{topic}</span>
                    <span className="text-xs opacity-60">{topicCounts[topic]} cards</span>
                  </button>
                ))}
              </div>
              
              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-center text-sm opacity-60">
                  <p>📖 {viewedCards.size} cards viewed</p>
                  <p>✨ {unseenCount} new cards waiting</p>
                  {viewedCards.size > 0 && (
                    <button
                      onClick={clearViewHistory}
                      className="mt-2 text-[#007A5E] underline text-xs"
                    >
                      Reset view history
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {showSaved ? (
        // Saved Cards View
        <div className="pt-28 pb-20 px-4 max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-impact text-2xl uppercase text-[#007A5E]">
              Your Library
            </h2>
            <span className="text-white/40 text-sm">
              {savedCardsList.length} saved
            </span>
          </div>
          {savedCardsList.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              <p className="text-4xl mb-4">📚</p>
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
                  <p className="text-sm opacity-80 line-clamp-2">&ldquo;{card.quote}&rdquo;</p>
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

                    {/* New Badge */}
                    {!viewedCards.has(currentCard.id) && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-[#4D9E8A] text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                          ✨ New
                        </span>
                      </div>
                    )}

                    {/* Image */}
                    <div className="h-44 relative overflow-hidden">
                      <img
                        src={currentCard.image_url}
                        alt={currentCard.author}
                        className="w-full h-full object-cover grayscale-img"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#EACCD4]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col overflow-auto">
                      <h2 className="font-impact text-3xl md:text-4xl uppercase leading-none mb-1">
                        {currentCard.author}
                      </h2>
                      <p className="font-times italic text-lg md:text-xl mb-4 text-[#007A5E]/80">
                        {currentCard.book}
                      </p>

                      <blockquote className="text-base md:text-lg leading-relaxed mb-4 border-l-4 border-[#007A5E] pl-4">
                        &ldquo;{currentCard.quote}&rdquo;
                      </blockquote>
                      
                      <p className="text-sm md:text-base leading-relaxed opacity-80 flex-1">
                        {currentCard.insight}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-3 mt-4">
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
                  <div className="mt-3 flex items-center justify-between text-white/40 text-xs">
                    <span>
                      {currentIndex + 1} / {feed.length}
                      {unseenCount > 0 && ` • ${unseenCount} new`}
                    </span>
                    <span className="font-times italic">Swipe up for more</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {feed.length === 0 && (
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
      {!showSaved && !showTopicSelector && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-4 text-white/20 text-xs">
          <span>↑↓ Navigate</span>
          <span>•</span>
          <span>Double-tap to save</span>
        </div>
      )}
    </div>
  );
}
