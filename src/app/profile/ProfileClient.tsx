"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import ShareMenu, { ShareMenuData } from "@/components/app/ShareMenu";
import { useAuth } from "@/components/AuthProvider";
import { getAllBooks } from "@/lib/content-library";
import {
  getReadingStats,
  getWeeklyGrid,
  getTopTopics,
  ReadingStats,
  setDailyGoal as saveDailyGoal,
  setStreakFreeze as saveStreakFreeze,
} from "@/lib/reading-stats";
import { getStreakData } from "@/lib/streak";
import {
  requestNotificationPermission,
  scheduleDailyReminder,
  cancelDailyReminder,
  getNotificationSettings,
} from "@/lib/push-notifications";
import { getSoundEnabled, setSoundEnabled, sounds } from "@/lib/sounds";
import { getPinnedCards, unpinCard, updatePinNote, PinnedCard } from "@/lib/pinned-cards";
import PinnedBoardView from "@/components/app/PinnedBoardView";
import { useNotifications } from "@/components/NotificationProvider";
import CancelSubscriptionModal from "@/components/app/CancelSubscriptionModal";
import { getCardsForReview } from "@/lib/spaced-repetition";
import { trackGrowthEvent } from "@/lib/analytics";

const LEVEL_COLORS = [
  "bg-lvl0",
  "bg-lvl1",
  "bg-lvl2",
  "bg-lvl3",
  "bg-lvl4",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

const TOPIC_COLORS = [
  { text: "text-brand", bar: "bg-brand/40" },
  { text: "text-amber-600", bar: "bg-amber-300" },
  { text: "text-violet-600", bar: "bg-violet-300" },
  { text: "text-brand-dark", bar: "bg-brand-dark/40" },
  { text: "text-slate-700", bar: "bg-slate-400" },
];

export default function ProfileClient() {
  const { user, profile, isSubscribed, signOut, updateWallet } = useAuth();
  const { notify } = useNotifications();

  const [stats, setStats] = useState<ReadingStats | null>(null);
  const [grid, setGrid] = useState<{ date: string; count: number; level: number }[][]>([]);
  const [topTopics, setTopTopics] = useState<{ topic: string; count: number }[]>([]);
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0, totalDays: 0 });

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState("09:00");
  const [walletInput, setWalletInput] = useState("");
  const [walletSaving, setWalletSaving] = useState(false);
  const [walletSaved, setWalletSaved] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [activeTab, setActiveTab] = useState<"stats" | "garden" | "settings">("stats");
  const [copied, setCopied] = useState(false);
  const [profileShareMenu, setProfileShareMenu] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [dailyGoal, setDailyGoal] = useState(5);
  const [streakFreezeActive, setStreakFreezeActive] = useState(false);
  const [pinnedCards, setPinnedCards] = useState<PinnedCard[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const reviewPreviewCount = getCardsForReview().length;
  const totalBooks = getAllBooks().length;

  useEffect(() => {
    queueMicrotask(() => {
      const s = getReadingStats();
      setStats(s);
      setGrid(getWeeklyGrid(52));
      setTopTopics(getTopTopics(5));
      setStreak(getStreakData());
      const params = new URLSearchParams({
        name: profile?.display_name || profile?.fc_display_name || (profile?.fc_username ? `@${profile.fc_username}` : '') || user?.email?.split("@")[0] || "Reader",
        cards: String(s.totalCardsRead || 0),
        streak: String(s.currentStreak || 0),
        longest: String(s.longestStreak || 0),
        quiz: String(s.quizAccuracy || 0),
        days: String(s.totalDaysActive || 0),
      });
      setShareUrl(`${window.location.origin}/profile?${params.toString()}`);
      const notifSettings = getNotificationSettings();
      setNotificationsEnabled(notifSettings.enabled);
      setReminderTime(notifSettings.reminderTime || "09:00");
      setSoundEnabledState(getSoundEnabled());
      setDailyGoal(s.dailyGoal || 5);
      setStreakFreezeActive(s.streakFreezeActive ?? false);
      if (profile?.wallet_address) setWalletInput(profile.wallet_address);
      if (profile?.id) {
        getPinnedCards(profile.id).then(setPinnedCards).catch(() => {});
      }
    });
  }, [profile]);

  const handleShare = async (platform?: "twitter" | "copy") => {
    const text = `My BloomScroll Stats:\n\n${stats?.totalCardsRead || 0} cards read\n${streak.currentStreak} day streak\n${streak.longestStreak} longest streak\n${stats?.quizAccuracy || 0}% quiz accuracy\n\nJoin me:`;
    const twitterText = `📚 ${stats?.totalCardsRead || 0} cards read\n🔥 ${streak.currentStreak} day streak\n🏆 ${streak.longestStreak} longest streak\n\nGrowing with @bloomscroll`;
    
    if (platform === "twitter") {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, "_blank", "width=550,height=420");
      return;
    }
    
    if (platform === "copy") {
      navigator.clipboard.writeText(`${text} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      notify({
        title: "Copied!",
        message: "Share text copied. Paste it on Instagram or anywhere!",
        tone: "success",
      });
      return;
    }
    
    // Default: use native share if available
    if (navigator.share) {
      try { await navigator.share({ text, url: shareUrl }); } catch {}
    } else {
      handleShare("copy");
    }
  };

  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        setNotificationsEnabled(true);
        scheduleDailyReminder(reminderTime);
        notify({
          title: "Reminders enabled",
          message: `Daily reminders are set for ${reminderTime}.`,
          tone: "success",
        });
      } else {
        notify({
          title: "Notifications blocked",
          message: "Enable browser notifications to get daily reminders.",
          tone: "error",
        });
      }
    } else {
      setNotificationsEnabled(false);
      cancelDailyReminder();
      notify({
        title: "Reminders turned off",
        message: "Daily reading reminders have been disabled.",
        tone: "info",
      });
    }
  };

  const handleReminderTimeChange = (time: string) => {
    setReminderTime(time);
    if (notificationsEnabled) {
      scheduleDailyReminder(time);
      notify({
        title: "Reminder updated",
        message: `Daily reminder moved to ${time}.`,
        tone: "success",
      });
    }
  };

  const handleWalletSave = async () => {
    if (!walletInput || walletSaving) return;
    setWalletSaving(true);
    try {
      const success = await updateWallet(walletInput);
      if (success) {
        setWalletSaved(true);
        setTimeout(() => setWalletSaved(false), 2000);
        notify({
          title: "Wallet saved",
          message: "Your wallet address was updated.",
          tone: "success",
        });
      } else {
        notify({
          title: "Wallet update failed",
          message: "We could not save that wallet address.",
          tone: "error",
        });
      }
    } catch (err) { console.error("Error saving wallet:", err); }
    setWalletSaving(false);
  };

  const handleUnpin = async (cardId: string) => {
    if (!profile) return;
    try {
      await unpinCard(profile.id, cardId);
      setPinnedCards(prev => prev.filter(p => p.card_id !== cardId));
      notify({
        title: "Removed from garden",
        message: "The quote was unpinned.",
        tone: "info",
      });
    } catch (err) {
      console.error("Error removing pinned card:", err);
      notify({
        title: "Could not remove quote",
        message: "Please try again.",
        tone: "error",
      });
    }
  };

  const handleEditNote = async (cardId: string, note: string | null) => {
    if (!profile) return;
    try {
      await updatePinNote(profile.id, cardId, note);
      setPinnedCards(prev =>
        prev.map(p => (p.card_id === cardId ? { ...p, note } : p))
      );
      notify({
        title: note ? "Garden note saved" : "Garden note cleared",
        message: note ? "Your note was updated successfully." : "The note was removed from this quote.",
        tone: "success",
      });
    } catch (err) {
      console.error("Error updating note:", err);
      notify({
        title: "Could not update note",
        message: "Please try again.",
        tone: "error",
      });
    }
  };

  const handleCancelSubscription = async ({ reason, details }: { reason: string; details: string }) => {
    setCancelLoading(true);

    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason, details }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.url) {
        notify({
          title: "Could not open cancellation",
          message: payload.error || "Please try again in a moment.",
          tone: "error",
        });
        return;
      }

      notify({
        title: "Opening billing portal",
        message: "Finish cancellation securely in Dodo.",
        tone: "info",
      });

      window.location.href = payload.url;
    } catch (error) {
      console.error("Cancellation flow failed:", error);
      notify({
        title: "Cancellation unavailable",
        message: "We could not connect to billing right now.",
        tone: "error",
      });
    } finally {
      setCancelLoading(false);
      setShowCancelModal(false);
    }
  };

  const gardenUsername = profile?.fc_username || user?.email?.split("@")[0] || "";

  const handleUpgradeClick = (source: string) => {
    trackGrowthEvent({
      event: "profile_upgrade_click",
      metadata: { source, review_preview_count: reviewPreviewCount, total_books: totalBooks },
    });
    window.location.href = `/subscribe?source=${encodeURIComponent(source)}`;
  };

  const displayName = profile?.display_name
    || profile?.fc_display_name
    || (profile?.fc_username ? `@${profile.fc_username}` : null)
    || user?.email?.split("@")[0]
    || "Reader";

  const avatarUrl = profile?.avatar_url || profile?.fc_pfp_url;

  if (!stats) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-2xl font-medium text-brand">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-3 sm:px-6 py-3 sm:py-4">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/app"
              className="flex items-center justify-center p-1.5 sm:p-2 rounded-full bg-brand-light hover:bg-brand/10 text-brand transition-colors"
            >
              <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <Logo size="sm" />
          </div>
          <button
            onClick={() => setProfileShareMenu(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-2 rounded-full bg-brand text-white font-medium text-xs sm:text-sm transition-transform active:scale-95 shadow-md"
          >
            <svg className="size-3.5 sm:size-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            Share
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-3 sm:px-4 md:px-12 py-6 sm:py-10">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="relative mb-4 sm:mb-6">
            <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-2 border-brand/30 p-1 sm:p-1.5 bg-white shadow-sm">
              <div className="w-full h-full rounded-full bg-brand-light flex items-center justify-center text-3xl sm:text-5xl">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span>{displayName.charAt(0).toUpperCase()}</span>
                )}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white border border-brand/30 rounded-full w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center text-base sm:text-xl shadow-md">
              🌿
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-medium mb-2 text-slate-900 font-instrument-serif">
            {displayName}
          </h1>
          {user?.email && <p className="text-slate-600 font-medium mb-3">{user.email}</p>}
          <p className="text-sm text-slate-500 mb-6 flex items-center justify-center gap-2">
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9ZM5.6 10.25c0 1.64 1.33 2.97 2.97 2.97h.86c1.97 0 3.56-1.6 3.56-3.57v-5.4C12.99 2.56 11.43 1 9.43 1c-2 0-3.56 1.56-3.56 3.56v5.4c0 .1 0 .2-.27.29ZM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9Z" />
            </svg>
            Member since {new Date(stats.joinedDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} • 🌱 {streak.currentStreak} Day Streak
          </p>
          <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border font-medium text-sm shadow-sm ${
            isSubscribed ? "border-brand/40 text-brand" : "border-slate-200 text-slate-600"
          }`}>
            {isSubscribed ? (
              <>
                <svg className="size-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Pro Member
              </>
            ) : (
              <>Free Plan</>
            )}
          </div>
          {!isSubscribed && (
            <Link href="/subscribe" className="block text-center mt-3 text-brand text-sm font-medium hover:underline">
              Upgrade to Pro →
            </Link>
          )}
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-10 justify-center">
          {[
            { id: "stats" as const, label: "Stats" },
            { id: "garden" as const, label: "Garden" },
            { id: "settings" as const, label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-brand text-brand"
                  : "border-transparent text-slate-500 hover:text-brand"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "stats" && (
          <>
            {/* Stats Grid */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {[
                { label: "Cards Read", value: stats.totalCardsRead.toLocaleString(), icon: (
                  <svg className="size-5 text-brand" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                )},
                { label: "Current Streak", value: `${streak.currentStreak} Days`, icon: (
                  <svg className="size-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.51 6.51 0 009 4.5a6.5 6.5 0 016.362.714z" />
                  </svg>
                )},
                { label: "Best Streak", value: `${streak.longestStreak} Days`, icon: (
                  <svg className="size-5 text-brand" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228M18.75 4.236V2.721M14.503 14.25a7.454 7.454 0 00.981-3.172M14.503 14.25H9.497m5.006 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 01-.981-3.172" />
                  </svg>
                )},
                { label: "Quiz Accuracy", value: `${stats.quizAccuracy}%`, icon: (
                  <svg className="size-5 text-violet-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )},
              ].map((s, i) => (
                <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-500 text-xs font-medium">{s.label}</span>
                    {s.icon}
                  </div>
                  <p className="text-3xl font-medium text-slate-900">{s.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Contribution Grid */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 mb-12 shadow-sm"
            >
              <h3 className="text-lg font-medium mb-8 flex items-center gap-2 text-slate-900 font-instrument-serif">
                Growth Activity
                <span className="text-xs font-normal text-slate-500" style={{ fontFamily: "inherit" }}>
                  {stats.totalCardsRead.toLocaleString()} lessons blooming in the last year
                </span>
              </h3>
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[700px]">
                  <div className="flex">
                    {/* Day labels */}
                    <div className="flex flex-col justify-around text-[10px] text-slate-500 font-medium pr-2" style={{ height: grid.length > 0 ? undefined : 88 }}>
                      {DAYS.map((day, i) => (
                        <span key={i} className="h-[12px] flex items-center">{day}</span>
                      ))}
                    </div>
                    {/* Grid */}
                    <div className="flex-1 flex gap-[3px]">
                      {grid.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                          {week.map((day, di) => (
                            <div
                              key={di}
                              className={`w-[10px] h-[10px] lg:w-[12px] lg:h-[12px] rounded-[2px] ${LEVEL_COLORS[day.level]} transition-all hover:scale-125 cursor-pointer`}
                              title={`${day.date}: ${day.count} cards`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-2 text-[10px] text-slate-500 font-medium">
                <span>Dormant</span>
                {LEVEL_COLORS.map((color, i) => (
                  <div key={i} className={`w-3 h-3 rounded-[2px] ${color}`} />
                ))}
                <span>Blooming</span>
              </div>
            </motion.div>

            {/* Top Topics */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="mb-14"
            >
              <h3 className="text-2xl font-medium mb-8 text-slate-900 font-instrument-serif">
                Cultivated Topics
              </h3>
              {topTopics.length > 0 ? (
                <div className="space-y-8">
                  {topTopics.map((topic, i) => {
                    const color = TOPIC_COLORS[i % TOPIC_COLORS.length];
                    const pct = Math.round((topic.count / (topTopics[0]?.count || 1)) * 100);
                    return (
                      <div key={topic.topic}>
                        <div className="flex justify-between items-center mb-3">
                          <span className={`text-sm font-medium capitalize ${color.text}`}>{topic.topic}</span>
                          <span className={`text-sm font-medium ${color.text}`}>{pct}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${color.bar} rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">Start reading to see your top topics!</p>
              )}
            </motion.div>

            {/* Pro Preview CTAs */}
            {!isSubscribed && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="grid gap-4 md:grid-cols-2 mb-10"
              >
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-[11px] font-medium text-brand">Pro Preview</p>
                  <h4 className="mt-2 text-2xl font-medium text-slate-900 font-instrument-serif">
                    Review queue
                  </h4>
                  <p className="mt-2 text-sm text-slate-500">
                    {reviewPreviewCount > 0
                      ? `${reviewPreviewCount} saved cards are ready to become lasting knowledge.`
                      : "Build a review queue that helps you remember what you read."}
                  </p>
                  <div className="mt-4 h-2 rounded-full bg-brand/10 overflow-hidden">
                    <div className="h-full w-2/3 rounded-full bg-brand/60" />
                  </div>
                  <button
                    onClick={() => handleUpgradeClick("profile_review_preview")}
                    className="mt-5 rounded-full bg-brand px-5 py-3 text-sm font-medium text-white"
                  >
                    Unlock review mode
                  </button>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-[11px] font-medium text-brand">Pro Preview</p>
                  <h4 className="mt-2 text-2xl font-medium text-slate-900 font-instrument-serif">
                    Browse by book
                  </h4>
                  <p className="mt-2 text-sm text-slate-500">
                    Explore {totalBooks}+ books by theme, author, and depth instead of relying on random feed order.
                  </p>
                  <div className="mt-4 rounded-2xl bg-brand-light p-4">
                    <div className="grid gap-2">
                      {getAllBooks().slice(0, 3).map(({ book, author }) => (
                        <div key={book} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm">
                          <span className="font-medium text-slate-900 truncate">{book}</span>
                          <span className="ml-3 shrink-0 text-slate-500 text-xs">{author}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-center text-xs font-medium text-slate-400">
                      Full browser available with Pro
                    </div>
                  </div>
                  <button
                    onClick={() => handleUpgradeClick("profile_book_preview")}
                    className="mt-5 rounded-full border border-brand text-sm font-medium text-brand px-5 py-3"
                  >
                    Unlock book browsing
                  </button>
                </div>
              </motion.div>
            )}

            {/* Share CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-brand rounded-3xl p-10 text-center relative overflow-hidden shadow-xl mb-10"
            >
              <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -left-16 -top-16 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-3xl font-medium mb-4 text-white font-instrument-serif">
                  Ready to share your garden?
                </h3>
                <p className="text-white/70 mb-8 max-w-md mx-auto">
                  Inspire others with your curated learning journey and consistent growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  {/* Twitter/X */}
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex items-center gap-2 bg-black hover:bg-slate-800 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Share on X
                  </button>
                  
                  {/* Copy for Instagram */}
                  <button
                    onClick={() => handleShare("copy")}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg"
                  >
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    {copied ? "Copied!" : "Copy for Instagram"}
                  </button>
                  
                  {/* More options */}
                  <button
                    onClick={() => setProfileShareMenu(true)}
                    className="flex items-center gap-2 bg-white hover:bg-slate-50 text-brand px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg"
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                    More
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === "garden" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PinnedBoardView
              pins={pinnedCards}
              isOwner={true}
              username={gardenUsername}
              onUnpin={handleUnpin}
              onEditNote={handleEditNote}
            />
          </motion.div>
        )}

        {activeTab === "settings" && (
          <>
            {/* Account */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="font-medium text-lg mb-4 flex items-center gap-2 text-slate-900">
                <svg className="size-5 text-brand" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Account
              </h2>
              <div className="space-y-3 text-sm">
                {user?.email && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Email</span>
                    <span className="text-slate-900">{user.email}</span>
                  </div>
                )}
                {profile?.fc_username && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Farcaster</span>
                    <span className="text-slate-900">@{profile.fc_username}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Plan</span>
                  <span className={isSubscribed ? "text-brand font-medium" : "text-slate-900"}>
                    {isSubscribed ? "Pro" : "Free"}
                  </span>
                </div>
              </div>
              {!isSubscribed && (
                <Link
                  href="/subscribe"
                  onClick={() => trackGrowthEvent({ event: "profile_upgrade_click", metadata: { source: "account_card" } })}
                  className="block w-full mt-4 py-3 bg-brand rounded-xl text-center font-medium text-white"
                >
                  Upgrade to Pro
                </Link>
              )}
              {isSubscribed && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="mt-4 w-full rounded-xl border border-red-300 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                  Manage or cancel subscription
                </button>
              )}
            </motion.div>

            {/* Notifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="font-medium text-lg mb-4 flex items-center gap-2 text-slate-900">
                <svg className="size-5 text-brand" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                Daily Reminder
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Push Notifications</p>
                    <p className="text-xs text-slate-500">Get reminded to read daily</p>
                  </div>
                  <button
                    onClick={handleNotificationToggle}
                    className={`w-14 h-8 rounded-full transition-all relative ${notificationsEnabled ? "bg-brand" : "bg-slate-200"}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all shadow-sm ${notificationsEnabled ? "right-1" : "left-1"}`} />
                  </button>
                </div>
                {notificationsEnabled && (
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="font-medium text-slate-900">Reminder Time</p>
                      <p className="text-xs text-slate-500">When should we nudge you?</p>
                    </div>
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => handleReminderTimeChange(e.target.value)}
                      className="bg-white rounded-lg px-3 py-2 text-sm border border-slate-200 focus:border-brand outline-none text-slate-900"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Sound Effects */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="font-medium text-lg mb-4 flex items-center gap-2 text-slate-900">
                <svg className="size-5 text-brand" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
                Sound Effects
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Enable Sounds</p>
                  <p className="text-xs text-slate-500">Swipe, save, and milestone sounds</p>
                </div>
                <button
                  onClick={() => { const v = !soundEnabled; setSoundEnabledState(v); setSoundEnabled(v); if (v) sounds.save(); }}
                  className={`w-14 h-8 rounded-full transition-all relative ${soundEnabled ? "bg-brand" : "bg-slate-200"}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all shadow-sm ${soundEnabled ? "right-1" : "left-1"}`} />
                </button>
              </div>
            </motion.div>

            {/* Daily Goal */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="font-medium text-lg mb-4 flex items-center gap-2 text-slate-900">
                <svg className="size-5 text-brand" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                Daily Goal
              </h2>
              <p className="text-xs text-slate-500 mb-4">Cards to read per day</p>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map(g => (
                  <button
                    key={g}
                    onClick={() => { saveDailyGoal(g); setDailyGoal(g); }}
                    className={`py-3 rounded-xl text-sm font-medium transition-all ${
                      dailyGoal === g
                        ? "bg-brand text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Streak Shield */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="font-medium text-lg mb-4 flex items-center gap-2 text-slate-900">
                <svg className="size-5 text-brand" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Streak Shield
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Protect your streak</p>
                  <p className="text-xs text-slate-500">Saves your streak if you miss 1 day</p>
                </div>
                {isSubscribed ? (
                  <button
                    onClick={() => { const v = !streakFreezeActive; saveStreakFreeze(v); setStreakFreezeActive(v); }}
                    className={`w-14 h-8 rounded-full transition-all relative ${streakFreezeActive ? "bg-brand" : "bg-slate-200"}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all shadow-sm ${streakFreezeActive ? "right-1" : "left-1"}`} />
                  </button>
                ) : (
                  <Link
                    href="/subscribe"
                    className="text-xs font-medium text-brand bg-brand-light px-4 py-2 rounded-full"
                  >
                    Pro Only
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Wallet */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="font-medium text-lg mb-4 flex items-center gap-2 text-slate-900">
                <svg className="size-5 text-brand" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                </svg>
                Wallet Address
              </h2>
              <p className="text-xs text-slate-500 mb-4">For crypto payments and rewards</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={walletInput}
                  onChange={(e) => setWalletInput(e.target.value)}
                  placeholder="0x..."
                  className="flex-1 bg-white rounded-xl px-4 py-3 text-sm border border-slate-200 focus:border-brand outline-none font-mono text-slate-900"
                />
                <button
                  onClick={handleWalletSave}
                  disabled={walletSaving || !walletInput}
                  className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    walletSaved
                      ? "bg-brand text-white"
                      : walletSaving || !walletInput
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-brand text-white hover:bg-brand-dark"
                  }`}
                >
                  {walletSaved ? "✓" : walletSaving ? "..." : "Save"}
                </button>
              </div>
            </motion.div>

            {/* Sign Out */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white border border-red-200 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <button
                onClick={async () => { try { await signOut(); } catch {} window.location.href = "/"; }}
                className="w-full py-3 border border-red-300 rounded-xl text-red-500 hover:bg-red-50 transition-all text-sm font-medium"
              >
                Sign Out
              </button>
            </motion.div>
          </>
        )}
      </main>

      <CancelSubscriptionModal
        isOpen={showCancelModal}
        loading={cancelLoading}
        onClose={() => {
          if (!cancelLoading) {
            setShowCancelModal(false);
          }
        }}
        onConfirm={handleCancelSubscription}
      />

      {/* Footer */}
      <footer className="p-10 text-center text-slate-500 text-sm border-t border-slate-100">
        <p className="text-lg mb-2 italic font-instrument-serif">Grow a little every day.</p>
        <p>&copy; 2025 BloomScroll. Organic wisdom, curated for you.</p>
      </footer>

      {/* Share Menu */}
      <ShareMenu
        open={profileShareMenu}
        onClose={() => setProfileShareMenu(false)}
        data={{
          twitterText: `📚 ${stats?.totalCardsRead || 0} cards read\n🔥 ${streak.currentStreak} day streak\n🏆 ${streak.longestStreak} longest streak\n\nGrowing with @bloomscroll`,
          url: shareUrl,
          copyText: `My BloomScroll Stats:\n\n${stats?.totalCardsRead || 0} cards read\n${streak.currentStreak} day streak\n${streak.longestStreak} longest streak\n${stats?.quizAccuracy || 0}% quiz accuracy\n\nJoin me: ${shareUrl}`,
        }}
        onNotify={(message) => notify({ title: "Share", message, tone: "success" })}
      />
    </div>
  );
}
