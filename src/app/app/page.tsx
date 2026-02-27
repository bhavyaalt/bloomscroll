"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { submitPaywallFeedback } from "@/lib/supabase";
import { 
  contentLibrary, 
  Card, 
  topics, 
  shuffleCards,
  getCardsByTopic,
  getTopicCounts 
} from "@/lib/content-library";
import { getStreakData, updateStreak, getStreakEmoji, getStreakMessage } from "@/lib/streak";
import { shareCard, copyQuote } from "@/lib/share";
import { generateQuizQuestion, updateQuizStats, getQuizStats, getAccuracyPercentage, QuizQuestion } from "@/lib/quiz";
import { collections, getCollectionCards, Collection } from "@/lib/collections";

const SWIPE_THRESHOLD = 100;
const VIEW_STORAGE_KEY = "scrollbliss_viewed_cards";
const SAVE_STORAGE_KEY = "scrollbliss_saved_cards";
const PREFERENCES_KEY = "scrollbliss_preferences";
const CARDS_UNTIL_QUIZ = 10;

interface Preferences {
  topics: string[];
  goals: string[];
  completedAt: string;
}

export default function AppPage() {
  const { user, isSubscribed, viewsRemaining, signOut } = useAuth();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCards, setSavedCards] = useState<Set<string>>(new Set());
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
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
  
  // Deep Dive state
  const [showDeepDive, setShowDeepDive] = useState(false);
  
  // Streak state
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0, totalDays: 0, lastVisitDate: "" });
  const [showStreakModal, setShowStreakModal] = useState(false);
  
  // Quiz state
  const [cardsViewedSinceQuiz, setCardsViewedSinceQuiz] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizStats, setQuizStats] = useState(getQuizStats());
  
  // Share feedback
  const [showCopied, setShowCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

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
    
    // Update streak on load
    const streakData = updateStreak();
    setStreak(streakData);
    
    // Show streak modal if it's a new day visit
    const lastShown = localStorage.getItem("bloomscroll_streak_shown");
    const today = new Date().toISOString().split("T")[0];
    if (lastShown !== today && streakData.currentStreak > 0) {
      setShowStreakModal(true);
      localStorage.setItem("bloomscroll_streak_shown", today);
    }
    
    setQuizStats(getQuizStats());
    setIsLoaded(true);
  }, []);

  // Generate smart feed
  useEffect(() => {
    if (!isLoaded) return;

    let availableCards: Card[];
    
    if (selectedCollection) {
      availableCards = getCollectionCards(selectedCollection);
    } else if (selectedTopic) {
      availableCards = getCardsByTopic(selectedTopic);
    } else {
      availableCards = [...contentLibrary];
    }

    // If user has preferences, prioritize those topics
    if (!selectedTopic && !selectedCollection && preferences?.topics && preferences.topics.length > 0) {
      const preferredCards = availableCards.filter(card => 
        card.topic.some(t => preferences.topics.includes(t))
      );
      const otherCards = availableCards.filter(card => 
        !card.topic.some(t => preferences.topics.includes(t))
      );

      const preferredUnseen = preferredCards.filter(c => !viewedCards.has(c.id));
      const preferredSeen = preferredCards.filter(c => viewedCards.has(c.id));
      const otherUnseen = otherCards.filter(c => !viewedCards.has(c.id));
      const otherSeen = otherCards.filter(c => viewedCards.has(c.id));

      const smartFeed = [
        ...shuffleCards(preferredUnseen),
        ...shuffleCards(otherUnseen),
        ...shuffleCards(preferredSeen),
        ...shuffleCards(otherSeen),
      ];
      
      setFeed(smartFeed);
    } else {
      const unseenCards = availableCards.filter(card => !viewedCards.has(card.id));
      const seenCards = availableCards.filter(card => viewedCards.has(card.id));
      const smartFeed = [...shuffleCards(unseenCards), ...shuffleCards(seenCards)];
      setFeed(smartFeed);
    }
    
    setCurrentIndex(0);
  }, [selectedTopic, selectedCollection, isLoaded, viewedCards, preferences]);

  // Save to localStorage when savedCards changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify([...savedCards]));
    }
  }, [savedCards, isLoaded]);

  // Mark card as viewed when displayed
  useEffect(() => {
    if (feed[currentIndex] && isLoaded) {
      const cardId = feed[currentIndex].id;
      if (!viewedCards.has(cardId)) {
        const newViewed = new Set(viewedCards);
        newViewed.add(cardId);
        setViewedCards(newViewed);
        localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify([...newViewed]));
        
        // Track cards for quiz
        const newCount = cardsViewedSinceQuiz + 1;
        setCardsViewedSinceQuiz(newCount);
        
        // Trigger quiz every CARDS_UNTIL_QUIZ cards
        if (newCount >= CARDS_UNTIL_QUIZ) {
          setQuizQuestion(generateQuizQuestion());
          setShowQuiz(true);
          setCardsViewedSinceQuiz(0);
        }
      }
    }
  }, [currentIndex, feed, isLoaded]);

  const currentCard = feed[currentIndex];

  const goToNext = useCallback(() => {
    if (currentIndex < feed.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setShowDeepDive(false);
    }
  }, [currentIndex, feed.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setShowDeepDive(false);
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

  const handleShare = async () => {
    if (!currentCard) return;
    setIsSharing(true);
    try {
      await shareCard(currentCard);
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopy = () => {
    if (!currentCard) return;
    copyQuote(currentCard);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswer(answer);
    const correct = answer === quizQuestion?.correctAuthor;
    const newStats = updateQuizStats(correct);
    setQuizStats(newStats);
  };

  const clearViewHistory = () => {
    setViewedCards(new Set());
    localStorage.removeItem(VIEW_STORAGE_KEY);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showQuiz || showDeepDive) return;
      if (e.key === "ArrowDown" || e.key === "j") goToNext();
      if (e.key === "ArrowUp" || e.key === "k") goToPrev();
      if (e.key === "s" && currentCard) toggleSave(currentCard.id);
      if (e.key === "e" && currentCard) setShowDeepDive(true);
      if (e.key === "Escape") {
        setShowSaved(false);
        setShowTopicSelector(false);
        setShowDeepDive(false);
        setShowCollections(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, currentCard, showQuiz, showDeepDive]);

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
            {/* Streak Badge */}
            <button
              onClick={() => setShowStreakModal(true)}
              className="px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center gap-1"
            >
              {getStreakEmoji(streak.currentStreak)} {streak.currentStreak}
            </button>
            
            {/* Collections */}
            <button
              onClick={() => setShowCollections(!showCollections)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                showCollections
                  ? "bg-[#007A5E] text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              📚
            </button>
            
            {/* Saved */}
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
            onClick={() => { setSelectedTopic(null); setSelectedCollection(null); }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all ${
              selectedTopic === null && selectedCollection === null
                ? "bg-[#007A5E] text-white"
                : "bg-white/10 text-white/60 hover:text-white"
            }`}
          >
            All ({contentLibrary.length})
          </button>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => { setSelectedTopic(topic); setSelectedCollection(null); }}
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

      {/* Streak Modal */}
      {showStreakModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl max-w-sm w-full p-6 text-center text-white"
          >
            <div className="text-6xl mb-4">{getStreakEmoji(streak.currentStreak)}</div>
            <h2 className="font-impact text-4xl uppercase mb-2">
              {streak.currentStreak} Day Streak!
            </h2>
            <p className="text-lg opacity-90 mb-4">{getStreakMessage(streak.currentStreak)}</p>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-white/20 rounded-xl p-3">
                <div className="text-2xl font-bold">{streak.longestStreak}</div>
                <div className="opacity-80">Best Streak</div>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <div className="text-2xl font-bold">{streak.totalDays}</div>
                <div className="opacity-80">Total Days</div>
              </div>
            </div>
            <button
              onClick={() => setShowStreakModal(false)}
              className="w-full py-3 bg-white text-orange-600 rounded-full font-bold uppercase"
            >
              Keep Going!
            </button>
          </motion.div>
        </div>
      )}

      {/* Collections Modal */}
      {showCollections && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-md w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-impact text-2xl uppercase text-[#007A5E]">
                  Collections
                </h2>
                <button
                  onClick={() => setShowCollections(false)}
                  className="text-white/40 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-3">
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => {
                      setSelectedCollection(collection);
                      setSelectedTopic(null);
                      setShowCollections(false);
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedCollection?.id === collection.id
                        ? "ring-2 ring-[#007A5E]"
                        : ""
                    }`}
                    style={{ backgroundColor: `${collection.color}20` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{collection.emoji}</span>
                      <div>
                        <span className="font-bold block">{collection.name}</span>
                        <span className="text-xs opacity-60">
                          {collection.description} • {collection.cardIds.length} cards
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Quiz Stats */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-bold text-sm uppercase text-white/60 mb-3">Quiz Stats</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xl font-bold text-[#007A5E]">{quizStats.totalAnswered}</div>
                    <div className="text-xs opacity-60">Answered</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xl font-bold text-[#007A5E]">{getAccuracyPercentage(quizStats)}%</div>
                    <div className="text-xs opacity-60">Accuracy</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xl font-bold text-[#007A5E]">{quizStats.bestStreak}</div>
                    <div className="text-xs opacity-60">Best Run</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuiz && quizQuestion && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#EACCD4] text-[#007A5E] rounded-2xl max-w-md w-full p-6"
          >
            <div className="text-center mb-4">
              <span className="text-4xl">🧠</span>
              <h2 className="font-impact text-2xl uppercase mt-2">Who Said This?</h2>
            </div>
            
            <blockquote className="text-lg italic border-l-4 border-[#007A5E] pl-4 mb-6">
              "{quizQuestion.quote}"
            </blockquote>
            
            {!quizAnswer ? (
              <div className="space-y-2">
                {quizQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuizAnswer(option)}
                    className="w-full p-4 rounded-xl bg-white/50 hover:bg-white/70 text-left font-bold transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center">
                {quizAnswer === quizQuestion.correctAuthor ? (
                  <div className="mb-4">
                    <div className="text-5xl mb-2">🎉</div>
                    <p className="font-bold text-xl">Correct!</p>
                    <p className="text-sm opacity-70">From "{quizQuestion.book}"</p>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="text-5xl mb-2">😅</div>
                    <p className="font-bold text-xl">Not quite!</p>
                    <p className="text-sm opacity-70">
                      It was {quizQuestion.correctAuthor} in "{quizQuestion.book}"
                    </p>
                  </div>
                )}
                <div className="text-sm mb-4">
                  Streak: {quizStats.streak} | Accuracy: {getAccuracyPercentage(quizStats)}%
                </div>
                <button
                  onClick={() => {
                    setShowQuiz(false);
                    setQuizAnswer(null);
                  }}
                  className="w-full py-3 bg-[#007A5E] text-[#EACCD4] rounded-full font-bold uppercase"
                >
                  Continue Reading
                </button>
              </div>
            )}
          </motion.div>
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
                      {selectedCollection && (
                        <span className="bg-white/80 text-[#007A5E] px-2 py-1 rounded-full text-xs font-bold">
                          {selectedCollection.emoji}
                        </span>
                      )}
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

                      {/* Deep Dive Button */}
                      <button
                        onClick={() => setShowDeepDive(true)}
                        className="text-sm text-[#007A5E]/60 hover:text-[#007A5E] mt-2 underline"
                      >
                        Learn more about this quote →
                      </button>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4">
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
                        <button
                          onClick={handleShare}
                          disabled={isSharing}
                          className="px-4 py-3 rounded-full border-2 border-[#007A5E] text-[#007A5E] hover:bg-[#007A5E] hover:text-[#EACCD4] transition-all"
                        >
                          {isSharing ? "..." : "📤"}
                        </button>
                        <button
                          onClick={handleCopy}
                          className="px-4 py-3 rounded-full border-2 border-[#007A5E] text-[#007A5E] hover:bg-[#007A5E] hover:text-[#EACCD4] transition-all relative"
                        >
                          📋
                          {showCopied && (
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                              Copied!
                            </span>
                          )}
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
                  <p className="text-lg mb-2">No cards in this selection</p>
                  <button
                    onClick={() => { setSelectedTopic(null); setSelectedCollection(null); }}
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

      {/* Deep Dive Modal */}
      {showDeepDive && currentCard && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#EACCD4] text-[#007A5E] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto"
          >
            <div className="p-6">
              <button
                onClick={() => setShowDeepDive(false)}
                className="absolute top-4 right-4 text-[#007A5E]/40 hover:text-[#007A5E] text-2xl"
              >
                ×
              </button>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#007A5E] text-[#EACCD4] px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {currentCard.topic[0]}
                </span>
                <span className="text-sm opacity-60">{currentCard.read_time_seconds}s read</span>
              </div>
              
              <h2 className="font-impact text-3xl uppercase mb-1">{currentCard.author}</h2>
              <p className="font-times italic text-xl mb-6 opacity-80">{currentCard.book}</p>
              
              <blockquote className="text-xl leading-relaxed mb-6 border-l-4 border-[#007A5E] pl-4">
                &ldquo;{currentCard.quote}&rdquo;
              </blockquote>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold uppercase text-sm mb-2">💡 Key Insight</h3>
                  <p className="opacity-80">{currentCard.insight}</p>
                </div>
                
                <div>
                  <h3 className="font-bold uppercase text-sm mb-2">📚 About the Book</h3>
                  <p className="opacity-80">
                    "{currentCard.book}" by {currentCard.author} is a foundational text in the {currentCard.topic[0]} space. 
                    This quote captures one of its central themes.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold uppercase text-sm mb-2">🔗 Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentCard.topic.map(t => (
                      <span key={t} className="bg-[#007A5E]/20 px-3 py-1 rounded-full text-sm capitalize">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => toggleSave(currentCard.id)}
                  className="flex-1 py-3 bg-[#007A5E] text-[#EACCD4] rounded-full font-bold uppercase"
                >
                  {savedCards.has(currentCard.id) ? "★ Saved" : "◆ Save This"}
                </button>
                <button
                  onClick={() => setShowDeepDive(false)}
                  className="px-6 py-3 border-2 border-[#007A5E] rounded-full font-bold uppercase"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Navigation Hints */}
      {!showSaved && !showTopicSelector && !showPaywall && !showQuiz && !showDeepDive && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-4 text-white/20 text-xs">
          <span>↑↓ Navigate</span>
          <span>•</span>
          <span>Double-tap to save</span>
          <span>•</span>
          <span>E to expand</span>
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
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-[#007A5E]">✓</span> Unlimited daily reads
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#007A5E]">✓</span> All collections access
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#007A5E]">✓</span> Quiz mode + stats
                  </li>
                </ul>
              </div>

              <Link
                href="/subscribe"
                className="block w-full py-4 bg-[#007A5E] text-[#EACCD4] rounded-full font-bold uppercase tracking-widest"
              >
                Subscribe Now
              </Link>
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
                  <h2 className="font-impact text-2xl uppercase mb-6">
                    Quick feedback
                  </h2>

                  <div className="space-y-2 mb-4">
                    {[
                      { value: "too_expensive", label: "💰 Too expensive" },
                      { value: "not_sure_value", label: "🤔 Not sure it's worth it" },
                      { value: "just_browsing", label: "👀 Just browsing" },
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
                        ? "bg-[#007A5E] text-[#EACCD4]"
                        : "bg-[#007A5E]/30 text-[#EACCD4]/50 cursor-not-allowed"
                    }`}
                  >
                    Submit
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="text-5xl mb-4">🙏</div>
                  <h2 className="font-impact text-2xl uppercase mb-2">Thanks!</h2>
                  <button
                    onClick={() => {
                      setShowFeedback(false);
                      setFeedbackReason(null);
                      setFeedbackOther("");
                      setFeedbackSubmitted(false);
                    }}
                    className="py-3 px-8 bg-[#007A5E] text-[#EACCD4] rounded-full font-bold uppercase"
                  >
                    Continue
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
