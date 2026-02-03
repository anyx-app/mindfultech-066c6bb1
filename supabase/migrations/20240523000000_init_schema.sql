SET search_path TO proj_66a7e5ec;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY, -- Maps to auth.users.id
    username TEXT UNIQUE,
    avatar_url TEXT,
    daily_goal_minutes INTEGER DEFAULT 120,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Screen Time Logs Table
CREATE TABLE IF NOT EXISTS screen_time_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    total_minutes INTEGER DEFAULT 0,
    device_type TEXT,
    breakdown JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Usage Limits Table
CREATE TABLE IF NOT EXISTS usage_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    category TEXT NOT NULL,
    limit_minutes INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Detox Schedules Table
CREATE TABLE IF NOT EXISTS detox_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    days_of_week INTEGER[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Challenges Table (System Defined)
CREATE TABLE IF NOT EXISTS challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    duration_days INTEGER NOT NULL,
    target_minutes INTEGER,
    type TEXT NOT NULL, -- e.g., 'limit', 'detox', 'streak'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. User Challenges Table
CREATE TABLE IF NOT EXISTS user_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'active', -- 'active', 'completed', 'failed'
    start_date DATE DEFAULT CURRENT_DATE,
    progress INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Streaks Table
CREATE TABLE IF NOT EXISTS streaks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_log_date DATE,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_streak UNIQUE (user_id)
);

-- RLS Policies

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE screen_time_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE detox_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (id::text = current_setting('request.jwt.claims', true)::json->>'sub');
    
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Screen Time Logs: Users can manage their own logs
CREATE POLICY "Users can manage own logs" ON screen_time_logs
    USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Usage Limits: Users can manage their own limits
CREATE POLICY "Users can manage own limits" ON usage_limits
    USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Detox Schedules: Users can manage their own schedules
CREATE POLICY "Users can manage own schedules" ON detox_schedules
    USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Challenges: Everyone (authenticated) can view system challenges
CREATE POLICY "Authenticated users can view challenges" ON challenges
    FOR SELECT TO authenticated USING (true);

-- User Challenges: Users can manage their own challenge participation
CREATE POLICY "Users can manage own user_challenges" ON user_challenges
    USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Streaks: Users can manage their own streaks
CREATE POLICY "Users can manage own streaks" ON streaks
    USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');
