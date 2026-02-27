-- Create paywall feedback table
CREATE TABLE IF NOT EXISTS paywall_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reason TEXT NOT NULL,
  other_text TEXT,
  cards_viewed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE paywall_feedback ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone can submit feedback)
CREATE POLICY "Anyone can insert feedback" ON paywall_feedback
  FOR INSERT WITH CHECK (true);

-- Create index for analytics
CREATE INDEX IF NOT EXISTS idx_paywall_feedback_reason ON paywall_feedback(reason);
CREATE INDEX IF NOT EXISTS idx_paywall_feedback_created_at ON paywall_feedback(created_at);
