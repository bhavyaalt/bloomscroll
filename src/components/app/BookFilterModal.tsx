"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { contentLibrary, getAllBooks } from "@/lib/content-library";

interface BookFilterModalProps {
  selectedBook: string | null;
  isSubscribed: boolean;
  onSelect: (book: string | null) => void;
  onClose: () => void;
}

export default function BookFilterModal({ selectedBook, isSubscribed, onSelect, onClose }: BookFilterModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1a2e23] border border-white/10 rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl flex items-center gap-2">
              <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              Browse by Book
            </h2>
            <button onClick={onClose} className="text-white/40 hover:text-white text-2xl">×</button>
          </div>
          <p className="text-sm text-white/50 mt-2">
            {isSubscribed ? "Select a book to read all its quotes" : "Pro feature — Upgrade to browse by book"}
          </p>
        </div>
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {!isSubscribed ? (
            <div className="text-center py-8">
              <div className="mb-4 flex justify-center">
                <svg className="size-12 text-white/40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
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
                onClick={() => { onSelect(null); onClose(); }}
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
                  onClick={() => { onSelect(book); onClose(); }}
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
  );
}
