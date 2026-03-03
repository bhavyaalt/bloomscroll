-- Social Features Migration
-- Run this in your Supabase SQL editor

-- Follows table
CREATE TABLE IF NOT EXISTS bloomscroll_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- Reactions on pins
CREATE TABLE IF NOT EXISTS bloomscroll_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pin_id UUID NOT NULL REFERENCES bloomscroll_pinned_cards(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, pin_id)
);

-- Comments on pins
CREATE TABLE IF NOT EXISTS bloomscroll_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pin_id UUID NOT NULL REFERENCES bloomscroll_pinned_cards(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add leaderboard columns to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_cards_read INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_xp INTEGER DEFAULT 0;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_follows_follower ON bloomscroll_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON bloomscroll_follows(following_id);
CREATE INDEX IF NOT EXISTS idx_reactions_pin ON bloomscroll_reactions(pin_id);
CREATE INDEX IF NOT EXISTS idx_comments_pin ON bloomscroll_comments(pin_id);
CREATE INDEX IF NOT EXISTS idx_profiles_streak ON profiles(current_streak DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_cards ON profiles(total_cards_read DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_xp ON profiles(total_xp DESC);

-- RLS policies
ALTER TABLE bloomscroll_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloomscroll_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloomscroll_comments ENABLE ROW LEVEL SECURITY;

-- Follows: anyone can read, users can manage their own
CREATE POLICY "Follows are viewable by everyone" ON bloomscroll_follows FOR SELECT USING (true);
CREATE POLICY "Users can follow" ON bloomscroll_follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow" ON bloomscroll_follows FOR DELETE USING (auth.uid() = follower_id);

-- Reactions: anyone can read, users can manage their own
CREATE POLICY "Reactions are viewable by everyone" ON bloomscroll_reactions FOR SELECT USING (true);
CREATE POLICY "Users can add reactions" ON bloomscroll_reactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove reactions" ON bloomscroll_reactions FOR DELETE USING (auth.uid() = user_id);

-- Comments: anyone can read, users can manage their own
CREATE POLICY "Comments are viewable by everyone" ON bloomscroll_comments FOR SELECT USING (true);
CREATE POLICY "Users can add comments" ON bloomscroll_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON bloomscroll_comments FOR DELETE USING (auth.uid() = user_id);
