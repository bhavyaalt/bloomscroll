"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PanInfo } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import {
  contentLibrary,
  Card,
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
import { getAchievementState, checkAchievements, getLevelInfo, Achievement } from "@/lib/achievements";
import { syncStatsToProfile } from "@/lib/social";
import { getAudioAsCards } from "@/lib/audio-content";
import {
  ALL_LEARNING_TRACKS_ID,
  getLearningCardsByTrack,
  getLearningTrackById,
  learningCards,
} from "@/lib/learning-cards";
import { allCards } from "@/lib/card-resolver";

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
import AchievementsModal from "@/components/app/AchievementsModal";
import LeaderboardModal from "@/components/app/LeaderboardModal";
import { AnimatePresence } from "framer-motion";
import { useNotifications } from "@/components/NotificationProvider";
import ProUpsellModal from "@/components/app/ProUpsellModal";
import { trackGrowthEvent } from "@/lib/analytics";
import LearningTracksModal from "@/components/app/LearningTracksModal";

const SWIPE_THRESHOLD = 100;
const VIEW_STORAGE_KEY = "bloomscroll_viewed_cards";
const SAVE_STORAGE_KEY = "bloomscroll_saved_cards";
const PREFERENCES_KEY = "bloomscroll_preferences";
const DAILY_VIEW_STORAGE_KEY = "bloomscroll_daily_viewed_cards";
const FREE_DAILY_READ_LIMIT = 15;
const FREE_ASSIST_MODE_PREVIEW_LIMIT = 5;
const FREE_SAVE_LIMIT = 10;
const FREE_PIN_LIMIT = 3;
const CARD_VIEW_DWELL_MS = 1200;

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function stableHash(input: string) {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

function deterministicShuffle(cards: Card[], seed: string): Card[] {
  return [...cards].sort((a, b) => {
    const aScore = stableHash(`${seed}:${a.id}`);
    const bScore = stableHash(`${seed}:${b.id}`);
    return aScore - bScore;
  });
}

function getDailyViewedCardIds() {
  if (typeof window === "undefined") return new Set<string>();

  try {
    const stored = localStorage.getItem(DAILY_VIEW_STORAGE_KEY);
    if (!stored) return new Set<string>();

    const parsed = JSON.parse(stored) as { date?: string; cardIds?: string[] };
    if (parsed.date !== getTodayKey()) return new Set<string>();
    return new Set(parsed.cardIds || []);
  } catch {
    return new Set<string>();
  }
}

function saveDailyViewedCardIds(cardIds: Set<string>) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    DAILY_VIEW_STORAGE_KEY,
    JSON.stringify({ date: getTodayKey(), cardIds: [...cardIds] })
  );
}

export default function AppPage() {
  const router = useRouter();
  const { user, profile, loading, isAuthenticated, isSubscribed, viewsRemaining, signOut, updateWallet, refreshProfile } = useAuth();
  const { notify } = useNotifications();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCards, setSavedCards] = useState<Set<string>>(new Set());
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());
  const viewedCardsRef = useRef(viewedCards);
  viewedCardsRef.current = viewedCards;
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedLearningTrack, setSelectedLearningTrack] = useState<string | null>(null);
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
  const [showLearningTracks, setShowLearningTracks] = useState(false);
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
  const [upsellContext, setUpsellContext] = useState<"save_limit" | "pin_limit" | "learning_tracks" | null>(null);
  const [dailyLimitPrompted, setDailyLimitPrompted] = useState(false);
  const [optimisticViewsRemaining, setOptimisticViewsRemaining] = useState(viewsRemaining);

  // Achievements & Leaderboard state
  const [showAchievements, setShowAchievements] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  // Load saved cards, viewed cards, and preferences from localStorage
  useEffect(() => {
    if (loading || !isAuthenticated) return;

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
  }, [isAuthenticated, loading]);

  // PWA beforeinstallprompt listener
  useEffect(() => {
    if (loading || !isAuthenticated) return;
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isAuthenticated, loading]);

  useEffect(() => {
    if (loading || !isAuthenticated) return;

    const syncDailyEntitlement = () => {
      refreshProfile().catch(() => {});
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncDailyEntitlement();
      }
    };

    window.addEventListener("focus", syncDailyEntitlement);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", syncDailyEntitlement);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated, loading, refreshProfile]);

  // Show install prompt after viewing enough cards
  useEffect(() => {
    if (loading || !isAuthenticated) return;
    if (shouldShowInstallPrompt(dailyProgress.read)) {
      setShowInstallPrompt(true);
    }
  }, [dailyProgress.read, isAuthenticated, loading]);

  // Load pinned cards on auth
  useEffect(() => {
    if (profile) {
      getPinnedCards(profile.id).then(pins =>
        setPinnedCards(new Set(pins.map(p => p.card_id)))
      ).catch(() => {});
    }
  }, [profile]);

  // Celebrate daily goal completion (fires once per day)
  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace("/auth?redirect=/app");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (loading || !isAuthenticated) return;
    if (dailyProgress.read >= dailyProgress.goal && !dailyProgress.completed) {
      markDailyGoalCompleted();
      setDailyProgress(prev => ({ ...prev, completed: true }));
      celebrate();
      sounds.milestone();
    }
  }, [dailyProgress.read, dailyProgress.goal, dailyProgress.completed, isAuthenticated, loading]);

  useEffect(() => {
    if (loading || !isAuthenticated || isSubscribed || optimisticViewsRemaining > 0 || dailyLimitPrompted) return;
    notify({
      title: "Daily free reading complete",
      message: "Upgrade to Pro for unlimited reading, audio mode, and review.",
      tone: "info",
    });
    setDailyLimitPrompted(true);
  }, [dailyLimitPrompted, isAuthenticated, isSubscribed, loading, notify, optimisticViewsRemaining]);

  useEffect(() => {
    if (optimisticViewsRemaining > 0) {
      setDailyLimitPrompted(false);
    }
  }, [optimisticViewsRemaining]);

  useEffect(() => {
    if (isSubscribed || !selectedLearningTrack) return;
    setSelectedLearningTrack(null);
  }, [isSubscribed, selectedLearningTrack]);

  useEffect(() => {
    setOptimisticViewsRemaining(viewsRemaining);
  }, [viewsRemaining]);

  // Generate smart feed
  useEffect(() => {
    if (loading || !isAuthenticated) return;
    if (!isLoaded) return;

    // Read viewedCards once at build time via ref to avoid re-triggering on every view
    const viewed = viewedCardsRef.current;

    let availableCards: Card[];

    if (selectedLearningTrack === ALL_LEARNING_TRACKS_ID) {
      availableCards = learningCards;
    } else if (selectedLearningTrack) {
      availableCards = getLearningCardsByTrack(selectedLearningTrack);
    } else if (selectedBook) {
      availableCards = getCardsByBook(selectedBook);
    } else if (selectedCollection) {
      availableCards = getCollectionCards(selectedCollection);
    } else if (selectedTopic) {
      availableCards = [...contentLibrary].filter(c => c.topic.includes(selectedTopic));
    } else {
      // Mix in audio content (podcasts/audiobooks) with regular cards
      const audioCards = getAudioAsCards() as Card[];
      availableCards = [...contentLibrary, ...audioCards];
    }

    const feedSeed = [
      getTodayKey(),
      selectedBook || "all-books",
      selectedCollection?.id || "all-collections",
      selectedTopic || "all-topics",
      selectedLearningTrack || "all-learning-tracks",
      preferences?.topics?.slice().sort().join(",") || "no-pref",
    ].join("|");

    if (!selectedTopic && !selectedCollection && !selectedLearningTrack && preferences?.topics && preferences.topics.length > 0) {
      const preferredCards = availableCards.filter(card =>
        card.topic.some(t => preferences.topics.includes(t))
      );
      const otherCards = availableCards.filter(card =>
        !card.topic.some(t => preferences.topics.includes(t))
      );
      const smartFeed = [
        ...deterministicShuffle(preferredCards.filter(c => !viewed.has(c.id)), `${feedSeed}:preferred:unseen`),
        ...deterministicShuffle(otherCards.filter(c => !viewed.has(c.id)), `${feedSeed}:other:unseen`),
      ];
      setFeed(smartFeed);
    } else {
      const unseenCards = availableCards.filter(card => !viewed.has(card.id));
      setFeed(deterministicShuffle(unseenCards, `${feedSeed}:unseen`));
    }

    setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopic, selectedCollection, selectedBook, selectedLearningTrack, isLoaded, isAuthenticated, loading, preferences]);

  // Save to localStorage when savedCards changes
  useEffect(() => {
    if (loading || !isAuthenticated) return;
    if (isLoaded) {
      localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify([...savedCards]));
    }
  }, [savedCards, isAuthenticated, isLoaded, loading]);

  // Mark cards as seen for feed ordering, without consuming a daily read.
  useEffect(() => {
    if (feed[currentIndex] && isLoaded) {
      const card = feed[currentIndex];
      const viewed = viewedCardsRef.current;
      if (!viewed.has(card.id)) {
        const newViewed = new Set(viewed);
        newViewed.add(card.id);
        setViewedCards(newViewed);
        localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify([...newViewed]));
      }
    }
  }, [currentIndex, feed, isLoaded]);

  // Consume a read after a short dwell on the currently visible card.
  useEffect(() => {
    if (!feed[currentIndex] || !isLoaded) return;

    const card = feed[currentIndex];
    const timer = setTimeout(() => {
      recordCardRead(card.id, card.topic);
      setDailyProgress(getDailyProgress());

      if (profile && !isSubscribed) {
        const dailyViewed = getDailyViewedCardIds();
        if (!dailyViewed.has(card.id)) {
          dailyViewed.add(card.id);
          saveDailyViewedCardIds(dailyViewed);
          setOptimisticViewsRemaining((prev) => Math.max(prev - 1, 0));
          incrementViewCount(profile.id).then(() => refreshProfile()).catch(() => {});
        }
      }
    }, CARD_VIEW_DWELL_MS);

    return () => clearTimeout(timer);
  }, [currentIndex, feed, isLoaded, isSubscribed, profile, refreshProfile]);

  const currentCard = feed[currentIndex];
  const effectiveViewsRemaining = isSubscribed ? -1 : optimisticViewsRemaining;
  const freeReadLimitReached = !isSubscribed && effectiveViewsRemaining <= 0;
  const freeReadsUsed = isSubscribed ? 0 : Math.max(0, FREE_DAILY_READ_LIMIT - effectiveViewsRemaining);
  const canUseAssistMode = isSubscribed || freeReadsUsed < FREE_ASSIST_MODE_PREVIEW_LIMIT;
  const assistModePreviewRemaining = isSubscribed
    ? FREE_ASSIST_MODE_PREVIEW_LIMIT
    : Math.max(0, FREE_ASSIST_MODE_PREVIEW_LIMIT - freeReadsUsed);
  const activeModeLabel =
    selectedLearningTrack === ALL_LEARNING_TRACKS_ID
      ? "Learn: All Tracks"
      : selectedLearningTrack
        ? `Learn: ${getLearningTrackById(selectedLearningTrack)?.name ?? "Track"}`
        : null;

  const goToNext = useCallback(() => {
    if (freeReadLimitReached) return;
    if (currentIndex < feed.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
      setIsExpanded(false);
      sounds.swipe();
      haptic("light");
    }
  }, [currentIndex, feed.length, freeReadLimitReached]);

  const goToPrev = useCallback(() => {
    if (freeReadLimitReached) return;
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
      setIsExpanded(false);
      sounds.swipe();
      haptic("light");
    }
  }, [currentIndex, freeReadLimitReached]);

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

  useEffect(() => {
    if (canUseAssistMode) return;

    if (audioMode) {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setAudioMode(false);
      setIsSpeaking(false);
    }

    if (autoScroll) {
      setAutoScroll(false);
    }
  }, [canUseAssistMode, audioMode, autoScroll]);

  const toggleAudioMode = () => {
    if (!canUseAssistMode) {
      handleUpgrade("assist_mode_preview_limit");
      return;
    }

    if (audioMode) {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setAudioMode(false);
    } else {
      setAudioMode(true);
    }
  };

  const toggleAutoScrollMode = () => {
    if (!canUseAssistMode) {
      handleUpgrade("assist_mode_preview_limit");
      return;
    }

    setAutoScroll((prev) => !prev);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -SWIPE_THRESHOLD) goToNext();
    else if (info.offset.y > SWIPE_THRESHOLD) goToPrev();
  };

  const toggleSave = (cardId: string) => {
    if (!isSubscribed && !savedCards.has(cardId) && savedCards.size >= FREE_SAVE_LIMIT) {
      trackGrowthEvent({
        event: "save_limit_hit",
        metadata: { saved_count: savedCards.size, save_limit: FREE_SAVE_LIMIT },
      });
      notify({
        title: "Free library full",
        message: "Upgrade to Pro to keep an unlimited personal library and review queue.",
        tone: "info",
      });
      setUpsellContext("save_limit");
      return;
    }

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
    if (!isSubscribed && !pinnedCards.has(cardId) && pinnedCards.size >= FREE_PIN_LIMIT) {
      trackGrowthEvent({
        event: "pin_limit_hit",
        metadata: { pinned_count: pinnedCards.size, pin_limit: FREE_PIN_LIMIT },
      });
      notify({
        title: "Garden limit reached",
        message: "Upgrade to Pro to pin unlimited quotes and grow your full garden.",
        tone: "info",
      });
      setUpsellContext("pin_limit");
      return;
    }
    const card = feed.find(c => c.id === cardId) || currentCard;
    if (!card) return;
    setCardToPin(card);
    setShowPinModal(true);
  };

  const handleConfirmPin = async (note: string) => {
    if (!cardToPin || !profile) return;
    try {
      await pinCard(profile.id, cardToPin.id, note || undefined);
      setPinnedCards(prev => new Set([...prev, cardToPin.id]));
      sounds.save();
      haptic("medium");
      notify({
        title: "Planted in your garden",
        message: note ? "Your quote and note are live on your garden." : "Your quote is now saved to your garden.",
        tone: "success",
      });
    } catch (err) {
      console.error("Error pinning card:", err);
      notify({
        title: "Could not pin quote",
        message: "Please try planting it again.",
        tone: "error",
      });
    }
    setShowPinModal(false);
    setCardToPin(null);
  };

  const handleUpgrade = (source: string) => {
    trackGrowthEvent({
      event: "pro_strip_upgrade_click",
      metadata: { source },
    });
    window.location.href = `/subscribe?source=${encodeURIComponent(source)}`;
  };

  const handleOpenLearningTracks = () => {
    if (!isSubscribed) {
      trackGrowthEvent({
        event: "learning_tracks_teaser_opened",
        metadata: { source: "app_header" },
      });
    }
    setShowLearningTracks(true);
  };

  const handleSelectLearningTrack = (trackId: string) => {
    setSelectedLearningTrack(trackId);
    setSelectedBook(null);
    setSelectedTopic(null);
    setSelectedCollection(null);
  };

  const handleUnpin = async (cardId: string) => {
    if (!profile) return;
    try {
      await unpinCard(profile.id, cardId);
      setPinnedCards(prev => {
        const s = new Set(prev);
        s.delete(cardId);
        return s;
      });
      notify({
        title: "Removed from garden",
        message: "The quote was unpinned successfully.",
        tone: "info",
      });
    } catch (err) {
      console.error("Error unpinning card:", err);
      notify({
        title: "Could not unpin quote",
        message: "Please try again.",
        tone: "error",
      });
    }
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

  const savedCardsList = allCards.filter(card => savedCards.has(card.id));

  if (!isLoaded) {
    if (!loading && !isAuthenticated) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-[#102219] to-[#0a1610] flex items-center justify-center px-6 text-center">
          <div className="max-w-md">
            <div className="text-5xl mb-4">🌱</div>
            <h1 className="text-3xl font-bold text-primary mb-3">Sign in to start reading</h1>
            <p className="text-white/60 mb-6">
              BloomScroll now requires an account before you can open the reader, save cards, and grow your garden.
            </p>
            <Link
              href="/auth?redirect=/app"
              className="inline-flex items-center justify-center rounded-full h-12 px-6 bg-primary text-[#102219] text-sm font-bold"
            >
              Continue to sign in
            </Link>
          </div>
        </div>
      );
    }

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
        saveLimit={FREE_SAVE_LIMIT}
        showSaved={showSaved}
        showUserMenu={showUserMenu}
        reviewDueCount={reviewDueCount}
        onToggleSaved={() => setShowSaved(!showSaved)}
        onToggleUserMenu={() => setShowUserMenu(!showUserMenu)}
        onShowStreakModal={() => setShowStreakModal(true)}
        onShowBookFilter={() => setShowBookFilter(true)}
        onShowLearningTracks={handleOpenLearningTracks}
        onShowCollections={() => setShowCollections(true)}
        onShowSettings={() => setShowSettings(true)}
        onShowReview={() => setShowReview(true)}
        onShowAchievements={() => setShowAchievements(true)}
        onShowLeaderboard={() => setShowLeaderboard(true)}
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
            setSelectedLearningTrack(null);
            setSelectedBook(null);
            setShowCollections(false);
          }}
          onClose={() => setShowCollections(false)}
        />
      )}

      {showSaved ? (
        <SavedCardsView
          cards={savedCardsList}
          isSubscribed={isSubscribed}
          saveLimit={FREE_SAVE_LIMIT}
          onRemove={toggleSave}
          onUpgrade={() => handleUpgrade("saved_cards_view")}
        />
      ) : freeReadLimitReached ? (
        <div className="flex-1 px-3 sm:px-4 pt-20 sm:pt-24 pb-6 flex items-start justify-center">
          <div className="w-full max-w-2xl rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.04))] p-6 sm:p-8 text-center shadow-2xl shadow-black/20">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              Free limit reached
            </span>
            <h1 className="mt-4 font-impact text-3xl sm:text-4xl uppercase text-primary">
              Your daily reads are done
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/65 max-w-md mx-auto">
              Free accounts get {FREE_DAILY_READ_LIMIT} cards per day. Upgrade to Pro to keep reading without a cap and unlock review, audio, and deeper book browsing.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3 text-left">
              {[
                "Unlimited daily reading",
                "Audio mode and book browsing",
                "Review queue that helps memory stick",
              ].map((point) => (
                <div key={point} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-sm text-white/75">
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => handleUpgrade("feed_controls")}
                className="inline-flex items-center justify-center rounded-full h-12 px-6 bg-primary text-[#102219] text-sm font-bold uppercase tracking-[0.18em]"
              >
                Upgrade to Pro
              </button>
              <button
                onClick={() => setShowSaved(true)}
                className="inline-flex items-center justify-center rounded-full h-12 px-6 border border-white/10 bg-white/5 text-sm font-bold uppercase tracking-[0.18em] text-white/80"
              >
                Open library
              </button>
            </div>
          </div>
        </div>
      ) : (
        <CardFeed
          currentCard={currentCard}
          direction={direction}
          savedCards={savedCards}
          pinnedCards={pinnedCards}
          savedCount={savedCards.size}
          pinnedCount={pinnedCards.size}
          saveLimit={FREE_SAVE_LIMIT}
          pinLimit={FREE_PIN_LIMIT}
          justSaved={justSaved}
          showCopied={showCopied}
          isSharing={isSharing}
          audioMode={audioMode}
          isSpeaking={isSpeaking}
          autoScroll={autoScroll}
          dailyProgress={dailyProgress}
          feedLength={feed.length}
          hasChapter={!!currentCard?.chapter}
          isSubscribed={isSubscribed}
          viewsRemaining={effectiveViewsRemaining}
          freeDailyLimit={FREE_DAILY_READ_LIMIT}
          canUseAssistMode={canUseAssistMode}
          assistModePreviewRemaining={assistModePreviewRemaining}
          reviewDueCount={reviewDueCount}
          activeModeLabel={activeModeLabel}
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
          onToggleAutoScroll={toggleAutoScrollMode}
          onClearFilters={() => {
            setSelectedTopic(null);
            setSelectedCollection(null);
            setSelectedLearningTrack(null);
          }}
          onShowSubscribe={() => handleUpgrade("feed_controls")}
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

      <AnimatePresence>
        {upsellContext && (
          <ProUpsellModal
            isOpen={true}
            title={
              upsellContext === "save_limit"
                ? "Your library wants more room"
                : upsellContext === "pin_limit"
                  ? "Your garden is ready to grow"
                  : "Turn BloomScroll into a learning app"
            }
            description={
              upsellContext === "save_limit"
                ? "Free saved cards are capped so you can sample the habit. Pro turns your library into a long-term reading system."
                : upsellContext === "pin_limit"
                  ? "Free garden pins are capped so you can feel the value. Pro lets you keep every quote worth revisiting."
                  : "Pro turns BloomScroll from quote scrolling into topic-based learning with curated lesson decks."
            }
            points={
              upsellContext === "save_limit"
                ? [
                    "Unlimited saved cards",
                    "Review queue that helps you remember what you read",
                    "Audio mode and full book browsing",
                  ]
                : upsellContext === "pin_limit"
                  ? [
                      "Unlimited garden pins",
                      "A permanent public garden worth sharing",
                      "Keep notes and your best insights together",
                    ]
                  : [
                      "Dedicated tracks for finance, crypto, AI, and startup strategy",
                      "Focused card decks that teach concepts instead of random inspiration",
                      "Learning chapters, review mode, and unlimited reading in one Pro flow",
                    ]
            }
            onClose={() => setUpsellContext(null)}
            onUpgrade={() => {
              handleUpgrade(upsellContext);
              setUpsellContext(null);
            }}
          />
        )}
      </AnimatePresence>

      {showLearningTracks && (
        <LearningTracksModal
          selectedTrack={selectedLearningTrack}
          isSubscribed={isSubscribed}
          onSelect={handleSelectLearningTrack}
          onClose={() => setShowLearningTracks(false)}
          onUpgrade={() => {
            setShowLearningTracks(false);
            setUpsellContext("learning_tracks");
          }}
        />
      )}

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
          onSelect={(book) => {
            setSelectedBook(book);
            setSelectedLearningTrack(null);
            setSelectedCollection(null);
            setSelectedTopic(null);
          }}
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

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        currentUserId={profile?.id}
      />

      {/* Achievement Unlock Toast */}
      <AnimatePresence>
        {newAchievement && (
          <div
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#007A5E] text-[#EACCD4] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setNewAchievement(null);
              setShowAchievements(true);
            }}
          >
            <span className="text-2xl">{newAchievement.icon}</span>
            <div>
              <div className="font-bold">{newAchievement.name}</div>
              <div className="text-xs opacity-80">+{newAchievement.xpReward} XP</div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
