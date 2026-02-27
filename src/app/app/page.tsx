"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { incrementViewCount, submitPaywallFeedback } from "@/lib/supabase";
import { 
  contentLibrary, 
  Card, 
  topics, 
  shuffleCards,
  getCardsByTopic,
  getTopicCounts 
} from "@/lib/content-library";

const SWIPE_THRESHOLD = 100;
const VIEW_STORAGE_KEY = "scrollbliss_viewed_cards";
const SAVE_STORAGE_KEY = "scrollbliss_saved_cards";
const PREFERENCES_KEY = "scrollbliss_preferences";
const ONBOARDING_KEY = "scrollbliss_onboarding_complete";

interface Preferences {
  topics: string[];
  goals: string[];
  completedAt: string;
}

export default function AppPage() {
  const { user, loading: authLoading, isSubscribed, viewsRemaining, refreshProfile, signOut } = useAuth();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCards, setSavedCards] = useState<Set<string>>(new Set());
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState<string | null>(null);
  const [feedbackOther, setFeedbackOther] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [direction, setDirection] = useState(0);
  const [feed, setFeed] = useState<Card[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [todayViews, setTodayViews] = useState(0);

  // Load saved cards, viewed cards, and preferences from localStorage
  useEffect(() => {
    const savedJson = localStorage.getItem(SAVE_STORAGE_KEY);
    const viewedJson = localStorage.getItem(VIEW_STORAGE_KEY);
    const prefsJson = localStorage.getItem(PREFERENCES_KEY);
    
    if (savedJson) {
      setSavedCards(new Set(JSON.parse(savedJson)));
    }
    if (viewedJson) {
      setViewedCards(new Set(JSON.parse(viewedJson)));
    }
    if (prefsJson) {
      setPreferences(JSON.parse(prefsJson));
    }
    setIsLoaded(true);
  }, []);

  // Generate smart feed: prioritize preferred topics, unseen cards first
  useEffect(() => {
    if (!isLoaded) return;

    let availableCards = selectedTopic 
      ? getCardsByTopic(selectedTopic)
      : [...contentLibrary];

    // If user has preferences, prioritize those topics
    if (!selectedTopic && preferences?.topics && preferences.topics.length > 0) {
      // Separate preferred and non-preferred cards
      const preferredCards = availableCards.filter(card => 
        card.topic.some(t => preferences.topics.includes(t))
      );
      const otherCards = availableCards.filter(card => 
        !card.topic.some(t => preferences.topics.includes(t))
      );

      // Within each group, prioritize unseen
      const preferredUnseen = preferredCards.filter(c => !viewedCards.has(c.id));
      const preferredSeen = preferredCards.filter(c => viewedCards.has(c.id));
      const otherUnseen = otherCards.filter(c => !viewedCards.has(c.id));
      const otherSeen = otherCards.filter(c => viewedCards.has(c.id));

      // Build feed: preferred unseen → other unseen → preferred seen → other seen
      const smartFeed = [
        ...shuffleCards(preferredUnseen),
        ...shuffleCards(otherUnseen),
        ...shuffleCards(preferredSeen),
        ...shuffleCards(otherSeen),
      ];
      
      setFeed(smartFeed);
    } else {
      // No preferences - just prioritize unseen cards
      const unseenCards = availableCards.filter(card => !viewedCards.has(card.id));
      const seenCards = availableCards.filter(card => viewedCards.has(card.id));

      const smartFeed = [...shuffleCards(unseenCards), ...shuffleCards(seenCards)];
      setFeed(smartFeed);
    }
    
    setCurrentIndex(0);
  }, [selectedTopic, isLoaded, viewedCards, preferences]);

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
            {/* Subscription badge */}
            {!isSubscribed && user && (
              <button
                onClick={() => setShowPaywall(true)}
                className="px-2 py-1 rounded-full text-xs font-bold bg-[#4D9E8A]/20 text-[#4D9E8A]"
              >
                {viewsRemaining > 0 ? `${viewsRemaining} free` : "Upgrade"}
              </button>
            )}
            {isSubscribed && (
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-[#007A5E] text-white">
                PRO
              </span>
            )}
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
            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-all"
              >
                {user ? "👤" : "?"}
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-10 bg-[#1a1a1a] border border-white/10 rounded-xl p-2 min-w-[160px] shadow-xl">
                  {user ? (
                    <>
                      <div className="px-3 py-2 text-xs text-white/40 truncate">
                        {user.email}
                      </div>
                      <hr className="border-white/10 my-1" />
                      {!isSubscribed && (
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            setShowPaywall(true);
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg text-[#4D9E8A]"
                        >
                          ⭐ Upgrade to Pro
                        </button>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg text-white/70"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth?redirect=/app"
                      className="block px-3 py-2 text-sm hover:bg-white/10 rounded-lg text-[#4D9E8A]"
                    >
                      Sign in
                    </Link>
                  )}
                </div>
              )}
            </div>
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
      {!showSaved && !showTopicSelector && !showPaywall && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-4 text-white/20 text-xs">
          <span>↑↓ Navigate</span>
          <span>•</span>
          <span>Double-tap to save</span>
        </div>
      )}

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#EACCD4] text-[#007A5E] rounded-2xl max-w-md w-full overflow-hidden"
          >
            <div className="p-6 text-center">
              <button
                onClick={() => setShowPaywall(false)}
                className="absolute top-4 right-4 text-[#007A5E]/40 hover:text-[#007A5E] text-2xl"
              >
                ×
              </button>
              
              <div className="text-5xl mb-4">🌱</div>
              <h2 className="font-impact text-3xl uppercase mb-2">
                Keep Growing
              </h2>
              <p className="font-times italic text-lg mb-6 opacity-80">
                {viewsRemaining > 0 
                  ? `You have ${viewsRemaining} free reads left today`
                  : "You've reached your daily limit"
                }
              </p>

              <div className="bg-white/50 rounded-xl p-6 mb-6">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-4xl font-impact">$5</span>
                  <span className="font-times italic opacity-70">/month</span>
                </div>
                <p className="text-sm opacity-70 mb-4">Paid in USDC on Base</p>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-[#007A5E]">✓</span> Unlimited daily reads
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#007A5E]">✓</span> Full library access (136+ cards)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#007A5E]">✓</span> Sync across devices
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#007A5E]">✓</span> New cards added weekly
                  </li>
                </ul>
              </div>

              {user ? (
                <Link
                  href="/subscribe"
                  className="block w-full py-4 bg-[#007A5E] text-[#EACCD4] rounded-full font-bold uppercase tracking-widest hover:bg-[#004a39] transition-all"
                >
                  Subscribe Now
                </Link>
              ) : (
                <Link
                  href="/auth?redirect=/subscribe"
                  className="block w-full py-4 bg-[#007A5E] text-[#EACCD4] rounded-full font-bold uppercase tracking-widest hover:bg-[#004a39] transition-all"
                >
                  Sign in to Subscribe
                </Link>
              )}

              <button
                onClick={() => {
                  setShowPaywall(false);
                  setShowFeedback(true);
                }}
                className="mt-4 text-sm opacity-60 hover:opacity-100"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#EACCD4] text-[#007A5E] rounded-2xl max-w-md w-full overflow-hidden"
          >
            <div className="p-6">
              <button
                onClick={() => {
                  setShowFeedback(false);
                  setFeedbackReason(null);
                  setFeedbackOther("");
                  setFeedbackSubmitted(false);
                }}
                className="absolute top-4 right-4 text-[#007A5E]/40 hover:text-[#007A5E] text-2xl"
              >
                ×
              </button>

              {!feedbackSubmitted ? (
                <>
                  <div className="text-4xl mb-3">💬</div>
                  <h2 className="font-impact text-2xl uppercase mb-2">
                    Quick question
                  </h2>
                  <p className="font-times italic text-base mb-6 opacity-80">
                    What's holding you back from subscribing?
                  </p>

                  <div className="space-y-2 mb-4">
                    {[
                      { value: "too_expensive", label: "💰 Too expensive" },
                      { value: "not_sure_value", label: "🤔 Not sure it's worth it yet" },
                      { value: "just_browsing", label: "👀 Just browsing for now" },
                      { value: "want_more_topics", label: "📚 Want more topics first" },
                      { value: "prefer_free", label: "🆓 Prefer free content" },
                      { value: "payment_friction", label: "💳 Crypto payment is confusing" },
                      { value: "later", label: "⏰ Will subscribe later" },
                      { value: "other", label: "✍️ Other" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFeedbackReason(option.value)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                          feedbackReason === option.value
                            ? "bg-[#007A5E] text-[#EACCD4]"
                            : "bg-white/50 hover:bg-white/70"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  {feedbackReason === "other" && (
                    <textarea
                      value={feedbackOther}
                      onChange={(e) => setFeedbackOther(e.target.value)}
                      placeholder="Tell us more..."
                      className="w-full px-4 py-3 rounded-xl bg-white/50 text-[#007A5E] placeholder-[#007A5E]/50 text-sm mb-4 resize-none"
                      rows={3}
                    />
                  )}

                  <button
                    onClick={async () => {
                      if (feedbackReason) {
                        await submitPaywallFeedback({
                          user_id: user?.id,
                          reason: feedbackReason,
                          other_text: feedbackReason === "other" ? feedbackOther : undefined,
                          cards_viewed: viewedCards.size,
                        });
                        setFeedbackSubmitted(true);
                      }
                    }}
                    disabled={!feedbackReason}
                    className={`w-full py-3 rounded-full font-bold uppercase tracking-wide text-sm transition-all ${
                      feedbackReason
                        ? "bg-[#007A5E] text-[#EACCD4] hover:bg-[#004a39]"
                        : "bg-[#007A5E]/30 text-[#EACCD4]/50 cursor-not-allowed"
                    }`}
                  >
                    Submit
                  </button>

                  <button
                    onClick={() => {
                      setShowFeedback(false);
                      setFeedbackReason(null);
                      setFeedbackOther("");
                    }}
                    className="w-full mt-3 text-sm opacity-60 hover:opacity-100"
                  >
                    Skip
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="text-5xl mb-4">🙏</div>
                  <h2 className="font-impact text-2xl uppercase mb-2">
                    Thanks!
                  </h2>
                  <p className="font-times italic text-base opacity-80 mb-6">
                    Your feedback helps us improve
                  </p>
                  <button
                    onClick={() => {
                      setShowFeedback(false);
                      setFeedbackReason(null);
                      setFeedbackOther("");
                      setFeedbackSubmitted(false);
                    }}
                    className="py-3 px-8 bg-[#007A5E] text-[#EACCD4] rounded-full font-bold uppercase tracking-wide text-sm"
                  >
                    Continue Reading
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
