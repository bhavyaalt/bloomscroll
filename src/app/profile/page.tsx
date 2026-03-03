"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
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
  { text: "text-botgreen", bar: "bg-botsage" },
  { text: "text-softclay", bar: "bg-softclay" },
  { text: "text-mutedlav", bar: "bg-mutedlav" },
  { text: "text-botsagedark", bar: "bg-botsagedark" },
  { text: "text-darkteal", bar: "bg-darkteal/50" },
];

export default function ProfilePage() {
  const { user, profile, isSubscribed, signOut, updateWallet } = useAuth();

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
  const [shareUrl, setShareUrl] = useState("");
  const [dailyGoal, setDailyGoal] = useState(5);
  const [streakFreezeActive, setStreakFreezeActive] = useState(false);
  const [pinnedCards, setPinnedCards] = useState<PinnedCard[]>([]);

  useEffect(() => {
    const s = getReadingStats();
    setStats(s);
    setGrid(getWeeklyGrid(52));
    setTopTopics(getTopTopics(5));
    setStreak(getStreakData());
    setShareUrl(`${window.location.origin}/profile`);
    const notifSettings = getNotificationSettings();
    setNotificationsEnabled(notifSettings.enabled);
    setReminderTime(notifSettings.reminderTime || "09:00");
    setSoundEnabledState(getSoundEnabled());
    setDailyGoal(s.dailyGoal || 5);
    setStreakFreezeActive(s.streakFreezeActive ?? false);
    if (profile?.wallet_address) setWalletInput(profile.wallet_address);
    if (profile?.id) {
      getPinnedCards(profile.id).then(setPinnedCards);
    }
  }, [profile]);

  const handleShare = async () => {
    const text = `My BloomScroll Stats:\n\n${stats?.totalCardsRead || 0} cards read\n${streak.currentStreak} day streak\n${streak.longestStreak} longest streak\n${stats?.quizAccuracy || 0}% quiz accuracy\n\nJoin me: ${shareUrl}`;
    if (navigator.share) {
      try { await navigator.share({ text, url: shareUrl }); } catch {}
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      const granted = await requestNotificationPermission();
      if (granted) { setNotificationsEnabled(true); scheduleDailyReminder(reminderTime); }
    } else { setNotificationsEnabled(false); cancelDailyReminder(); }
  };

  const handleReminderTimeChange = (time: string) => {
    setReminderTime(time);
    if (notificationsEnabled) scheduleDailyReminder(time);
  };

  const handleWalletSave = async () => {
    if (!walletInput || walletSaving) return;
    setWalletSaving(true);
    try {
      const success = await updateWallet(walletInput);
      if (success) { setWalletSaved(true); setTimeout(() => setWalletSaved(false), 2000); }
    } catch (err) { console.error("Error saving wallet:", err); }
    setWalletSaving(false);
  };

  const handleUnpin = async (cardId: string) => {
    if (!profile) return;
    await unpinCard(profile.id, cardId);
    setPinnedCards(prev => prev.filter(p => p.card_id !== cardId));
  };

  const handleEditNote = async (cardId: string, note: string | null) => {
    if (!profile) return;
    await updatePinNote(profile.id, cardId, note);
    setPinnedCards(prev =>
      prev.map(p => (p.card_id === cardId ? { ...p, note } : p))
    );
  };

  const gardenUsername = profile?.fc_username || user?.email?.split("@")[0] || "";

  const displayName = profile?.fc_username
    ? `@${profile.fc_username}`
    : user?.email?.split("@")[0] || "Reader";

  if (!stats) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-pulse text-2xl font-bold text-botgreen">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-darkteal" style={{ fontFamily: "'Lexend', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-botsage/30 px-6 py-4">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/app"
              className="flex items-center justify-center p-2 rounded-full bg-botsage/20 hover:bg-botsage/30 text-botgreen transition-colors"
            >
              <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <div className="flex items-center gap-2">
              <svg className="size-5 text-botgreen" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9ZM5.6 10.25c0 1.64 1.33 2.97 2.97 2.97h.86c1.97 0 3.56-1.6 3.56-3.57v-5.4C12.99 2.56 11.43 1 9.43 1c-2 0-3.56 1.56-3.56 3.56v5.4c0 .1 0 .2-.27.29ZM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9Z" />
              </svg>
              <h2 className="text-xl font-bold tracking-tight text-botgreen" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>BloomScroll</h2>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-botgreen text-cream font-medium text-sm transition-transform active:scale-95 shadow-md"
          >
            <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            {copied ? "Copied!" : "Share Profile"}
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 md:px-12 py-10">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center mb-12">
          <div className="relative mb-6">
            <div className="w-36 h-36 rounded-full border-2 border-botsage p-1.5 bg-white shadow-sm">
              <div className="w-full h-full rounded-full bg-botsagelight flex items-center justify-center text-5xl">
                {profile?.fc_pfp_url ? (
                  <img src={profile.fc_pfp_url} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span>{displayName.charAt(0).toUpperCase()}</span>
                )}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white border border-botsage/50 rounded-full w-11 h-11 flex items-center justify-center text-xl shadow-md">
              🌿
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-darkteal" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {displayName}
          </h1>
          {user?.email && <p className="text-botsagedark font-medium mb-3">{user.email}</p>}
          <p className="text-sm text-botsagedark/80 mb-6 flex items-center justify-center gap-2">
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9ZM5.6 10.25c0 1.64 1.33 2.97 2.97 2.97h.86c1.97 0 3.56-1.6 3.56-3.57v-5.4C12.99 2.56 11.43 1 9.43 1c-2 0-3.56 1.56-3.56 3.56v5.4c0 .1 0 .2-.27.29ZM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9Z" />
            </svg>
            Member since {new Date(stats.joinedDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} • 🌱 {streak.currentStreak} Day Streak
          </p>
          <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border font-semibold text-sm shadow-sm ${
            isSubscribed ? "border-botsage/40 text-botgreen" : "border-botsage/20 text-botsagedark"
          }`}>
            {isSubscribed ? (
              <>
                <svg className="size-4 text-softclay" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Pro Member
              </>
            ) : (
              <>Free Plan</>
            )}
          </div>
          {!isSubscribed && (
            <Link href="/subscribe" className="block text-center mt-3 text-botgreen text-sm font-bold hover:underline">
              Upgrade to Pro →
            </Link>
          )}
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex border-b border-botsage/20 mb-10 justify-center">
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
                  ? "border-botgreen text-botgreen font-bold"
                  : "border-transparent text-botsagedark hover:text-botgreen"
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
                  <svg className="size-5 text-botgreen" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                )},
                { label: "Current Streak", value: `${streak.currentStreak} Days`, icon: (
                  <svg className="size-5 text-softclay" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.51 6.51 0 009 4.5a6.5 6.5 0 016.362.714z" />
                  </svg>
                )},
                { label: "Best Streak", value: `${streak.longestStreak} Days`, icon: (
                  <svg className="size-5 text-botgreen" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228M18.75 4.236V2.721M14.503 14.25a7.454 7.454 0 00.981-3.172M14.503 14.25H9.497m5.006 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 01-.981-3.172" />
                  </svg>
                )},
                { label: "Quiz Accuracy", value: `${stats.quizAccuracy}%`, icon: (
                  <svg className="size-5 text-mutedlav" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )},
              ].map((s, i) => (
                <div key={i} className="bg-white border border-botsage/30 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-botsagedark text-xs font-bold uppercase tracking-wider">{s.label}</span>
                    {s.icon}
                  </div>
                  <p className="text-3xl font-bold text-darkteal">{s.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Contribution Grid */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white border border-botsage/20 rounded-2xl p-8 mb-12 shadow-sm"
            >
              <h3 className="text-lg font-bold mb-8 flex items-center gap-2 text-darkteal" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Growth Activity
                <span className="text-xs font-normal text-botsagedark" style={{ fontFamily: "'Lexend', sans-serif" }}>
                  {stats.totalCardsRead.toLocaleString()} lessons blooming in the last year
                </span>
              </h3>
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[700px]">
                  <div className="flex">
                    {/* Day labels */}
                    <div className="flex flex-col justify-around text-[10px] text-botsagedark font-medium pr-2" style={{ height: grid.length > 0 ? undefined : 88 }}>
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
              <div className="mt-6 flex items-center justify-end gap-2 text-[10px] text-botsagedark uppercase font-bold tracking-wider">
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
              <h3 className="text-2xl font-bold mb-8 text-darkteal" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
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
                          <span className={`text-sm font-semibold capitalize ${color.text}`}>{topic.topic}</span>
                          <span className={`text-sm font-bold ${color.text}`}>{pct}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-botsage/20 rounded-full overflow-hidden">
                          <div className={`h-full ${color.bar} rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-botsagedark text-center py-8">Start reading to see your top topics!</p>
              )}
            </motion.div>

            {/* Share CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-botgreen rounded-3xl p-10 text-center relative overflow-hidden shadow-xl mb-10"
            >
              <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -left-16 -top-16 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 text-cream" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Ready to share your garden?
                </h3>
                <p className="text-botsagelight mb-8 max-w-md mx-auto">
                  Inspire others with your curated learning journey and consistent growth.
                </p>
                <button
                  onClick={handleShare}
                  className="bg-cream hover:bg-white text-botgreen px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
                >
                  {copied ? "Copied!" : "Share Your Progress"}
                </button>
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
              className="bg-white border border-botsage/20 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-darkteal">
                <svg className="size-5 text-botgreen" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Account
              </h2>
              <div className="space-y-3 text-sm">
                {user?.email && (
                  <div className="flex justify-between py-2 border-b border-botsage/10">
                    <span className="text-botsagedark">Email</span>
                    <span className="text-darkteal">{user.email}</span>
                  </div>
                )}
                {profile?.fc_username && (
                  <div className="flex justify-between py-2 border-b border-botsage/10">
                    <span className="text-botsagedark">Farcaster</span>
                    <span className="text-darkteal">@{profile.fc_username}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-botsagedark">Plan</span>
                  <span className={isSubscribed ? "text-botgreen font-bold" : "text-darkteal"}>
                    {isSubscribed ? "Pro" : "Free"}
                  </span>
                </div>
              </div>
              {!isSubscribed && (
                <Link
                  href="/subscribe"
                  className="block w-full mt-4 py-3 bg-botgreen rounded-xl text-center font-bold text-cream"
                >
                  Upgrade to Pro
                </Link>
              )}
            </motion.div>

            {/* Notifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white border border-botsage/20 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-darkteal">
                <svg className="size-5 text-botgreen" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                Daily Reminder
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-darkteal">Push Notifications</p>
                    <p className="text-xs text-botsagedark">Get reminded to read daily</p>
                  </div>
                  <button
                    onClick={handleNotificationToggle}
                    className={`w-14 h-8 rounded-full transition-all relative ${notificationsEnabled ? "bg-botgreen" : "bg-botsage/30"}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all shadow-sm ${notificationsEnabled ? "right-1" : "left-1"}`} />
                  </button>
                </div>
                {notificationsEnabled && (
                  <div className="flex items-center justify-between pt-4 border-t border-botsage/10">
                    <div>
                      <p className="font-medium text-darkteal">Reminder Time</p>
                      <p className="text-xs text-botsagedark">When should we nudge you?</p>
                    </div>
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => handleReminderTimeChange(e.target.value)}
                      className="bg-cream rounded-lg px-3 py-2 text-sm border border-botsage/30 focus:border-botgreen outline-none text-darkteal"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Sound Effects */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="bg-white border border-botsage/20 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-darkteal">
                <svg className="size-5 text-botgreen" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
                Sound Effects
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-darkteal">Enable Sounds</p>
                  <p className="text-xs text-botsagedark">Swipe, save, and milestone sounds</p>
                </div>
                <button
                  onClick={() => { const v = !soundEnabled; setSoundEnabledState(v); setSoundEnabled(v); if (v) sounds.save(); }}
                  className={`w-14 h-8 rounded-full transition-all relative ${soundEnabled ? "bg-botgreen" : "bg-botsage/30"}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all shadow-sm ${soundEnabled ? "right-1" : "left-1"}`} />
                </button>
              </div>
            </motion.div>

            {/* Daily Goal */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}
              className="bg-white border border-botsage/20 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-darkteal">
                <svg className="size-5 text-botgreen" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                Daily Goal
              </h2>
              <p className="text-xs text-botsagedark mb-4">Cards to read per day</p>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map(g => (
                  <button
                    key={g}
                    onClick={() => { saveDailyGoal(g); setDailyGoal(g); }}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${
                      dailyGoal === g
                        ? "bg-botgreen text-cream"
                        : "bg-botsage/15 text-botsagedark hover:bg-botsage/25"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Streak Shield */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="bg-white border border-botsage/20 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-darkteal">
                <svg className="size-5 text-botgreen" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Streak Shield
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-darkteal">Protect your streak</p>
                  <p className="text-xs text-botsagedark">Saves your streak if you miss 1 day</p>
                </div>
                {isSubscribed ? (
                  <button
                    onClick={() => { const v = !streakFreezeActive; saveStreakFreeze(v); setStreakFreezeActive(v); }}
                    className={`w-14 h-8 rounded-full transition-all relative ${streakFreezeActive ? "bg-botgreen" : "bg-botsage/30"}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all shadow-sm ${streakFreezeActive ? "right-1" : "left-1"}`} />
                  </button>
                ) : (
                  <Link
                    href="/subscribe"
                    className="text-xs font-bold text-botgreen bg-botgreen/10 px-4 py-2 rounded-full"
                  >
                    Pro Only
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Wallet */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white border border-botsage/20 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-darkteal">
                <svg className="size-5 text-botgreen" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                </svg>
                Wallet Address
              </h2>
              <p className="text-xs text-botsagedark mb-4">For crypto payments and rewards</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={walletInput}
                  onChange={(e) => setWalletInput(e.target.value)}
                  placeholder="0x..."
                  className="flex-1 bg-cream rounded-xl px-4 py-3 text-sm border border-botsage/30 focus:border-botgreen outline-none font-mono text-darkteal"
                />
                <button
                  onClick={handleWalletSave}
                  disabled={walletSaving || !walletInput}
                  className={`px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    walletSaved
                      ? "bg-botgreen text-cream"
                      : walletSaving || !walletInput
                        ? "bg-botsage/20 text-botsagedark cursor-not-allowed"
                        : "bg-botgreen text-cream hover:bg-botgreen/90"
                  }`}
                >
                  {walletSaved ? "✓" : walletSaving ? "..." : "Save"}
                </button>
              </div>
            </motion.div>

            {/* Sign Out */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white border border-softclay/20 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <button
                onClick={() => { signOut(); window.location.href = "/"; }}
                className="w-full py-3 border border-softclay/30 rounded-xl text-softclay hover:bg-softclay/5 transition-all text-sm font-bold"
              >
                Sign Out
              </button>
            </motion.div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="p-10 text-center text-botsagedark text-sm border-t border-botsage/10">
        <p className="text-lg mb-2 italic" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Grow a little every day.</p>
        <p>&copy; 2025 BloomScroll. Organic wisdom, curated for you.</p>
      </footer>
    </div>
  );
}
