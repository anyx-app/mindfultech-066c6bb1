# Schema Plan - MindfulTech

## Overview
MindfulTech requires a database schema to support screen time tracking, usage limits, detox scheduling, and challenge participation. The schema will leverage Supabase's `auth.users` for authentication and link to a `profiles` table.

## Tables

### 1. `profiles`
- **Description**: Stores user profile information and preferences.
- **Columns**:
  - `id` (uuid, PK): References `auth.users.id`.
  - `username` (text, unique): User's display name.
  - `avatar_url` (text): URL to user's avatar image.
  - `daily_goal_minutes` (integer): User's target daily screen time in minutes.
  - `created_at` (timestamptz): Creation timestamp.
  - `updated_at` (timestamptz): Last update timestamp.

### 2. `screen_time_logs`
- **Description**: Logs daily screen time usage for users.
- **Columns**:
  - `id` (uuid, PK): Unique identifier.
  - `user_id` (uuid, FK): References `profiles.id`.
  - `date` (date): The date of the usage record.
  - `total_minutes` (integer): Total screen time minutes for the day.
  - `device_type` (text): Type of device (e.g., 'mobile', 'desktop', 'tablet').
  - `breakdown` (jsonb): Detailed breakdown by app/category (e.g., `{"social": 30, "productivity": 60}`).
  - `created_at` (timestamptz): Record creation timestamp.

### 3. `usage_limits`
- **Description**: Stores user-defined usage limits for specific categories or apps.
- **Columns**:
  - `id` (uuid, PK): Unique identifier.
  - `user_id` (uuid, FK): References `profiles.id`.
  - `category` (text): Category or app name (e.g., 'Social Media', 'Games').
  - `limit_minutes` (integer): Daily limit in minutes.
  - `is_active` (boolean): Whether the limit is currently active.
  - `created_at` (timestamptz): Record creation timestamp.

### 4. `detox_schedules`
- **Description**: Manages scheduled device-free periods (digital detox).
- **Columns**:
  - `id` (uuid, PK): Unique identifier.
  - `user_id` (uuid, FK): References `profiles.id`.
  - `name` (text): Name of the schedule (e.g., 'Sleeping', 'Family Time').
  - `start_time` (time): Start time of the detox period.
  - `end_time` (time): End time of the detox period.
  - `days_of_week` (integer[]): Array of days (0=Sunday, 6=Saturday) this schedule repeats.
  - `is_active` (boolean): Whether the schedule is active.
  - `created_at` (timestamptz): Record creation timestamp.

### 5. `challenges`
- **Description**: System-defined challenges available to all users.
- **Columns**:
  - `id` (uuid, PK): Unique identifier.
  - `title` (text): Challenge title (e.g., '3-Day Social Media Fast').
  - `description` (text): Detailed description.
  - `duration_days` (integer): Duration of the challenge.
  - `target_minutes` (integer): Maximum allowed daily minutes during challenge (optional).
  - `type` (text): Type of challenge (e.g., 'limit', 'detox', 'streak').
  - `created_at` (timestamptz): Record creation timestamp.

### 6. `user_challenges`
- **Description**: Tracks user participation and progress in challenges.
- **Columns**:
  - `id` (uuid, PK): Unique identifier.
  - `user_id` (uuid, FK): References `profiles.id`.
  - `challenge_id` (uuid, FK): References `challenges.id`.
  - `status` (text): 'active', 'completed', 'failed'.
  - `start_date` (date): Date started.
  - `progress` (integer): Current progress (e.g., days completed).
  - `completed_at` (timestamptz): Completion timestamp.
  - `created_at` (timestamptz): Record creation timestamp.

### 7. `streaks`
- **Description**: Tracks daily streaks for meeting goals.
- **Columns**:
  - `id` (uuid, PK): Unique identifier.
  - `user_id` (uuid, FK): References `profiles.id`.
  - `current_streak` (integer): Current consecutive days meeting goals.
  - `longest_streak` (integer): All-time longest streak.
  - `last_log_date` (date): Date of the last successful goal achievement.
  - `updated_at` (timestamptz): Last update timestamp.

## Relationships
- `profiles.id` -> `auth.users.id` (1:1)
- `screen_time_logs.user_id` -> `profiles.id` (Many:1)
- `usage_limits.user_id` -> `profiles.id` (Many:1)
- `detox_schedules.user_id` -> `profiles.id` (Many:1)
- `user_challenges.user_id` -> `profiles.id` (Many:1)
- `user_challenges.challenge_id` -> `challenges.id` (Many:1)
- `streaks.user_id` -> `profiles.id` (1:1)

## Security (RLS)
- Users can only read/write their own data in `profiles`, `screen_time_logs`, `usage_limits`, `detox_schedules`, `user_challenges`, and `streaks`.
- `challenges` table is read-only for authenticated users (admin write access only).
