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
  getTopicCounts,
  getAllBooks,
  getCardsByBook,
  Genre,
  FREE_GENRES,
  PREMIUM_GENRES
} from "@/lib/content-library";
import ReadingMode from "@/components/ReadingMode";
import { getStreakData, updateStreak, getStreakEmoji, getStreakMessage } from "@/lib/streak";
import { shareCard, copyQuote } from "@/lib/share";
import { generateQuizQuestion, updateQuizStats, getQuizStats, getAccuracyPercentage, QuizQuestion } from "@/lib/quiz";
import { collections, getCollectionCards, Collection } from "@/lib/collections";
import { recordCardRead, recordQuizResult } from "@/lib/reading-stats";
import { sounds, haptic, getSoundEnabled, setSoundEnabled } from "@/lib/sounds";
import { celebrate } from "@/lib/confetti";

const SWIPE_THRESHOLD = 100;
const VIEW_STORAGE_KEY = "bloomscroll_viewed_cards";
const SAVE_STORAGE_KEY = "bloomscroll_saved_cards";
const PREFERENCES_KEY = "bloomscroll_preferences";
const CARDS_UNTIL_QUIZ = 10;

interface Preferences {
  topics: string[];
  goals: string[];
  completedAt: string;
}

// Topic icons for visual appeal
const topicIcons: Record<string, string> = {
  philosophy: "🏛️",
  stoicism: "🗿",
  psychology: "🧠",
  business: "📈",
  science: "🔬",
  history: "📜",
  productivity: "⚡",
  creativity: "✨",
  mindfulness: "🧘",
  leadership: "👑",
  finance: "💰",
  relationships: "💝",
  health: "🌱",
  technology: "💻",
  spirituality: "✨",
};

export default function AppPage() {
  const { user, profile, isSubscribed, viewsRemaining, signOut, updateWallet } = useAuth();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCards, setSavedCards] = useState<Set<string>>(new Set());
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [showTopicFilter, setShowTopicFilter] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [direction, setDirection] = useState(0);
  const [feed, setFeed] = useState<Card[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  
  // Deep Dive / Expanded state
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Streak state
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0, totalDays: 0, lastVisitDate: "" });
  const [showStreakModal, setShowStreakModal] = useState(false);
  
  // Quiz state
  const [cardsViewedSinceQuiz, setCardsViewedSinceQuiz] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizStats, setQuizStats] = useState(getQuizStats());
  
  // Animation states
  const [justSaved, setJustSaved] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  // Settings
  const [showSettings, setShowSettings] = useState(false);
  const [walletInput, setWalletInput] = useState("");
  const [walletSaving, setWalletSaving] = useState(false);
  const [walletSaved, setWalletSaved] = useState(false);

  // Session stats
  const [sessionCardsViewed, setSessionCardsViewed] = useState(0);

  // Audio mode state
  const [audioMode, setAudioMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Auto-scroll state (separate from audio)
  const [autoScroll, setAutoScroll] = useState(false);

  // Reading mode state
  const [showReadingMode, setShowReadingMode] = useState(false);
  
  // Book filter state
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [showBookFilter, setShowBookFilter] = useState(false);

  // Sound effects state
  const [soundEnabled, setSoundEnabledState] = useState(true);

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
      
      // Celebrate streak milestones with confetti!
      if (streakData.currentStreak === 3 || streakData.currentStreak === 7 || 
          streakData.currentStreak === 14 || streakData.currentStreak === 30 ||
          streakData.currentStreak % 30 === 0) {
        setTimeout(() => {
          celebrate();
          sounds.milestone();
        }, 300);
      }
    }
    
    // Load sound preference
    setSoundEnabledState(getSoundEnabled());
    
    setQuizStats(getQuizStats());
    setIsLoaded(true);
  }, []);

  // Generate smart feed
  useEffect(() => {
    if (!isLoaded) return;

    let availableCards: Card[];
    
    if (selectedBook) {
      // Book filter takes priority (premium feature)
      availableCards = getCardsByBook(selectedBook);
    } else if (selectedCollection) {
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
  }, [selectedTopic, selectedCollection, selectedBook, isLoaded, viewedCards, preferences]);

  // Save to localStorage when savedCards changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify([...savedCards]));
    }
  }, [savedCards, isLoaded]);

  // Mark card as viewed when displayed
  useEffect(() => {
    if (feed[currentIndex] && isLoaded) {
      const card = feed[currentIndex];
      const cardId = card.id;
      if (!viewedCards.has(cardId)) {
        const newViewed = new Set(viewedCards);
        newViewed.add(cardId);
        setViewedCards(newViewed);
        localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify([...newViewed]));
        setSessionCardsViewed(prev => prev + 1);
        
        // Track reading stats
        recordCardRead(cardId, card.topic);
        
        // Quiz mode disabled for now
        // const newCount = cardsViewedSinceQuiz + 1;
        // setCardsViewedSinceQuiz(newCount);
        // if (newCount >= CARDS_UNTIL_QUIZ) {
        //   setQuizQuestion(generateQuizQuestion());
        //   setShowQuiz(true);
        //   setCardsViewedSinceQuiz(0);
        // }
      }
    }
  }, [currentIndex, feed, isLoaded]);

  const currentCard = feed[currentIndex];

  const goToNext = useCallback(() => {
    if (currentIndex < feed.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setIsExpanded(false);
      sounds.swipe();
      haptic("light");
    }
  }, [currentIndex, feed.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setIsExpanded(false);
      sounds.swipe();
      haptic("light");
    }
  }, [currentIndex]);

  // Audio mode: speak quote (auto-advance only if autoScroll is on)
  const speakQuote = useCallback((card: Card) => {
    if (!card || typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const text = `${card.quote}. By ${card.author}, from ${card.book}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      // Only auto-advance if autoScroll is enabled
      if (autoScroll) {
        setTimeout(() => {
          goToNext();
        }, 1500);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [autoScroll, goToNext]);

  // Auto-speak when card changes in audio mode
  useEffect(() => {
    if (audioMode && currentCard && isLoaded) {
      speakQuote(currentCard);
    }
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentIndex, audioMode, currentCard, isLoaded, speakQuote]);

  // Stop speech when audio mode is turned off
  useEffect(() => {
    if (!audioMode && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [audioMode]);

  // Auto-scroll without audio (timer-based, 5 seconds per card)
  useEffect(() => {
    if (!autoScroll || audioMode || !isLoaded) return; // Skip if audio handles it
    
    const timer = setTimeout(() => {
      goToNext();
    }, 5000); // 5 seconds per card when just auto-scrolling
    
    return () => clearTimeout(timer);
  }, [autoScroll, audioMode, currentIndex, isLoaded, goToNext]);

  const toggleAudioMode = () => {
    if (audioMode) {
      // Turn off - stop speech
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setAudioMode(false);
    } else {
      // Turn on - start speaking current card
      setAudioMode(true);
    }
  };

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
        // Trigger save animation and sound
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 600);
        sounds.save();
        haptic("medium");
      }
      return newSet;
    });
  };

  const handleDoubleTap = () => {
    if (currentCard) {
      toggleSave(currentCard.id);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentCard || isSharing) return;
    setIsSharing(true);
    try {
      await shareCard(currentCard);
    } finally {
      // Small delay before allowing another share
      setTimeout(() => setIsSharing(false), 500);
    }
  };

  const handleCopy = () => {
    if (!currentCard) return;
    copyQuote(currentCard);
    setShowCopied(true);
    sounds.copy();
    haptic("light");
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswer(answer);
    const correct = answer === quizQuestion?.correctAuthor;
    const newStats = updateQuizStats(correct);
    setQuizStats(newStats);
    // Track in reading stats
    recordQuizResult(correct);
  };

  const handleSaveWallet = async () => {
    if (!walletInput.trim()) return;
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletInput.trim())) {
      alert("Please enter a valid Ethereum address (0x...)");
      return;
    }
    setWalletSaving(true);
    const success = await updateWallet(walletInput.trim());
    setWalletSaving(false);
    if (success) {
      setWalletSaved(true);
      setTimeout(() => setWalletSaved(false), 2000);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showQuiz || isExpanded) return;
      if (e.key === "ArrowDown" || e.key === "j") goToNext();
      if (e.key === "ArrowUp" || e.key === "k") goToPrev();
      if (e.key === "s" && currentCard) toggleSave(currentCard.id);
      if (e.key === " " && currentCard) {
        e.preventDefault();
        setIsExpanded(true);
      }
      if (e.key === "Escape") {
        setShowSaved(false);
        setShowTopicFilter(false);
        setIsExpanded(false);
        setShowCollections(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, currentCard, showQuiz, isExpanded]);

  const savedCardsList = contentLibrary.filter((card) => savedCards.has(card.id));

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-5xl mb-4">🌱</div>
          <div className="font-impact text-2xl text-[#007A5E]">Loading...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] text-white overflow-hidden">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-md">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🌱</span>
            <span className="font-impact text-lg uppercase tracking-tight text-[#007A5E]">
              Bloom
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            {/* Streak */}
            <button
              onClick={() => setShowStreakModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30"
            >
              <span>{getStreakEmoji(streak.currentStreak)}</span>
              <span className="text-sm font-bold text-orange-400">{streak.currentStreak}</span>
            </button>
            
            {/* Saved */}
            <button
              onClick={() => setShowSaved(!showSaved)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all ${
                showSaved
                  ? "bg-[#007A5E] text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <span>★</span>
              <span className="text-sm font-bold">{savedCards.size}</span>
            </button>

            {/* Login button - shown when not authenticated */}
            {!user && !profile && (
              <Link
                href="/auth?redirect=/app"
                className="px-3 py-1.5 rounded-full bg-[#007A5E] text-white text-sm font-bold hover:bg-[#005a46] transition-all"
              >
                Login
              </Link>
            )}
            
            {/* Menu - shown when authenticated */}
            {(user || profile) && (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <span className="text-sm">☰</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* User Menu Dropdown */}
      {showUserMenu && (
        <div className="fixed top-16 right-4 z-50 bg-[#1f1f1f] border border-white/10 rounded-xl p-2 min-w-[180px] shadow-2xl">
          {user || profile ? (
            <>
              <div className="px-3 py-2 text-xs text-white/40 truncate border-b border-white/10 mb-2">
                {user?.email || profile?.fc_username || "User"}
              </div>
              <Link
                href="/profile"
                onClick={() => setShowUserMenu(false)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg flex items-center gap-2"
              >
                📊 My Stats
              </Link>
              <button
                onClick={() => { setShowBookFilter(true); setShowUserMenu(false); }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg flex items-center gap-2"
              >
                📚 Browse Books {!isSubscribed && "🔒"}
              </button>
              <button
                onClick={() => { setShowCollections(true); setShowUserMenu(false); }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg flex items-center gap-2"
              >
                📚 Collections
              </button>
              <Link
                href="/notifications"
                onClick={() => setShowUserMenu(false)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg flex items-center gap-2"
              >
                🔔 Reminders
              </Link>
              <button
                onClick={() => { setShowSettings(true); setShowUserMenu(false); }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg flex items-center gap-2"
              >
                ⚙️ Settings
              </button>
              <button
                onClick={() => { signOut(); setShowUserMenu(false); }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg text-white/50"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <div className="px-3 py-2 text-xs text-white/40 border-b border-white/10 mb-2">
                Not signed in
              </div>
              <Link
                href="/auth?redirect=/app"
                className="block px-3 py-2 text-sm hover:bg-white/10 rounded-lg text-[#4D9E8A] font-medium"
                onClick={() => setShowUserMenu(false)}
              >
                ✨ Sign in
              </Link>
              <div className="px-3 py-2 text-xs text-white/30">
                Sync saves across devices
              </div>
              <button
                onClick={() => { setShowCollections(true); setShowUserMenu(false); }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg flex items-center gap-2 text-white/60"
              >
                📚 Collections
              </button>
            </>
          )}
        </div>
      )}

      {/* Streak Modal */}
      {showStreakModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setShowStreakModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl max-w-sm w-full p-6 text-center text-white"
          >
            <div className="text-6xl mb-4">{getStreakEmoji(streak.currentStreak)}</div>
            <h2 className="font-impact text-4xl uppercase mb-2">
              {streak.currentStreak} Day{streak.currentStreak !== 1 ? 's' : ''}!
            </h2>
            <p className="text-lg opacity-90 mb-6">{getStreakMessage(streak.currentStreak)}</p>
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="bg-white/20 rounded-xl p-3">
                <div className="text-2xl font-bold">{streak.longestStreak}</div>
                <div className="text-xs opacity-80">Best</div>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <div className="text-2xl font-bold">{savedCards.size}</div>
                <div className="text-xs opacity-80">Saved</div>
              </div>
            </div>
            <button
              onClick={() => setShowStreakModal(false)}
              className="w-full py-3 bg-white text-orange-600 rounded-full font-bold uppercase"
            >
              Keep Growing 🌱
            </button>
          </motion.div>
        </div>
      )}

      {/* Collections Modal */}
      {showCollections && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setShowCollections(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1f1f1f] border border-white/10 rounded-2xl max-w-md w-full max-h-[80vh] overflow-auto"
          >
            <div className="p-6">
              <h2 className="font-bold text-xl mb-4">Collections</h2>
              <div className="space-y-3">
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => {
                      setSelectedCollection(collection);
                      setSelectedTopic(null);
                      setShowCollections(false);
                    }}
                    className="w-full p-4 rounded-xl text-left transition-all bg-white/5 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{collection.emoji}</span>
                      <div>
                        <span className="font-bold block">{collection.name}</span>
                        <span className="text-xs text-white/50">{collection.description}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Quiz Modal - Disabled for now */}
      {/* {showQuiz && quizQuestion && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          ...quiz content...
        </div>
      )} */}

      {/* Main Content */}
      {showSaved ? (
        // Saved Cards View
        <div className="pt-16 pb-20 px-4 max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl">Your Library</h2>
            <span className="text-white/40 text-sm">{savedCardsList.length} saved</span>
          </div>
          {savedCardsList.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              <p className="text-4xl mb-4">📚</p>
              <p className="text-lg mb-2">No saved cards yet</p>
              <p className="text-sm">Double-tap to save cards you love</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedCardsList.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-[#EACCD4]/10 to-[#EACCD4]/5 border border-[#007A5E]/20 rounded-xl p-4"
                >
                  <p className="text-sm text-white/80 italic mb-2 line-clamp-2">"{card.quote}"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">— {card.author}</span>
                    <button
                      onClick={() => toggleSave(card.id)}
                      className="text-xs text-red-400/70 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Main Feed
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
                    opacity: { duration: 0.3 }
                  }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.1}
                  onDragEnd={handleDragEnd}
                  onDoubleClick={handleDoubleTap}
                  className="absolute inset-0 flex flex-col cursor-grab active:cursor-grabbing p-1"
                  style={{ perspective: 1000 }}
                >
                  {/* Card - Clean quote-focused design */}
                  <div className="flex-1 bg-gradient-to-b from-[#EACCD4] to-[#e0bfc8] text-[#007A5E] rounded-2xl overflow-hidden flex flex-col relative shadow-2xl">
                    
                    {/* Content */}
                    <div className="relative flex-1 p-6 sm:p-8 flex flex-col">
                      
                      {/* Saved indicator (top right) */}
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

                      {/* THE QUOTE - Big and centered */}
                      <div className="flex-1 flex items-center justify-center">
                        <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif leading-relaxed text-center">
                          <span className="text-[#007A5E]/30 text-4xl">"</span>
                          <span>{currentCard.quote}</span>
                          <span className="text-[#007A5E]/30 text-4xl">"</span>
                        </blockquote>
                      </div>

                      {/* Author */}
                      <div className="text-center mb-4 mt-4">
                        <p className="font-bold text-2xl tracking-wide">
                          {currentCard.author}
                        </p>
                        <p className="text-lg text-[#007A5E]/70 italic">
                          {currentCard.book}
                        </p>
                      </div>

                      {/* Insight - Smaller, secondary */}
                      <p className="text-sm text-[#007A5E]/70 leading-relaxed text-center mb-4">
                        {currentCard.insight}
                      </p>

                      {/* Bottom row: Info + Audio left, Actions right */}
                      <div className="flex items-center justify-between mt-auto">
                        {/* Left buttons: Info + Read + Audio */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsExpanded(true)}
                            className="w-10 h-10 rounded-full bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#007A5E]/20 transition-all flex items-center justify-center text-lg"
                            title="Quick insight"
                          >
                            ℹ️
                          </button>
                          
                          {/* Reading mode - full chapter */}
                          <button
                            onClick={() => setShowReadingMode(true)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                              currentCard.chapter
                                ? "bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#007A5E]/20"
                                : "bg-[#007A5E]/5 text-[#007A5E]/40"
                            }`}
                            title={currentCard.chapter ? "Read chapter" : "Chapter coming soon"}
                          >
                            📖
                          </button>
                          
                          {/* Audio mode toggle */}
                          <button
                            onClick={toggleAudioMode}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                              audioMode
                                ? "bg-[#007A5E] text-white"
                                : "bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#007A5E]/20"
                            }`}
                            title={audioMode ? "Stop audio" : "Read aloud"}
                          >
                            {isSpeaking ? "🔊" : audioMode ? "🔈" : "🔇"}
                          </button>
                          
                          {/* Auto-scroll toggle */}
                          <button
                            onClick={() => setAutoScroll(!autoScroll)}
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
                        
                        {/* Action buttons - right */}
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => toggleSave(currentCard.id)}
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
                            onClick={(e) => handleShare(e)}
                            disabled={isSharing}
                            className="w-10 h-10 rounded-full bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#007A5E]/20 transition-all flex items-center justify-center text-lg disabled:opacity-50"
                            title="Share"
                          >
                            {isSharing ? "⏳" : "↗"}
                          </button>
                          
                          <button
                            onClick={handleCopy}
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

                  {/* Progress - Meaningful, not just numbers */}
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

      {/* Expanded Card / Deep Dive */}
      <AnimatePresence>
        {isExpanded && currentCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 overflow-auto"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg mx-auto p-6 pt-16"
            >
              {/* Close hint */}
              <div className="text-center mb-8">
                <span className="text-white/30 text-sm">Tap outside or swipe down to close</span>
              </div>

              {/* Full Quote */}
              <blockquote className="text-2xl sm:text-3xl font-serif text-white leading-relaxed mb-8">
                "{currentCard.quote}"
              </blockquote>

              {/* Author */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <p className="font-bold text-lg text-[#007A5E]">{currentCard.author}</p>
                <p className="text-white/50 italic">{currentCard.book}</p>
              </div>

              {/* Key Insight */}
              <div className="mb-8">
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#007A5E] mb-3">💡 Key Insight</h3>
                <p className="text-white/80 leading-relaxed">{currentCard.insight}</p>
              </div>

              {/* Related Topics */}
              <div className="mb-8">
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#007A5E] mb-3">🏷️ Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {currentCard.topic.map(t => (
                    <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm capitalize">
                      {topicIcons[t]} {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reflection Prompt */}
              <div className="mb-8 p-4 rounded-xl bg-[#007A5E]/10 border border-[#007A5E]/20">
                <h3 className="font-bold text-sm text-[#007A5E] mb-2">🤔 Reflect</h3>
                <p className="text-white/60 text-sm italic">How might you apply this wisdom today?</p>
              </div>

              {/* Action - small icons, right aligned */}
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => toggleSave(currentCard.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                    savedCards.has(currentCard.id)
                      ? "bg-[#007A5E] text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  title={savedCards.has(currentCard.id) ? "Saved" : "Save"}
                >
                  {savedCards.has(currentCard.id) ? "★" : "☆"}
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center text-lg"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowSettings(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1f1f1f] border border-white/10 rounded-2xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-xl">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-white/40 hover:text-white text-2xl">×</button>
            </div>

            {/* Account */}
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Account</h3>
              <div className="bg-white/5 rounded-xl p-4 space-y-2">
                {user?.email && <p className="text-sm"><span className="text-white/40">Email:</span> {user.email}</p>}
                {profile?.fc_username && <p className="text-sm"><span className="text-white/40">Farcaster:</span> @{profile.fc_username}</p>}
                <p className="text-sm">
                  <span className="text-white/40">Status:</span>{" "}
                  <span className={isSubscribed ? "text-[#007A5E] font-bold" : ""}>{isSubscribed ? "Pro ⭐" : "Free"}</span>
                </p>
              </div>
            </div>

            {/* Sound Effects */}
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Preferences</h3>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Sound Effects</p>
                    <p className="text-xs text-white/40">Swipe, save, and milestone sounds</p>
                  </div>
                  <button
                    onClick={() => {
                      const newValue = !soundEnabled;
                      setSoundEnabledState(newValue);
                      setSoundEnabled(newValue);
                      if (newValue) sounds.save(); // Play test sound
                    }}
                    className={`w-12 h-7 rounded-full transition-all relative ${
                      soundEnabled ? 'bg-[#007A5E]' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
                      soundEnabled ? 'right-1' : 'left-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Wallet */}
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Wallet Address</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={walletInput}
                  onChange={(e) => setWalletInput(e.target.value)}
                  placeholder="0x..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 text-white placeholder-white/30 text-sm font-mono border border-white/10 focus:border-[#007A5E]/50 outline-none"
                />
                <button
                  onClick={handleSaveWallet}
                  disabled={walletSaving}
                  className="px-4 py-3 bg-[#007A5E] rounded-xl font-bold text-sm disabled:opacity-50"
                >
                  {walletSaving ? "..." : walletSaved ? "✓" : "Save"}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Your Stats</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[#007A5E]">{streak.currentStreak}</div>
                  <div className="text-xs text-white/40">Streak</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[#007A5E]">{viewedCards.size}</div>
                  <div className="text-xs text-white/40">Read</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[#007A5E]">{savedCards.size}</div>
                  <div className="text-xs text-white/40">Saved</div>
                </div>
              </div>
              <Link
                href="/profile"
                className="mt-3 block text-center text-sm text-[#007A5E] hover:underline"
                onClick={() => setShowSettings(false)}
              >
                View full stats →
              </Link>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="w-full py-3 bg-white/10 rounded-full font-medium"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}

      {/* Book Filter Modal */}
      {showBookFilter && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowBookFilter(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1f1f1f] border border-white/10 rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl">📚 Browse by Book</h2>
                <button onClick={() => setShowBookFilter(false)} className="text-white/40 hover:text-white text-2xl">×</button>
              </div>
              <p className="text-sm text-white/50 mt-2">
                {isSubscribed ? "Select a book to read all its quotes" : "🔒 Pro feature — Upgrade to browse by book"}
              </p>
            </div>
            <div className="overflow-y-auto max-h-[60vh] p-4">
              {!isSubscribed ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🔒</div>
                  <p className="text-white/60 mb-4">Unlock book browsing with Pro</p>
                  <Link
                    href="/subscribe"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full font-bold text-black"
                  >
                    Upgrade to Pro
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => { setSelectedBook(null); setShowBookFilter(false); }}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      !selectedBook ? "bg-[#007A5E] text-white" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span className="font-bold">All Books</span>
                    <span className="text-sm opacity-60 ml-2">({contentLibrary.length} cards)</span>
                  </button>
                  {getAllBooks().slice(0, 50).map(({ book, author, count }) => (
                    <button
                      key={book}
                      onClick={() => { setSelectedBook(book); setShowBookFilter(false); }}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        selectedBook === book ? "bg-[#007A5E] text-white" : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span className="font-bold block">{book}</span>
                      <span className="text-sm opacity-60">{author} · {count} quotes</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Reading Mode */}
      {currentCard && (
        <ReadingMode
          card={currentCard}
          isOpen={showReadingMode}
          onClose={() => setShowReadingMode(false)}
          isSubscribed={isSubscribed}
          onUpgrade={() => {
            setShowReadingMode(false);
            window.location.href = '/subscribe';
          }}
        />
      )}
    </div>
  );
}
