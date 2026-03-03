"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { followUser, unfollowUser, isFollowing, getFollowCounts } from "@/lib/social";

interface FollowButtonProps {
  currentUserId?: string;
  targetUserId: string;
  onFollowChange?: (following: boolean) => void;
}

export default function FollowButton({ currentUserId, targetUserId, onFollowChange }: FollowButtonProps) {
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({ followers: 0, following: 0 });

  useEffect(() => {
    if (!currentUserId || currentUserId === targetUserId) return;
    
    const checkFollow = async () => {
      const result = await isFollowing(currentUserId, targetUserId);
      setFollowing(result);
    };
    checkFollow();
  }, [currentUserId, targetUserId]);

  useEffect(() => {
    const fetchCounts = async () => {
      const result = await getFollowCounts(targetUserId);
      setCounts(result);
    };
    fetchCounts();
  }, [targetUserId, following]);

  const handleClick = async () => {
    if (!currentUserId || loading) return;
    
    setLoading(true);
    try {
      if (following) {
        await unfollowUser(currentUserId, targetUserId);
        setFollowing(false);
        onFollowChange?.(false);
      } else {
        await followUser(currentUserId, targetUserId);
        setFollowing(true);
        onFollowChange?.(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // Don't show button if viewing own profile or not logged in
  if (!currentUserId || currentUserId === targetUserId) {
    return (
      <div className="flex gap-4 text-sm">
        <span className="text-[#007A5E]">
          <strong>{counts.followers}</strong> followers
        </span>
        <span className="text-[#007A5E]">
          <strong>{counts.following}</strong> following
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        disabled={loading}
        className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
          following
            ? "bg-white/50 text-[#007A5E] border-2 border-[#007A5E]"
            : "bg-[#007A5E] text-[#EACCD4]"
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </span>
        ) : following ? (
          "Following"
        ) : (
          "Follow"
        )}
      </motion.button>
      
      <div className="flex gap-3 text-sm">
        <span className="text-[#007A5E]">
          <strong>{counts.followers}</strong> followers
        </span>
      </div>
    </div>
  );
}
