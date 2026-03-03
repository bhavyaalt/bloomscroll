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
        className="bg-[#1f1f1f] border border-white/10 rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl">📚 Browse by Book</h2>
            <button onClick={onClose} className="text-white/40 hover:text-white text-2xl">×</button>
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
