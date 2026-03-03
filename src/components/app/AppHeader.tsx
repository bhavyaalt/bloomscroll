"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getStreakEmoji } from "@/lib/streak";
import { StreakState } from "./types";

interface AppHeaderProps {
  user: { email?: string } | null;
  profile: { fc_username?: string; fc_pfp_url?: string } | null;
  isSubscribed: boolean;
  streak: StreakState;
  savedCount: number;
  showSaved: boolean;
  showUserMenu: boolean;
  reviewDueCount?: number;
  onToggleSaved: () => void;
  onToggleUserMenu: () => void;
  onShowStreakModal: () => void;
  onShowBookFilter: () => void;
  onShowCollections: () => void;
  onShowSettings: () => void;
  onShowReview?: () => void;
  onShowAchievements?: () => void;
  onShowLeaderboard?: () => void;
  onSignOut: () => Promise<void>;
}

export default function AppHeader({
  user,
  profile,
  isSubscribed,
  streak,
  savedCount,
  showSaved,
  showUserMenu,
  onToggleSaved,
  onToggleUserMenu,
  onShowStreakModal,
  onShowBookFilter,
  onShowCollections,
  onShowSettings,
  onShowReview,
  onShowAchievements,
  onShowLeaderboard,
  onSignOut,
  reviewDueCount = 0,
}: AppHeaderProps) {
  const [activeCount, setActiveCount] = useState<number | null>(null);

  useEffect(() => {
    if (!user && !profile) return;
    fetch("/api/active-today")
      .then((r) => r.json())
      .then((d) => setActiveCount(d.count))
      .catch(() => {});
  }, [user, profile]);

  const displayInitial = profile?.fc_username
    ? profile.fc_username.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "?";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#102219]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-2xl mx-auto px-2 sm:px-4 h-12 sm:h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5">
            <div className="size-6 sm:size-7 flex items-center justify-center bg-primary rounded-lg">
              <svg className="size-3.5 sm:size-4 text-[#102219]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9ZM5.6 10.25c0 1.64 1.33 2.97 2.97 2.97h.86c1.97 0 3.56-1.6 3.56-3.57v-5.4C12.99 2.56 11.43 1 9.43 1c-2 0-3.56 1.56-3.56 3.56v5.4c0 .1 0 .2-.27.29ZM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9Z" />
              </svg>
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-primary hidden min-[400px]:inline">BloomScroll</span>
          </Link>

          {/* Right controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Books - hidden on very small screens */}
            <button
              onClick={onShowBookFilter}
              className="hidden sm:flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-white/60 hover:text-white/80 hover:bg-white/5 transition-all text-sm"
            >
              <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </button>

            {/* Streak */}
            <button
              onClick={onShowStreakModal}
              className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-white/60 hover:text-white/80 hover:bg-white/5 transition-all"
            >
              <span className="text-xs sm:text-sm">🔥</span>
              <span className="text-xs sm:text-sm font-bold text-white/70">{streak.currentStreak}</span>
            </button>

            {/* Achievements */}
            {onShowAchievements && (
              <button
                onClick={onShowAchievements}
                className="flex items-center gap-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-white/60 hover:text-white/80 hover:bg-white/5 transition-all"
                title="Achievements"
              >
                <span className="text-xs sm:text-sm">🏆</span>
              </button>
            )}

            {/* Leaderboard */}
            {onShowLeaderboard && (
              <button
                onClick={onShowLeaderboard}
                className="hidden min-[400px]:flex items-center gap-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-white/60 hover:text-white/80 hover:bg-white/5 transition-all"
                title="Leaderboard"
              >
                <span className="text-xs sm:text-sm">📊</span>
              </button>
            )}

            {/* Saved */}
            <button
              onClick={onToggleSaved}
              className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-full transition-all ${
                showSaved
                  ? "bg-primary text-[#102219]"
                  : "text-white/60 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <svg className="size-3.5 sm:size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs sm:text-sm font-bold">{savedCount}</span>
            </button>

            {/* User avatar / Login */}
            {user || profile ? (
              <button
                onClick={onToggleUserMenu}
                className="size-7 sm:size-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15 transition-all overflow-hidden border border-white/10"
              >
                {profile?.fc_pfp_url ? (
                  <img src={profile.fc_pfp_url} alt="" className="size-full object-cover" />
                ) : (
                  <span className="text-xs sm:text-sm font-bold text-white/70">{displayInitial}</span>
                )}
              </button>
            ) : (
              <Link
                href="/auth?redirect=/app"
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary text-[#102219] text-xs sm:text-sm font-bold hover:bg-primary/90 transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* User Menu Dropdown */}
      {showUserMenu && (
        <div className="fixed top-16 right-4 z-50 bg-[#1a2e23] border border-white/10 rounded-xl p-2 min-w-[200px] shadow-2xl">
          {user || profile ? (
            <>
              <div className="px-3 py-2 text-xs text-white/40 truncate border-b border-white/10 mb-1">
                {user?.email || profile?.fc_username || "User"}
              </div>
              <Link
                href="/profile"
                onClick={onToggleUserMenu}
                className="w-full px-3 py-2.5 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-2.5 text-white/70"
              >
                <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                My Stats
              </Link>
              <button
                onClick={() => { onShowBookFilter(); onToggleUserMenu(); }}
                className="w-full px-3 py-2.5 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-2.5 text-white/70"
              >
                <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                Browse Books {!isSubscribed && <span className="text-xs text-white/30 ml-auto">PRO</span>}
              </button>
              <button
                onClick={() => { onShowCollections(); onToggleUserMenu(); }}
                className="w-full px-3 py-2.5 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-2.5 text-white/70"
              >
                <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-1.243 1.007-2.25 2.25-2.25h13.5" />
                </svg>
                Collections
              </button>
              {onShowReview && (
                <button
                  onClick={() => { onShowReview(); onToggleUserMenu(); }}
                  className="w-full px-3 py-2.5 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-2.5 text-white/70"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                  </svg>
                  Review Cards
                  {reviewDueCount > 0 && (
                    <span className="ml-auto text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold">
                      {reviewDueCount}
                    </span>
                  )}
                </button>
              )}
              <Link
                href="/profile"
                onClick={onToggleUserMenu}
                className="w-full px-3 py-2.5 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-2.5 text-white/70"
              >
                <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                Reminders
              </Link>
              <button
                onClick={() => { onShowSettings(); onToggleUserMenu(); }}
                className="w-full px-3 py-2.5 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-2.5 text-white/70"
              >
                <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>
              <div className="border-t border-white/5 mt-1 pt-1">
                <button
                  onClick={async () => { await onSignOut(); window.location.href = "/"; }}
                  className="w-full px-3 py-2.5 text-left text-sm hover:bg-white/5 rounded-lg text-white/30"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="px-3 py-2 text-xs text-white/40 border-b border-white/10 mb-1">
                Not signed in
              </div>
              <Link
                href="/auth?redirect=/app"
                className="block px-3 py-2.5 text-sm hover:bg-white/5 rounded-lg text-primary font-medium"
                onClick={onToggleUserMenu}
              >
                Sign in to sync
              </Link>
              <button
                onClick={() => { onShowCollections(); onToggleUserMenu(); }}
                className="w-full px-3 py-2.5 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-2.5 text-white/60"
              >
                Collections
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
