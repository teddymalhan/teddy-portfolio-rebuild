-- Migration: Create settings table for resume visibility
-- This migration should be run once to create the settings table
-- The application no longer creates tables at runtime

CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);

-- Insert default value
INSERT INTO settings (key, value) 
VALUES ('resume_visible', 'true')
ON CONFLICT (key) DO NOTHING;

