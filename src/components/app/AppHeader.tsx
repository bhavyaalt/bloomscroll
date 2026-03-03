"use client";

import Link from "next/link";
import { getStreakEmoji } from "@/lib/streak";
import { StreakState } from "./types";

interface AppHeaderProps {
  user: { email?: string } | null;
  profile: { fc_username?: string } | null;
  isSubscribed: boolean;
  streak: StreakState;
  savedCount: number;
  showSaved: boolean;
  showUserMenu: boolean;
  onToggleSaved: () => void;
  onToggleUserMenu: () => void;
  onShowStreakModal: () => void;
  onShowBookFilter: () => void;
  onShowCollections: () => void;
  onShowSettings: () => void;
  onSignOut: () => void;
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
  onSignOut,
}: AppHeaderProps) {
  return (
    <>
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
              onClick={onShowStreakModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30"
            >
              <span>{getStreakEmoji(streak.currentStreak)}</span>
              <span className="text-sm font-bold text-orange-400">{streak.currentStreak}</span>
            </button>

            {/* Saved */}
            <button
              onClick={onToggleSaved}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all ${
                showSaved
                  ? "bg-[#007A5E] text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <span>★</span>
              <span className="text-sm font-bold">{savedCount}</span>
            </button>

            {/* Login button */}
            {!user && !profile && (
              <Link
                href="/auth?redirect=/app"
                className="px-3 py-1.5 rounded-full bg-[#007A5E] text-white text-sm font-bold hover:bg-[#005a46] transition-all"
              >
                Login
              </Link>
            )}

            {/* Menu */}
            {(user || profile) && (
              <button
                onClick={onToggleUserMenu}
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
                onClick={onToggleUserMenu}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg flex items-center gap-2"
              >
                📊 My Stats
              </Link>
              <button
                onClick={() => { onShowBookFilter(); onToggleUserMenu(); }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg flex items-center gap-2"
              >
                📚 Browse Books {!isSubscribed && "🔒"}
              </button>
              <button
                onClick={() => { onShowCollections(); onToggleUserMenu(); }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg flex items-center gap-2"
              >
                📚 Collections
              </button>
              <Link
                href="/notifications"
                onClick={onToggleUserMenu}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg flex items-center gap-2"
              >
                🔔 Reminders
              </Link>
              <button
                onClick={() => { onShowSettings(); onToggleUserMenu(); }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg flex items-center gap-2"
              >
                ⚙️ Settings
              </button>
              <button
                onClick={() => { onSignOut(); onToggleUserMenu(); }}
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
                onClick={onToggleUserMenu}
              >
                ✨ Sign in
              </Link>
              <div className="px-3 py-2 text-xs text-white/30">
                Sync saves across devices
              </div>
              <button
                onClick={() => { onShowCollections(); onToggleUserMenu(); }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 rounded-lg flex items-center gap-2 text-white/60"
              >
                📚 Collections
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
