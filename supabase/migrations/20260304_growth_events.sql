CREATE TABLE IF NOT EXISTS bloomscroll_growth_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  metadata JSONB,
  path TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_bloomscroll_growth_events_event_name
  ON bloomscroll_growth_events(event_name);

CREATE INDEX IF NOT EXISTS idx_bloomscroll_growth_events_created_at
  ON bloomscroll_growth_events(created_at DESC);

ALTER TABLE bloomscroll_growth_events ENABLE ROW LEVEL SECURITY;
