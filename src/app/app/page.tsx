"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { PanInfo } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import {
  contentLibrary,
  Card,
  shuffleCards,
  getCardsByTopic,
  getCardsByBook,
} from "@/lib/content-library";
import ReadingMode from "@/components/ReadingMode";
import { getStreakData, updateStreak, getStreakEmoji, getStreakMessage } from "@/lib/streak";
import { shareCard, copyQuote } from "@/lib/share";
import { generateQuizQuestion, updateQuizStats, getQuizStats, QuizQuestion } from "@/lib/quiz";
import { getCollectionCards, Collection } from "@/lib/collections";
import { recordCardRead, recordQuizResult, getDailyProgress, markDailyGoalCompleted, setDailyGoal as saveDailyGoal, setStreakFreeze as saveStreakFreeze, DailyProgress } from "@/lib/reading-stats";
import { incrementViewCount } from "@/lib/supabase";
import { getPinnedCards, pinCard, unpinCard } from "@/lib/pinned-cards";
import { sounds, haptic, getSoundEnabled, setSoundEnabled } from "@/lib/sounds";
import { celebrate } from "@/lib/confetti";
import { getDailyCard, isDailyCardDismissed, dismissDailyCard } from "@/lib/daily-card";
import { shouldShowInstallPrompt } from "@/lib/pwa";
import { addToReview, removeFromReview, getReviewStats } from "@/lib/spaced-repetition";

import { Preferences, StreakState } from "@/components/app/types";
import AppHeader from "@/components/app/AppHeader";
import StreakModal from "@/components/app/StreakModal";
import CollectionsModal from "@/components/app/CollectionsModal";
import BookFilterModal from "@/components/app/BookFilterModal";
import SettingsModal from "@/components/app/SettingsModal";
import ExpandedCardView from "@/components/app/ExpandedCardView";
import SavedCardsView from "@/components/app/SavedCardsView";
import CardFeed from "@/components/app/CardFeed";
import PinModal from "@/components/app/PinModal";
import InstallPrompt from "@/components/app/InstallPrompt";
import ReviewView from "@/components/app/ReviewView";
import { AnimatePresence } from "framer-motion";

const SWIPE_THRESHOLD = 100;
const VIEW_STORAGE_KEY = "bloomscroll_viewed_cards";
const SAVE_STORAGE_KEY = "bloomscroll_saved_cards";
const PREFERENCES_KEY = "bloomscroll_preferences";

export default function AppPage() {
  const { user, profile, isSubscribed, viewsRemaining, signOut, updateWallet } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCards, setSavedCards] = useState<Set<string>>(new Set());
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());
  const viewedCardsRef = useRef(viewedCards);
  viewedCardsRef.current = viewedCards;
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [direction, setDirection] = useState(0);
  const [feed, setFeed] = useState<Card[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [preferences, setPreferences] = useState<Preferences | null>(null);

  // Deep Dive / Expanded state
  const [isExpanded, setIsExpanded] = useState(false);

  // Streak state
  const [streak, setStreak] = useState<StreakState>({ currentStreak: 0, longestStreak: 0, totalDays: 0, lastVisitDate: "", streakFreezeActive: false, streakFreezeUsedDate: "" });
  const [showStreakModal, setShowStreakModal] = useState(false);

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizStats, setQuizStats] = useState(getQuizStats());

  // Animation states
  const [justSaved, setJustSaved] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Settings & modals
  const [showSettings, setShowSettings] = useState(false);
  const [showBookFilter, setShowBookFilter] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  // Daily progress (persisted)
  const [dailyProgress, setDailyProgress] = useState<DailyProgress>({ read: 0, goal: 5, completed: false });

  // Audio mode state
  const [audioMode, setAudioMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);

  // Reading mode state
  const [showReadingMode, setShowReadingMode] = useState(false);

  // Sound effects state
  const [soundEnabled, setSoundEnabledState] = useState(true);

  // Daily card state
  const [dailyCard, setDailyCard] = useState<Card | null>(null);

  // PWA install prompt state
  const [installEvent, setInstallEvent] = useState<Event | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Spaced repetition state
  const [showReview, setShowReview] = useState(false);
  const [reviewDueCount, setReviewDueCount] = useState(0);

  // Pin to garden state
  const [pinnedCards, setPinnedCards] = useState<Set<string>>(new Set());
  const [showPinModal, setShowPinModal] = useState(false);
  const [cardToPin, setCardToPin] = useState<Card | null>(null);

  // Load saved cards, viewed cards, and preferences from localStorage
  useEffect(() => {
    const savedJson = localStorage.getItem(SAVE_STORAGE_KEY);
    const viewedJson = localStorage.getItem(VIEW_STORAGE_KEY);
    const prefsJson = localStorage.getItem(PREFERENCES_KEY);

    if (savedJson) setSavedCards(new Set(JSON.parse(savedJson)));
    if (viewedJson) setViewedCards(new Set(JSON.parse(viewedJson)));
    if (prefsJson) setPreferences(JSON.parse(prefsJson));

    // Update streak on load
    const streakData = updateStreak();
    setStreak(streakData);

    // Show streak modal if it's a new day visit
    const lastShown = localStorage.getItem("bloomscroll_streak_shown");
    const today = new Date().toISOString().split("T")[0];
    if (lastShown !== today && streakData.currentStreak > 0) {
      setShowStreakModal(true);
      localStorage.setItem("bloomscroll_streak_shown", today);

      if (streakData.currentStreak === 3 || streakData.currentStreak === 7 ||
          streakData.currentStreak === 14 || streakData.currentStreak === 30 ||
          streakData.currentStreak % 30 === 0) {
        setTimeout(() => {
          celebrate();
          sounds.milestone();
        }, 300);
      }
    }

    setSoundEnabledState(getSoundEnabled());
    setQuizStats(getQuizStats());
    setDailyProgress(getDailyProgress());

    // Daily card
    if (!isDailyCardDismissed()) {
      setDailyCard(getDailyCard());
    }

    // Spaced repetition stats
    setReviewDueCount(getReviewStats().dueToday);

    setIsLoaded(true);
  }, []);

  // PWA beforeinstallprompt listener
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Show install prompt after viewing enough cards
  useEffect(() => {
    if (shouldShowInstallPrompt(dailyProgress.read)) {
      setShowInstallPrompt(true);
    }
  }, [dailyProgress.read]);

  // Load pinned cards on auth
  useEffect(() => {
    if (profile) {
      getPinnedCards(profile.id).then(pins =>
        setPinnedCards(new Set(pins.map(p => p.card_id)))
      );
    }
  }, [profile]);

  // Celebrate daily goal completion (fires once per day)
  useEffect(() => {
    if (dailyProgress.read >= dailyProgress.goal && !dailyProgress.completed) {
      markDailyGoalCompleted();
      setDailyProgress(prev => ({ ...prev, completed: true }));
      celebrate();
      sounds.milestone();
    }
  }, [dailyProgress.read, dailyProgress.goal, dailyProgress.completed]);

  // Generate smart feed
  useEffect(() => {
    if (!isLoaded) return;

    // Read viewedCards once at build time via ref to avoid re-triggering on every view
    const viewed = viewedCardsRef.current;

    let availableCards: Card[];

    if (selectedBook) {
      availableCards = getCardsByBook(selectedBook);
    } else if (selectedCollection) {
      availableCards = getCollectionCards(selectedCollection);
    } else if (selectedTopic) {
      availableCards = [...contentLibrary].filter(c => c.topic.includes(selectedTopic));
    } else {
      availableCards = [...contentLibrary];
    }

    if (!selectedTopic && !selectedCollection && preferences?.topics && preferences.topics.length > 0) {
      const preferredCards = availableCards.filter(card =>
        card.topic.some(t => preferences.topics.includes(t))
      );
      const otherCards = availableCards.filter(card =>
        !card.topic.some(t => preferences.topics.includes(t))
      );
      const smartFeed = [
        ...shuffleCards(preferredCards.filter(c => !viewed.has(c.id))),
        ...shuffleCards(otherCards.filter(c => !viewed.has(c.id))),
        ...shuffleCards(preferredCards.filter(c => viewed.has(c.id))),
        ...shuffleCards(otherCards.filter(c => viewed.has(c.id))),
      ];
      setFeed(smartFeed);
    } else {
      const unseenCards = availableCards.filter(card => !viewed.has(card.id));
      const seenCards = availableCards.filter(card => viewed.has(card.id));
      setFeed([...shuffleCards(unseenCards), ...shuffleCards(seenCards)]);
    }

    setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopic, selectedCollection, selectedBook, isLoaded, preferences]);

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
      const viewed = viewedCardsRef.current;
      if (!viewed.has(card.id)) {
        const newViewed = new Set(viewed);
        newViewed.add(card.id);
        setViewedCards(newViewed);
        localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify([...newViewed]));
        recordCardRead(card.id, card.topic);
        if (profile && !isSubscribed) {
          incrementViewCount(profile.id);
        }
        setDailyProgress(getDailyProgress());
      }
    }
  }, [currentIndex, feed, isLoaded]);

  const currentCard = feed[currentIndex];

  const goToNext = useCallback(() => {
    if (currentIndex < feed.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
      setIsExpanded(false);
      sounds.swipe();
      haptic("light");
    }
  }, [currentIndex, feed.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
      setIsExpanded(false);
      sounds.swipe();
      haptic("light");
    }
  }, [currentIndex]);

  // Audio mode: speak quote
  const speakQuote = useCallback((card: Card) => {
    if (!card || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const text = `${card.quote}. By ${card.author}, from ${card.book}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (autoScroll) {
        setTimeout(() => goToNext(), 1500);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [autoScroll, goToNext]);

  useEffect(() => {
    if (audioMode && currentCard && isLoaded) speakQuote(currentCard);
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [currentIndex, audioMode, currentCard, isLoaded, speakQuote]);

  useEffect(() => {
    if (!audioMode && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [audioMode]);

  // Auto-scroll without audio
  useEffect(() => {
    if (!autoScroll || audioMode || !isLoaded) return;
    const timer = setTimeout(() => goToNext(), 5000);
    return () => clearTimeout(timer);
  }, [autoScroll, audioMode, currentIndex, isLoaded, goToNext]);

  const toggleAudioMode = () => {
    if (audioMode) {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setAudioMode(false);
    } else {
      setAudioMode(true);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -SWIPE_THRESHOLD) goToNext();
    else if (info.offset.y > SWIPE_THRESHOLD) goToPrev();
  };

  const toggleSave = (cardId: string) => {
    setSavedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
        removeFromReview(cardId);
      } else {
        newSet.add(cardId);
        addToReview(cardId);
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 600);
        sounds.save();
        haptic("medium");
      }
      setReviewDueCount(getReviewStats().dueToday);
      return newSet;
    });
  };

  const handleDoubleTap = () => {
    if (currentCard) toggleSave(currentCard.id);
  };

  // Pin to garden handlers
  const handlePinCard = (cardId: string) => {
    if (!profile) return;
    const card = feed.find(c => c.id === cardId) || currentCard;
    if (!card) return;
    setCardToPin(card);
    setShowPinModal(true);
  };

  const handleConfirmPin = async (note: string) => {
    if (!cardToPin || !profile) return;
    await pinCard(profile.id, cardToPin.id, note || undefined);
    setPinnedCards(prev => new Set([...prev, cardToPin.id]));
    setShowPinModal(false);
    setCardToPin(null);
    sounds.save();
    haptic("medium");
  };

  const handleUnpin = async (cardId: string) => {
    if (!profile) return;
    await unpinCard(profile.id, cardId);
    setPinnedCards(prev => {
      const s = new Set(prev);
      s.delete(cardId);
      return s;
    });
  };

  // Derive ref username for share attribution
  const refUsername = profile?.fc_username || user?.email?.split("@")[0] || undefined;

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentCard || isSharing) return;
    setIsSharing(true);
    try {
      await shareCard(currentCard, refUsername);
    } finally {
      setTimeout(() => setIsSharing(false), 500);
    }
  };

  const handleCopy = () => {
    if (!currentCard) return;
    copyQuote(currentCard, refUsername);
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
    recordQuizResult(correct);
  };

  const handleDismissDailyCard = () => {
    dismissDailyCard();
    setDailyCard(null);
  };

  const handleShareDailyCard = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dailyCard) return;
    await shareCard(dailyCard, refUsername);
  };

  const handleSaveWallet = async (address: string): Promise<boolean> => {
    return await updateWallet(address);
  };

  const handleSetDailyGoal = (goal: number) => {
    saveDailyGoal(goal);
    setDailyProgress(getDailyProgress());
  };

  const handleSetStreakFreeze = (active: boolean) => {
    saveStreakFreeze(active);
    setStreak(prev => ({ ...prev, streakFreezeActive: active }));
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
        setIsExpanded(false);
        setShowCollections(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, currentCard, showQuiz, isExpanded]);

  const savedCardsList = contentLibrary.filter(card => savedCards.has(card.id));

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#102219] to-[#0a1610] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🌱</div>
          <div className="text-2xl font-bold text-primary">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#102219] to-[#0a1610] text-white overflow-hidden">
      <AppHeader
        user={user}
        profile={profile}
        isSubscribed={isSubscribed}
        streak={streak}
        savedCount={savedCards.size}
        showSaved={showSaved}
        showUserMenu={showUserMenu}
        reviewDueCount={reviewDueCount}
        onToggleSaved={() => setShowSaved(!showSaved)}
        onToggleUserMenu={() => setShowUserMenu(!showUserMenu)}
        onShowStreakModal={() => setShowStreakModal(true)}
        onShowBookFilter={() => setShowBookFilter(true)}
        onShowCollections={() => setShowCollections(true)}
        onShowSettings={() => setShowSettings(true)}
        onShowReview={() => setShowReview(true)}
        onSignOut={signOut}
      />

      {showStreakModal && (
        <StreakModal
          streak={streak}
          dailyProgress={dailyProgress}
          onClose={() => setShowStreakModal(false)}
        />
      )}

      {showCollections && (
        <CollectionsModal
          onSelect={(collection) => {
            setSelectedCollection(collection);
            setSelectedTopic(null);
            setShowCollections(false);
          }}
          onClose={() => setShowCollections(false)}
        />
      )}

      {showSaved ? (
        <SavedCardsView cards={savedCardsList} onRemove={toggleSave} />
      ) : (
        <CardFeed
          currentCard={currentCard}
          direction={direction}
          savedCards={savedCards}
          pinnedCards={pinnedCards}
          justSaved={justSaved}
          showCopied={showCopied}
          isSharing={isSharing}
          audioMode={audioMode}
          isSpeaking={isSpeaking}
          autoScroll={autoScroll}
          dailyProgress={dailyProgress}
          feedLength={feed.length}
          hasChapter={!!currentCard?.chapter}
          dailyCard={dailyCard}
          onDismissDailyCard={handleDismissDailyCard}
          onShareDailyCard={handleShareDailyCard}
          onDragEnd={handleDragEnd}
          onDoubleTap={handleDoubleTap}
          onToggleSave={toggleSave}
          onPin={handlePinCard}
          onUnpin={handleUnpin}
          onShare={handleShare}
          onCopy={handleCopy}
          onExpand={() => setIsExpanded(true)}
          onReadingMode={() => setShowReadingMode(true)}
          onToggleAudio={toggleAudioMode}
          onToggleAutoScroll={() => setAutoScroll(!autoScroll)}
          onClearFilters={() => { setSelectedTopic(null); setSelectedCollection(null); }}
        />
      )}

      <AnimatePresence>
        {isExpanded && currentCard && (
          <ExpandedCardView
            card={currentCard}
            isSaved={savedCards.has(currentCard.id)}
            isPinned={pinnedCards.has(currentCard.id)}
            onToggleSave={() => toggleSave(currentCard.id)}
            onPin={handlePinCard}
            onUnpin={handleUnpin}
            onClose={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPinModal && cardToPin && (
          <PinModal
            card={cardToPin}
            onConfirm={handleConfirmPin}
            onClose={() => { setShowPinModal(false); setCardToPin(null); }}
          />
        )}
      </AnimatePresence>

      {showSettings && (
        <SettingsModal
          user={user}
          profile={profile}
          isSubscribed={isSubscribed}
          streak={streak}
          viewedCount={viewedCards.size}
          savedCount={savedCards.size}
          dailyGoal={dailyProgress.goal}
          onSetDailyGoal={handleSetDailyGoal}
          onSetStreakFreeze={handleSetStreakFreeze}
          onSaveWallet={handleSaveWallet}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showBookFilter && (
        <BookFilterModal
          selectedBook={selectedBook}
          isSubscribed={isSubscribed}
          onSelect={setSelectedBook}
          onClose={() => setShowBookFilter(false)}
        />
      )}

      {currentCard && (
        <ReadingMode
          card={currentCard}
          isOpen={showReadingMode}
          onClose={() => setShowReadingMode(false)}
          isSubscribed={isSubscribed}
          onUpgrade={() => {
            setShowReadingMode(false);
            window.location.href = "/subscribe";
          }}
        />
      )}

      <AnimatePresence>
        {showInstallPrompt && (
          <InstallPrompt
            installEvent={installEvent}
            onClose={() => setShowInstallPrompt(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReview && (
          <ReviewView
            isSubscribed={isSubscribed}
            onClose={() => {
              setShowReview(false);
              setReviewDueCount(getReviewStats().dueToday);
            }}
            onUpgrade={() => {
              setShowReview(false);
              window.location.href = "/subscribe";
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
