CREATE TABLE IF NOT EXISTS bloomscroll_cancellation_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id TEXT NOT NULL,
  email TEXT NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  subscription_status TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_bloomscroll_cancellation_feedback_profile_id
  ON bloomscroll_cancellation_feedback(profile_id);

CREATE INDEX IF NOT EXISTS idx_bloomscroll_cancellation_feedback_created_at
  ON bloomscroll_cancellation_feedback(created_at DESC);

ALTER TABLE bloomscroll_cancellation_feedback ENABLE ROW LEVEL SECURITY;
