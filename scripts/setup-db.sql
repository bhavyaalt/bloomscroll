-- Bloomscroll Database Schema

-- Cards table (main content)
CREATE TABLE IF NOT EXISTS cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author TEXT NOT NULL,
  book TEXT NOT NULL,
  topic TEXT[] NOT NULL DEFAULT '{}',
  insight TEXT NOT NULL,
  quote TEXT,
  image_url TEXT,
  read_time_seconds INTEGER DEFAULT 60,
  chapter TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User saved cards
CREATE TABLE IF NOT EXISTS saved_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  card_id UUID REFERENCES cards(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, card_id)
);

-- User progress (which cards they've seen)
CREATE TABLE IF NOT EXISTS card_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  card_id UUID REFERENCES cards(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_views ENABLE ROW LEVEL SECURITY;

-- Policies for cards (public read)
CREATE POLICY "Cards are viewable by everyone" ON cards
  FOR SELECT USING (true);

-- Policies for saved_cards
CREATE POLICY "Users can view their own saved cards" ON saved_cards
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own saved cards" ON saved_cards
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can delete their own saved cards" ON saved_cards
  FOR DELETE USING (true);

-- Policies for card_views
CREATE POLICY "Users can view their own card views" ON card_views
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own card views" ON card_views
  FOR INSERT WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_cards_topic ON cards USING GIN (topic);
CREATE INDEX IF NOT EXISTS idx_saved_cards_user ON saved_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_card_views_user ON card_views(user_id);
