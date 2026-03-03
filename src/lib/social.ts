// Social features - followers, leaderboards, reactions

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Types
export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Reaction {
  id: string;
  user_id: string;
  pin_id: string;
  emoji: string;
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  pin_id: string;
  content: string;
  created_at: string;
  user?: {
    fc_username?: string;
    fc_display_name?: string;
    fc_pfp_url?: string;
  };
}

export interface LeaderboardEntry {
  user_id: string;
  username: string;
  display_name: string;
  pfp_url: string;
  value: number;
  rank: number;
}

// Follow functions
export async function followUser(followerId: string, followingId: string): Promise<boolean> {
  const { error } = await supabase
    .from("bloomscroll_follows")
    .insert({ follower_id: followerId, following_id: followingId });
  
  return !error;
}

export async function unfollowUser(followerId: string, followingId: string): Promise<boolean> {
  const { error } = await supabase
    .from("bloomscroll_follows")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);
  
  return !error;
}

export async function isFollowing(followerId: string, followingId: string): Promise<boolean> {
  const { data } = await supabase
    .from("bloomscroll_follows")
    .select("id")
    .eq("follower_id", followerId)
    .eq("following_id", followingId)
    .single();
  
  return !!data;
}

export async function getFollowers(userId: string): Promise<string[]> {
  const { data } = await supabase
    .from("bloomscroll_follows")
    .select("follower_id")
    .eq("following_id", userId);
  
  return data?.map(f => f.follower_id) || [];
}

export async function getFollowing(userId: string): Promise<string[]> {
  const { data } = await supabase
    .from("bloomscroll_follows")
    .select("following_id")
    .eq("follower_id", userId);
  
  return data?.map(f => f.following_id) || [];
}

export async function getFollowCounts(userId: string): Promise<{ followers: number; following: number }> {
  const [followers, following] = await Promise.all([
    supabase.from("bloomscroll_follows").select("id", { count: "exact" }).eq("following_id", userId),
    supabase.from("bloomscroll_follows").select("id", { count: "exact" }).eq("follower_id", userId),
  ]);
  
  return {
    followers: followers.count || 0,
    following: following.count || 0,
  };
}

// Reaction functions (for pins)
export async function addReaction(userId: string, pinId: string, emoji: string): Promise<boolean> {
  // Remove existing reaction first (one per user per pin)
  await supabase
    .from("bloomscroll_reactions")
    .delete()
    .eq("user_id", userId)
    .eq("pin_id", pinId);
  
  const { error } = await supabase
    .from("bloomscroll_reactions")
    .insert({ user_id: userId, pin_id: pinId, emoji });
  
  return !error;
}

export async function removeReaction(userId: string, pinId: string): Promise<boolean> {
  const { error } = await supabase
    .from("bloomscroll_reactions")
    .delete()
    .eq("user_id", userId)
    .eq("pin_id", pinId);
  
  return !error;
}

export async function getReactions(pinId: string): Promise<{ emoji: string; count: number; users: string[] }[]> {
  const { data } = await supabase
    .from("bloomscroll_reactions")
    .select("emoji, user_id")
    .eq("pin_id", pinId);
  
  if (!data) return [];
  
  const grouped: Record<string, string[]> = {};
  data.forEach(r => {
    if (!grouped[r.emoji]) grouped[r.emoji] = [];
    grouped[r.emoji].push(r.user_id);
  });
  
  return Object.entries(grouped).map(([emoji, users]) => ({
    emoji,
    count: users.length,
    users,
  }));
}

// Comment functions
export async function addComment(userId: string, pinId: string, content: string): Promise<Comment | null> {
  const { data, error } = await supabase
    .from("bloomscroll_comments")
    .insert({ user_id: userId, pin_id: pinId, content })
    .select()
    .single();
  
  if (error) return null;
  return data;
}

export async function getComments(pinId: string): Promise<Comment[]> {
  const { data } = await supabase
    .from("bloomscroll_comments")
    .select(`
      *,
      profiles:user_id (
        fc_username,
        fc_display_name,
        fc_pfp_url
      )
    `)
    .eq("pin_id", pinId)
    .order("created_at", { ascending: true });
  
  return data?.map(c => ({
    ...c,
    user: c.profiles,
  })) || [];
}

export async function deleteComment(commentId: string, userId: string): Promise<boolean> {
  const { error } = await supabase
    .from("bloomscroll_comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", userId);
  
  return !error;
}

// Leaderboard functions
export async function getStreakLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
  const { data } = await supabase
    .from("profiles")
    .select("id, fc_username, fc_display_name, fc_pfp_url, current_streak")
    .not("current_streak", "is", null)
    .order("current_streak", { ascending: false })
    .limit(limit);
  
  return data?.map((p, i) => ({
    user_id: p.id,
    username: p.fc_username || "anonymous",
    display_name: p.fc_display_name || p.fc_username || "Anonymous",
    pfp_url: p.fc_pfp_url || "",
    value: p.current_streak || 0,
    rank: i + 1,
  })) || [];
}

export async function getCardsReadLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
  const { data } = await supabase
    .from("profiles")
    .select("id, fc_username, fc_display_name, fc_pfp_url, total_cards_read")
    .not("total_cards_read", "is", null)
    .order("total_cards_read", { ascending: false })
    .limit(limit);
  
  return data?.map((p, i) => ({
    user_id: p.id,
    username: p.fc_username || "anonymous",
    display_name: p.fc_display_name || p.fc_username || "Anonymous",
    pfp_url: p.fc_pfp_url || "",
    value: p.total_cards_read || 0,
    rank: i + 1,
  })) || [];
}

export async function getXpLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
  const { data } = await supabase
    .from("profiles")
    .select("id, fc_username, fc_display_name, fc_pfp_url, total_xp")
    .not("total_xp", "is", null)
    .order("total_xp", { ascending: false })
    .limit(limit);
  
  return data?.map((p, i) => ({
    user_id: p.id,
    username: p.fc_username || "anonymous",
    display_name: p.fc_display_name || p.fc_username || "Anonymous",
    pfp_url: p.fc_pfp_url || "",
    value: p.total_xp || 0,
    rank: i + 1,
  })) || [];
}

// Sync local stats to profile for leaderboard
export async function syncStatsToProfile(userId: string, stats: {
  currentStreak: number;
  totalCardsRead: number;
  totalXp: number;
}): Promise<boolean> {
  const { error } = await supabase
    .from("profiles")
    .update({
      current_streak: stats.currentStreak,
      total_cards_read: stats.totalCardsRead,
      total_xp: stats.totalXp,
    })
    .eq("id", userId);
  
  return !error;
}
