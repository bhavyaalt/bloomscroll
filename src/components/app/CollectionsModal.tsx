"use client";

import { motion } from "framer-motion";
import { collections, Collection } from "@/lib/collections";

interface CollectionsModalProps {
  onSelect: (collection: Collection) => void;
  onClose: () => void;
}

export default function CollectionsModal({ onSelect, onClose }: CollectionsModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-2xl max-w-md w-full max-h-[80vh] overflow-auto"
      >
        <div className="p-6">
          <h2 className="font-instrument-serif font-medium text-xl mb-4 text-slate-900">Collections</h2>
          <div className="space-y-3">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => onSelect(collection)}
                className="w-full p-4 rounded-xl text-left transition-all bg-slate-50 hover:bg-slate-100"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{collection.emoji}</span>
                  <div>
                    <span className="font-medium block text-slate-900">{collection.name}</span>
                    <span className="text-xs text-slate-500">{collection.description}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
