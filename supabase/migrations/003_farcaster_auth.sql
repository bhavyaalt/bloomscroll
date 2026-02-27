-- Add Farcaster fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS fid INTEGER UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS fc_username TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS fc_display_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS fc_pfp_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS auth_method TEXT DEFAULT 'email'; -- 'email', 'farcaster', 'both'

-- Make email optional (for Farcaster-only users)
ALTER TABLE profiles ALTER COLUMN email DROP NOT NULL;

-- Create index for FID lookups
CREATE INDEX IF NOT EXISTS idx_profiles_fid ON profiles(fid);

-- Allow upserting profiles by FID
CREATE POLICY "Allow upsert by fid" ON profiles
  FOR ALL USING (true) WITH CHECK (true);
