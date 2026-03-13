"use client";

import Link from "next/link";

interface BottomNavProps {
  activeTab: "feed" | "library" | "profile";
  savedCount: number;
  onShowSaved: () => void;
}

export default function BottomNav({ activeTab, savedCount, onShowSaved }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-around">
        {/* Feed / Home */}
        <Link
          href="/app"
          className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
            activeTab === "feed"
              ? "text-brand"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="text-[10px] font-medium">Feed</span>
        </Link>

        {/* Library / Saved */}
        <button
          onClick={onShowSaved}
          className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all relative ${
            activeTab === "library"
              ? "text-brand"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          <span className="text-[10px] font-medium">Library</span>
          {savedCount > 0 && (
            <span className="absolute -top-0.5 right-2 bg-brand text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
              {savedCount > 99 ? "99+" : savedCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <Link
          href="/profile"
          className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
            activeTab === "profile"
              ? "text-brand"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
