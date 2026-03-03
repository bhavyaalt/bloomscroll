"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { 
  getReadingStats, 
  getWeeklyGrid, 
  getTopTopics,
  ReadingStats 
} from "@/lib/reading-stats";
import { getStreakData, getStreakEmoji } from "@/lib/streak";
import { 
  requestNotificationPermission, 
  scheduleDailyReminder,
  cancelDailyReminder,
  getNotificationSettings,
  NotificationSettings
} from "@/lib/push-notifications";
import { getSoundEnabled, setSoundEnabled, sounds } from "@/lib/sounds";

const LEVEL_COLORS = [
  "bg-[#007A5E]/10", // 0 - no activity
  "bg-[#007A5E]/30", // 1 - light
  "bg-[#007A5E]/50", // 2 - medium
  "bg-[#007A5E]/70", // 3 - high
  "bg-[#007A5E]",    // 4 - max
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function ProfilePage() {
  const { user, profile, isSubscribed, signOut, updateWallet } = useAuth();
  
  const [stats, setStats] = useState<ReadingStats | null>(null);
  const [grid, setGrid] = useState<{ date: string; count: number; level: number }[][]>([]);
  const [topTopics, setTopTopics] = useState<{ topic: string; count: number }[]>([]);
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 });
  
  // Settings states
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState("09:00");
  const [walletInput, setWalletInput] = useState("");
  const [walletSaving, setWalletSaving] = useState(false);
  const [walletSaved, setWalletSaved] = useState(false);
  
  // Share states
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Sound effects
  const [soundEnabled, setSoundEnabledState] = useState(true);

  // Active tab
  const [activeTab, setActiveTab] = useState<'stats' | 'settings'>('stats');

  useEffect(() => {
    const s = getReadingStats();
    setStats(s);
    setGrid(getWeeklyGrid(52));
    setTopTopics(getTopTopics(5));
    setStreak(getStreakData());
    setShareUrl(`${window.location.origin}/profile`);
    
    // Load notification settings
    const notifSettings = getNotificationSettings();
    setNotificationsEnabled(notifSettings.enabled);
    setReminderTime(notifSettings.reminderTime || "09:00");
    
    // Load sound settings
    setSoundEnabledState(getSoundEnabled());
    
    // Load wallet
    if (profile?.wallet_address) {
      setWalletInput(profile.wallet_address);
    }
  }, [profile]);

  const handleShare = async () => {
    const text = `🌱 My Bloomscroll Stats:\n\n📚 ${stats?.totalCardsRead || 0} cards read\n🔥 ${streak.currentStreak} day streak\n🏆 ${streak.longestStreak} longest streak\n🧠 ${stats?.quizAccuracy || 0}% quiz accuracy\n\nJoin me: ${shareUrl}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text, url: shareUrl });
      } catch {}
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        setNotificationsEnabled(true);
        scheduleDailyReminder(reminderTime);
      }
    } else {
      setNotificationsEnabled(false);
      cancelDailyReminder();
    }
  };

  const handleReminderTimeChange = (time: string) => {
    setReminderTime(time);
    if (notificationsEnabled) {
      scheduleDailyReminder(time);
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
      }
    } catch (err) {
      console.error('Error saving wallet:', err);
    }
    setWalletSaving(false);
  };

  const displayName = profile?.fc_username 
    ? `@${profile.fc_username}` 
    : user?.email?.split('@')[0] || 'Reader';

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="animate-pulse font-impact text-4xl text-[#007A5E]">Loading...</div>
      </div>
    );
  }

  // Calculate month labels for the grid
  const getMonthLabels = () => {
    const labels: { month: string; offset: number }[] = [];
    let currentMonth = -1;
    
    grid.forEach((week, weekIndex) => {
      if (week[0]) {
        const month = new Date(week[0].date).getMonth();
        if (month !== currentMonth) {
          currentMonth = month;
          labels.push({ month: MONTHS[month], offset: weekIndex });
        }
      }
    });
    
    return labels;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/app" className="flex items-center gap-2">
            <span className="text-xl">←</span>
            <span className="font-impact text-lg uppercase tracking-tight text-[#007A5E]">Back</span>
          </Link>
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-[#007A5E] rounded-full text-sm font-bold"
          >
            {copied ? "Copied!" : "Share Profile"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#007A5E] to-[#4D9E8A] rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
            {getStreakEmoji(streak.currentStreak)}
          </div>
          <h1 className="font-impact text-3xl uppercase mb-1">{displayName}</h1>
          {user?.email && <p className="text-white/40 text-sm">{user.email}</p>}
          <p className="text-white/60 text-sm mt-2">Member since {new Date(stats.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </motion.div>

        {/* Plan Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <div className={`mx-auto w-fit px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider ${
            isSubscribed 
              ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400"
              : "bg-white/5 border border-white/10 text-white/60"
          }`}>
            {isSubscribed ? "⭐ Pro Member" : "Free Plan"}
          </div>
          {!isSubscribed && (
            <Link 
              href="/subscribe" 
              className="block text-center mt-3 text-[#007A5E] text-sm font-bold hover:underline"
            >
              Upgrade to Pro →
            </Link>
          )}
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-xl">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
              activeTab === 'stats' 
                ? 'bg-[#007A5E] text-white' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            📊 Stats
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
              activeTab === 'settings' 
                ? 'bg-[#007A5E] text-white' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            ⚙️ Settings
          </button>
        </div>

        {activeTab === 'stats' && (
          <>
            {/* Stats Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              <div className="bg-white/5 rounded-2xl p-5 text-center border border-white/10">
                <div className="text-3xl font-impact text-[#007A5E]">{stats.totalCardsRead}</div>
                <div className="text-xs text-white/60 mt-1">Cards Read</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 text-center border border-white/10">
                <div className="text-3xl font-impact text-orange-400">{streak.currentStreak}</div>
                <div className="text-xs text-white/60 mt-1">Current Streak</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 text-center border border-white/10">
                <div className="text-3xl font-impact text-yellow-400">{streak.longestStreak}</div>
                <div className="text-xs text-white/60 mt-1">Best Streak</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 text-center border border-white/10">
                <div className="text-3xl font-impact text-purple-400">{stats.quizAccuracy}%</div>
                <div className="text-xs text-white/60 mt-1">Quiz Accuracy</div>
              </div>
            </motion.div>

            {/* Contribution Grid - GitHub Style */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8"
            >
              <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
                <span>📅</span>
                <span>{stats.totalCardsRead} cards read in the last year</span>
              </h2>
              
              {/* Grid */}
              <div className="flex gap-1 overflow-x-auto pb-2">
                {/* Day labels */}
                <div className="flex flex-col gap-1 mr-2 text-xs text-white/40">
                  {DAYS.map((day, i) => (
                    <div key={i} className="h-3 flex items-center">{day}</div>
                  ))}
                </div>
                
                {/* Contribution squares */}
                {grid.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`w-3 h-3 rounded-sm ${LEVEL_COLORS[day.level]} transition-all hover:scale-125 cursor-pointer`}
                        title={`${day.date}: ${day.count} cards`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-4 text-xs text-white/40">
                <span>Less</span>
                {LEVEL_COLORS.map((color, i) => (
                  <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
                ))}
                <span>More</span>
              </div>
            </motion.div>

            {/* Top Topics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>🏷️</span>
                <span>Top Topics</span>
              </h2>
              
              {topTopics.length > 0 ? (
                <div className="space-y-3">
                  {topTopics.map((topic, i) => (
                    <div key={topic.topic} className="flex items-center gap-3">
                      <span className="text-2xl">{["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][i]}</span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="capitalize font-medium">{topic.topic}</span>
                          <span className="text-white/60">{topic.count} cards</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#007A5E] to-[#4D9E8A] rounded-full"
                            style={{ width: `${(topic.count / (topTopics[0]?.count || 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/40 text-center py-8">Start reading to see your top topics!</p>
              )}
            </motion.div>

            {/* Share CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-[#007A5E] to-[#4D9E8A] rounded-2xl p-8 text-center"
            >
              <h3 className="font-impact text-2xl uppercase mb-2">Share Your Progress</h3>
              <p className="text-white/80 mb-6">Show off your reading streak to friends!</p>
              <button
                onClick={handleShare}
                className="px-8 py-3 bg-white text-[#007A5E] rounded-full font-bold uppercase hover:scale-105 transition-transform"
              >
                {copied ? "✓ Copied!" : "Share Stats"}
              </button>
            </motion.div>
          </>
        )}

        {activeTab === 'settings' && (
          <>
            {/* Account Settings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>👤</span>
                <span>Account</span>
              </h2>
              <div className="space-y-3 text-sm">
                {user?.email && (
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-white/60">Email</span>
                    <span>{user.email}</span>
                  </div>
                )}
                {profile?.fc_username && (
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-white/60">Farcaster</span>
                    <span>@{profile.fc_username}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-white/60">Plan</span>
                  <span className={isSubscribed ? "text-yellow-400 font-bold" : ""}>
                    {isSubscribed ? "Pro ⭐" : "Free"}
                  </span>
                </div>
              </div>
              {!isSubscribed && (
                <Link 
                  href="/subscribe" 
                  className="block w-full mt-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-center font-bold text-black"
                >
                  Upgrade to Pro
                </Link>
              )}
            </motion.div>

            {/* Notifications */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>🔔</span>
                <span>Daily Reminder</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-xs text-white/40">Get reminded to read daily</p>
                  </div>
                  <button
                    onClick={handleNotificationToggle}
                    className={`w-14 h-8 rounded-full transition-all relative ${
                      notificationsEnabled ? 'bg-[#007A5E]' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${
                      notificationsEnabled ? 'right-1' : 'left-1'
                    }`} />
                  </button>
                </div>
                
                {notificationsEnabled && (
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <p className="font-medium">Reminder Time</p>
                      <p className="text-xs text-white/40">When should we nudge you?</p>
                    </div>
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => handleReminderTimeChange(e.target.value)}
                      className="bg-white/10 rounded-lg px-3 py-2 text-sm border border-white/10 focus:border-[#007A5E] outline-none"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Sound Effects */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>🔊</span>
                <span>Sound Effects</span>
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Sounds</p>
                  <p className="text-xs text-white/40">Swipe, save, and milestone sounds</p>
                </div>
                <button
                  onClick={() => {
                    const newValue = !soundEnabled;
                    setSoundEnabledState(newValue);
                    setSoundEnabled(newValue);
                    if (newValue) sounds.save();
                  }}
                  className={`w-14 h-8 rounded-full transition-all relative ${
                    soundEnabled ? 'bg-[#007A5E]' : 'bg-white/20'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${
                    soundEnabled ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>
            </motion.div>

            {/* Wallet */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>💳</span>
                <span>Wallet Address</span>
              </h2>
              <p className="text-xs text-white/40 mb-4">For crypto payments and rewards</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={walletInput}
                  onChange={(e) => setWalletInput(e.target.value)}
                  placeholder="0x..."
                  className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-sm border border-white/10 focus:border-[#007A5E] outline-none font-mono"
                />
                <button
                  onClick={handleWalletSave}
                  disabled={walletSaving || !walletInput}
                  className={`px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    walletSaved 
                      ? 'bg-green-500 text-white' 
                      : walletSaving || !walletInput
                        ? 'bg-white/10 text-white/40 cursor-not-allowed'
                        : 'bg-[#007A5E] text-white hover:bg-[#005a46]'
                  }`}
                >
                  {walletSaved ? '✓' : walletSaving ? '...' : 'Save'}
                </button>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 rounded-2xl p-6 border border-red-500/20 mb-6"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-400">
                <span>⚠️</span>
                <span>Danger Zone</span>
              </h2>
              <button
                onClick={() => {
                  signOut();
                  window.location.href = '/';
                }}
                className="w-full py-3 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm font-bold"
              >
                Sign Out
              </button>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}
